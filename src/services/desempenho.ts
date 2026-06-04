// ========================================
// Serviço de Desempenho
// ========================================

import { disciplinas, desempenhoBimestral, dashboardStats, metasSemanais, conquistas } from "@/lib/mock-data";
import type { Disciplina, DesempenhoMensal, DashboardStats, MetaSemanal, Conquista } from "@/types";

export async function getDisciplinas(): Promise<Disciplina[]> {
  await new Promise((r) => setTimeout(r, 300));
  return disciplinas;
}

export async function getDesempenhoBimestral(): Promise<DesempenhoMensal[]> {
  await new Promise((r) => setTimeout(r, 300));
  return desempenhoBimestral;
}

export async function getDashboardStats(): Promise<DashboardStats> {
  await new Promise((r) => setTimeout(r, 200));
  return dashboardStats;
}

export async function getMetasSemanais(): Promise<MetaSemanal[]> {
  await new Promise((r) => setTimeout(r, 300));
  return metasSemanais;
}

export async function toggleMeta(id: string): Promise<MetaSemanal | undefined> {
  await new Promise((r) => setTimeout(r, 200));
  const meta = metasSemanais.find((m) => m.id === id);
  if (meta) {
    meta.concluida = !meta.concluida;
  }
  return meta;
}

export async function getConquistas(): Promise<Conquista[]> {
  await new Promise((r) => setTimeout(r, 300));
  return conquistas;
}
