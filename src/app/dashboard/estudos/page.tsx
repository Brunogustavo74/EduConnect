"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Circle, Clock, Flame, Plus } from "lucide-react";
import { metasSemanais as initialMetas } from "@/lib/mock-data";

export default function EstudosPage() {
  const [metas, setMetas] = useState(initialMetas);
  const [newMetaTitle, setNewMetaTitle] = useState("");

  const toggleMeta = (id: string) => {
    setMetas(
      metas.map((m) => {
        if (m.id === id) {
          const isDone = !m.concluida;
          return {
            ...m,
            concluida: isDone,
            horasEstudo: isDone ? m.horasMeta : m.horasEstudo,
          };
        }
        return m;
      })
    );
  };

  const totalMetaHours = metas.reduce((acc, m) => acc + m.horasMeta, 0);
  const currentEstudoHours = metas.reduce((acc, m) => acc + m.horasEstudo, 0);
  const progressPercent = Math.min(
    100,
    Math.round((currentEstudoHours / totalMetaHours) * 100)
  );

  const addMeta = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMetaTitle.trim()) return;
    const newMeta = {
      id: Math.random().toString(),
      titulo: newMetaTitle,
      concluida: false,
      horasEstudo: 0,
      horasMeta: 2,
    };
    setMetas([...metas, newMeta]);
    setNewMetaTitle("");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-serif text-gray-900">Plano de Estudos</h1>
          <p className="text-sm text-gray-500">
            Defina metas de estudo semanais e monitore seu progresso diário.
          </p>
        </div>
      </div>

      <div className="card p-6 grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
        <div className="space-y-2 md:col-span-2">
          <h2 className="text-lg font-bold text-gray-900 font-serif">Meta de Estudo Semanal</h2>
          <p className="text-sm text-gray-500">
            Você acumulou <span className="font-bold text-navy">{currentEstudoHours}h</span> de estudo nesta semana. A sua meta total é de <span className="font-bold text-navy">{totalMetaHours}h</span>.
          </p>
          <div className="pt-2">
            <div className="h-4 bg-gray-100 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progressPercent}%` }}
                transition={{ duration: 0.8 }}
                className="h-full bg-navy rounded-full"
                style={{
                  background:
                    "linear-gradient(90deg, #0B1F3A 0%, #163B6D 50%, #D4AF37 100%)",
                }}
              />
            </div>
            <p className="text-xs text-gray-400 mt-1.5 font-medium">{progressPercent}% Concluído</p>
          </div>
        </div>

        <div className="bg-amber-50 border border-amber-100 rounded-xl p-5 flex items-center gap-4 text-amber-800">
          <div className="bg-amber-500 text-white p-3 rounded-xl">
            <Flame className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-amber-600 font-semibold uppercase tracking-wider">
              Ofensiva de Estudos
            </p>
            <h3 className="text-xl font-bold text-amber-900">5 dias seguidos!</h3>
            <p className="text-xs text-amber-700">Mantenha o ritmo de estudo.</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="card p-6 lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between border-b border-gray-100 pb-3">
            <h3 className="text-base font-bold text-gray-900 font-serif">Objetivos de Aprendizado</h3>
            <span className="text-xs text-gray-400 font-medium">Marque ao concluir</span>
          </div>

          <div className="space-y-3">
            {metas.map((meta) => (
              <div
                key={meta.id}
                onClick={() => toggleMeta(meta.id)}
                className={`p-4 rounded-xl border flex items-center justify-between transition-all cursor-pointer ${
                  meta.concluida
                    ? "bg-gray-50 border-gray-200 text-gray-400"
                    : "bg-white border-gray-200 hover:border-gray-300 text-gray-700"
                }`}
              >
                <div className="flex items-center gap-3">
                  {meta.concluida ? (
                    <CheckCircle2 className="w-5 h-5 text-success" />
                  ) : (
                    <Circle className="w-5 h-5 text-gray-300" />
                  )}
                  <span className={`text-sm font-medium ${meta.concluida ? "line-through" : ""}`}>
                    {meta.titulo}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <Clock className="w-4 h-4 text-gray-400" />
                  <span>
                    {meta.horasEstudo}h / {meta.horasMeta}h
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card p-6 flex flex-col justify-between space-y-4 h-fit">
          <div>
            <h3 className="text-base font-bold text-gray-900 font-serif mb-2">Novo Objetivo</h3>
            <p className="text-xs text-gray-400">
              Adicione tópicos de matérias e o tempo estimado de estudo que planeja dedicar nesta semana.
            </p>
          </div>

          <form onSubmit={addMeta} className="space-y-4">
            <div>
              <label className="text-xs text-gray-500 font-medium block mb-1">Título da Meta</label>
              <input
                type="text"
                placeholder="Ex: Resolver 20 questões de Física"
                value={newMetaTitle}
                onChange={(e) => setNewMetaTitle(e.target.value)}
                className="w-full text-sm px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-navy"
              />
            </div>

            <button type="submit" className="btn btn-primary w-full text-xs flex justify-center gap-2">
              <Plus className="w-4 h-4" />
              Adicionar Meta
            </button>
          </form>
        </div>
      </div>
    </motion.div>
  );
}
