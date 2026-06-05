import { supabase } from "@/lib/supabase";
import type { Monitor } from "@/types";

export async function getMonitores(): Promise<Monitor[]> {
  const { data, error } = await supabase
    .from("monitors")
    .select("*");

  if (error || !data) return [];
  return data as Monitor[];
}

export async function getMonitoresDisponiveis(): Promise<Monitor[]> {
  const { data, error } = await supabase
    .from("monitors")
    .select("*")
    .eq("disponivel", true);

  if (error || !data) return [];
  return data as Monitor[];
}

export async function getMonitorPorId(id: string): Promise<Monitor | undefined> {
  const { data, error } = await supabase
    .from("monitors")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !data) return undefined;
  return data as Monitor;
}

export async function getMonitoresPorDisciplina(disciplina: string): Promise<Monitor[]> {
  const { data, error } = await supabase
    .from("monitors")
    .select("*")
    .eq("disciplina", disciplina);

  if (error || !data) return [];
  return data as Monitor[];
}
