"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Star, MessageSquare, CheckCircle } from "lucide-react";
import { monitores } from "@/lib/mock-data";
import { useToast } from "@/contexts/ToastContext";
import Skeleton, { SkeletonListItem } from "@/components/ui/Skeleton";
import { useEffect } from "react";

export default function MonitoriaPage() {
  const { success } = useToast();
  const [activeTab, setActiveTab] = useState<"solicitar" | "minhas">("solicitar");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMonitor, setSelectedMonitor] = useState<typeof monitores[0] | null>(null);
  const [sessionRequested, setSessionRequested] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  const [minhasMonitorias, setMinhasMonitorias] = useState([
    {
      id: "1",
      monitor: "João Pedro",
      materia: "Física",
      data: "05/06/2026",
      horario: "14:00",
      status: "confirmada",
    },
    {
      id: "2",
      monitor: "Maria Eduarda",
      materia: "Matemática",
      data: "07/06/2026",
      horario: "10:30",
      status: "aguardando",
    },
  ]);

  const [duvida, setDuvida] = useState("");

  useEffect(() => {
    const t = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(t);
  }, []);

  const filteredMonitors = monitores.filter((m) => {
    const query = searchQuery.toLowerCase();
    return (
      m.nome.toLowerCase().includes(query) ||
      m.disciplina.toLowerCase().includes(query)
    );
  });

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase();
  };

  const handleRequestSession = (e: React.FormEvent) => {
    e.preventDefault();
    setSessionRequested(true);
    
    if (selectedMonitor) {
      setMinhasMonitorias((prev) => [
        ...prev,
        {
          id: String(Date.now()),
          monitor: selectedMonitor.nome,
          materia: selectedMonitor.disciplina,
          data: new Date().toLocaleDateString("pt-BR"),
          horario: "A definir",
          status: "aguardando",
        }
      ]);
    }
    
    setTimeout(() => {
      setSessionRequested(false);
      setSelectedMonitor(null);
      setDuvida("");
      success("Solicitação enviada!", "O monitor foi notificado. Acompanhe em 'Minhas Monitorias'.");
      setActiveTab("minhas");
    }, 1500);
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
          <h1 className="text-2xl font-bold font-serif text-gray-900">Monitoria entre Alunos</h1>
          <p className="text-sm text-gray-500">
            Conecte-se com colegas para tirar dúvidas ou ofereça ajuda nas matérias que domina.
          </p>
        </div>
      </div>

      <div className="flex border-b border-gray-200 gap-6">
        <button
          onClick={() => setActiveTab("solicitar")}
          className={`pb-3 text-sm font-bold transition-all relative ${
            activeTab === "solicitar" ? "text-navy" : "text-gray-400 hover:text-gray-600"
          }`}
        >
          Solicitar Ajuda
          {activeTab === "solicitar" && (
            <motion.div
              layoutId="activeTabIndicator"
              className="absolute bottom-0 left-0 right-0 h-0.5 bg-navy"
            />
          )}
        </button>
        <button
          onClick={() => setActiveTab("minhas")}
          className={`pb-3 text-sm font-bold transition-all relative ${
            activeTab === "minhas" ? "text-navy" : "text-gray-400 hover:text-gray-600"
          }`}
        >
          Minhas Monitorias
          {activeTab === "minhas" && (
            <motion.div
              layoutId="activeTabIndicator"
              className="absolute bottom-0 left-0 right-0 h-0.5 bg-navy"
            />
          )}
        </button>
      </div>

      {activeTab === "solicitar" ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar por monitor ou matéria..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full text-sm pl-9 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-navy"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {isLoading ? (
                <>
                  <Skeleton variant="rectangular" height={176} />
                  <Skeleton variant="rectangular" height={176} />
                  <Skeleton variant="rectangular" height={176} />
                  <Skeleton variant="rectangular" height={176} />
                </>
              ) : filteredMonitors.map((m) => (
                <div
                  key={m.id}
                  onClick={() => setSelectedMonitor(m)}
                  className={`card p-4 flex flex-col justify-between h-44 cursor-pointer transition-all hover:scale-[1.01] ${
                    selectedMonitor?.id === m.id ? "border-navy bg-navy/5 shadow-soft" : ""
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-navy text-gold flex items-center justify-center font-bold text-sm shadow-xs">
                        {getInitials(m.nome)}
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-gray-900">{m.nome}</h3>
                        <span className="text-[10px] bg-blue-50 text-blue-700 px-2 py-0.5 rounded font-bold uppercase tracking-wider">
                          {m.disciplina}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
                      <span className="text-xs font-bold text-gray-800">{m.avaliacao}</span>
                    </div>
                  </div>

                  <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">
                    {m.descricao}
                  </p>

                  <div className="flex items-center justify-between border-t border-gray-100 pt-3">
                    <span
                      className={`text-[10px] font-bold ${
                        m.disponivel ? "text-success" : "text-gray-400"
                      }`}
                    >
                      ● {m.disponivel ? "Disponível" : "Indisponível"}
                    </span>
                    <button className="text-xs font-bold text-navy hover:text-navy-light flex items-center gap-1">
                      Selecionar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="card p-6 h-fit space-y-5">
            {selectedMonitor ? (
              sessionRequested ? (
                <div className="py-12 flex flex-col items-center justify-center text-center space-y-3">
                  <CheckCircle className="w-12 h-12 text-success" />
                  <h3 className="text-base font-bold text-gray-900">Solicitação Enviada!</h3>
                  <p className="text-xs text-gray-500 leading-normal">
                    {selectedMonitor.nome} receberá o seu convite de monitoria. Fique atento às notificações!
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex flex-col items-center text-center pb-4 border-b border-gray-100">
                    <div className="w-16 h-16 rounded-full bg-navy text-gold flex items-center justify-center font-bold text-2xl shadow-md mb-3">
                      {getInitials(selectedMonitor.nome)}
                    </div>
                    <h3 className="text-base font-bold text-gray-900">{selectedMonitor.nome}</h3>
                    <p className="text-xs text-navy-institutional font-semibold">
                      Monitor(a) de {selectedMonitor.disciplina}
                    </p>
                    <div className="flex items-center gap-1 mt-1 text-xs font-bold text-gray-700">
                      <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
                      {selectedMonitor.avaliacao} (6 avaliações)
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-xs font-bold text-gray-400 uppercase">Apresentação</h4>
                    <p className="text-xs text-gray-500 leading-relaxed">
                      {selectedMonitor.descricao}
                    </p>
                  </div>

                  <form onSubmit={handleRequestSession} className="space-y-3 pt-2">
                    <div>
                      <label className="text-[10px] text-gray-500 font-bold block mb-1">
                        Sua Dúvida / Assunto
                      </label>
                      <textarea
                        required
                        value={duvida}
                        onChange={(e) => setDuvida(e.target.value)}
                        placeholder="Escreva brevemente o assunto que deseja estudar..."
                        rows={3}
                        className="w-full text-xs p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-navy"
                      />
                    </div>

                    <button type="submit" className="btn btn-primary w-full text-xs">
                      Agendar Monitoria
                    </button>
                  </form>
                </div>
              )
            ) : (
              <div className="py-12 text-center text-xs text-gray-400 flex flex-col items-center justify-center space-y-2">
                <MessageSquare className="w-8 h-8 text-gray-300" />
                <p>Selecione um monitor da lista para ver os detalhes e agendar atendimento.</p>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="card p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-gray-100 pb-3">
            <h3 className="text-base font-bold text-gray-900 font-serif">Monitorias Agendadas</h3>
          </div>

          <div className="space-y-3">
            {isLoading ? (
               <>
                 <SkeletonListItem />
                 <SkeletonListItem />
               </>
            ) : minhasMonitorias.map((mon) => (
              <div
                key={mon.id}
                className="p-4 rounded-xl border border-gray-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-gray-50/50"
              >
                <div>
                  <h4 className="text-sm font-bold text-gray-900">
                    Estudo de {mon.materia} com {mon.monitor}
                  </h4>
                  <p className="text-xs text-gray-400">
                    Data: {mon.data} às {mon.horario}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <span
                    className={`badge text-xs font-medium ${
                      mon.status === "confirmada" ? "badge-atividade" : "badge-evento"
                    }`}
                  >
                    {mon.status === "confirmada" ? "Confirmada" : "Pendente"}
                  </span>
                  <button className="text-xs btn btn-secondary px-3 py-1" onClick={() => {
                     setMinhasMonitorias(prev => prev.filter(m => m.id !== mon.id));
                     success("Cancelada", "A monitoria foi cancelada.");
                  }}>Cancelar</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
}
