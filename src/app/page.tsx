"use client";

import { motion, useInView, useScroll, useTransform, AnimatePresence } from "framer-motion";
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
  Star,
  CheckCircle,
  Calendar,
  BarChart2,
  FileText,
  Bell,
  Award,
  Zap,
  ChevronRight,
  Play,
  MessageCircle,
  Layers,
  Lock,
  Clock,
  Target,
  Sparkles,
  Quote,
} from "lucide-react";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useRef, useState } from "react";

const Instagram = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={props.className}
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const Twitter = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={props.className}
  >
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
);

const Linkedin = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={props.className}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

 
const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

const stagger = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const fadeLeft = {
  hidden: { opacity: 0, x: -32 },
  show: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

const fadeRight = {
  hidden: { opacity: 0, x: 32 },
  show: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

 
const features = [
  {
    icon: Calendar,
    title: "Agenda Inteligente",
    description:
      "Provas, trabalhos e atividades organizados em um calendário visual. Receba lembretes automáticos e nunca perca um prazo importante.",
    tag: "Organização",
    color: "bg-blue-50 text-blue-600",
  },
  {
    icon: BarChart2,
    title: "Análise de Desempenho",
    description:
      "Gráficos bimestrais por disciplina e evolução ao longo do ano. Identifique pontos fortes e áreas para melhorar com clareza.",
    tag: "Métricas",
    color: "bg-emerald-50 text-emerald-600",
  },
  {
    icon: Users,
    title: "Monitoria entre Alunos",
    description:
      "Conecte-se com colegas especialistas. Agende sessões de monitoria em Matemática, Física, Química e muito mais.",
    tag: "Colaboração",
    color: "bg-purple-50 text-purple-600",
  },
  {
    icon: FileText,
    title: "Biblioteca de Materiais",
    description:
      "Resumos, PDFs e flashcards criados por alunos e professores. Tudo pesquisável, filtrável e sempre à mão.",
    tag: "Conteúdo",
    color: "bg-amber-50 text-amber-600",
  },
  {
    icon: BookOpen,
    title: "Caderno Colaborativo",
    description:
      "Anote o que aprender em aula e compartilhe com seu grupo de estudos. Edição em tempo real, organizado por matéria.",
    tag: "Anotações",
    color: "bg-rose-50 text-rose-600",
  },
  {
    icon: Compass,
    title: "Orientação Profissional",
    description:
      "Teste vocacional, trilhas de carreira personalizadas e mapa de habilidades para ajudar você a descobrir seu caminho.",
    tag: "Futuro",
    color: "bg-teal-50 text-teal-600",
  },
];

const stats = [
  { value: "24+", label: "Disciplinas integradas" },
  { value: "98%", label: "Satisfação dos alunos" },
  { value: "4.9★", label: "Avaliação média" },
  { value: "1.2k+", label: "Estudantes ativos" },
];

const testimonials = [
  {
    name: "Kayo",
    role: "3º A ano · Ensino Médio",
    avatar: "BA",
    text: "O EduConnect transformou minha rotina de estudos. A agenda inteligente me ajudou a não perder nenhuma prova e minha média subiu muito no segundo semestre.",
    stars: 5,
  },
  {
    name: "Gabriel Primo",
    role: "2º C ano · Ensino Médio",
    avatar: "LM",
    text: "A monitoria entre alunos é incrível. Consegui entender Física com a ajuda do João Pedro e agora sou monitor de Biologia. É uma troca que enriquece todo mundo.",
    stars: 5,
  },
  {
    name: "Abigaiu Junior",
    role: "1º D ano · Ensino Médio",
    avatar: "IR",
    text: "Entrei no EduConnect no início do ano letivo e já não consigo imaginar estudar sem ele. Os resumos da biblioteca são um presente — economia de tempo enorme.",
    stars: 5,
  },
];

const howItWorks = [
  {
    step: "01",
    title: "Crie sua conta",
    description: "Cadastre-se com e-mail ou Google em menos de 2 minutos. Configure seu perfil de aluno.",
    icon: Zap,
  },
  {
    step: "02",
    title: "Personalize seu espaço",
    description: "Adicione suas matérias, metas semanais e defina seus horários de estudo.",
    icon: Target,
  },
  {
    step: "03",
    title: "Explore os recursos",
    description: "Acesse a agenda, materiais, monitoria e comunidade — tudo em um único lugar.",
    icon: Layers,
  },
  {
    step: "04",
    title: "Evolua e conquiste",
    description: "Acompanhe seu progresso, desbloqueie conquistas e alcance suas metas acadêmicas.",
    icon: Award,
  },
];

const navLinks = [
  { href: "#recursos", label: "Recursos" },
  { href: "#como-funciona", label: "Como Funciona" },
  { href: "#depoimentos", label: "Depoimentos" },
  { href: "#escolas", label: "Para Escolas" },
];
 
function Badge({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full ${className}`}>
      {children}
    </span>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <motion.div variants={fadeUp} className="flex justify-center mb-4">
      <Badge className="bg-gold/10 text-gold border border-gold/20">
        <Sparkles className="w-3 h-3" />
        {children}
      </Badge>
    </motion.div>
  );
}

 
export default function LandingPage() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-white overflow-hidden">

       
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="bg-navy p-2 rounded-lg">
                <GraduationCap className="w-5 h-5 text-gold" />
              </div>
              <span className="text-xl font-bold text-navy font-serif">EduConnect</span>
            </div>

            <div className="hidden md:flex items-center gap-7">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium text-gray-500 hover:text-navy transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <Link href="/dashboard" className="hidden sm:inline-flex text-sm font-medium text-navy hover:text-navy/70 transition-colors">
                Entrar
              </Link>
              <Link href="/dashboard" className="btn btn-gold text-sm px-5 py-2 flex items-center gap-2 group shadow-md">
                Começar grátis
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </Link>
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2 rounded-lg text-gray-500 hover:text-navy hover:bg-gray-100 transition-colors focus:outline-none"
                aria-label="Abrir menu"
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
              className="md:hidden border-t border-gray-100 bg-white/95 backdrop-blur-md overflow-hidden"
            >
              <div className="px-4 pt-2 pb-6 space-y-3">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="block px-3 py-2 rounded-lg text-base font-medium text-gray-600 hover:text-navy hover:bg-gray-50 transition-colors"
                  >
                    {link.label}
                  </a>
                ))}
                <div className="pt-4 border-t border-gray-100 flex flex-col gap-3 px-3">
                  <Link
                    href="/dashboard"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex justify-center items-center text-base font-medium text-navy py-2 hover:text-navy/70 transition-colors"
                  >
                    Entrar
                  </Link>
                  <Link
                    href="/dashboard"
                    onClick={() => setIsMenuOpen(false)}
                    className="btn btn-gold text-base py-3 flex items-center justify-center gap-2 group shadow-md"
                  >
                    Começar grátis
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      
      <section
        ref={heroRef}
        className="relative pt-28 pb-24 md:pt-40 md:pb-32 overflow-hidden"
        style={{ background: "linear-gradient(160deg, #f9fafb 0%, #fff 50%, #fffbf0 100%)" }}
      >
       
        <div className="absolute top-20 right-0 w-[600px] h-[600px] bg-gold/5 rounded-full blur-3xl -z-0" />
        <div className="absolute bottom-0 left-20 w-[400px] h-[400px] bg-navy/3 rounded-full blur-3xl -z-0" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial="hidden"
            animate="show"
            variants={stagger}
            className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
          >
          
            <div className="space-y-7">
              <motion.div variants={fadeUp}>
                <Badge className="bg-emerald-50 text-emerald-700 border border-emerald-200">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
                  Plataforma totalmente gratuita para alunos
                </Badge>
              </motion.div>

              <motion.h1
                variants={fadeUp}
                className="text-4xl sm:text-5xl lg:text-[3.5rem] font-extrabold text-navy font-serif leading-[1.1] tracking-tight"
              >
                Tudo para você{" "}
                <span className="relative">
                  <span className="text-gradient-gold">aprender melhor</span>
                  <svg className="absolute -bottom-1 left-0 w-full" height="6" viewBox="0 0 300 6" fill="none">
                    <path d="M0 5 Q75 1 150 5 Q225 9 300 5" stroke="#D4AF37" strokeWidth="2" fill="none" strokeLinecap="round" />
                  </svg>
                </span>
                ,<br />em um só lugar.
              </motion.h1>

              <motion.p variants={fadeUp} className="text-base sm:text-lg text-gray-500 leading-relaxed max-w-lg">
                Organize sua agenda, acompanhe seu desempenho, acesse materiais de qualidade e conecte-se com monitores — tudo em uma plataforma feita para a nova geração de estudantes.
              </motion.p>

              <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-3 pt-2">
                <Link href="/dashboard" className="btn btn-gold flex items-center justify-center gap-2 group shadow-lg px-6 py-3">
                  Começar agora — é grátis
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <a
                  href="#recursos"
                  className="btn btn-secondary flex items-center justify-center gap-2 px-6 py-3"
                >
                  <Play className="w-4 h-4" />
                  Ver demonstração
                </a>
              </motion.div>

              <motion.div variants={fadeUp} className="flex items-center gap-4 pt-2">
                <div className="flex -space-x-2">
                  {["AS", "LM", "BR", "IC"].map((init, i) => (
                    <div
                      key={i}
                      className="w-8 h-8 rounded-full bg-navy text-white flex items-center justify-center text-xs font-bold border-2 border-white"
                      style={{ zIndex: 4 - i }}
                    >
                      {init}
                    </div>
                  ))}
                </div>
                <div>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-gold text-gold" />
                    ))}
                  </div>
                  <p className="text-xs text-gray-400 mt-0.5">Amado por alunos de todo o Brasil</p>
                </div>
              </motion.div>
            </div>

          
            <motion.div
              variants={fadeRight}
              className="relative flex justify-center lg:justify-end"
            >
              <motion.div style={{ y: heroY }} className="relative w-full max-w-[520px]">
                 
                <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
                  
                  <div className="bg-navy px-4 py-3 flex items-center gap-2">
                    <div className="flex gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-white/20" />
                      <div className="w-2.5 h-2.5 rounded-full bg-white/20" />
                      <div className="w-2.5 h-2.5 rounded-full bg-white/20" />
                    </div>
                    <div className="flex-1 bg-white/10 rounded text-white/50 text-xs text-center py-0.5 mx-4">
                      educonnect.app/dashboard
                    </div>
                  </div>
                  
                  <div className="p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs text-gray-400">Bom dia,</p>
                        <p className="font-bold text-navy font-serif text-base">Ana Silva 👋</p>
                      </div>
                      <div className="bg-emerald-50 px-3 py-1 rounded-full">
                        <span className="text-xs font-semibold text-emerald-700">Média: 8,6</span>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { label: "Atividades", value: "5", sub: "esta semana", color: "bg-blue-50 text-blue-700" },
                        { label: "Monitorias", value: "2", sub: "agendadas", color: "bg-purple-50 text-purple-700" },
                        { label: "Conquistas", value: "12", sub: "desbloqueadas", color: "bg-amber-50 text-amber-700" },
                      ].map((card) => (
                        <div key={card.label} className={`${card.color} rounded-lg p-2.5`}>
                          <p className="text-lg font-bold">{card.value}</p>
                          <p className="text-xs opacity-80">{card.label}</p>
                        </div>
                      ))}
                    </div>
                 
                    <div className="bg-gray-50 rounded-lg p-3">
                      <p className="text-xs text-gray-400 mb-2">Desempenho bimestral</p>
                      <div className="flex items-end gap-1.5 h-10">
                        {[65, 72, 78, 85, 90, 88].map((h, i) => (
                          <div
                            key={i}
                            className="flex-1 bg-navy rounded-sm opacity-80"
                            style={{ height: `${h}%` }}
                          />
                        ))}
                      </div>
                    </div>
                    
                    <div className="space-y-1.5">
                      {[
                        { label: "Prova de Matemática", date: "23/05 · 10h", tag: "Prova", tagColor: "bg-red-100 text-red-700" },
                        { label: "Trabalho de História", date: "25/05 · 23h59", tag: "Trabalho", tagColor: "bg-blue-100 text-blue-700" },
                      ].map((item) => (
                        <div key={item.label} className="flex items-center justify-between bg-gray-50 rounded-lg px-3 py-2">
                          <div>
                            <p className="text-xs font-medium text-navy">{item.label}</p>
                            <p className="text-[10px] text-gray-400">{item.date}</p>
                          </div>
                          <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${item.tagColor}`}>
                            {item.tag}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                  <motion.div
                  initial={{ opacity: 0, x: 20, y: 10 }}
                  animate={{ opacity: 1, x: 0, y: 0 }}
                  transition={{ delay: 1, duration: 0.5 }}
                  className="absolute -right-4 top-16 bg-white rounded-xl shadow-lg border border-gray-100 px-3 py-2.5 flex items-center gap-2 max-w-[180px]"
                >
                  <Bell className="w-4 h-4 text-gold shrink-0" />
                  <div>
                    <p className="text-xs font-semibold text-navy">Monitoria em 1h</p>
                    <p className="text-[10px] text-gray-400">Maria Eduarda · Matemática</p>
                  </div>
                </motion.div>

               
                <motion.div
                  initial={{ opacity: 0, x: -20, y: 10 }}
                  animate={{ opacity: 1, x: 0, y: 0 }}
                  transition={{ delay: 1.3, duration: 0.5 }}
                  className="absolute -left-4 bottom-16 bg-white rounded-xl shadow-lg border border-gray-100 px-3 py-2.5 flex items-center gap-2"
                >
                  <Award className="w-4 h-4 text-emerald-500 shrink-0" />
                  <div>
                    <p className="text-xs font-semibold text-navy">Conquista desbloqueada!</p>
                    <p className="text-[10px] text-gray-400">5 dias de ofensiva 🔥</p>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>

  
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 60V30C360 0 720 60 1080 30C1260 15 1380 30 1440 30V60H0Z" fill="#0d1b3e" />
          </svg>
        </div>
      </section>

      
      <section className="bg-navy py-12 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={stagger}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
          >
            {stats.map((stat) => (
              <motion.div key={stat.label} variants={fadeUp}>
                <p className="text-3xl sm:text-4xl font-extrabold text-gold font-serif">{stat.value}</p>
                <p className="text-sm text-white/60 mt-1">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      
      <section id="recursos" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            className="text-center max-w-3xl mx-auto mb-16 space-y-4"
          >
            <SectionLabel>Recursos Completos</SectionLabel>
            <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl font-bold text-navy font-serif leading-snug">
              Tudo o que você precisa, integrado e simples
            </motion.h2>
            <motion.p variants={fadeUp} className="text-gray-500 text-base sm:text-lg leading-relaxed">
              Desenvolvemos cada funcionalidade pensando nos desafios reais do dia a dia escolar. Nada de ferramentas soltas — aqui tudo conversa entre si.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {features.map((feature) => (
              <motion.div
                key={feature.title}
                variants={fadeUp}
                className="bg-white rounded-2xl p-7 border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group"
              >
                <div className="flex items-start justify-between mb-5">
                  <div className={`p-3 rounded-xl ${feature.color}`}>
                    <feature.icon className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-semibold text-gray-400 bg-gray-50 px-2.5 py-1 rounded-full">
                    {feature.tag}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-navy font-serif mb-2">{feature.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{feature.description}</p>
                <div className="mt-5 flex items-center text-navy text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                  Saiba mais <ChevronRight className="w-4 h-4 ml-1" />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      
      <section id="como-funciona" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            className="text-center max-w-2xl mx-auto mb-16 space-y-4"
          >
            <SectionLabel>Como Funciona</SectionLabel>
            <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl font-bold text-navy font-serif">
              Do cadastro ao sucesso em 4 passos
            </motion.h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {howItWorks.map((step, index) => (
              <motion.div key={step.step} variants={fadeUp} className="relative">
                
                {index < howItWorks.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-[calc(50%+2rem)] right-0 h-px bg-gradient-to-r from-gold/40 to-transparent" />
                )}
                <div className="flex flex-col items-center text-center">
                  <div className="relative mb-5">
                    <div className="w-16 h-16 bg-navy rounded-2xl flex items-center justify-center shadow-lg shadow-navy/20">
                      <step.icon className="w-7 h-7 text-gold" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-gold rounded-full flex items-center justify-center">
                      <span className="text-navy text-xs font-black">{step.step.slice(1)}</span>
                    </div>
                  </div>
                  <h3 className="font-bold text-navy font-serif text-lg mb-2">{step.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-14 text-center"
          >
            <Link href="/dashboard" className="btn btn-gold inline-flex items-center gap-2 shadow-lg px-8 py-3 group">
              Criar conta gratuita
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>

      
      <section className="py-24 bg-gray-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-80px" }}
              variants={stagger}
              className="space-y-6"
            >
              <SectionLabel>Destaque · Agenda</SectionLabel>
              <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl font-bold text-navy font-serif leading-snug">
                Nunca mais perca uma prova ou prazo importante
              </motion.h2>
              <motion.p variants={fadeUp} className="text-gray-500 text-base leading-relaxed">
                A Agenda Inteligente do EduConnect centraliza todos os seus compromissos acadêmicos. Receba notificações antecipadas, visualize sua semana em um relance e mantenha o controle total da sua vida escolar.
              </motion.p>
              <motion.ul variants={stagger} className="space-y-3">
                {[
                  "Calendário visual com eventos por matéria e tipo",
                  "Lembretes automáticos antes de cada prazo",
                  "Integração direta com o Plano de Estudos",
                  "Sincronização com calendários externos",
                ].map((item) => (
                  <motion.li key={item} variants={fadeUp} className="flex items-center gap-3 text-sm text-gray-600">
                    <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                    {item}
                  </motion.li>
                ))}
              </motion.ul>
              <motion.div variants={fadeUp}>
                <Link href="/dashboard/agenda" className="btn btn-primary inline-flex items-center gap-2 group">
                  Explorar a Agenda
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-80px" }}
              variants={fadeRight}
              className="relative"
            >
              <div className="absolute inset-0 bg-gold/5 rounded-3xl blur-2xl" />
              <div className="relative bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden p-5">
               
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-navy" />
                    <span className="font-bold text-navy text-sm font-serif">Maio 2024</span>
                  </div>
                  <div className="flex gap-1">
                    <button className="w-6 h-6 rounded bg-gray-100 text-gray-500 text-xs flex items-center justify-center">‹</button>
                    <button className="w-6 h-6 rounded bg-gray-100 text-gray-500 text-xs flex items-center justify-center">›</button>
                  </div>
                </div>
                <div className="grid grid-cols-7 gap-0.5 text-center text-[10px] text-gray-400 mb-1">
                  {["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"].map((d) => (
                    <div key={d} className="py-1 font-medium">{d}</div>
                  ))}
                </div>
                <div className="grid grid-cols-7 gap-0.5 text-center text-xs">
                  {[...Array(3)].map((_, i) => <div key={i} />)}
                  {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => {
                    const isToday = day === 23;
                    const hasEvent = [15, 23, 25, 27, 28, 30, 31].includes(day);
                    return (
                      <div
                        key={day}
                        className={`py-1.5 rounded-md text-xs relative ${
                          isToday ? "bg-navy text-white font-bold" : "hover:bg-gray-50 text-gray-700"
                        }`}
                      >
                        {day}
                        {hasEvent && !isToday && (
                          <div className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-gold" />
                        )}
                      </div>
                    );
                  })}
                </div>
                
                <div className="mt-4 space-y-2">
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">23 de Maio</p>
                  {[
                    { label: "Prova de Matemática", time: "10:00 · Sala 12", color: "bg-red-50 border-red-200 text-red-700" },
                    { label: "Aula de Física", time: "14:00 · Lab 3", color: "bg-blue-50 border-blue-200 text-blue-700" },
                  ].map((ev) => (
                    <div key={ev.label} className={`rounded-lg border px-3 py-2 ${ev.color}`}>
                      <p className="text-xs font-semibold">{ev.label}</p>
                      <p className="text-[10px] opacity-70">{ev.time}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      
      <section className="py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-80px" }}
              variants={fadeLeft}
              className="relative order-2 lg:order-1"
            >
              <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-5 space-y-5">
                <div>
                  <p className="font-bold text-navy font-serif text-base">Análise de Desempenho</p>
                  <p className="text-xs text-gray-400">Médias bimestrais por disciplina</p>
                </div>
                
                <div className="space-y-3">
                  {[
                    { subject: "Português", avg: 9.2, color: "bg-emerald-500" },
                    { subject: "Matemática", avg: 8.5, color: "bg-blue-500" },
                    { subject: "Biologia", avg: 8.0, color: "bg-purple-500" },
                    { subject: "História", avg: 7.8, color: "bg-amber-500" },
                    { subject: "Física", avg: 7.2, color: "bg-rose-500" },
                  ].map((subj) => (
                    <div key={subj.subject} className="flex items-center gap-3">
                      <span className="text-xs text-gray-500 w-24 shrink-0">{subj.subject}</span>
                      <div className="flex-1 bg-gray-100 rounded-full h-2">
                        <div
                          className={`${subj.color} rounded-full h-2 transition-all`}
                          style={{ width: `${(subj.avg / 10) * 100}%` }}
                        />
                      </div>
                      <span className="text-xs font-bold text-navy w-8 text-right">{subj.avg}</span>
                    </div>
                  ))}
                </div>
              
                <div className="border-t border-gray-100 pt-4 flex items-center justify-between">
                  <span className="text-sm text-gray-500 font-medium">Média Geral</span>
                  <div className="bg-emerald-50 px-3 py-1 rounded-full">
                    <span className="text-sm font-bold text-emerald-700">8,6 · Excelente 🎉</span>
                  </div>
                </div>
              </div>
            </motion.div>

         
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-80px" }}
              variants={stagger}
              className="space-y-6 order-1 lg:order-2"
            >
              <SectionLabel>Destaque · Desempenho</SectionLabel>
              <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl font-bold text-navy font-serif leading-snug">
                Acompanhe sua evolução com dados visuais e claros
              </motion.h2>
              <motion.p variants={fadeUp} className="text-gray-500 text-base leading-relaxed">
                Visualize suas médias bimestrais, compare disciplinas, identifique tendências e tome decisões sobre onde focar seus estudos. Com o EduConnect, você tem o poder dos dados ao seu favor.
              </motion.p>
              <motion.ul variants={stagger} className="space-y-3">
                {[
                  "Gráficos de evolução bimestral por matéria",
                  "Visão geral em radar para comparar disciplinas",
                  "Alerta automático quando média está em risco",
                  "Histórico completo de todas as avaliações",
                ].map((item) => (
                  <motion.li key={item} variants={fadeUp} className="flex items-center gap-3 text-sm text-gray-600">
                    <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                    {item}
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>
          </div>
        </div>
      </section>

   
      <section id="depoimentos" className="py-24 bg-navy text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/3 rounded-full blur-3xl" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            className="text-center max-w-2xl mx-auto mb-16 space-y-4"
          >
            <motion.div variants={fadeUp} className="flex justify-center">
              <Badge className="bg-white/10 text-gold border border-white/20">
                <Sparkles className="w-3 h-3" /> Depoimentos Reais
              </Badge>
            </motion.div>
            <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl font-bold font-serif">
              O que os alunos dizem sobre o EduConnect
            </motion.h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {testimonials.map((t) => (
              <motion.div
                key={t.name}
                variants={fadeUp}
                className="bg-white/5 border border-white/10 rounded-2xl p-7 hover:bg-white/10 transition-colors"
              >
                <Quote className="w-6 h-6 text-gold mb-4 opacity-60" />
                <p className="text-white/80 text-sm leading-relaxed mb-6">{t.text}</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center text-gold font-bold text-sm">
                    {t.avatar}
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm">{t.name}</p>
                    <p className="text-white/50 text-xs">{t.role}</p>
                  </div>
                  <div className="ml-auto flex gap-0.5">
                    {[...Array(t.stars)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-gold text-gold" />
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      
      <section id="escolas" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-80px" }}
              variants={stagger}
              className="space-y-6"
            >
              <SectionLabel>Para Escolas e Instituições</SectionLabel>
              <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl font-bold text-navy font-serif leading-snug">
                Leve o EduConnect para a sua escola
              </motion.h2>
              <motion.p variants={fadeUp} className="text-gray-500 text-base leading-relaxed">
                Ofereça uma plataforma completa para seus alunos com gestão centralizada para professores e coordenadores. Acompanhe o progresso da turma, gerencie materiais e promova a colaboração entre todos.
              </motion.p>
              <motion.div variants={stagger} className="grid grid-cols-2 gap-4">
                {[
                  { icon: Users, label: "Gestão de turmas" },
                  { icon: BarChart2, label: "Relatórios da escola" },
                  { icon: Lock, label: "Controle de acesso" },
                  { icon: MessageCircle, label: "Comunicação integrada" },
                  { icon: Clock, label: "Acompanhamento em tempo real" },
                  { icon: Shield, label: "Segurança e privacidade" },
                ].map(({ icon: Icon, label }) => (
                  <motion.div key={label} variants={fadeUp} className="flex items-center gap-2.5 text-sm text-gray-600">
                    <div className="w-7 h-7 bg-navy/5 rounded-lg flex items-center justify-center shrink-0">
                      <Icon className="w-3.5 h-3.5 text-navy" />
                    </div>
                    {label}
                  </motion.div>
                ))}
              </motion.div>
              <motion.div variants={fadeUp}>
                <Link href="/contato" className="btn btn-primary inline-flex items-center gap-2 group">
                  Falar com nosso time
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-80px" }}
              variants={fadeRight}
            >
              <div className="bg-navy rounded-2xl p-8 text-white space-y-6">
                <div className="flex items-center gap-3 mb-2">
                  <div className="bg-gold/20 p-2 rounded-lg">
                    <GraduationCap className="w-5 h-5 text-gold" />
                  </div>
                  <span className="font-bold font-serif text-lg">Plano Institucional</span>
                </div>
                {[
                  "Acesso ilimitado para toda a escola",
                  "Painel de controle para coordenadores",
                  "Onboarding e treinamento incluídos",
                  "Suporte prioritário dedicado",
                  "Relatórios personalizados exportáveis",
                  "Integração com sistemas da escola",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3 text-sm text-white/80">
                    <CheckCircle className="w-4 h-4 text-gold shrink-0" />
                    {item}
                  </div>
                ))}
                <div className="border-t border-white/10 pt-4">
                  <p className="text-white/50 text-xs">Planos sob medida para o tamanho e necessidades da sua escola.</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      
      <section className="py-16 bg-white border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={stagger}
            className="flex flex-wrap justify-center gap-x-12 gap-y-8 items-center"
          >
            {[
              { icon: Shield, label: "Seguro", sub: "Dados protegidos por criptografia" },
              { icon: Smartphone, label: "Mobile-friendly", sub: "Disponível em qualquer dispositivo" },
              { icon: Globe, label: "100% online", sub: "Sem necessidade de instalação" },
              { icon: Lock, label: "LGPD conforme", sub: "Privacidade garantida" },
              { icon: Zap, label: "Rápido", sub: "Carregamento ultra-veloz" },
            ].map(({ icon: Icon, label, sub }) => (
              <motion.div key={label} variants={fadeUp} className="flex flex-col items-center gap-2 text-center">
                <div className="w-12 h-12 bg-navy/5 rounded-full flex items-center justify-center">
                  <Icon className="w-5 h-5 text-navy" />
                </div>
                <p className="text-sm font-bold text-navy">{label}</p>
                <p className="text-xs text-gray-400 max-w-[120px]">{sub}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      
      <section className="py-24 bg-gradient-to-br from-navy via-navy to-[#1a2f5e] relative overflow-hidden">
        <div className="absolute inset-0 pattern-dots opacity-10" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gold/10 rounded-full blur-3xl" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10"
        >
          <Badge className="bg-white/10 text-gold border border-white/20 mb-6 mx-auto">
            <Sparkles className="w-3 h-3" /> Comece hoje mesmo
          </Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white font-serif leading-tight mb-6">
            Pronto para transformar<br />seus estudos?
          </h2>
          <p className="text-white/60 text-base sm:text-lg leading-relaxed mb-10 max-w-2xl mx-auto">
            Junte-se a milhares de estudantes que já descobriram uma forma mais inteligente de estudar. Cadastro gratuito, sem cartão de crédito.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/dashboard" className="btn btn-gold flex items-center justify-center gap-2 group shadow-xl shadow-black/30 px-8 py-3.5 text-base">
              Criar conta grátis
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="/contato" className="btn flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/20 px-8 py-3.5 text-base">
              Falar com a equipe
              <MessageCircle className="w-4 h-4" />
            </Link>
          </div>
          <p className="text-white/30 text-xs mt-6">
            Ao criar sua conta, você concorda com nossos Termos de Uso e Política de Privacidade.
          </p>
        </motion.div>
      </section>

      
      <footer className="bg-[#0a1428] text-white border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 py-16">
        
            <div className="lg:col-span-1 space-y-4">
              <div className="flex items-center gap-2">
                <div className="bg-white/10 p-2 rounded-lg">
                  <GraduationCap className="w-5 h-5 text-gold" />
                </div>
                <span className="text-xl font-bold font-serif">EduConnect</span>
              </div>
              <p className="text-white/50 text-sm leading-relaxed">
                Conectando alunos, conhecimento e oportunidades para um futuro melhor.
              </p>
              <div className="flex gap-3">
                {[
                  { name: "Instagram", icon: Instagram, href: "https://instagram.com" },
                  { name: "Twitter", icon: Twitter, href: "https://twitter.com" },
                  { name: "LinkedIn", icon: Linkedin, href: "https://linkedin.com" },
                ].map(({ name, icon: Icon, href }) => (
                  <a
                    key={name}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-colors"
                    aria-label={name}
                  >
                    <Icon className="w-3.5 h-3.5 text-white/60" />
                  </a>
                ))}
              </div>
            </div>

         
            {[
              {
                title: "Plataforma",
                links: [
                  { name: "Início", href: "/" },
                  { name: "Agenda", href: "/dashboard/agenda" },
                  { name: "Desempenho", href: "/dashboard/desempenho" },
                  { name: "Monitoria", href: "/dashboard/monitoria" },
                  { name: "Resumos", href: "/dashboard/resumos" },
                  { name: "Comunidade", href: "/dashboard/comunidade" },
                ],
              },
              {
                title: "Empresa",
                links: [
                  { name: "Sobre nós", href: "#" },
                  { name: "Blog", href: "#" },
                  { name: "Imprensa", href: "#" },
                  { name: "Contato", href: "/contato" },
                ],
              },
              {
                title: "Suporte",
                links: [
                  { name: "Central de Ajuda", href: "#" },
                  { name: "Status do Sistema", href: "#" },
                  { name: "Termos de Uso", href: "#" },
                  { name: "Privacidade", href: "#" },
                  { name: "Cookies", href: "#" },
                ],
              },
            ].map((col) => (
              <div key={col.title} className="space-y-4">
                <h4 className="text-sm font-semibold text-white/80 uppercase tracking-wider">{col.title}</h4>
                <ul className="space-y-2">
                  {col.links.map((link) => (
                    <li key={link.name}>
                      <Link href={link.href} className="text-sm text-white/50 hover:text-white transition-colors">
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="border-t border-white/10 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-white/30 text-xs">
              &copy; {new Date().getFullYear()} EduConnect. Todos os direitos reservados.
            </p>
            <p className="text-white/20 text-xs">
              
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}