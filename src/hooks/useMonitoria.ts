/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useState, useEffect, useCallback } from "react";
import { getMonitores } from "@/services/monitoria";
import type { Monitor } from "@/types";

export function useMonitoria() {
  const [monitores, setMonitores] = useState<Monitor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const carregarDados = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const listaMonitores = await getMonitores();
      setMonitores(listaMonitores);
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Erro ao carregar monitores"));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    carregarDados();
  }, [carregarDados]);

  return {
    monitores,
    loading,
    error,
    refresh: carregarDados,
  };
}
