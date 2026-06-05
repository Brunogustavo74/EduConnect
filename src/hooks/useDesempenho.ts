
"use client";

import { useState, useEffect, useCallback } from "react";
import {
  getDisciplinas,
  getDesempenhoBimestral,
  getDashboardStats,
  getMetasSemanais,
  toggleMeta,
  getConquistas,
} from "@/services/desempenho";
import type { Disciplina, DesempenhoMensal, DashboardStats, MetaSemanal, Conquista } from "@/types";

export function useDesempenho() {
  const [disciplinas, setDisciplinas] = useState<Disciplina[]>([]);
  const [desempenhoBimestral, setDesempenhoBimestral] = useState<DesempenhoMensal[]>([]);
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [metas, setMetas] = useState<MetaSemanal[]>([]);
  const [conquistas, setConquistas] = useState<Conquista[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const carregarDados = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [listaDisciplinas, listaDesempenho, dadosStats, listaMetas, listaConquistas] = await Promise.all([
        getDisciplinas(),
        getDesempenhoBimestral(),
        getDashboardStats(),
        getMetasSemanais(),
        getConquistas(),
      ]);
      setDisciplinas(listaDisciplinas);
      setDesempenhoBimestral(listaDesempenho);
      setStats(dadosStats);
      setMetas(listaMetas);
      setConquistas(listaConquistas);
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Erro ao carregar dados de desempenho"));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    carregarDados();
  }, [carregarDados]);

  const toggleMetaSemanal = useCallback(async (id: string) => {
    try {
      const metaAtualizada = await toggleMeta(id);
      if (metaAtualizada) {
        setMetas((prev) =>
          prev.map((m) => (m.id === id ? { ...m, concluida: metaAtualizada.concluida } : m))
        );
      }
      return metaAtualizada;
    } catch (err) {
      throw err instanceof Error ? err : new Error("Erro ao alternar meta");
    }
  }, []);

  return {
    disciplinas,
    desempenhoBimestral,
    stats,
    metas,
    conquistas,
    loading,
    error,
    refresh: carregarDados,
    toggleMetaSemanal,
  };
}
