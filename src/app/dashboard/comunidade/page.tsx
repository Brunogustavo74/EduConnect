"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, MessageCircle, Heart, Share2, Award } from "lucide-react";

export default function ComunidadePage() {
  const [posts, setPosts] = useState([
    {
      id: "1",
      autor: "Gabriel Ramos",
      serie: "3º ano • Ensino Médio",
      avatar: "GR",
      tempo: "10 min atrás",
      conteudo: "Pessoal, quem aqui vai prestar Fuvest esse ano? Criei um grupo de estudos de redação focado nos temas dos últimos anos. Mandem mensagem se quiserem participar!",
      curtidas: 12,
      comentarios: 4,
      curtido: false,
      tag: "Vestibular",
    },
    {
      id: "2",
      autor: "Larissa Souza",
      serie: "2º ano • Ensino Médio",
      avatar: "LS",
      tempo: "1 hora atrás",
      conteudo: "Acabei de disponibilizar meus flashcards da tabela periódica na biblioteca! Me ajudou muito a fixar as famílias químicas. Espero que ajude vocês também. 🧪🎒",
      curtidas: 24,
      comentarios: 2,
      curtido: true,
      tag: "Química",
    },
  ]);

  const [newPostText, setNewPostText] = useState("");

  const handleLike = (id: string) => {
    setPosts(
      posts.map((p) => {
        if (p.id === id) {
          return {
            ...p,
            curtido: !p.curtido,
            curtidas: p.curtido ? p.curtidas - 1 : p.curtidas + 1,
          };
        }
        return p;
      })
    );
  };

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPostText.trim()) return;

    const newPost = {
      id: Math.random().toString(),
      autor: "Ana Silva",
      serie: "2º ano • Ensino Médio",
      avatar: "AS",
      tempo: "Agora mesmo",
      conteudo: newPostText,
      curtidas: 0,
      comentarios: 0,
      curtido: false,
      tag: "Geral",
    };

    setPosts([newPost, ...posts]);
    setNewPostText("");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      <div>
        <h1 className="text-2xl font-bold font-serif text-gray-900">Comunidade de Alunos</h1>
        <p className="text-sm text-gray-500">
          Compartilhe dúvidas, dicas, novidades e conecte-se com alunos da sua escola.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-8 space-y-4">
          <div className="card p-4">
            <form onSubmit={handleCreatePost} className="space-y-3">
              <textarea
                value={newPostText}
                onChange={(e) => setNewPostText(e.target.value)}
                placeholder="Compartilhe uma dúvida, um link útil ou uma conquista acadêmica..."
                rows={3}
                className="w-full text-sm p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-navy leading-relaxed"
              />
              <div className="flex justify-between items-center">
                <span className="text-[10px] text-gray-400 font-medium">
                  Lembre-se de seguir as diretrizes da escola.
                </span>
                <button type="submit" className="btn btn-primary text-xs flex items-center gap-1.5 px-4 py-2">
                  <Send className="w-3.5 h-3.5" />
                  Publicar
                </button>
              </div>
            </form>
          </div>

          <div className="space-y-4">
            {posts.map((post) => (
              <div key={post.id} className="card p-5 space-y-3 hover:shadow-xs transition-shadow">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-navy text-gold flex items-center justify-center font-bold text-xs">
                      {post.avatar}
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-gray-900">{post.autor}</h3>
                      <p className="text-[10px] text-gray-400 font-medium">{post.serie}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] bg-navy-light/5 text-navy px-2 py-0.5 rounded font-bold uppercase">
                      {post.tag}
                    </span>
                    <span className="text-[10px] text-gray-400 font-medium">{post.tempo}</span>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-gray-700 leading-relaxed whitespace-pre-line">
                  {post.conteudo}
                </p>

                <div className="border-t border-gray-100 pt-3 flex items-center gap-6">
                  <button
                    onClick={() => handleLike(post.id)}
                    className={`flex items-center gap-1.5 text-xs font-semibold transition-colors cursor-pointer ${
                      post.curtido ? "text-error" : "text-gray-400 hover:text-error"
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${post.curtido ? "fill-error" : ""}`} />
                    {post.curtidas}
                  </button>

                  <button className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-navy font-semibold transition-colors cursor-pointer">
                    <MessageCircle className="w-4 h-4" />
                    {post.comentarios} comentários
                  </button>

                  <button className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-navy font-semibold ml-auto transition-colors cursor-pointer">
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-4 space-y-4">
          <div className="card p-5 space-y-4">
            <h2 className="text-sm font-bold text-gray-900 font-serif border-b border-gray-100 pb-2 flex items-center gap-2">
              <Award className="w-4 h-4 text-gold" />
              Alunos Destaques
            </h2>

            <div className="space-y-3">
              {[
                { nome: "Carolina Santos", conquistas: "15 conquistas", rank: "1º" },
                { nome: "Larissa Souza", conquistas: "12 conquistas", rank: "2º" },
                { nome: "Gabriel Ramos", conquistas: "11 conquistas", rank: "3º" },
              ].map((aluno, idx) => (
                <div key={idx} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-gray-400 w-5">{aluno.rank}</span>
                    <span className="font-bold text-gray-800">{aluno.nome}</span>
                  </div>
                  <span className="text-gray-400">{aluno.conquistas}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
