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

export const usuarioAtual = {
  id: "1",
  nome: "Bruno Gustavo",
  email: "bruno.gustavo@nave.org.br",
  avatar: "",
  serie: "2º C ano • Ensino Médio",
  escola: "ETE Cícero Días",
};

export const proximasAtividades: Atividade[] = [
  {
    id: "1",
    titulo: "Prova de Matemática",
    disciplina: "Matemática",
    tipo: "prova",
    data: "23/05",
    horario: "10:00",
    descricao: "Capítulos 5 e 6 - Funções Quadráticas",
  },
  {
    id: "2",
    titulo: "Trabalho de História",
    disciplina: "História",
    tipo: "trabalho",
    data: "25/05",
    horario: "23:59",
    descricao: "Revolução Industrial - 3 a 5 páginas",
  },
  {
    id: "3",
    titulo: "Atividade de Biologia",
    disciplina: "Biologia",
    tipo: "atividade",
    data: "27/05",
    horario: "18:00",
    descricao: "Relatório do laboratório de célula",
  },
  {
    id: "4",
    titulo: "Seminário de Filosofia",
    disciplina: "Filosofia",
    tipo: "trabalho",
    data: "28/05",
    horario: "14:00",
    descricao: "Apresentação sobre Existencialismo",
  },
  {
    id: "5",
    titulo: "Simulado ENEM",
    disciplina: "Geral",
    tipo: "prova",
    data: "30/05",
    horario: "08:00",
    descricao: "Simulado completo - 180 questões",
  },
];

export const disciplinas: Disciplina[] = [
  {
    id: "1",
    nome: "Matemática",
    professor: "Prof. Carlos",
    cor: "#3B82F6",
    media: 8.5,
    notas: [7.5, 8.0, 9.0, 8.5],
  },
  {
    id: "2",
    nome: "Português",
    professor: "Profa. Maria",
    cor: "#EF4444",
    media: 9.2,
    notas: [9.0, 9.5, 8.8, 9.2],
  },
  {
    id: "3",
    nome: "História",
    professor: "Prof. Roberto",
    cor: "#F59E0B",
    media: 7.8,
    notas: [7.0, 8.0, 7.5, 8.5],
  },
  {
    id: "4",
    nome: "Biologia",
    professor: "Profa. Fernanda",
    cor: "#10B981",
    media: 8.0,
    notas: [7.5, 8.5, 8.0, 8.0],
  },
  {
    id: "5",
    nome: "Física",
    professor: "Prof. André",
    cor: "#8B5CF6",
    media: 7.2,
    notas: [6.5, 7.0, 7.5, 7.8],
  },
  {
    id: "6",
    nome: "Química",
    professor: "Profa. Juliana",
    cor: "#EC4899",
    media: 7.5,
    notas: [7.0, 7.5, 7.8, 7.5],
  },
  {
    id: "7",
    nome: "Geografia",
    professor: "Prof. Paulo",
    cor: "#14B8A6",
    media: 8.8,
    notas: [8.5, 9.0, 8.5, 9.0],
  },
  {
    id: "8",
    nome: "Inglês",
    professor: "Profa. Sarah",
    cor: "#6366F1",
    media: 9.5,
    notas: [9.5, 9.0, 10.0, 9.5],
  },
];

export const desempenhoBimestral: DesempenhoMensal[] = [
  { mes: "Fev", nota: 7.5 },
  { mes: "Mar", nota: 7.8 },
  { mes: "Abr", nota: 8.2 },
  { mes: "Mai", nota: 8.6 },
];

export const monitores: Monitor[] = [
  {
    id: "1",
    nome: "Maria Eduarda",
    avatar: "",
    disciplina: "Matemática",
    avaliacao: 4.9,
    disponivel: true,
    descricao: "Especialista em cálculo e geometria analítica. Disponível de segunda a sexta.",
  },
  {
    id: "2",
    nome: "João Pedro",
    avatar: "",
    disciplina: "Física",
    avaliacao: 4.8,
    disponivel: true,
    descricao: "Ama explicar mecânica e termodinâmica de forma simples e prática.",
  },
  {
    id: "3",
    nome: "Isabela Costa",
    avatar: "",
    disciplina: "Química",
    avaliacao: 4.9,
    disponivel: false,
    descricao: "Orgânica e inorgânica sem mistério. Monitora há 2 anos.",
  },
  {
    id: "4",
    nome: "Lucas Almeida",
    avatar: "",
    disciplina: "Biologia",
    avaliacao: 4.7,
    disponivel: true,
    descricao: "Genética e ecologia são minha paixão. Vamos estudar juntos!",
  },
  {
    id: "5",
    nome: "Carolina Santos",
    avatar: "",
    disciplina: "Português",
    avaliacao: 5.0,
    disponivel: true,
    descricao: "Redação nota mil! Posso te ajudar com interpretação e gramática.",
  },
  {
    id: "6",
    nome: "Rafael Oliveira",
    avatar: "",
    disciplina: "História",
    avaliacao: 4.6,
    disponivel: true,
    descricao: "História do Brasil e história geral. Adoro fazer conexões entre os períodos.",
  },
];

export const materiais: Material[] = [
  {
    id: "1",
    titulo: "Resumo - Funções Quadráticas",
    disciplina: "Matemática",
    tipo: "resumo",
    autor: "Maria Eduarda",
    data: "20/05/2024",
    downloads: 45,
  },
  {
    id: "2",
    titulo: "Flashcards - Tabela Periódica",
    disciplina: "Química",
    tipo: "flashcard",
    autor: "Isabela Costa",
    data: "18/05/2024",
    downloads: 32,
  },
  {
    id: "3",
    titulo: "PDF - Revolução Francesa",
    disciplina: "História",
    tipo: "pdf",
    autor: "Rafael Oliveira",
    data: "15/05/2024",
    downloads: 28,
  },
  {
    id: "4",
    titulo: "Resumo - Leis de Newton",
    disciplina: "Física",
    tipo: "resumo",
    autor: "João Pedro",
    data: "12/05/2024",
    downloads: 56,
  },
  {
    id: "5",
    titulo: "Flashcards - Verbos Irregulares",
    disciplina: "Inglês",
    tipo: "flashcard",
    autor: "Profa. Sarah",
    data: "10/05/2024",
    downloads: 78,
  },
  {
    id: "6",
    titulo: "Resumo - Ecossistemas Brasileiros",
    disciplina: "Biologia",
    tipo: "resumo",
    autor: "Lucas Almeida",
    data: "08/05/2024",
    downloads: 41,
  },
  {
    id: "7",
    titulo: "PDF - Redação ENEM 2023",
    disciplina: "Português",
    tipo: "pdf",
    autor: "Carolina Santos",
    data: "05/05/2024",
    downloads: 92,
  },
  {
    id: "8",
    titulo: "Resumo - Climatologia",
    disciplina: "Geografia",
    tipo: "resumo",
    autor: "Prof. Paulo",
    data: "03/05/2024",
    downloads: 37,
  },
];

export const notasCaderno: Nota[] = [
  {
    id: "1",
    disciplina: "Matemática",
    titulo: "Funções do 2º Grau",
    conteudo: "A função quadrática tem a forma f(x) = ax² + bx + c, onde a ≠ 0. O gráfico é uma parábola...",
    data: "20/05/2024",
    compartilhada: false,
  },
  {
    id: "2",
    disciplina: "História",
    titulo: "Era Vargas (1930-1945)",
    conteudo: "O governo de Getúlio Vargas pode ser dividido em três fases: Governo Provisório, Governo Constitucional e Estado Novo...",
    data: "18/05/2024",
    compartilhada: true,
  },
  {
    id: "3",
    disciplina: "Biologia",
    titulo: "Divisão Celular - Mitose",
    conteudo: "A mitose é o processo de divisão celular em que uma célula dá origem a duas células geneticamente idênticas...",
    data: "15/05/2024",
    compartilhada: false,
  },
  {
    id: "4",
    disciplina: "Física",
    titulo: "Leis de Newton",
    conteudo: "1ª Lei (Inércia): Todo corpo permanece em repouso ou em MRU, a menos que uma força resultant atue sobre ele...",
    data: "12/05/2024",
    compartilhada: true,
  },
  {
    id: "5",
    disciplina: "Português",
    titulo: "Figuras de Linguagem",
    conteudo: "Metáfora: comparação implícita. Metonímia: substituição de um termo por outro. Hipérbole: exagero intencional...",
    data: "10/05/2024",
    compartilhada: false,
  },
];

export const eventosAgenda: EventoAgenda[] = [
  { id: "1", titulo: "Prova de Matemática", tipo: "prova", horario: "10:00", local: "Sala 12", disciplina: "Matemática", dia: 23, mes: 5, ano: 2024 },
  { id: "2", titulo: "Aula de Física", tipo: "evento", horario: "14:00", local: "Laboratório 3", disciplina: "Física", dia: 23, mes: 5, ano: 2024 },
  { id: "3", titulo: "Entrega - Trabalho de História", tipo: "trabalho", horario: "23:59", disciplina: "História", dia: 25, mes: 5, ano: 2024 },
  { id: "4", titulo: "Atividade de Biologia", tipo: "atividade", horario: "18:00", disciplina: "Biologia", dia: 27, mes: 5, ano: 2024 },
  { id: "5", titulo: "Seminário de Filosofia", tipo: "trabalho", horario: "14:00", local: "Auditório", disciplina: "Filosofia", dia: 28, mes: 5, ano: 2024 },
  { id: "6", titulo: "Simulado ENEM", tipo: "prova", horario: "08:00", local: "Ginásio", dia: 30, mes: 5, ano: 2024 },
  { id: "7", titulo: "Reunião de Pais", tipo: "evento", horario: "19:00", local: "Auditório", dia: 31, mes: 5, ano: 2024 },
  { id: "8", titulo: "Feira de Ciências", tipo: "evento", horario: "09:00", local: "Pátio", dia: 5, mes: 6, ano: 2024 },
  { id: "9", titulo: "Prova de Português", tipo: "prova", horario: "10:00", local: "Sala 8", disciplina: "Português", dia: 3, mes: 6, ano: 2024 },
  { id: "10", titulo: "Trabalho de Geografia", tipo: "trabalho", horario: "23:59", disciplina: "Geografia", dia: 7, mes: 6, ano: 2024 },
];

export const metasSemanais: MetaSemanal[] = [
  { id: "1", titulo: "Revisar Matemática", concluida: false, horasEstudo: 2, horasMeta: 3 },
  { id: "2", titulo: "Exercícios de Física", concluida: false, horasEstudo: 1.5, horasMeta: 2 },
  { id: "3", titulo: "Leitura de História", concluida: true, horasEstudo: 1, horasMeta: 1 },
  { id: "4", titulo: "Resumo de Biologia", concluida: false, horasEstudo: 0.5, horasMeta: 1.5 },
  { id: "5", titulo: "Redação semanal", concluida: true, horasEstudo: 2, horasMeta: 2 },
];

export const conquistas = [
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

export const citacoes = [
  { texto: "O futuro depende do que você faz hoje, não amanhã.", autor: "Mahatma Gandhi" },
  { texto: "A educação é a arma mais poderosa que você pode usar para mudar o mundo.", autor: "Nelson Mandela" },
  { texto: "O sucesso é a soma de pequenos esforços repetidos dia após dia.", autor: "Robert Collier" },
  { texto: "Quanto mais você estuda, mais aprende e se aproxima dos seus sonhos.", autor: "EduConnect" },
];

export const carreiras = [
  { id: "1", nome: "Engenharia", area: "Exatas", icone: "⚙️", descricao: "Projete o futuro com inovação e tecnologia", disciplinas: ["Matemática", "Física"] },
  { id: "2", nome: "Medicina", area: "Saúde", icone: "🏥", descricao: "Cuide de vidas e transforme a saúde", disciplinas: ["Biologia", "Química"] },
  { id: "3", nome: "Direito", area: "Humanas", icone: "⚖️", descricao: "Defenda a justiça e os direitos", disciplinas: ["História", "Português"] },
  { id: "4", nome: "Computação", area: "Exatas", icone: "💻", descricao: "Crie o mundo digital do amanhã", disciplinas: ["Matemática", "Física"] },
  { id: "5", nome: "Psicologia", area: "Humanas", icone: "🧠", descricao: "Entenda a mente e ajude pessoas", disciplinas: ["Biologia", "Filosofia"] },
  { id: "6", nome: "Arquitetura", area: "Exatas", icone: "🏛️", descricao: "Dê forma aos espaços e ambientes", disciplinas: ["Matemática", "Arte"] },
  { id: "7", nome: "Jornalismo", area: "Humanas", icone: "📰", descricao: "Informe, investigue e comunique", disciplinas: ["Português", "História"] },
  { id: "8", nome: "Administração", area: "Humanas", icone: "📊", descricao: "Lidere organizações com estratégia", disciplinas: ["Matemática", "História"] },
];

export const dashboardStats = {
  proximasAtividades: 5,
  mediaGeral: 8.6,
  monitorias: 2,
  conquistas: 12,
};

export const notificacoes = [
  { id: "1", titulo: "Prova amanhã!", mensagem: "Prova de Matemática amanhã às 10h", lida: false, tempo: "2h atrás" },
  { id: "2", titulo: "Novo material", mensagem: "Maria Eduarda compartilhou um resumo de Física", lida: false, tempo: "4h atrás" },
  { id: "3", titulo: "Monitoria confirmada", mensagem: "Sua sessão com João Pedro foi confirmada", lida: true, tempo: "1 dia atrás" },
  { id: "4", titulo: "Conquista desbloqueada!", mensagem: "Você desbloqueou 'Leitor Ávido'", lida: true, tempo: "2 dias atrás" },
];
