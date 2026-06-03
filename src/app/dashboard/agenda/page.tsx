"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Plus,
  MapPin,
  Clock,
  Filter,
} from "lucide-react";
import { eventosAgenda } from "@/lib/mock-data";

export default function AgendaPage() {
  const [selectedDate, setSelectedDate] = useState({ dia: 23, mes: 5, ano: 2024 });
  const [filter, setFilter] = useState<string>("todos");

  const paddingStart = 3;
  const daysInMonth = 31;
  const calendarCells = [];

  for (let i = 0; i < paddingStart; i++) {
    calendarCells.push({ dia: 0, mes: 4 });
  }
  for (let i = 1; i <= daysInMonth; i++) {
    calendarCells.push({ dia: i, mes: 5, ano: 2024 });
  }

  const filteredEvents = eventosAgenda.filter((e) => {
    if (filter !== "todos" && e.tipo !== filter) return false;
    return e.dia === selectedDate.dia && e.mes === selectedDate.mes;
  });

  const getEventBadge = (tipo: string) => {
    switch (tipo) {
      case "prova":
        return "badge-prova";
      case "trabalho":
        return "badge-trabalho";
      case "atividade":
        return "badge-atividade";
      default:
        return "badge-evento";
    }
  };

  const getEventLabel = (tipo: string) => {
    switch (tipo) {
      case "prova":
        return "Prova";
      case "trabalho":
        return "Trabalho";
      case "atividade":
        return "Atividade";
      default:
        return "Evento";
    }
  };

  const hasEventOnDay = (dia: number) => {
    return eventosAgenda.some((e) => e.dia === dia && e.mes === 5);
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
          <h1 className="text-2xl font-bold font-serif text-gray-900">Agenda Inteligente</h1>
          <p className="text-sm text-gray-500">Monitore suas provas, prazos de entrega e compromissos letivos.</p>
        </div>
        <button className="btn btn-primary text-sm flex items-center gap-2 self-start sm:self-auto">
          <Plus className="w-4 h-4" />
          Novo Evento
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="card p-6 lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-gray-900 flex items-center gap-2">
              <CalendarIcon className="w-5 h-5 text-navy" />
              Maio 2024
            </h2>
            <div className="flex gap-1">
              <button className="p-1.5 rounded-lg border border-gray-200 hover:bg-gray-50 text-gray-600 transition-colors">
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button className="p-1.5 rounded-lg border border-gray-200 hover:bg-gray-50 text-gray-600 transition-colors">
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-7 text-center text-xs font-bold text-gray-400 py-2 border-y border-gray-100">
            <div>DOM</div>
            <div>SEG</div>
            <div>TER</div>
            <div>QUA</div>
            <div>QUI</div>
            <div>SEX</div>
            <div>SÁB</div>
          </div>

          <div className="grid grid-cols-7 gap-1 text-center">
            {calendarCells.map((cell, idx) => {
              if (cell.dia === 0) {
                return <div key={`empty-${idx}`} className="aspect-square" />;
              }

              const isSelected =
                selectedDate.dia === cell.dia && selectedDate.mes === cell.mes;
              const hasEvents = hasEventOnDay(cell.dia);

              return (
                <button
                  key={`day-${cell.dia}`}
                  onClick={() => setSelectedDate({ dia: cell.dia, mes: cell.mes, ano: 2024 })}
                  className={`aspect-square flex flex-col items-center justify-center rounded-lg text-sm transition-all relative border border-transparent ${
                    isSelected
                      ? "bg-navy text-white shadow-soft font-bold"
                      : "hover:bg-gray-50 hover:border-gray-200 text-gray-700"
                  }`}
                >
                  <span>{cell.dia}</span>
                  {hasEvents && !isSelected && (
                    <span className="absolute bottom-1 w-1 h-1 rounded-full bg-gold" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        <div className="card p-6 flex flex-col space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-gray-100">
            <div>
              <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider">
                Compromissos
              </p>
              <h3 className="text-base font-bold text-gray-900 font-serif">
                {selectedDate.dia} de Maio
              </h3>
            </div>
            <div className="relative group">
              <button className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50 text-gray-500 transition-colors flex items-center gap-1.5 text-xs font-semibold cursor-pointer">
                <Filter className="w-3.5 h-3.5" />
                Filtrar
              </button>
              <div className="hidden group-hover:block absolute right-0 mt-1 w-40 bg-white border border-gray-200 rounded-lg shadow-elevated py-1 z-10 text-left">
                {["todos", "prova", "trabalho", "atividade", "evento"].map((t) => (
                  <button
                    key={t}
                    onClick={() => setFilter(t)}
                    className={`w-full px-3 py-1.5 text-left text-xs font-medium hover:bg-gray-50 capitalize ${
                      filter === t ? "text-navy font-bold" : "text-gray-600"
                    }`}
                  >
                    {t === "todos" ? "Todos" : getEventLabel(t)}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex-1 space-y-4 overflow-y-auto">
            {filteredEvents.length === 0 ? (
              <div className="text-center py-12 text-sm text-gray-400">
                Nenhum compromisso agendado para este dia.
              </div>
            ) : (
              filteredEvents.map((e, idx) => (
                <div
                  key={e.id}
                  className="p-4 rounded-xl border border-gray-150 hover:border-gray-300 transition-all space-y-2 bg-gray-50/50"
                >
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="text-sm font-bold text-gray-900 leading-tight">
                      {e.titulo}
                    </h4>
                    <span className={`badge ${getEventBadge(e.tipo)}`}>
                      {getEventLabel(e.tipo)}
                    </span>
                  </div>
                  {e.disciplina && (
                    <p className="text-xs font-medium text-navy-institutional">
                      Matéria: {e.disciplina}
                    </p>
                  )}
                  <div className="flex items-center gap-4 text-xs text-gray-400">
                    <div className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {e.horario}
                    </div>
                    {e.local && (
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5" />
                        {e.local}
                      </div>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
