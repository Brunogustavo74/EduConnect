"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Download,
  Share2,
  Upload,
  Heart,
  Eye,
  BookOpen,
  Plus,
  Sparkles,
  ExternalLink,
} from "lucide-react";
import { useMateriais } from "@/hooks/useMateriais";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/contexts/ToastContext";
import Modal from "@/components/ui/Modal";
import EmptyState from "@/components/ui/EmptyState";
import Skeleton from "@/components/ui/Skeleton";
import type { Material } from "@/types";

const getTypeBadge = (type: string) => {
  switch (type) {
    case "pdf":
      return "bg-red-50 text-red-700 border-red-200";
    case "resumo":
      return "bg-blue-50 text-blue-700 border-blue-200";
    case "flashcard":
      return "bg-amber-50 text-amber-700 border-amber-200";
    case "video":
      return "bg-emerald-50 text-emerald-700 border-emerald-200";
    default:
      return "bg-green-50 text-green-700 border-green-200";
  }
};

const mockPreviews: Record<string, string> = {
  "Resumo - Funções Quadráticas": "Uma função quadrática é uma função polinomial do segundo grau, representada pela fórmula f(x) = ax² + bx + c, onde a, b e c são constantes reais e a ≠ 0. O gráfico de uma função quadrática é sempre uma parábola. Se a > 0, a concavidade é voltada para cima, apresentando um ponto de mínimo. Se a < 0, a concavidade é voltada para baixo, apresentando um ponto de máximo. O vértice da parábola pode ser calculado pelas fórmulas Xv = -b/2a e Yv = -Δ/4a, onde Δ = b² - 4ac. As raízes ou zeros da função são os valores de x para os quais f(x) = 0, obtidos pela conhecida fórmula de Bhaskara: x = (-b ± √Δ) / 2a. O número de raízes depende do valor de delta (Δ): se Δ > 0, há duas raízes reais distintas; se Δ = 0, há uma única raiz real dupla; se Δ < 0, não existem raízes reais.",
  "Flashcards - Tabela Periódica": "Conjunto de cartões de memorização para os principais elementos químicos e suas propriedades. \n\n1. Qual é o elemento mais eletronegativo? Flúor (F).\n2. Qual é a família do elemento Sódio (Na)? Metais Alcalinos (Família 1A).\n3. O que são gases nobres? Elementos da família 18 que possuem a camada de valência completa (estabilidade eletrônica).\n4. O que indica o número atômico (Z)? A quantidade de prótons no núcleo do átomo.\n5. Qual é o único metal líquido em temperatura ambiente? Mercúrio (Hg).",
  "PDF - Revolução Francesa": "A Revolução Francesa (1789-1799) foi um período de intensa agitação política e social na França, que marcou o fim do absolutismo e o início da Idade Contemporânea. As principais causas incluem a crise financeira do Estado francês, a desigualdade tributária entre as ordens sociais (Primeiro Estado/Clero, Segundo Estado/Nobreza e Terceiro Estado/Povo), e a difusão das ideias iluministas de liberdade e igualdade. A Queda da Bastilha, em 14 de julho de 1789, simboliza o início da insurreição popular. A Declaração dos Direitos do Homem e do Cidadão estabeleceu a igualdade perante a lei. O período do Terror, sob liderança de Robespierre, guilhotinou milhares de opositores. O processo culminou no golpe do 18 de Brumário, quando Napoleão Bonaparte assumiu o poder.",
  "Resumo - Leis de Newton": "As Leis de Newton constituem a base da mecânica clássica na física:\n\n1. Primeira Lei (Inércia): Um corpo em repouso tende a permanecer em repouso, e um corpo em movimento tende a permanecer em movimento retilíneo uniforme, a menos que uma força externa resultante atue sobre ele.\n2. Segunda Lei (Princípio Fundamental da Dinâmica): A resultante das forças aplicadas sobre um corpo é igual ao produto de sua massa pela sua aceleração (F = m * a).\n3. Terceira Lei (Ação e Reação): Para toda ação, há sempre uma reação oposta e de igual intensidade (F_AB = -F_BA).",
};

export default function ResumosPage() {
  const { user } = useAuth();
  const { addToast } = useToast();
  const { materiais, loading, error, addMaterial } = useMateriais();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("todos");

  // Estado da visualização expandida
  const [activeMaterial, setActiveMaterial] = useState<Material | null>(null);

  // Likes e Visualizações interativas locais
  const [likes, setLikes] = useState<Record<string, number>>({});
  const [likedList, setLikedList] = useState<Record<string, boolean>>({});
  const [views, setViews] = useState<Record<string, number>>({});

  // Modal de Novo Material
  const [isNewOpen, setIsNewOpen] = useState(false);
  const [novoTitulo, setNovoTitulo] = useState("");
  const [novaDisciplina, setNovaDisciplina] = useState("Matemática");
  const [novoTipo, setNovoTipo] = useState<Material["tipo"]>("resumo");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const getLikes = (id: string) => likes[id] ?? Math.floor(parseInt(id || "0") * 3) % 20 + 2;
  const getViews = (id: string) => views[id] ?? Math.floor(parseInt(id || "0") * 15) % 150 + 20;

  const handleLike = (e: React.MouseEvent, id: string) => {
    e.stopPropagation(); // Não abrir o modal
    const isLiked = likedList[id];
    const baseLikes = getLikes(id);

    setLikedList({ ...likedList, [id]: !isLiked });
    setLikes({ ...likes, [id]: isLiked ? baseLikes - 1 : baseLikes + 1 });

    addToast({
      type: isLiked ? "info" : "success",
      title: isLiked ? "Curtida removida" : "Você curtiu este resumo!",
      message: isLiked ? "Que pena que você não gostou mais." : "Obrigado por apoiar os autores da comunidade!",
    });
  };

  const handleOpenPreview = (material: Material) => {
    // Incrementa views
    const currentViews = getViews(material.id);
    setViews({ ...views, [material.id]: currentViews + 1 });
    setActiveMaterial(material);
  };

  const handleShare = (e: React.MouseEvent, material: Material) => {
    e.stopPropagation();
    const mockLink = `https://educonnect.nave.org.br/materiais/${material.id}`;
    navigator.clipboard.writeText(mockLink);
    addToast({
      type: "success",
      title: "Link Copiado!",
      message: "Link de compartilhamento copiado para a área de transferência.",
    });
  };

  const handleDownload = (material: Material) => {
    addToast({
      type: "success",
      title: "Download Iniciado!",
      message: `O arquivo "${material.titulo}" está sendo baixado.`,
    });
    material.downloads += 1;
  };

  const handleCreateMaterial = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!novoTitulo.trim()) return;

    setIsSubmitting(true);
    try {
      await addMaterial({
        titulo: novoTitulo,
        disciplina: novaDisciplina,
        tipo: novoTipo,
        autor: user?.nome || "Estudante",
      });

      addToast({
        type: "success",
        title: "Material Compartilhado!",
        message: `Seu resumo "${novoTitulo}" foi publicado na biblioteca.`,
      });

      setNovoTitulo("");
      setIsNewOpen(false);
    } catch (err) {
      addToast({
        type: "error",
        title: "Erro ao compartilhar",
        message: err instanceof Error ? err.message : "Tente novamente mais tarde.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const filteredMaterials = materiais.filter((m) => {
    const matchesSearch =
      m.titulo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.disciplina.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.autor.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === "todos" || m.tipo === selectedType;
    return matchesSearch && matchesType;
  });

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
            Acesse e compartilhe resumos, PDFs e flashcards criados por alunos e professores.
          </p>
        </div>

        <button
          onClick={() => setIsNewOpen(true)}
          className="btn btn-primary text-sm flex items-center gap-2 self-start sm:self-auto shadow-md"
        >
          <Upload className="w-4 h-4" />
          Upload de Material
        </button>
      </div>

      {/* Busca e Tipo Filtro */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:max-w-md">
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar títulos, matérias ou autores..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full text-sm pl-9 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-gold bg-white"
          />
        </div>

        <div className="flex gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
          {["todos", "pdf", "resumo", "flashcard", "video"].map((t) => (
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

      {/* Grid de Cards */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div key={i} className="card p-5 h-48 space-y-3">
              <Skeleton variant="text" width="40%" height={16} />
              <Skeleton variant="text" width="90%" height={24} />
              <div className="pt-4 border-t border-gray-50 flex items-center justify-between">
                <Skeleton variant="text" width="50%" height={12} />
                <Skeleton variant="circular" width={24} height={24} />
              </div>
            </div>
          ))}
        </div>
      ) : error ? (
        <div className="card p-8 text-center text-error">
          Erro: {error.message}
        </div>
      ) : filteredMaterials.length === 0 ? (
        <EmptyState
          icon={BookOpen}
          title="Nenhum resumo encontrado"
          description="Que tal compartilhar um resumo com a turma e iniciar o repositório?"
          action={
            <button
              onClick={() => setIsNewOpen(true)}
              className="btn btn-primary text-xs flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" /> Criar Primeiro Resumo
            </button>
          }
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {filteredMaterials.map((m) => {
            const currentLikes = getLikes(m.id);
            const currentViews = getViews(m.id);
            const isLiked = likedList[m.id] || false;

            return (
              <motion.div
                key={m.id}
                layout
                whileHover={{ y: -3, transition: { duration: 0.2 } }}
                onClick={() => handleOpenPreview(m)}
                className="card p-5 flex flex-col justify-between h-52 hover:shadow-md transition-all group cursor-pointer"
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
                    <p className="text-xs text-navy-institutional font-semibold mt-1">
                      {m.disciplina}
                    </p>
                  </div>
                </div>

                <div className="flex gap-3 text-[11px] text-gray-400 font-medium py-1">
                  <span className="flex items-center gap-1">
                    <Eye className="w-3.5 h-3.5" />
                    {currentViews}
                  </span>
                  <span
                    className={`flex items-center gap-1 hover:text-red-500 transition-colors cursor-pointer ${
                      isLiked ? "text-red-500 font-bold" : ""
                    }`}
                    onClick={(e) => handleLike(e, m.id)}
                  >
                    <Heart className={`w-3.5 h-3.5 ${isLiked ? "fill-red-500" : ""}`} />
                    {currentLikes}
                  </span>
                </div>

                <div className="border-t border-gray-100 pt-3 flex items-center justify-between">
                  <div className="min-w-0">
                    <p className="text-[9px] text-gray-400 uppercase font-semibold">Autor</p>
                    <p className="text-xs font-bold text-gray-700 truncate">{m.autor}</p>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      onClick={(e) => handleShare(e, m)}
                      title="Compartilhar"
                      className="p-1.5 text-gray-400 hover:text-navy hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
                    >
                      <Share2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDownload(m);
                      }}
                      className="btn btn-secondary p-2 text-navy flex items-center justify-center cursor-pointer"
                    >
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* Modal de Leitura Expandida */}
      <Modal
        isOpen={activeMaterial !== null}
        onClose={() => setActiveMaterial(null)}
        title={activeMaterial?.titulo || "Resumo"}
      >
        {activeMaterial && (
          <div className="space-y-4">
            <div className="flex items-center gap-3 border-b border-gray-100 pb-3">
              <span
                className={`text-xs uppercase font-bold tracking-wider px-2 py-0.5 rounded-full border ${getTypeBadge(
                  activeMaterial.tipo
                )}`}
              >
                {activeMaterial.tipo}
              </span>
              <span className="text-xs text-navy font-bold">{activeMaterial.disciplina}</span>
              <span className="text-xs text-gray-400 ml-auto">Enviado em {activeMaterial.data}</span>
            </div>

            <div className="space-y-2">
              <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Autor do resumo</p>
              <p className="text-sm font-semibold text-gray-800">{activeMaterial.autor}</p>
            </div>

            <div className="bg-gray-50 border border-gray-100 rounded-xl p-5 mt-2">
              <h4 className="text-sm font-bold text-navy font-serif mb-2">Pré-visualização do conteúdo</h4>
              <p className="text-sm text-gray-600 leading-relaxed font-sans whitespace-pre-line">
                {mockPreviews[activeMaterial.titulo] ||
                  "Este material é uma compilação de apontamentos, exercícios e notas de aula recomendadas para revisão bimestral. Baixe o documento completo para ver imagens, fórmulas e anexos estruturados."}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-between items-center pt-4 border-t border-gray-100">
              <span className="text-xs text-gray-400 font-medium">
                {activeMaterial.downloads} downloads efetuados
              </span>

              <div className="flex gap-2 w-full sm:w-auto">
                <button
                  onClick={(e) => handleShare(e, activeMaterial)}
                  className="flex-1 sm:flex-none px-4 py-2 text-xs font-semibold text-gray-500 hover:text-navy hover:bg-navy-light/10 border border-gray-200 rounded-lg flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Share2 className="w-3.5 h-3.5" /> Compartilhar
                </button>
                <button
                  onClick={() => handleDownload(activeMaterial)}
                  className="flex-1 sm:flex-none btn btn-primary text-xs px-5 py-2 flex items-center justify-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" /> Baixar Completo
                </button>
              </div>
            </div>
          </div>
        )}
      </Modal>

      {/* Modal de Criação de Material */}
      <Modal
        isOpen={isNewOpen}
        onClose={() => setIsNewOpen(false)}
        title="Compartilhar Novo Material"
      >
        <form onSubmit={handleCreateMaterial} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-600 uppercase tracking-wide">
              Título do Resumo / PDF
            </label>
            <input
              type="text"
              required
              placeholder="Ex: Resumo - Revolução Industrial"
              value={novoTitulo}
              onChange={(e) => setNovoTitulo(e.target.value)}
              className="w-full px-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-gold focus:bg-white"
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
                className="w-full py-2 px-3 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none cursor-pointer"
              >
                <option value="Matemática">Matemática</option>
                <option value="História">História</option>
                <option value="Biologia">Biologia</option>
                <option value="Física">Física</option>
                <option value="Química">Química</option>
                <option value="Português">Português</option>
                <option value="Geografia">Geografia</option>
                <option value="Inglês">Inglês</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-600 uppercase tracking-wide">
                Tipo
              </label>
              <select
                value={novoTipo}
                onChange={(e) => setNovoTipo(e.target.value as Material["tipo"])}
                className="w-full py-2 px-3 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none cursor-pointer"
              >
                <option value="resumo">Resumo</option>
                <option value="pdf">PDF</option>
                <option value="flashcard">Flashcards</option>
                <option value="video">Vídeo</option>
              </select>
            </div>
          </div>

          <div className="flex gap-3 justify-end pt-4 border-t border-gray-100">
            <button
              type="button"
              onClick={() => setIsNewOpen(false)}
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
                  Publicar Resumo
                </>
              )}
            </button>
          </div>
        </form>
      </Modal>
    </motion.div>
  );
}
