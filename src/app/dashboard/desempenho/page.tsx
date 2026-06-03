"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { BookOpen } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts";
import { disciplinas } from "@/lib/mock-data";

export default function DesempenhoPage() {
  const [selectedSubject, setSelectedSubject] = useState(disciplinas[0]);

  const subjectGradesData = selectedSubject.notas.map((grade, index) => ({
    name: `Av. ${index + 1}`,
    Nota: grade,
  }));

  const radarData = disciplinas.map((d) => ({
    subject: d.nome.substring(0, 5) + ".",
    Média: d.media,
    fullMark: 10,
  }));

  const getMediaColor = (media: number) => {
    if (media >= 8.5) return "text-success bg-success-light";
    if (media >= 7.0) return "text-warning bg-warning-light";
    return "text-error bg-error-light";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      <div>
        <h1 className="text-2xl font-bold font-serif text-gray-900">Análise de Desempenho</h1>
        <p className="text-sm text-gray-500">
          Acompanhe suas notas, médias bimestrais e evolução nas disciplinas.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="card p-6 lg:col-span-1 space-y-4">
          <div>
            <h2 className="text-base font-bold text-gray-900 font-serif">Visão Geral das Matérias</h2>
            <p className="text-xs text-gray-400">Médias atuais comparadas em teia</p>
          </div>
          <div className="h-64 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                <PolarGrid stroke="#E5E7EB" />
                <PolarAngleAxis dataKey="subject" tick={{ fontSize: 10, fill: "#6B7280" }} />
                <PolarRadiusAxis angle={30} domain={[0, 10]} tick={{ fontSize: 8 }} />
                <Radar
                  name="Média"
                  dataKey="Média"
                  stroke="#163B6D"
                  fill="#163B6D"
                  fillOpacity={0.2}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card p-6 lg:col-span-2 space-y-4">
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2">
            <div>
              <h2 className="text-base font-bold text-gray-900 font-serif">
                Notas de {selectedSubject.nome}
              </h2>
              <p className="text-xs text-gray-400">Evolução nas avaliações deste bimestre</p>
            </div>
            <select
              value={selectedSubject.id}
              onChange={(e) => {
                const sub = disciplinas.find((d) => d.id === e.target.value);
                if (sub) setSelectedSubject(sub);
              }}
              className="text-xs text-gray-600 bg-gray-50 border border-gray-200 rounded-lg px-2 py-1.5 focus:outline-none focus:ring-1 focus:ring-gold"
            >
              {disciplinas.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.nome}
                </option>
              ))}
            </select>
          </div>

          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={subjectGradesData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
                <XAxis dataKey="name" tick={{ fontSize: 11, fill: "#9CA3AF" }} />
                <YAxis domain={[0, 10]} tick={{ fontSize: 11, fill: "#9CA3AF" }} />
                <Tooltip />
                <Bar
                  dataKey="Nota"
                  fill="#0B1F3A"
                  radius={[4, 4, 0, 0]}
                  maxBarSize={50}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-base font-bold text-gray-900 font-serif">Médias por Disciplina</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {disciplinas.map((sub) => (
            <div
              key={sub.id}
              onClick={() => setSelectedSubject(sub)}
              className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between h-32 ${
                selectedSubject.id === sub.id
                  ? "border-navy bg-navy/5 shadow-soft"
                  : "border-gray-200 bg-white hover:border-gray-300"
              }`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="text-sm font-bold text-gray-900">{sub.nome}</h4>
                  <p className="text-[10px] text-gray-400 font-medium">{sub.professor}</p>
                </div>
                <BookOpen className="w-4 h-4 text-gray-300" />
              </div>

              <div className="flex items-end justify-between">
                <div>
                  <p className="text-[10px] text-gray-400">Avaliações</p>
                  <div className="flex gap-1 mt-1">
                    {sub.notas.map((n, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] font-bold px-1.5 py-0.5 bg-gray-100 rounded text-gray-600"
                      >
                        {n}
                      </span>
                    ))}
                  </div>
                </div>

                <div className={`badge ${getMediaColor(sub.media)} px-2.5 py-1 text-xs font-bold`}>
                  Média: {sub.media.toFixed(1).replace(".", ",")}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
