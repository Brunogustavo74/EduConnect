import { supabase } from "@/lib/supabase";
import type { Material, Nota } from "@/types";

export async function getMateriais(): Promise<Material[]> {
  const { data, error } = await supabase
    .from("materials")
    .select("*")
    .order("created_at", { ascending: false });

  if (error || !data) return [];
  return data as Material[];
}

export async function getMateriaisPorDisciplina(disciplina: string): Promise<Material[]> {
  const { data, error } = await supabase
    .from("materials")
    .select("*")
    .eq("disciplina", disciplina);

  if (error || !data) return [];
  return data as Material[];
}

export async function getMateriaisPorTipo(tipo: Material["tipo"]): Promise<Material[]> {
  const { data, error } = await supabase
    .from("materials")
    .select("*")
    .eq("tipo", tipo);

  if (error || !data) return [];
  return data as Material[];
}

export async function getNotas(): Promise<Nota[]> {
  const { data: userData } = await supabase.auth.getUser();
  if (!userData?.user) return [];

  const { data, error } = await supabase
    .from("notes")
    .select("*")
    .eq("user_id", userData.user.id)
    .order("created_at", { ascending: false });

  if (error || !data) return [];
  return data as Nota[];
}

export async function getNotaPorId(id: string): Promise<Nota | undefined> {
  const { data, error } = await supabase
    .from("notes")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !data) return undefined;
  return data as Nota;
}

export async function criarNota(nota: Omit<Nota, "id">): Promise<Nota> {
  const { data: userData } = await supabase.auth.getUser();
  if (!userData?.user) throw new Error("Não logado");

  const { data, error } = await supabase
    .from("notes")
    .insert([{ ...nota, user_id: userData.user.id }])
    .select()
    .single();

  if (error) throw error;
  return data as Nota;
}

export async function atualizarNota(id: string, dados: Partial<Nota>): Promise<Nota | undefined> {
  const { data: userData } = await supabase.auth.getUser();
  if (!userData?.user) return undefined;

  const { data, error } = await supabase
    .from("notes")
    .update(dados)
    .eq("id", id)
    .eq("user_id", userData.user.id)
    .select()
    .single();

  if (error || !data) return undefined;
  return data as Nota;
}

export async function criarMaterial(material: Omit<Material, "id" | "downloads" | "data">): Promise<Material> {
  const { data: userData } = await supabase.auth.getUser();
  if (!userData?.user) throw new Error("Não logado");

  const novoMaterial = {
    ...material,
    user_id: userData.user.id,
    downloads: 0,
    data: new Date().toLocaleDateString("pt-BR"),
  };

  const { data, error } = await supabase
    .from("materials")
    .insert([novoMaterial])
    .select()
    .single();

  if (error) throw error;
  return data as Material;
}

export async function deletarMaterial(id: string): Promise<void> {
  const { data: userData } = await supabase.auth.getUser();
  if (!userData?.user) throw new Error("Não logado");

  const { error } = await supabase
    .from("materials")
    .delete()
    .eq("id", id)
    .eq("user_id", userData.user.id);

  if (error) throw error;
}
