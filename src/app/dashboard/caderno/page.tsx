"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Share2, Edit3, Save } from "lucide-react";
import { notasCaderno as initialNotes } from "@/lib/mock-data";

export default function CadernoPage() {
  const [notes, setNotes] = useState(initialNotes);
  const [selectedNote, setSelectedNote] = useState(initialNotes[0]);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(selectedNote.titulo);
  const [editedContent, setEditedContent] = useState(selectedNote.conteudo);

  const handleSelectNote = (note: typeof initialNotes[0]) => {
    setSelectedNote(note);
    setEditedTitle(note.titulo);
    setEditedContent(note.conteudo);
    setIsEditing(false);
  };

  const handleSave = () => {
    const updatedNotes = notes.map((n) => {
      if (n.id === selectedNote.id) {
        return {
          ...n,
          titulo: editedTitle,
          conteudo: editedContent,
        };
      }
      return n;
    });
    setNotes(updatedNotes);
    setSelectedNote({
      ...selectedNote,
      titulo: editedTitle,
      conteudo: editedContent,
    });
    setIsEditing(false);
  };

  const handleCreateNote = () => {
    const newNote = {
      id: Math.random().toString(),
      disciplina: "Matemática",
      titulo: "Nova Anotação",
      conteudo: "Comece a digitar aqui...",
      data: new Date().toLocaleDateString("pt-BR"),
      compartilhada: false,
    };
    setNotes([newNote, ...notes]);
    handleSelectNote(newNote);
    setIsEditing(true);
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
          <h1 className="text-2xl font-bold font-serif text-gray-900">Caderno Colaborativo</h1>
          <p className="text-sm text-gray-500">
            Guarde suas anotações de aulas e compartilhe com seu grupo de estudos.
          </p>
        </div>

        <button
          onClick={handleCreateNote}
          className="btn btn-primary text-sm flex items-center gap-2 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          Nova Anotação
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="card p-4 lg:col-span-4 space-y-4">
          <h2 className="text-sm font-bold text-gray-900 font-serif border-b border-gray-100 pb-2">
            Minhas Notas
          </h2>

          <div className="space-y-2 max-h-[450px] overflow-y-auto pr-1">
            {notes.map((note) => (
              <div
                key={note.id}
                onClick={() => handleSelectNote(note)}
                className={`p-3 rounded-lg border text-left cursor-pointer transition-all ${
                  selectedNote.id === note.id
                    ? "bg-navy/5 border-navy"
                    : "bg-white border-gray-150 hover:bg-gray-50"
                }`}
              >
                <div className="flex justify-between items-center mb-1">
                  <span className="text-[10px] bg-blue-50 text-blue-700 px-1.5 py-0.5 rounded font-bold">
                    {note.disciplina}
                  </span>
                  <span className="text-[10px] text-gray-400 font-medium">{note.data}</span>
                </div>
                <h3 className="text-sm font-bold text-gray-900 truncate">{note.titulo}</h3>
                <p className="text-xs text-gray-500 line-clamp-1 mt-1">{note.conteudo}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="card p-6 lg:col-span-8 space-y-6">
          <div className="flex items-center justify-between border-b border-gray-100 pb-4">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2 py-1 rounded">
                {selectedNote.disciplina}
              </span>
              <span className="text-xs text-gray-400 font-medium">Anotado em {selectedNote.data}</span>
            </div>

            <div className="flex gap-2">
              {isEditing ? (
                <button
                  onClick={handleSave}
                  className="btn btn-primary text-xs flex items-center gap-1.5 px-3 py-1.5"
                >
                  <Save className="w-3.5 h-3.5" />
                  Salvar
                </button>
              ) : (
                <button
                  onClick={() => setIsEditing(true)}
                  className="btn btn-secondary text-xs flex items-center gap-1.5 px-3 py-1.5"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  Editar
                </button>
              )}
              <button
                title="Compartilhar nota"
                className="p-2 text-gray-400 hover:text-navy hover:bg-gray-100 border border-gray-200 rounded-lg transition-colors"
              >
                <Share2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="space-y-4">
            {isEditing ? (
              <input
                type="text"
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
                className="w-full text-xl font-bold font-serif text-gray-900 border-b border-gray-200 pb-2 focus:outline-none focus:border-navy"
              />
            ) : (
              <h2 className="text-xl font-bold font-serif text-gray-900">
                {selectedNote.titulo}
              </h2>
            )}

            {isEditing ? (
              <textarea
                value={editedContent}
                onChange={(e) => setEditedContent(e.target.value)}
                rows={12}
                className="w-full text-sm text-gray-700 p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-navy leading-relaxed"
              />
            ) : (
              <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">
                {selectedNote.conteudo}
              </p>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
