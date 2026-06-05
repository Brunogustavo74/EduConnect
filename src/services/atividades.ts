/* eslint-disable @typescript-eslint/no-explicit-any */

import { supabase } from "@/lib/supabase";
import type { Atividade, EventoAgenda } from "@/types";

export async function getProximasAtividades(): Promise<Atividade[]> {
  const { data: userData } = await supabase.auth.getUser();
  if (!userData?.user) return [];

  const { data, error } = await supabase
    .from("events")
    .select("*")
    .eq("user_id", userData.user.id)
    .order("ano", { ascending: true })
    .order("mes", { ascending: true })
    .order("dia", { ascending: true })
    .limit(5);

  if (error || !data) return [];
  
  return data.map((e) => ({
    id: e.id,
    titulo: e.titulo,
    disciplina: e.disciplina || "Geral",
    data: `${e.dia}/${e.mes}/${e.ano}`,
    horario: e.horario || "",
    tipo: e.tipo as any,
  }));
}

export async function getEventosAgenda(): Promise<EventoAgenda[]> {
  const { data: userData } = await supabase.auth.getUser();
  if (!userData?.user) return [];

  const { data, error } = await supabase
    .from("events")
    .select("*")
    .eq("user_id", userData.user.id);

  if (error || !data) return [];
  
  return data as EventoAgenda[];
}

export async function getEventosPorDia(dia: number, mes: number): Promise<EventoAgenda[]> {
  const { data: userData } = await supabase.auth.getUser();
  if (!userData?.user) return [];

  const { data, error } = await supabase
    .from("events")
    .select("*")
    .eq("user_id", userData.user.id)
    .eq("dia", dia)
    .eq("mes", mes);

  if (error || !data) return [];
  
  return data as EventoAgenda[];
}

export async function criarEvento(evento: Omit<EventoAgenda, "id">): Promise<EventoAgenda> {
  const { data: userData } = await supabase.auth.getUser();
  if (!userData?.user) throw new Error("Usuário não autenticado");

  const { data, error } = await supabase
    .from("events")
    .insert([
      { ...evento, user_id: userData.user.id }
    ])
    .select()
    .single();

  if (error) throw error;
  
  return data as EventoAgenda;
}

export async function deletarEvento(id: string): Promise<void> {
  const { data: userData } = await supabase.auth.getUser();
  if (!userData?.user) throw new Error("Usuário não autenticado");

  const { error } = await supabase
    .from("events")
    .delete()
    .eq("id", id)
    .eq("user_id", userData.user.id);

  if (error) throw error;
}
