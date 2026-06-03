/* eslint-disable react-hooks/static-components */
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  GraduationCap,
  Home,
  Calendar,
  BarChart3,
  BookOpen,
  Users,
  FileText,
  PenTool,
  Compass,
  MessageCircle,
  FolderOpen,
  Settings,
  X,
} from "lucide-react";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const navItems = [
  { label: "Início", href: "/dashboard", icon: Home },
  { label: "Agenda", href: "/dashboard/agenda", icon: Calendar },
  { label: "Desempenho", href: "/dashboard/desempenho", icon: BarChart3 },
  { label: "Estudos", href: "/dashboard/estudos", icon: BookOpen },
  { label: "Monitoria", href: "/dashboard/monitoria", icon: Users },
  { label: "Resumos", href: "/dashboard/resumos", icon: FileText },
  { label: "Caderno", href: "/dashboard/caderno", icon: PenTool },
  { label: "Carreiras", href: "/dashboard/carreiras", icon: Compass },
  { label: "Comunidade", href: "/dashboard/comunidade", icon: MessageCircle },
  { label: "Materiais", href: "/dashboard/materiais", icon: FolderOpen },
];

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-navy text-white w-[260px]">
      <div className="flex items-center justify-between px-6 h-16 border-b border-white/10">
        <Link href="/dashboard" className="flex items-center gap-2" onClick={onClose}>
          <GraduationCap className="w-8 h-8 text-gold" />
          <span className="text-xl font-bold font-serif tracking-wide">EduConnect</span>
        </Link>
        <button
          onClick={onClose}
          className="lg:hidden p-1 rounded-lg text-white/70 hover:text-white hover:bg-white/10"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <nav className="flex-1 px-4 py-6 overflow-y-auto space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all group ${
                isActive
                  ? "bg-white/10 text-white border-l-4 border-gold"
                  : "text-white/60 hover:text-white hover:bg-white/5"
              }`}
            >
              <item.icon
                className={`w-5 h-5 transition-colors ${
                  isActive ? "text-gold" : "text-white/60 group-hover:text-white"
                }`}
              />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-white/10">
        <Link
          href="/dashboard/configuracoes"
          onClick={onClose}
          className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all group ${
            pathname === "/dashboard/configuracoes"
              ? "bg-white/10 text-white border-l-4 border-gold"
              : "text-white/60 hover:text-white hover:bg-white/5"
          }`}
        >
          <Settings
            className={`w-5 h-5 transition-colors ${
              pathname === "/dashboard/configuracoes"
                ? "text-gold"
                : "text-white/60 group-hover:text-white"
            }`}
          />
          <span>Configurações</span>
        </Link>
      </div>
    </div>
  );

  return (
    <>
      <aside className="hidden lg:block fixed inset-y-0 left-0 w-[260px] border-r border-gray-200 z-30">
        <SidebarContent />
      </aside>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="lg:hidden fixed inset-0 bg-black z-40"
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="lg:hidden fixed inset-y-0 left-0 w-[260px] z-50 shadow-2xl"
            >
              <SidebarContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
