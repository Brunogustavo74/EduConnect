// ========================================
// Serviço de Atividades
// Abstrai o acesso a dados — trocar mock → Supabase é mudar só aqui
// ========================================

import { proximasAtividades, eventosAgenda } from "@/lib/mock-data";
import type { Atividade, EventoAgenda } from "@/types";

export async function getProximasAtividades(): Promise<Atividade[]> {
  // Simula delay de rede
  await new Promise((r) => setTimeout(r, 300));
  return proximasAtividades;
}

export async function getEventosAgenda(): Promise<EventoAgenda[]> {
  await new Promise((r) => setTimeout(r, 300));
  return eventosAgenda;
}

export async function getEventosPorDia(dia: number, mes: number): Promise<EventoAgenda[]> {
  await new Promise((r) => setTimeout(r, 200));
  return eventosAgenda.filter((e) => e.dia === dia && e.mes === mes);
}

export async function criarEvento(evento: Omit<EventoAgenda, "id">): Promise<EventoAgenda> {
  await new Promise((r) => setTimeout(r, 300));
  const novoEvento: EventoAgenda = {
    ...evento,
    id: String(Date.now()),
  };
  eventosAgenda.push(novoEvento);
  return novoEvento;
}

export async function deletarEvento(id: string): Promise<void> {
  await new Promise((r) => setTimeout(r, 200));
  const idx = eventosAgenda.findIndex((e) => e.id === id);
  if (idx !== -1) eventosAgenda.splice(idx, 1);
}
