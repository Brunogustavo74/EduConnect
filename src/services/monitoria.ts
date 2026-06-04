// ========================================
// Serviço de Monitoria
// ========================================

import { monitores } from "@/lib/mock-data";
import type { Monitor } from "@/types";

export async function getMonitores(): Promise<Monitor[]> {
  await new Promise((r) => setTimeout(r, 300));
  return monitores;
}

export async function getMonitoresDisponiveis(): Promise<Monitor[]> {
  await new Promise((r) => setTimeout(r, 300));
  return monitores.filter((m) => m.disponivel);
}

export async function getMonitorPorId(id: string): Promise<Monitor | undefined> {
  await new Promise((r) => setTimeout(r, 200));
  return monitores.find((m) => m.id === id);
}

export async function getMonitoresPorDisciplina(disciplina: string): Promise<Monitor[]> {
  await new Promise((r) => setTimeout(r, 200));
  return monitores.filter((m) => m.disciplina === disciplina);
}
