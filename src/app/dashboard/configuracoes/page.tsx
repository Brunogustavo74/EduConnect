"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Save,
  User,
  Bell,
  Shield,
  GraduationCap,
  CheckCircle,
  AlertTriangle,
  Lock,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/contexts/ToastContext";
import ConfirmDialog from "@/components/ui/ConfirmDialog";

type TabType = "perfil" | "notificacoes" | "seguranca" | "escolaridade";

export default function ConfiguracoesPage() {
  const { user, updateProfile, signOut } = useAuth();
  const { addToast } = useToast();

  const [activeTab, setActiveTab] = useState<TabType>("perfil");

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");

  const [escola, setEscola] = useState("");
  const [serie, setSerie] = useState("");

  const [notifProvas, setNotifProvas] = useState(true);
  const [notifTrabalhos, setNotifTrabalhos] = useState(true);
  const [notifMonitorias, setNotifMonitorias] = useState(true);
  const [notifMateriais, setNotifMateriais] = useState(false);

  const [senhaAtual, setSenhaAtual] = useState("");
  const [novaSenha, setNovaSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  useEffect(() => {
    if (user) {
      setNome(user.nome);
      setEmail(user.email);
      setEscola(user.escola);
      setSerie(user.serie);
    }
  }, [user]);

  const handleSavePerfil = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nome.trim() || !email.trim()) return;

    setIsSubmitting(true);
    try {
      await updateProfile({ nome, email });
      addToast({
        type: "success",
        title: "Perfil atualizado",
        message: "Suas informações foram salvas com sucesso.",
      });
    } catch (err) {
      addToast({
        type: "error",
        title: "Erro ao salvar",
        message: "Ocorreu um problema ao atualizar seu perfil.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSaveEscolaridade = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await updateProfile({ escola, serie });
      addToast({
        type: "success",
        title: "Dados escolares salvos",
        message: "Suas configurações escolares foram atualizadas.",
      });
    } catch (err) {
      addToast({
        type: "error",
        title: "Erro ao salvar",
        message: "Ocorreu um erro ao atualizar dados escolares.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSaveNotificacoes = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      addToast({
        type: "success",
        title: "Preferências de notificação salvas",
        message: "Seus canais de notificação foram configurados.",
      });
    }, 400);
  };

  const handleSaveSeguranca = (e: React.FormEvent) => {
    e.preventDefault();
    if (!senhaAtual) {
      addToast({
        type: "error",
        title: "Erro de validação",
        message: "Informe sua senha atual.",
      });
      return;
    }
    if (novaSenha !== confirmarSenha) {
      addToast({
        type: "error",
        title: "Erro de validação",
        message: "As senhas novas não coincidem.",
      });
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSenhaAtual("");
      setNovaSenha("");
      setConfirmarSenha("");
      addToast({
        type: "success",
        title: "Senha alterada com sucesso",
        message: "Use sua nova senha no próximo acesso.",
      });
    }, 600);
  };

  const handleDeleteAccount = () => {
    setIsDeleteOpen(false);
    addToast({
      type: "warning",
      title: "Conta excluída (Simulado)",
      message: "Seu cadastro foi removido e você foi desconectado.",
    });
    signOut();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      <div>
        <h1 className="text-2xl font-bold font-serif text-gray-900">Configurações</h1>
        <p className="text-sm text-gray-500">
          Gerencie suas preferências de perfil, notificações acadêmicas e segurança de conta.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
        {}
        <div className="card p-3 lg:col-span-1 space-y-1 bg-white">
          <button
            onClick={() => setActiveTab("perfil")}
            className={`w-full text-left text-xs font-bold px-3 py-2.5 rounded-lg flex items-center gap-2 transition-colors cursor-pointer ${
              activeTab === "perfil"
                ? "text-navy bg-navy/5"
                : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            <User className="w-4 h-4 shrink-0" />
            Editar Perfil
          </button>
          <button
            onClick={() => setActiveTab("notificacoes")}
            className={`w-full text-left text-xs font-bold px-3 py-2.5 rounded-lg flex items-center gap-2 transition-colors cursor-pointer ${
              activeTab === "notificacoes"
                ? "text-navy bg-navy/5"
                : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            <Bell className="w-4 h-4 shrink-0" />
            Notificações
          </button>
          <button
            onClick={() => setActiveTab("seguranca")}
            className={`w-full text-left text-xs font-bold px-3 py-2.5 rounded-lg flex items-center gap-2 transition-colors cursor-pointer ${
              activeTab === "seguranca"
                ? "text-navy bg-navy/5"
                : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            <Shield className="w-4 h-4 shrink-0" />
            Segurança
          </button>
          <button
            onClick={() => setActiveTab("escolaridade")}
            className={`w-full text-left text-xs font-bold px-3 py-2.5 rounded-lg flex items-center gap-2 transition-colors cursor-pointer ${
              activeTab === "escolaridade"
                ? "text-navy bg-navy/5"
                : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            <GraduationCap className="w-4 h-4 shrink-0" />
            Escolaridade
          </button>
        </div>

        {}
        <div className="lg:col-span-3 space-y-6">
          {activeTab === "perfil" && (
            <div className="card p-6 space-y-6 bg-white">
              <h2 className="text-base font-bold text-gray-900 font-serif border-b border-gray-100 pb-3">
                Informações Pessoais
              </h2>

              <form onSubmit={handleSavePerfil} className="space-y-4 max-w-xl">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs text-gray-500 font-medium block">Nome Completo</label>
                    <input
                      type="text"
                      required
                      value={nome}
                      onChange={(e) => setNome(e.target.value)}
                      className="w-full text-sm px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-gold bg-gray-50 focus:bg-white transition-all"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs text-gray-500 font-medium block">E-mail Escolar</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full text-sm px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-gold bg-gray-50 focus:bg-white transition-all"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn btn-primary text-xs flex items-center gap-1.5 px-5 py-2 shadow-sm"
                >
                  <Save className="w-3.5 h-3.5" />
                  {isSubmitting ? "Salvando..." : "Salvar Alterações"}
                </button>
              </form>
            </div>
          )}

          {activeTab === "notificacoes" && (
            <div className="card p-6 space-y-6 bg-white">
              <h2 className="text-base font-bold text-gray-900 font-serif border-b border-gray-100 pb-3">
                Canais de Notificação
              </h2>

              <form onSubmit={handleSaveNotificacoes} className="space-y-6 max-w-xl">
                <div className="space-y-4">
                  {[
                    {
                      id: "notif-provas",
                      title: "Lembretes de Provas",
                      description: "Receba alertas no aplicativo 24 horas antes de cada prova agendada.",
                      checked: notifProvas,
                      onChange: setNotifProvas,
                    },
                    {
                      id: "notif-trabalhos",
                      title: "Alertas de Trabalhos",
                      description: "Seja notificado sobre prazos de entrega de relatórios e seminários.",
                      checked: notifTrabalhos,
                      onChange: setNotifTrabalhos,
                    },
                    {
                      id: "notif-monitorias",
                      title: "Sessões de Monitoria",
                      description: "Receba avisos de confirmação ou cancelamento de monitorias com tutores.",
                      checked: notifMonitorias,
                      onChange: setNotifMonitorias,
                    },
                    {
                      id: "notif-materiais",
                      title: "Novos Resumos",
                      description: "Avisar por e-mail quando colegas publicarem materiais relevantes para minhas disciplinas.",
                      checked: notifMateriais,
                      onChange: setNotifMateriais,
                    },
                  ].map((item) => (
                    <div key={item.id} className="flex items-start justify-between gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="space-y-0.5">
                        <label htmlFor={item.id} className="text-sm font-bold text-gray-800 cursor-pointer">
                          {item.title}
                        </label>
                        <p className="text-xs text-gray-400">{item.description}</p>
                      </div>
                      <input
                        id={item.id}
                        type="checkbox"
                        checked={item.checked}
                        onChange={(e) => item.onChange(e.target.checked)}
                        className="w-4 h-4 mt-1 text-navy border-gray-300 rounded focus:ring-navy accent-navy shrink-0 cursor-pointer"
                      />
                    </div>
                  ))}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn btn-primary text-xs flex items-center gap-1.5 px-5 py-2 shadow-sm"
                >
                  <Save className="w-3.5 h-3.5" />
                  Salvar Preferências
                </button>
              </form>
            </div>
          )}

          {activeTab === "seguranca" && (
            <div className="card p-6 space-y-6 bg-white">
              <h2 className="text-base font-bold text-gray-900 font-serif border-b border-gray-100 pb-3">
                Segurança da Conta
              </h2>

              <form onSubmit={handleSaveSeguranca} className="space-y-4 max-w-xl">
                <div className="space-y-1">
                  <label className="text-xs text-gray-500 font-medium block">Senha Atual</label>
                  <input
                    type="password"
                    required
                    value={senhaAtual}
                    onChange={(e) => setSenhaAtual(e.target.value)}
                    className="w-full text-sm px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-gold bg-gray-50 focus:bg-white"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs text-gray-500 font-medium block">Nova Senha</label>
                    <input
                      type="password"
                      required
                      value={novaSenha}
                      onChange={(e) => setNovaSenha(e.target.value)}
                      className="w-full text-sm px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-gold bg-gray-50 focus:bg-white"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs text-gray-500 font-medium block">Confirmar Nova Senha</label>
                    <input
                      type="password"
                      required
                      value={confirmarSenha}
                      onChange={(e) => setConfirmarSenha(e.target.value)}
                      className="w-full text-sm px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-gold bg-gray-50 focus:bg-white"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn btn-primary text-xs flex items-center gap-1.5 px-5 py-2 shadow-sm"
                >
                  <Lock className="w-3.5 h-3.5" />
                  Alterar Senha
                </button>
              </form>

              {}
              <div className="border-t border-red-100 pt-6 mt-6">
                <h3 className="text-sm font-bold text-error uppercase tracking-wider mb-2">Zona de Perigo</h3>
                <p className="text-xs text-gray-400 mb-4">
                  A exclusão de conta removerá permanentemente seu diário, caderno, notas compartilhadas e inscrições em monitoria.
                </p>
                <button
                  onClick={() => setIsDeleteOpen(true)}
                  className="btn border border-red-200 hover:bg-red-50 text-error text-xs px-4 py-2 flex items-center gap-1.5 font-bold rounded-lg cursor-pointer"
                >
                  <AlertTriangle className="w-4 h-4" />
                  Deletar Minha Conta
                </button>
              </div>
            </div>
          )}

          {activeTab === "escolaridade" && (
            <div className="card p-6 space-y-6 bg-white">
              <h2 className="text-base font-bold text-gray-900 font-serif border-b border-gray-100 pb-3">
                Dados Acadêmicos
              </h2>

              <form onSubmit={handleSaveEscolaridade} className="space-y-4 max-w-xl">
                <div className="space-y-1">
                  <label className="text-xs text-gray-500 font-medium block">Instituição de Ensino</label>
                  <input
                    type="text"
                    required
                    value={escola}
                    onChange={(e) => setEscola(e.target.value)}
                    className="w-full text-sm px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-gold bg-gray-50 focus:bg-white transition-all"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs text-gray-500 font-medium block">Série ou Ano Corrente</label>
                  <input
                    type="text"
                    required
                    value={serie}
                    onChange={(e) => setSerie(e.target.value)}
                    className="w-full text-sm px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-gold bg-gray-50 focus:bg-white transition-all"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn btn-primary text-xs flex items-center gap-1.5 px-5 py-2 shadow-sm"
                >
                  <Save className="w-3.5 h-3.5" />
                  Salvar Dados Escolares
                </button>
              </form>
            </div>
          )}
        </div>
      </div>

      {}
      <ConfirmDialog
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={handleDeleteAccount}
        title="Deseja Excluir sua Conta?"
        message="Esta ação é irreversível e excluirá permanentemente todos os seus dados escolares do EduConnect."
        confirmText="Sim, Deletar Minha Conta"
        cancelText="Cancelar"
        variant="danger"
      />
    </motion.div>
  );
}
