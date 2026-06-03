"use client";

import { motion } from "framer-motion";
import {
  GraduationCap,
  ClipboardList,
  TrendingUp,
  Users,
  Compass,
  Shield,
  Smartphone,
  UsersRound,
  Globe,
  BookOpen,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white overflow-hidden">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="bg-navy p-2 rounded-lg text-white">
                <GraduationCap className="w-6 h-6 text-gold" />
              </div>
              <span className="text-xl font-bold text-navy font-serif">EduConnect</span>
            </div>

            <div className="hidden md:flex items-center gap-8">
              <a href="#recursos" className="text-sm font-medium text-gray-600 hover:text-navy transition-colors">
                Recursos
              </a>
              <a href="#sobre" className="text-sm font-medium text-gray-600 hover:text-navy transition-colors">
                Sobre
              </a>
              <a href="#escolas" className="text-sm font-medium text-gray-600 hover:text-navy transition-colors">
                Para Escolas
              </a>
              <a href="#ajuda" className="text-sm font-medium text-gray-600 hover:text-navy transition-colors">
                Ajuda
              </a>
            </div>

            <div>
              <Link href="/dashboard" className="btn btn-primary text-sm px-5 py-2">
                Entrar
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 bg-gradient-to-b from-gray-50 via-white to-gray-50 pattern-dots">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-navy font-serif leading-tight"
              >
                Tudo que você precisa para <span className="text-gradient-gold">aprender melhor</span>, em um só lugar.
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed"
              >
                Organize seus estudos, encontre ajuda, compartilhe conhecimento e conquiste seus objetivos acadêmicos com o EduConnect. A plataforma feita para a nova geração de estudantes.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-2"
              >
                <Link href="/dashboard" className="btn btn-gold flex items-center justify-center gap-2 group shadow-lg">
                  Começar agora
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <a href="#recursos" className="btn btn-secondary flex items-center justify-center">
                  Saiba mais
                </a>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:col-span-5 flex justify-center relative"
            >
              <div className="absolute inset-0 bg-gold/10 rounded-full blur-3xl -z-10 w-72 h-72 mx-auto" />
              <div className="relative w-full max-w-[450px] aspect-square rounded-2xl bg-white/50 p-4 shadow-xl border border-gray-100 backdrop-blur-sm">
                <Image
                  src="/hero-illustration.png"
                  alt="Ilustração de estudantes"
                  fill
                  className="object-contain p-4"
                  priority
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section id="recursos" className="py-20 bg-navy text-white relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-gold/5 rounded-full blur-3xl" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="text-3xl sm:text-4xl font-bold font-serif">Recursos Feitos Para o Seu Sucesso</h2>
            <p className="text-white/70 text-sm sm:text-base">
              Desenvolvemos ferramentas completas e integradas para resolver os principais desafios do dia a dia escolar.
            </p>
          </div>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            <motion.div variants={item} className="bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-colors">
              <div className="bg-gold/10 p-3 rounded-lg text-gold w-fit mb-4">
                <ClipboardList className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold mb-2 font-serif">Organização</h3>
              <p className="text-white/75 text-sm leading-relaxed">
                Nunca perca um prazo importante. Gerencie provas, trabalhos e lembretes com facilidade.
              </p>
            </motion.div>

            <motion.div variants={item} className="bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-colors">
              <div className="bg-gold/10 p-3 rounded-lg text-gold w-fit mb-4">
                <TrendingUp className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold mb-2 font-serif">Desempenho</h3>
              <p className="text-white/75 text-sm leading-relaxed">
                Acompanhe sua evolução de forma clara. Gráficos bimestrais e médias por matéria sempre visíveis.
              </p>
            </motion.div>

            <motion.div variants={item} className="bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-colors">
              <div className="bg-gold/10 p-3 rounded-lg text-gold w-fit mb-4">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold mb-2 font-serif">Colaboração</h3>
              <p className="text-white/75 text-sm leading-relaxed">
                Aprenda e ensine com outros colegas. Encontre monitores ou compartilhe seus próprios conhecimentos.
              </p>
            </motion.div>

            <motion.div variants={item} className="bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-colors">
              <div className="bg-gold/10 p-3 rounded-lg text-gold w-fit mb-4">
                <Compass className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold mb-2 font-serif">Oportunidades</h3>
              <p className="text-white/75 text-sm leading-relaxed">
                Descubra seu futuro e faça a diferença. Testes vocacionais e caminhos profissionais detalhados.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section id="sobre" className="py-20 bg-gray-50 border-y border-gray-150">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 items-center text-center">
            <div className="flex flex-col items-center gap-2">
              <div className="bg-navy/5 p-4 rounded-full text-navy mb-2">
                <Shield className="w-6 h-6" />
              </div>
              <h4 className="text-sm font-bold text-gray-900">Seguro</h4>
              <p className="text-xs text-gray-500">Seus dados protegidos</p>
            </div>

            <div className="flex flex-col items-center gap-2">
              <div className="bg-navy/5 p-4 rounded-full text-navy mb-2">
                <Smartphone className="w-6 h-6" />
              </div>
              <h4 className="text-sm font-bold text-gray-900">Fácil de usar</h4>
              <p className="text-xs text-gray-500">Interface intuitiva e acessível</p>
            </div>

            <div className="flex flex-col items-center gap-2">
              <div className="bg-navy/5 p-4 rounded-full text-navy mb-2">
                <UsersRound className="w-6 h-6" />
              </div>
              <h4 className="text-sm font-bold text-gray-900">Colaborativo</h4>
              <p className="text-xs text-gray-500">Aprendizado em comunidade</p>
            </div>

            <div className="flex flex-col items-center gap-2">
              <div className="bg-navy/5 p-4 rounded-full text-navy mb-2">
                <Globe className="w-6 h-6" />
              </div>
              <h4 className="text-sm font-bold text-gray-900">Acessível</h4>
              <p className="text-xs text-gray-500">Em qualquer lugar e hora</p>
            </div>

            <div className="flex flex-col items-center gap-2 col-span-2 md:col-span-1 mx-auto">
              <div className="bg-navy/5 p-4 rounded-full text-navy mb-2">
                <BookOpen className="w-6 h-6" />
              </div>
              <h4 className="text-sm font-bold text-gray-900">Feito para alunos</h4>
              <p className="text-xs text-gray-500">Pensado para sua jornada</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-navy text-white border-t border-white/10 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="bg-white/10 p-2 rounded-lg text-white">
                <GraduationCap className="w-6 h-6 text-gold" />
              </div>
              <span className="text-xl font-bold font-serif">EduConnect</span>
            </div>
            <p className="text-white/60 text-xs text-center md:text-left">
              Conectando alunos, conhecimento e oportunidades.
            </p>
            <p className="text-white/40 text-xs">
              &copy; {new Date().getFullYear()} EduConnect. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
