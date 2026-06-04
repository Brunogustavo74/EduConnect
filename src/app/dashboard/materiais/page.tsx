"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  FolderOpen,
  Plus,
  Download,
  Trash,
  FileText,
  Video,
  Layers,
  Sparkles,
  Search,
  Filter,
} from "lucide-react";
import { useMateriais } from "@/hooks/useMateriais";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/contexts/ToastContext";
import Modal from "@/components/ui/Modal";
import ConfirmDialog from "@/components/ui/ConfirmDialog";
import EmptyState from "@/components/ui/EmptyState";
import Skeleton from "@/components/ui/Skeleton";
import type { Material } from "@/types";

const iconMap = {
  pdf: FileText,
  resumo: FileText,
  flashcard: Layers,
  video: Video,
};

const badgeColors = {
  pdf: "bg-red-50 text-red-700 border-red-200",
  resumo: "bg-purple-50 text-purple-700 border-purple-200",
  flashcard: "bg-amber-50 text-amber-700 border-amber-200",
  video: "bg-blue-50 text-blue-700 border-blue-200",
};

const disciplines = [
  "Matemática",
  "Português",
  "História",
  "Biologia",
  "Física",
  "Química",
  "Geografia",
  "Inglês",
  "Filosofia",
  "Sociologia",
  "Artes",
];

export default function MateriaisPage() {
  const { user } = useAuth();
  const { addToast } = useToast();
  const { materiais, loading, error, addMaterial, removeMaterial } = useMateriais();

  const [busca, setBusca] = useState("");
  const [disciplinaFiltro, setDisciplinaFiltro] = useState("Todas");
  const [tipoFiltro, setTipoFiltro] = useState("Todos");

  // Estados dos Modais
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // Campos do Formulário
  const [novoTitulo, setNovoTitulo] = useState("");
  const [novaDisciplina, setNovaDisciplina] = useState("Matemática");
  const [novoTipo, setNovoTipo] = useState<Material["tipo"]>("pdf");
  const [novoAutor, setNovoAutor] = useState(user?.nome || "Estudante");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Filtragem dos materiais
  const materiaisFiltrados = materiais.filter((m) => {
    const bateBusca = m.titulo.toLowerCase().includes(busca.toLowerCase()) ||
                     m.autor.toLowerCase().includes(busca.toLowerCase());
    const bateDisciplina = disciplinaFiltro === "Todas" || m.disciplina === disciplinaFiltro;
    const bateTipo = tipoFiltro === "Todos" || m.tipo === tipoFiltro;
    return bateBusca && bateDisciplina && bateTipo;
  });

  const handleDownload = (material: Material) => {
    // Simula download
    addToast({
      type: "success",
      title: "Download Iniciado!",
      message: `Baixando "${material.titulo}" de ${material.autor}...`,
    });
    // Incrementa downloads localmente (apenas para efeito visual, já que o mock é dinâmico em memória)
    material.downloads += 1;
  };

  const handleConfirmDelete = async () => {
    if (!deletingId) return;
    try {
      await removeMaterial(deletingId);
      addToast({
        type: "success",
        title: "Material removido",
        message: "O material foi excluído permanentemente da sua biblioteca.",
      });
    } catch (err) {
      addToast({
        type: "error",
        title: "Erro ao excluir",
        message: err instanceof Error ? err.message : "Não foi possível remover o material.",
      });
    } finally {
      setDeletingId(null);
    }
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!novoTitulo.trim()) return;

    setIsSubmitting(true);
    try {
      await addMaterial({
        titulo: novoTitulo,
        disciplina: novaDisciplina,
        tipo: novoTipo,
        autor: novoAutor,
      });

      addToast({
        type: "success",
        title: "Material adicionado!",
        message: `"${novoTitulo}" já está disponível para estudo.`,
      });

      // Reseta e fecha modal
      setNovoTitulo("");
      setIsUploadOpen(false);
    } catch (err) {
      addToast({
        type: "error",
        title: "Erro ao adicionar",
        message: err instanceof Error ? err.message : "Não foi possível cadastrar o material.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-serif text-gray-900">Biblioteca de Materiais</h1>
          <p className="text-sm text-gray-500">
            Acesse e compartilhe resumos, flashcards, videoaulas e PDFs recomendados.
          </p>
        </div>

        <button
          onClick={() => {
            setNovoAutor(user?.nome || "Estudante");
            setIsUploadOpen(true);
          }}
          className="btn btn-primary text-sm flex items-center gap-2 self-start sm:self-auto shadow-md"
        >
          <Plus className="w-4 h-4" />
          Compartilhar Material
        </button>
      </div>

      {/* Filtros e Busca */}
      <div className="card p-4 grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
        <div className="relative md:col-span-2">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar por título ou autor..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-gold focus:bg-white transition-all"
          />
        </div>

        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-gray-400 shrink-0" />
          <select
            value={disciplinaFiltro}
            onChange={(e) => setDisciplinaFiltro(e.target.value)}
            className="w-full py-2 px-3 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-gold focus:bg-white cursor-pointer"
          >
            <option value="Todas">Todas as matérias</option>
            {disciplines.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        </div>

        <select
          value={tipoFiltro}
          onChange={(e) => setTipoFiltro(e.target.value)}
          className="w-full py-2 px-3 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-gold focus:bg-white cursor-pointer"
        >
          <option value="Todos">Todos os tipos</option>
          <option value="pdf">PDFs</option>
          <option value="resumo">Resumos</option>
          <option value="flashcard">Flashcards</option>
          <option value="video">Vídeos</option>
        </select>
      </div>

      {/* Grid de Materiais */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div key={i} className="card p-5 space-y-3">
              <Skeleton variant="rectangular" height={10} className="w-1/3 !rounded-full" />
              <Skeleton variant="text" width="90%" height={20} />
              <div className="flex justify-between items-center pt-2">
                <Skeleton variant="text" width="60%" height={12} />
                <Skeleton variant="circular" width={28} height={28} />
              </div>
            </div>
          ))}
        </div>
      ) : error ? (
        <div className="card p-8 text-center text-error">
          <p className="font-bold">Ocorreu um erro ao carregar os materiais.</p>
          <p className="text-xs mt-1 text-gray-500">{error.message}</p>
        </div>
      ) : materiaisFiltrados.length === 0 ? (
        <EmptyState
          icon={FolderOpen}
          title="Nenhum material encontrado"
          description="Tente ajustar os filtros de busca ou filtre por outra matéria."
          action={
            <button
              onClick={() => {
                setBusca("");
                setDisciplinaFiltro("Todas");
                setTipoFiltro("Todos");
              }}
              className="btn bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs px-4 py-2 rounded-lg font-medium transition-colors cursor-pointer"
            >
              Limpar Filtros
            </button>
          }
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {materiaisFiltrados.map((material) => {
            const Icon = iconMap[material.tipo] || FileText;
            const badgeColor = badgeColors[material.tipo] || "bg-gray-50 text-gray-700";

            return (
              <motion.div
                key={material.id}
                layout
                whileHover={{ y: -3, transition: { duration: 0.2 } }}
                className="card p-5 flex flex-col justify-between hover:shadow-md transition-shadow group"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                      {material.disciplina}
                    </span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${badgeColor} uppercase`}>
                      {material.tipo}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-gray-900 line-clamp-2 leading-snug group-hover:text-navy transition-colors mb-2">
                    {material.titulo}
                  </h3>
                </div>

                <div className="pt-4 border-t border-gray-50 mt-4 flex items-center justify-between">
                  <div className="min-w-0">
                    <p className="text-xs text-gray-500 font-medium truncate">Por {material.autor}</p>
                    <p className="text-[10px] text-gray-400 mt-0.5">{material.data}</p>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleDownload(material)}
                      className="p-2 text-gray-400 hover:text-navy hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
                      title="Baixar material"
                    >
                      <Download className="w-4.5 h-4.5" />
                    </button>
                    {user?.nome === material.autor && (
                      <button
                        onClick={() => setDeletingId(material.id)}
                        className="p-2 text-gray-400 hover:text-error hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
                        title="Deletar material"
                      >
                        <Trash className="w-4.5 h-4.5" />
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* Modal de Envio */}
      <Modal
        isOpen={isUploadOpen}
        onClose={() => setIsUploadOpen(false)}
        title="Compartilhar Novo Material"
      >
        <form onSubmit={handleCreate} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-600 uppercase tracking-wide">
              Título do Material
            </label>
            <input
              type="text"
              required
              placeholder="Ex: Resumo de Genética Mendeliana"
              value={novoTitulo}
              onChange={(e) => setNovoTitulo(e.target.value)}
              className="w-full px-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-gold focus:bg-white transition-all"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-600 uppercase tracking-wide">
                Disciplina
              </label>
              <select
                value={novaDisciplina}
                onChange={(e) => setNovaDisciplina(e.target.value)}
                className="w-full py-2 px-3 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-gold focus:bg-white cursor-pointer"
              >
                {disciplines.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-600 uppercase tracking-wide">
                Formato
              </label>
              <select
                value={novoTipo}
                onChange={(e) => setNovoTipo(e.target.value as Material["tipo"])}
                className="w-full py-2 px-3 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-gold focus:bg-white cursor-pointer"
              >
                <option value="pdf">PDF</option>
                <option value="resumo">Resumo</option>
                <option value="flashcard">Flashcards</option>
                <option value="video">Vídeo</option>
              </select>
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-600 uppercase tracking-wide">
              Autor
            </label>
            <input
              type="text"
              required
              value={novoAutor}
              onChange={(e) => setNovoAutor(e.target.value)}
              className="w-full px-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-gold focus:bg-white transition-all"
            />
          </div>

          <div className="flex gap-3 justify-end pt-4 border-t border-gray-100">
            <button
              type="button"
              onClick={() => setIsUploadOpen(false)}
              className="px-4 py-2 text-xs font-semibold text-gray-500 hover:text-gray-700 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn btn-primary text-xs px-5 py-2 shadow-sm flex items-center gap-1.5"
            >
              {isSubmitting ? (
                <>
                  <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Salvando...
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5" />
                  Publicar Material
                </>
              )}
            </button>
          </div>
        </form>
      </Modal>

      {/* Confirm Deletion */}
      <ConfirmDialog
        isOpen={deletingId !== null}
        onClose={() => setDeletingId(null)}
        onConfirm={handleConfirmDelete}
        title="Excluir Material?"
        message="Tem certeza que deseja remover este material? Esta ação não pode ser desfeita."
        confirmText="Excluir Permanentemente"
        cancelText="Voltar"
        variant="danger"
      />
    </motion.div>
  );
}
