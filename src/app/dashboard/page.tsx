/* eslint-disable react-hooks/purity */
"use client";

import { motion } from "framer-motion";
import {
  CalendarDays,
  TrendingUp,
  Users,
  Trophy,
  BookOpen,
  Clock,
  CheckCircle2,
  ChevronRight,
  Quote,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  proximasAtividades,
  desempenhoBimestral,
  dashboardStats,
  citacoes,
  metasSemanais,
} from "@/lib/mock-data";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" as const } },
};

const statCards = [
  {
    label: "Próximas atividades",
    value: dashboardStats.proximasAtividades,
    sub: "esta semana",
    icon: CalendarDays,
    color: "text-info",
    bgColor: "bg-info-light",
  },
  {
    label: "Média geral",
    value: dashboardStats.mediaGeral.toFixed(1).replace(".", ","),
    sub: "Excelente! 🎉",
    icon: TrendingUp,
    color: "text-success",
    bgColor: "bg-success-light",
  },
  {
    label: "Monitorias",
    value: dashboardStats.monitorias,
    sub: "agendadas",
    icon: Users,
    color: "text-navy-institutional",
    bgColor: "bg-blue-50",
  },
  {
    label: "Conquistas",
    value: dashboardStats.conquistas,
    sub: "desbloqueadas",
    icon: Trophy,
    color: "text-gold-dark",
    bgColor: "bg-amber-50",
  },
];

const tipoBadge: Record<string, string> = {
  prova: "badge-prova",
  trabalho: "badge-trabalho",
  atividade: "badge-atividade",
  evento: "badge-evento",
};

const tipoLabel: Record<string, string> = {
  prova: "Prova",
  trabalho: "Trabalho",
  atividade: "Atividade",
  evento: "Evento",
};

function CustomTooltip({ active, payload, label }: { active?: boolean; payload?: Array<{ value: number }>; label?: string }) {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-gray-200 rounded-lg px-3 py-2 shadow-card">
        <p className="text-xs text-gray-500">{label}</p>
        <p className="text-sm font-semibold text-gray-900">
          {payload[0].value.toFixed(1)}
        </p>
      </div>
    );
  }
  return null;
}

export default function DashboardPage() {

  const citacao = citacoes[Math.floor(Math.random() * citacoes.length)];

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-6"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {statCards.map((stat) => (
          <motion.div
            key={stat.label}
            variants={item}
            whileHover={{ y: -2, transition: { duration: 0.2 } }}
            className="card p-5 cursor-default"
          >
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <p className="text-sm text-gray-500 font-medium">{stat.label}</p>
                <p className="text-3xl font-bold text-gray-900 tracking-tight">
                  {stat.value}
                </p>
                <p className="text-xs text-gray-400">{stat.sub}</p>
              </div>
              <div className={`${stat.bgColor} p-2.5 rounded-xl`}>
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div variants={item} className="card p-6 lg:col-span-1">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900 font-serif">
              Próximas atividades
            </h2>
            <BookOpen className="w-4 h-4 text-gray-400" />
          </div>
          <div className="space-y-3">
            {proximasAtividades.slice(0, 4).map((atividade, i) => (
              <motion.div
                key={atividade.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + i * 0.1 }}
                className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors group cursor-pointer"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-1.5 h-8 rounded-full bg-navy flex-shrink-0" />
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate group-hover:text-navy transition-colors">
                      {atividade.titulo}
                    </p>
                    <p className="text-xs text-gray-400">
                      {atividade.data} • {atividade.horario}
                    </p>
                  </div>
                </div>
                <span className={`badge ${tipoBadge[atividade.tipo]} flex-shrink-0`}>
                  {tipoLabel[atividade.tipo]}
                </span>
              </motion.div>
            ))}
          </div>
          <button className="mt-4 w-full text-center text-sm text-navy font-medium hover:text-navy-institutional transition-colors flex items-center justify-center gap-1">
            Ver todas
            <ChevronRight className="w-4 h-4" />
          </button>
        </motion.div>

        <motion.div variants={item} className="card p-6 lg:col-span-1">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900 font-serif">
              Desempenho
            </h2>
            <select className="text-xs text-gray-500 bg-gray-50 border border-gray-200 rounded-lg px-2 py-1 focus:outline-none focus:ring-1 focus:ring-gold">
              <option>Este bimestre</option>
              <option>Último bimestre</option>
              <option>Ano letivo</option>
            </select>
          </div>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={desempenhoBimestral}>
                <defs>
                  <linearGradient id="colorNota" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0B1F3A" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="#0B1F3A" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis
                  dataKey="mes"
                  tick={{ fontSize: 12, fill: "#9CA3AF" }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  domain={[0, 10]}
                  tick={{ fontSize: 12, fill: "#9CA3AF" }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey="nota"
                  stroke="#0B1F3A"
                  strokeWidth={2.5}
                  fill="url(#colorNota)"
                  dot={{ r: 4, fill: "#0B1F3A", strokeWidth: 2, stroke: "#fff" }}
                  activeDot={{
                    r: 6,
                    fill: "#D4AF37",
                    stroke: "#0B1F3A",
                    strokeWidth: 2,
                  }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <button className="mt-4 w-full text-center text-sm text-navy font-medium hover:text-navy-institutional transition-colors flex items-center justify-center gap-1">
            Ver relatório completo
            <ChevronRight className="w-4 h-4" />
          </button>
        </motion.div>

        <motion.div
          variants={item}
          className="rounded-xl p-6 lg:col-span-1 bg-navy text-white relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-gold/10 rounded-full translate-y-1/2 -translate-x-1/2" />
          <div className="relative z-10">
            <h2 className="text-lg font-semibold font-serif mb-4">
              Foco de hoje
            </h2>
            <div className="mb-6">
              <Quote className="w-5 h-5 text-gold mb-2" />
              <p className="text-white/90 italic text-sm leading-relaxed">
                &ldquo;{citacao.texto}&rdquo;
              </p>
              <p className="text-gold text-xs mt-2 font-medium">
                — {citacao.autor}
              </p>
            </div>

            <div className="space-y-2 border-t border-white/10 pt-4">
              <p className="text-xs text-white/50 uppercase tracking-wide font-medium">
                Metas do dia
              </p>
              {metasSemanais.slice(0, 3).map((meta) => (
                <div key={meta.id} className="flex items-center gap-2">
                  <CheckCircle2
                    className={`w-4 h-4 flex-shrink-0 ${
                      meta.concluida ? "text-gold" : "text-white/30"
                    }`}
                  />
                  <span
                    className={`text-sm ${
                      meta.concluida
                        ? "text-white/50 line-through"
                        : "text-white/80"
                    }`}
                  >
                    {meta.titulo}
                  </span>
                  <span className="text-xs text-white/30 ml-auto">
                    {meta.horasEstudo}h
                  </span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div variants={item} className="card p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900 font-serif">
              Plano de Estudos
            </h2>
            <Clock className="w-4 h-4 text-gray-400" />
          </div>
          <div className="flex items-center gap-6 mb-4">
            <div>
              <p className="text-xs text-gray-500 mb-1">Meta semanal</p>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-bold text-gray-900">12</span>
                <span className="text-sm text-gray-400">/ 15 horas</span>
              </div>
            </div>
            <div className="flex-1">
              <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "80%" }}
                  transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
                  className="h-full rounded-full"
                  style={{
                    background:
                      "linear-gradient(90deg, #0B1F3A 0%, #163B6D 50%, #D4AF37 100%)",
                  }}
                />
              </div>
              <p className="text-xs text-gray-400 mt-1">80% concluído</p>
            </div>
          </div>
          <div className="space-y-2">
            {metasSemanais.map((meta) => (
              <div
                key={meta.id}
                className="flex items-center justify-between p-2.5 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <CheckCircle2
                    className={`w-4.5 h-4.5 ${
                      meta.concluida ? "text-success" : "text-gray-300"
                    }`}
                  />
                  <span
                    className={`text-sm ${
                      meta.concluida
                        ? "text-gray-400 line-through"
                        : "text-gray-700"
                    }`}
                  >
                    {meta.titulo}
                  </span>
                </div>
                <span className="text-xs text-gray-400">
                  {meta.horasEstudo}h / {meta.horasMeta}h
                </span>
              </div>
            ))}
          </div>
          <button className="mt-4 w-full text-center text-sm text-navy font-medium hover:text-navy-institutional transition-colors flex items-center justify-center gap-1">
            Ver plano completo
            <ChevronRight className="w-4 h-4" />
          </button>
        </motion.div>

        <motion.div variants={item} className="card p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900 font-serif">
              Monitoria
            </h2>
            <div className="flex gap-2">
              <button className="text-xs px-3 py-1.5 bg-navy text-white rounded-lg font-medium hover:bg-navy-institutional transition-colors">
                Solicitar
              </button>
              <button className="text-xs px-3 py-1.5 bg-gray-100 text-gray-600 rounded-lg font-medium hover:bg-gray-200 transition-colors">
                Minhas monitorias
              </button>
            </div>
          </div>
          <div className="space-y-3">
            {[
              {
                nome: "Maria Eduarda",
                disciplina: "Matemática",
                avaliacao: 4.9,
                initials: "ME",
                color: "bg-blue-100 text-blue-700",
              },
              {
                nome: "João Pedro",
                disciplina: "Física",
                avaliacao: 4.8,
                initials: "JP",
                color: "bg-purple-100 text-purple-700",
              },
              {
                nome: "Isabela Costa",
                disciplina: "Química",
                avaliacao: 4.9,
                initials: "IC",
                color: "bg-pink-100 text-pink-700",
              },
              {
                nome: "Carolina Santos",
                disciplina: "Português",
                avaliacao: 5.0,
                initials: "CS",
                color: "bg-emerald-100 text-emerald-700",
              },
            ].map((monitor, i) => (
              <motion.div
                key={monitor.nome}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + i * 0.1 }}
                className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer group"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-9 h-9 rounded-full ${monitor.color} flex items-center justify-center text-xs font-bold`}
                  >
                    {monitor.initials}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900 group-hover:text-navy transition-colors">
                      {monitor.nome}
                    </p>
                    <p className="text-xs text-gray-400">
                      {monitor.disciplina}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-yellow-400 text-sm">★</span>
                  <span className="text-sm font-medium text-gray-700">
                    {monitor.avaliacao}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
          <button className="mt-4 w-full text-center text-sm text-navy font-medium hover:text-navy-institutional transition-colors flex items-center justify-center gap-1">
            Ver todos os monitores
            <ChevronRight className="w-4 h-4" />
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
}
