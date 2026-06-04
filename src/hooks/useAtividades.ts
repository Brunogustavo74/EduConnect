/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useState, useEffect, useCallback } from "react";
import {
  getProximasAtividades,
  getEventosAgenda,
  criarEvento,
  deletarEvento,
} from "@/services/atividades";
import type { Atividade, EventoAgenda } from "@/types";

export function useAtividades() {
  const [atividades, setAtividades] = useState<Atividade[]>([]);
  const [eventos, setEventos] = useState<EventoAgenda[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const carregarDados = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [listaAtividades, listaEventos] = await Promise.all([
        getProximasAtividades(),
        getEventosAgenda(),
      ]);
      setAtividades(listaAtividades);
      setEventos(listaEventos);
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Erro ao carregar atividades"));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    carregarDados();
  }, [carregarDados]);

  const addEvento = useCallback(async (novoEvento: Omit<EventoAgenda, "id">) => {
    try {
      const eventoCriado = await criarEvento(novoEvento);
      setEventos((prev) => [...prev, eventoCriado]);
      return eventoCriado;
    } catch (err) {
      throw err instanceof Error ? err : new Error("Erro ao criar evento");
    }
  }, []);

  const removeEvento = useCallback(async (id: string) => {
    try {
      await deletarEvento(id);
      setEventos((prev) => prev.filter((e) => e.id !== id));
    } catch (err) {
      throw err instanceof Error ? err : new Error("Erro ao deletar evento");
    }
  }, []);

  return {
    atividades,
    eventos,
    loading,
    error,
    refresh: carregarDados,
    addEvento,
    removeEvento,
  };
}
