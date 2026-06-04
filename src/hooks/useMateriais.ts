/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useState, useEffect, useCallback } from "react";
import {
  getMateriais,
  getNotas,
  criarNota,
  atualizarNota,
  criarMaterial,
  deletarMaterial,
} from "@/services/materiais";
import type { Material, Nota } from "@/types";

export function useMateriais() {
  const [materiais, setMateriais] = useState<Material[]>([]);
  const [notas, setNotas] = useState<Nota[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const carregarDados = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [listaMateriais, listaNotas] = await Promise.all([
        getMateriais(),
        getNotas(),
      ]);
      setMateriais(listaMateriais);
      setNotas(listaNotas);
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Erro ao carregar materiais"));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    carregarDados();
  }, [carregarDados]);

  const addNota = useCallback(async (novaNota: Omit<Nota, "id">) => {
    try {
      const notaCriada = await criarNota(novaNota);
      setNotas((prev) => [notaCriada, ...prev]);
      return notaCriada;
    } catch (err) {
      throw err instanceof Error ? err : new Error("Erro ao criar nota");
    }
  }, []);

  const editNota = useCallback(async (id: string, dados: Partial<Nota>) => {
    try {
      const notaAtualizada = await atualizarNota(id, dados);
      if (notaAtualizada) {
        setNotas((prev) => prev.map((n) => (n.id === id ? notaAtualizada : n)));
      }
      return notaAtualizada;
    } catch (err) {
      throw err instanceof Error ? err : new Error("Erro ao atualizar nota");
    }
  }, []);

  const addMaterial = useCallback(async (novoMaterial: Omit<Material, "id" | "downloads" | "data">) => {
    try {
      const materialCriado = await criarMaterial(novoMaterial);
      setMateriais((prev) => [materialCriado, ...prev]);
      return materialCriado;
    } catch (err) {
      throw err instanceof Error ? err : new Error("Erro ao criar material");
    }
  }, []);

  const removeMaterial = useCallback(async (id: string) => {
    try {
      await deletarMaterial(id);
      setMateriais((prev) => prev.filter((m) => m.id !== id));
    } catch (err) {
      throw err instanceof Error ? err : new Error("Erro ao deletar material");
    }
  }, []);

  return {
    materiais,
    notas,
    loading,
    error,
    refresh: carregarDados,
    addNota,
    editNota,
    addMaterial,
    removeMaterial,
  };
}
