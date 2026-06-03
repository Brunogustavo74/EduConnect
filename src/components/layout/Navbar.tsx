"use client";

import { useState } from "react";
import { Bell, Menu, X, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { usuarioAtual, notificacoes as initialNotifications } from "@/lib/mock-data";
import { getGreeting } from "@/lib/utils";

interface NavbarProps {
  onToggleSidebar: () => void;
}

export default function Navbar({ onToggleSidebar }: NavbarProps) {
  const [notifications, setNotifications] = useState(initialNotifications);
  const [showNotifications, setShowNotifications] = useState(false);

  const unreadCount = notifications.filter((n) => !n.lida).length;

  const markAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, lida: true })));
  };


  
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase();
  };

  return (
    <header className="sticky top-0 z-20 flex h-16 w-full items-center justify-between border-b border-gray-200 bg-white px-4 md:px-6 shadow-xs">
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleSidebar}
          className="lg:hidden p-2 rounded-lg text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition-colors"
          aria-label="Abrir menu"
        >
          <Menu className="w-6 h-6" />
        </button>

        <div className="hidden sm:block">
          <h1 className="text-lg font-bold text-gray-900 font-serif leading-tight">
            {getGreeting()}, {usuarioAtual.nome.split(" ")[0]}!
          </h1>
          <p className="text-xs text-gray-400">Que bom ter você por aqui. 👋</p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 rounded-full text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition-colors cursor-pointer"
          >
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-error opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-error"></span>
              </span>
            )}
          </button>

          <AnimatePresence>
            {showNotifications && (
              <>
                <div
                  className="fixed inset-0 z-30"
                  onClick={() => setShowNotifications(false)}
                />
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-floating border border-gray-200 py-2 z-40"
                >
                  <div className="flex items-center justify-between px-4 pb-2 border-b border-gray-100">
                    <span className="text-xs font-bold text-gray-900">Notificações</span>
                    {unreadCount > 0 && (
                      <button
                        onClick={markAllAsRead}
                        className="text-[11px] font-semibold text-navy hover:text-navy-institutional flex items-center gap-1"
                      >
                        <Check className="w-3.5 h-3.5" />
                        Lidas
                      </button>
                    )}
                  </div>

                  <div className="max-h-64 overflow-y-auto mt-2">
                    {notifications.length === 0 ? (
                      <div className="py-8 text-center text-xs text-gray-400">
                        Nenhuma notificação por enquanto
                      </div>
                    ) : (
                      notifications.map((notification) => (
                        <div
                          key={notification.id}
                          className={`px-4 py-2.5 hover:bg-gray-50 transition-colors flex items-start gap-2 border-b border-gray-50 last:border-b-0 ${
                            !notification.lida ? "bg-navy-light/5" : ""
                          }`}
                        >
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-bold text-gray-900 truncate">
                              {notification.titulo}
                            </p>
                            <p className="text-[11px] text-gray-500 mt-0.5 leading-normal">
                              {notification.mensagem}
                            </p>
                            <span className="text-[10px] text-gray-400 block mt-1">
                              {notification.tempo}
                            </span>
                          </div>
                          {!notification.lida && (
                            <span className="w-1.5 h-1.5 bg-navy-light rounded-full mt-1.5 flex-shrink-0" />
                          )}
                        </div>
                      ))
                    )}
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>

        <div className="flex items-center gap-3 pl-2 border-l border-gray-200">
          <div className="text-right hidden md:block">
            <p className="text-xs font-bold text-gray-900">{usuarioAtual.nome}</p>
            <p className="text-[10px] text-gray-400 font-medium">{usuarioAtual.serie}</p>
          </div>
          <div className="w-9 h-9 rounded-full bg-navy text-gold flex items-center justify-center font-bold text-sm shadow-sm select-none">
            {getInitials(usuarioAtual.nome)}
          </div>
        </div>
      </div>
    </header>
  );
}
