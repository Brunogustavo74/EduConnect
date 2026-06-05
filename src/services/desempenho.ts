import type { Disciplina, DesempenhoMensal, DashboardStats, MetaSemanal, Conquista } from "@/types";

const disciplinas: Disciplina[] = [
  { id: "1", nome: "Matemática", professor: "Prof. Carlos", cor: "#3B82F6", media: 8.5, notas: [7.5, 8.0, 9.0, 8.5] },
  { id: "2", nome: "Português", professor: "Profa. Maria", cor: "#EF4444", media: 9.2, notas: [9.0, 9.5, 8.8, 9.2] },
  { id: "3", nome: "História", professor: "Prof. Roberto", cor: "#F59E0B", media: 7.8, notas: [7.0, 8.0, 7.5, 8.5] },
  { id: "4", nome: "Biologia", professor: "Profa. Fernanda", cor: "#10B981", media: 8.0, notas: [7.5, 8.5, 8.0, 8.0] },
  { id: "5", nome: "Física", professor: "Prof. André", cor: "#8B5CF6", media: 7.2, notas: [6.5, 7.0, 7.5, 7.8] },
  { id: "6", nome: "Química", professor: "Profa. Juliana", cor: "#EC4899", media: 7.5, notas: [7.0, 7.5, 7.8, 7.5] },
  { id: "7", nome: "Geografia", professor: "Prof. Paulo", cor: "#14B8A6", media: 8.8, notas: [8.5, 9.0, 8.5, 9.0] },
  { id: "8", nome: "Inglês", professor: "Profa. Sarah", cor: "#6366F1", media: 9.5, notas: [9.5, 9.0, 10.0, 9.5] },
];

const desempenhoBimestral: DesempenhoMensal[] = [
  { mes: "Fev", nota: 7.5 },
  { mes: "Mar", nota: 7.8 },
  { mes: "Abr", nota: 8.2 },
  { mes: "Mai", nota: 8.6 },
];

const dashboardStats: DashboardStats = {
  proximasAtividades: 5,
  mediaGeral: 8.6,
  monitorias: 2,
  conquistas: 12,
};

const metasSemanais: MetaSemanal[] = [
  { id: "1", titulo: "Revisar Matemática", concluida: false, horasEstudo: 2, horasMeta: 3 },
  { id: "2", titulo: "Exercícios de Física", concluida: false, horasEstudo: 1.5, horasMeta: 2 },
  { id: "3", titulo: "Leitura de História", concluida: true, horasEstudo: 1, horasMeta: 1 },
  { id: "4", titulo: "Resumo de Biologia", concluida: false, horasEstudo: 0.5, horasMeta: 1.5 },
  { id: "5", titulo: "Redação semanal", concluida: true, horasEstudo: 2, horasMeta: 2 },
];

const conquistas: Conquista[] = [
  { id: "1", titulo: "Primeira Monitoria", descricao: "Completou sua primeira sessão de monitoria", icone: "🎓", desbloqueada: true },
  { id: "2", titulo: "Nota 10!", descricao: "Tirou nota máxima em uma prova", icone: "⭐", desbloqueada: true },
  { id: "3", titulo: "Maratonista", descricao: "Estudou 5 dias seguidos", icone: "🔥", desbloqueada: true },
  { id: "4", titulo: "Colaborador", descricao: "Compartilhou 5 resumos", icone: "🤝", desbloqueada: true },
  { id: "5", titulo: "Explorador", descricao: "Acessou todas as funcionalidades", icone: "🧭", desbloqueada: false },
  { id: "6", titulo: "Top Monitor", descricao: "Avaliação média de 4.8+", icone: "👑", desbloqueada: false },
  { id: "7", titulo: "Mestre do ENEM", descricao: "Completou 3 simulados", icone: "📝", desbloqueada: false },
  { id: "8", titulo: "Leitor Ávido", descricao: "Leu 10 resumos da biblioteca", icone: "📚", desbloqueada: true },
  { id: "9", titulo: "Dedicação Total", descricao: "Estudou 20h em uma semana", icone: "💪", desbloqueada: false },
  { id: "10", titulo: "Mente Brilhante", descricao: "Média acima de 9.0", icone: "💡", desbloqueada: true },
  { id: "11", titulo: "Comunicador", descricao: "Participou de 10 discussões", icone: "💬", desbloqueada: true },
  { id: "12", titulo: "Superação", descricao: "Melhorou a nota em 3 matérias", icone: "📈", desbloqueada: true },
];

export async function getDisciplinas(): Promise<Disciplina[]> {
  return disciplinas;
}

export async function getDesempenhoBimestral(): Promise<DesempenhoMensal[]> {
  return desempenhoBimestral;
}

export async function getDashboardStats(): Promise<DashboardStats> {
  return dashboardStats;
}

export async function getMetasSemanais(): Promise<MetaSemanal[]> {
  return metasSemanais;
}

export async function toggleMeta(id: string): Promise<MetaSemanal | undefined> {
  const meta = metasSemanais.find((m) => m.id === id);
  if (meta) {
    meta.concluida = !meta.concluida;
  }
  return meta;
}

export async function getConquistas(): Promise<Conquista[]> {
  return conquistas;
}
