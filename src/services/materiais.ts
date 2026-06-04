// ========================================
// Serviço de Materiais e Resumos
// ========================================

import { materiais, notasCaderno } from "@/lib/mock-data";
import type { Material, Nota } from "@/types";

export async function getMateriais(): Promise<Material[]> {
  await new Promise((r) => setTimeout(r, 300));
  return materiais;
}

export async function getMateriaisPorDisciplina(disciplina: string): Promise<Material[]> {
  await new Promise((r) => setTimeout(r, 200));
  return materiais.filter((m) => m.disciplina === disciplina);
}

export async function getMateriaisPorTipo(tipo: Material["tipo"]): Promise<Material[]> {
  await new Promise((r) => setTimeout(r, 200));
  return materiais.filter((m) => m.tipo === tipo);
}

export async function getNotas(): Promise<Nota[]> {
  await new Promise((r) => setTimeout(r, 300));
  return notasCaderno;
}

export async function getNotaPorId(id: string): Promise<Nota | undefined> {
  await new Promise((r) => setTimeout(r, 200));
  return notasCaderno.find((n) => n.id === id);
}

export async function criarNota(nota: Omit<Nota, "id">): Promise<Nota> {
  await new Promise((r) => setTimeout(r, 300));
  const novaNota: Nota = {
    ...nota,
    id: String(Date.now()),
  };
  notasCaderno.push(novaNota);
  return novaNota;
}

export async function atualizarNota(id: string, dados: Partial<Nota>): Promise<Nota | undefined> {
  await new Promise((r) => setTimeout(r, 200));
  const idx = notasCaderno.findIndex((n) => n.id === id);
  if (idx === -1) return undefined;
  notasCaderno[idx] = { ...notasCaderno[idx], ...dados };
  return notasCaderno[idx];
}

export async function criarMaterial(material: Omit<Material, "id" | "downloads" | "data">): Promise<Material> {
  await new Promise((r) => setTimeout(r, 300));
  const novoMaterial: Material = {
    ...material,
    id: String(Date.now()),
    downloads: 0,
    data: new Date().toLocaleDateString("pt-BR"),
  };
  materiais.push(novoMaterial);
  return novoMaterial;
}

export async function deletarMaterial(id: string): Promise<void> {
  await new Promise((r) => setTimeout(r, 200));
  const idx = materiais.findIndex((m) => m.id === id);
  if (idx !== -1) materiais.splice(idx, 1);
}
