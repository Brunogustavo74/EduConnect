"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Download, Share2, Upload } from "lucide-react";
import { materiais } from "@/lib/mock-data";

export default function ResumosPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("todos");

  const filteredMaterials = materiais.filter((m) => {
    const matchesSearch =
      m.titulo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.disciplina.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.autor.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === "todos" || m.tipo === selectedType;
    return matchesSearch && matchesType;
  });

  const getTypeBadge = (type: string) => {
    switch (type) {
      case "pdf":
        return "bg-red-50 text-red-700 border-red-100";
      case "resumo":
        return "bg-blue-50 text-blue-700 border-blue-100";
      case "flashcard":
        return "bg-yellow-50 text-yellow-700 border-yellow-100";
      default:
        return "bg-green-50 text-green-700 border-green-100";
    }
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
          <h1 className="text-2xl font-bold font-serif text-gray-900">Biblioteca de Materiais</h1>
          <p className="text-sm text-gray-500">
            Acesse e compartilhe resumos, PDFs e flashcards criados por alunos e professores.
          </p>
        </div>

        <button className="btn btn-primary text-sm flex items-center gap-2 self-start sm:self-auto">
          <Upload className="w-4 h-4" />
          Upload de Material
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:max-w-md">
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar títulos, matérias ou autores..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full text-sm pl-9 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-navy"
          />
        </div>

        <div className="flex gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
          {["todos", "pdf", "resumo", "flashcard"].map((t) => (
            <button
              key={t}
              onClick={() => setSelectedType(t)}
              className={`text-xs px-3.5 py-2 rounded-lg font-bold border transition-all capitalize whitespace-nowrap cursor-pointer ${
                selectedType === t
                  ? "bg-navy text-white border-navy"
                  : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50"
              }`}
            >
              {t === "todos" ? "Todos" : t}s
            </button>
          ))}
        </div>
      </div>

      {filteredMaterials.length === 0 ? (
        <div className="card p-12 text-center text-sm text-gray-400">
          Nenhum material encontrado com os termos de busca selecionados.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {filteredMaterials.map((m) => (
            <div
              key={m.id}
              className="card p-5 flex flex-col justify-between h-48 hover:shadow-md transition-shadow group"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span
                    className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full border ${getTypeBadge(
                      m.tipo
                    )}`}
                  >
                    {m.tipo}
                  </span>
                  <span className="text-[10px] text-gray-400 font-medium">{m.data}</span>
                </div>

                <div>
                  <h3 className="text-sm font-bold text-gray-900 font-serif leading-snug line-clamp-2 group-hover:text-navy transition-colors">
                    {m.titulo}
                  </h3>
                  <p className="text-xs text-navy-institutional font-medium mt-1">
                    {m.disciplina}
                  </p>
                </div>
              </div>

              <div className="border-t border-gray-100 pt-3 flex items-center justify-between">
                <div>
                  <p className="text-[9px] text-gray-400 uppercase font-semibold">Autor</p>
                  <p className="text-xs font-bold text-gray-700">{m.autor}</p>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    title="Compartilhar"
                    className="p-1.5 text-gray-400 hover:text-navy hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
                  >
                    <Share2 className="w-4 h-4" />
                  </button>
                  <button className="btn btn-secondary p-2 text-navy flex items-center justify-center cursor-pointer">
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
}
