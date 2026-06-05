
export interface Usuario {
  id: string;
  nome: string;
  email: string;
  avatar: string;
  serie: string;
  escola: string;
}

export interface Atividade {
  id: string;
  titulo: string;
  disciplina: string;
  tipo: "prova" | "trabalho" | "atividade" | "evento";
  data: string;
  horario?: string;
  descricao?: string;
  concluida?: boolean;
}

export interface Disciplina {
  id: string;
  nome: string;
  professor: string;
  cor: string;
  media: number;
  notas: number[];
}

export interface Monitor {
  id: string;
  nome: string;
  avatar: string;
  disciplina: string;
  avaliacao: number;
  disponivel: boolean;
  descricao: string;
}

export interface Material {
  id: string;
  titulo: string;
  disciplina: string;
  tipo: "pdf" | "resumo" | "flashcard" | "video";
  autor: string;
  data: string;
  downloads: number;
}

export interface Nota {
  id: string;
  disciplina: string;
  titulo: string;
  conteudo: string;
  data: string;
  compartilhada: boolean;
}

export interface DesempenhoMensal {
  mes: string;
  nota: number;
}

export interface MetaSemanal {
  id: string;
  titulo: string;
  concluida: boolean;
  horasEstudo: number;
  horasMeta: number;
}

export interface EventoAgenda {
  id: string;
  titulo: string;
  tipo: "prova" | "trabalho" | "evento" | "atividade";
  horario: string;
  local?: string;
  disciplina?: string;
  dia: number;
  mes: number;
  ano: number;
}

export interface Notificacao {
  id: string;
  titulo: string;
  mensagem: string;
  lida: boolean;
  tempo: string;
}

export interface Conquista {
  id: string;
  titulo: string;
  descricao: string;
  icone: string;
  desbloqueada: boolean;
}

export interface Citacao {
  texto: string;
  autor: string;
}

export interface Carreira {
  id: string;
  nome: string;
  area: string;
  icone: string;
  descricao: string;
  disciplinas: string[];
}

export interface DashboardStats {
  proximasAtividades: number;
  mediaGeral: number;
  monitorias: number;
  conquistas: number;
}
