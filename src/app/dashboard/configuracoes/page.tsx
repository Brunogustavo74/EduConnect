"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Save, User, Bell, Shield, GraduationCap, CheckCircle } from "lucide-react";
import { usuarioAtual } from "@/lib/mock-data";

export default function ConfiguracoesPage() {
  const [profileName, setProfileName] = useState(usuarioAtual.nome);
  const [profileEmail, setProfileEmail] = useState(usuarioAtual.email);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaveSuccess(true);
    setTimeout(() => {
      setSaveSuccess(false);
    }, 3000);
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
        <div className="card p-4 lg:col-span-1 space-y-1">
          <button className="w-full text-left text-xs font-bold text-navy bg-navy/5 px-3 py-2.5 rounded-lg flex items-center gap-2">
            <User className="w-4 h-4" />
            Editar Perfil
          </button>
          <button className="w-full text-left text-xs font-medium text-gray-600 hover:bg-gray-50 px-3 py-2.5 rounded-lg flex items-center gap-2">
            <Bell className="w-4 h-4" />
            Notificações
          </button>
          <button className="w-full text-left text-xs font-medium text-gray-600 hover:bg-gray-50 px-3 py-2.5 rounded-lg flex items-center gap-2">
            <Shield className="w-4 h-4" />
            Segurança
          </button>
          <button className="w-full text-left text-xs font-medium text-gray-600 hover:bg-gray-50 px-3 py-2.5 rounded-lg flex items-center gap-2">
            <GraduationCap className="w-4 h-4" />
            Escolaridade
          </button>
        </div>

        <div className="card p-6 lg:col-span-3 space-y-6">
          <h2 className="text-base font-bold text-gray-900 font-serif border-b border-gray-100 pb-3">
            Informações Pessoais
          </h2>

          {saveSuccess && (
            <div className="p-3 bg-success-light border border-success/10 text-success rounded-lg text-xs font-semibold flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              Configurações salvas com sucesso!
            </div>
          )}

          <form onSubmit={handleSave} className="space-y-4 max-w-xl">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-gray-500 font-medium block mb-1">Nome Completo</label>
                <input
                  type="text"
                  value={profileName}
                  onChange={(e) => setProfileName(e.target.value)}
                  className="w-full text-sm px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-navy"
                />
              </div>

              <div>
                <label className="text-xs text-gray-500 font-medium block mb-1">E-mail Escolar</label>
                <input
                  type="email"
                  value={profileEmail}
                  onChange={(e) => setProfileEmail(e.target.value)}
                  className="w-full text-sm px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-navy"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-gray-500 font-medium block mb-1">Instituição</label>
                <input
                  type="text"
                  disabled
                  value={usuarioAtual.escola}
                  className="w-full text-sm px-3 py-2 border border-gray-200 rounded-lg bg-gray-50 text-gray-400 cursor-not-allowed"
                />
              </div>

              <div>
                <label className="text-xs text-gray-500 font-medium block mb-1">Série / Ciclo</label>
                <input
                  type="text"
                  disabled
                  value={usuarioAtual.serie}
                  className="w-full text-sm px-3 py-2 border border-gray-200 rounded-lg bg-gray-50 text-gray-400 cursor-not-allowed"
                />
              </div>
            </div>

            <button type="submit" className="btn btn-primary text-xs flex items-center gap-1.5 px-4 py-2">
              <Save className="w-3.5 h-3.5" />
              Salvar Alterações
            </button>
          </form>
        </div>
      </div>
    </motion.div>
  );
}
