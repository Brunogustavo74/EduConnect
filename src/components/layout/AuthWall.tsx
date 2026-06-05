import { useState, useMemo } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/contexts/ToastContext";
import { motion, AnimatePresence } from "framer-motion";
import { LogIn, UserPlus, Eye, EyeOff, Mail, Lock, User, School, GraduationCap, ShieldCheck, ShieldAlert, ShieldX, Sparkles } from "lucide-react";
import LoadingOverlay from "@/components/ui/LoadingOverlay";

function getPasswordStrength(password: string) {
  let score = 0;
  const checks = {
    length: password.length >= 8,
    lowercase: /[a-z]/.test(password),
    uppercase: /[A-Z]/.test(password),
    number: /[0-9]/.test(password),
    special: /[^A-Za-z0-9]/.test(password),
  };

  if (checks.length) score++;
  if (checks.lowercase) score++;
  if (checks.uppercase) score++;
  if (checks.number) score++;
  if (checks.special) score++;

  let level: "empty" | "weak" | "fair" | "good" | "strong" = "empty";
  let label = "";
  let color = "";
  let icon = ShieldX;

  if (password.length === 0) {
    level = "empty";
    label = "";
    color = "";
  } else if (score <= 2) {
    level = "weak";
    label = "Fraca";
    color = "#EF4444";
    icon = ShieldX;
  } else if (score === 3) {
    level = "fair";
    label = "Razoável";
    color = "#F59E0B";
    icon = ShieldAlert;
  } else if (score === 4) {
    level = "good";
    label = "Boa";
    color = "#3B82F6";
    icon = ShieldCheck;
  } else {
    level = "strong";
    label = "Excelente";
    color = "#10B981";
    icon = ShieldCheck;
  }

  return { score, checks, level, label, color, icon };
}

function FloatingInput({
  icon: Icon,
  label,
  type = "text",
  value,
  onChange,
  required = true,
  children,
}: {
  icon: React.ElementType;
  label: string;
  type?: string;
  value: string;
  onChange: (val: string) => void;
  required?: boolean;
  children?: React.ReactNode;
}) {
  const [focused, setFocused] = useState(false);
  const active = focused || value.length > 0;

  return (
    <div className="relative group">
      <div
        className="relative flex items-center border rounded-xl transition-all duration-300"
        style={{
          borderColor: focused ? "#D4AF37" : "#E5E7EB",
          boxShadow: focused ? "0 0 0 3px rgba(212, 175, 55, 0.15)" : "none",
          background: "#fff",
        }}
      >
        <div
          className="absolute left-3 transition-colors duration-300"
          style={{ color: focused ? "#D4AF37" : "#9CA3AF" }}
        >
          <Icon className="w-4 h-4" />
        </div>

        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          required={required}
          className="w-full pl-10 pr-3 pt-5 pb-2 text-sm text-gray-900 bg-transparent rounded-xl outline-none peer"
        />

        <motion.label
          animate={{
            y: active ? -8 : 0,
            scale: active ? 0.75 : 1,
            color: focused ? "#D4AF37" : active ? "#6B7280" : "#9CA3AF",
          }}
          transition={{ duration: 0.2 }}
          className="absolute left-10 text-sm pointer-events-none origin-left"
        >
          {label}
        </motion.label>

        {children}
      </div>
    </div>
  );
}

export default function AuthWall({ children }: { children: React.ReactNode }) {
  const { user, isLoading, signIn, signUp } = useAuth();
  const { error } = useToast();

  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nome, setNome] = useState("");
  const [escola, setEscola] = useState("");
  const [serie, setSerie] = useState("1º Ano Ensino Médio");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const strength = useMemo(() => getPasswordStrength(password), [password]);

  if (isLoading) {
    return <LoadingOverlay message="Autenticando..." />;
  }

  if (user) {
    return <>{children}</>;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isLogin && strength.level === "weak") {
      error("Senha muito fraca", "Use pelo menos 8 caracteres com letras maiúsculas, minúsculas e números.");
      return;
    }

    setIsSubmitting(true);
    try {
      if (isLogin) {
        await signIn(email, password);
      } else {
        await signUp(nome, email, password, escola, serie);
      }
    } catch (err: any) {
      error(isLogin ? "Erro ao entrar" : "Erro no cadastro", err.message || "Verifique suas credenciais.");
    } finally {
      setIsSubmitting(false);
    }
  };

 const formVariants = {
  hidden: { opacity: 0, x: isLogin ? -30 : 30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.4,
      ease: [0.22, 1, 0.36, 1] as const,
      staggerChildren: 0.06,
    },
  },
  exit: {
    opacity: 0,
    x: isLogin ? 30 : -30,
    transition: { duration: 0.25 },
  },
};

  const itemVariants = {
    hidden: { opacity: 0, y: 12 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.35 } },
  };

  return (
    <>
      {isSubmitting && <LoadingOverlay message={isLogin ? "Entrando..." : "Criando sua conta..."} />}

      <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #0B1F3A 0%, #163B6D 40%, #1E4D8C 70%, #0B1F3A 100%)" }}
      >
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            animate={{ x: [0, 50, 0], y: [0, -30, 0] }}
            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-32 -left-32 w-96 h-96 rounded-full opacity-10"
            style={{ background: "radial-gradient(circle, #D4AF37, transparent 70%)" }}
          />
          <motion.div
            animate={{ x: [0, -40, 0], y: [0, 40, 0] }}
            transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -bottom-48 -right-48 w-[500px] h-[500px] rounded-full opacity-8"
            style={{ background: "radial-gradient(circle, #D4AF37, transparent 70%)" }}
          />
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.03, 0.06, 0.03] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full"
            style={{ background: "radial-gradient(circle, rgba(255,255,255,0.1), transparent 60%)" }}
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="w-full max-w-md relative z-10"
        >
          <div
            className="rounded-2xl p-8 relative overflow-hidden"
            style={{
              background: "rgba(255, 255, 255, 0.95)",
              backdropFilter: "blur(20px)",
              boxShadow: "0 25px 60px rgba(0, 0, 0, 0.3), 0 0 40px rgba(212, 175, 55, 0.08)",
              border: "1px solid rgba(255, 255, 255, 0.3)",
            }}
          >
            <div className="absolute top-0 left-0 right-0 h-1"
              style={{ background: "linear-gradient(90deg, #D4AF37, #E8CC6E, #D4AF37)" }}
            />

            <motion.div
              className="text-center mb-8"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <motion.div
                className="w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center"
                style={{ background: "linear-gradient(135deg, #0B1F3A, #163B6D)" }}
                whileHover={{ scale: 1.05, rotate: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Sparkles className="w-8 h-8 text-yellow-400" />
              </motion.div>
              <h1 className="text-2xl font-bold font-serif" style={{ color: "#0B1F3A" }}>
                EduConnect
              </h1>
              <p className="text-gray-500 text-sm mt-1">
                {isLogin ? "Bem-vindo de volta! Entre na sua conta" : "Crie sua conta e comece a aprender"}
              </p>
            </motion.div>

            <AnimatePresence mode="wait">
              <motion.form
                key={isLogin ? "login" : "signup"}
                variants={formVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                onSubmit={handleSubmit}
                className="space-y-4"
              >
                {!isLogin && (
                  <>
                    <motion.div variants={itemVariants}>
                      <FloatingInput icon={User} label="Nome Completo" value={nome} onChange={setNome} />
                    </motion.div>

                    <motion.div variants={itemVariants} className="grid grid-cols-2 gap-3">
                      <FloatingInput icon={School} label="Escola" value={escola} onChange={setEscola} />
                      <div className="relative">
                        <div
                          className="relative flex items-center border rounded-xl transition-all duration-300"
                          style={{ borderColor: "#E5E7EB", background: "#fff" }}
                        >
                          <div className="absolute left-3" style={{ color: "#9CA3AF" }}>
                            <GraduationCap className="w-4 h-4" />
                          </div>
                          <select
                            value={serie}
                            onChange={(e) => setSerie(e.target.value)}
                            className="w-full pl-10 pr-3 pt-5 pb-2 text-sm text-gray-900 bg-transparent rounded-xl outline-none appearance-none cursor-pointer"
                          >
                            <option>1º Ano Ensino Médio</option>
                            <option>2º Ano Ensino Médio</option>
                            <option>3º Ano Ensino Médio</option>
                          </select>
                          <label className="absolute left-10 text-[10px] top-1.5 text-gray-500 pointer-events-none">
                            Série
                          </label>
                        </div>
                      </div>
                    </motion.div>
                  </>
                )}

                <motion.div variants={itemVariants}>
                  <FloatingInput icon={Mail} label="E-mail" type="email" value={email} onChange={setEmail} />
                </motion.div>

                <motion.div variants={itemVariants}>
                  <FloatingInput
                    icon={Lock}
                    label="Senha"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={setPassword}
                  >
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 p-1 rounded-lg transition-all duration-200 hover:bg-gray-100"
                      style={{ color: "#9CA3AF" }}
                    >
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={showPassword ? "visible" : "hidden"}
                          initial={{ opacity: 0, scale: 0.5, rotate: -90 }}
                          animate={{ opacity: 1, scale: 1, rotate: 0 }}
                          exit={{ opacity: 0, scale: 0.5, rotate: 90 }}
                          transition={{ duration: 0.2 }}
                        >
                          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </motion.div>
                      </AnimatePresence>
                    </button>
                  </FloatingInput>
                </motion.div>

                {!isLogin && password.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="space-y-2 px-1"
                  >
                    <div className="flex items-center gap-2">
                      <strength.icon className="w-4 h-4" style={{ color: strength.color }} />
                      <span className="text-xs font-semibold" style={{ color: strength.color }}>
                        {strength.label}
                      </span>
                    </div>

                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <motion.div
                          key={i}
                          className="h-1.5 flex-1 rounded-full overflow-hidden"
                          style={{ background: "#E5E7EB" }}
                        >
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: i <= strength.score ? "100%" : "0%" }}
                            transition={{ duration: 0.4, delay: i * 0.05 }}
                            className="h-full rounded-full"
                            style={{ background: strength.color }}
                          />
                        </motion.div>
                      ))}
                    </div>

                    <div className="grid grid-cols-2 gap-x-4 gap-y-1 mt-1">
                      {[
                        { check: strength.checks.length, label: "8+ caracteres" },
                        { check: strength.checks.uppercase, label: "Letra maiúscula" },
                        { check: strength.checks.lowercase, label: "Letra minúscula" },
                        { check: strength.checks.number, label: "Número" },
                        { check: strength.checks.special, label: "Caractere especial" },
                      ].map((item) => (
                        <motion.div
                          key={item.label}
                          className="flex items-center gap-1.5"
                          animate={{ opacity: item.check ? 1 : 0.5 }}
                        >
                          <motion.div
                            animate={{
                              scale: item.check ? [1, 1.3, 1] : 1,
                              background: item.check ? "#10B981" : "#D1D5DB",
                            }}
                            transition={{ duration: 0.3 }}
                            className="w-3 h-3 rounded-full flex items-center justify-center flex-shrink-0"
                          >
                            {item.check && (
                              <motion.svg
                                initial={{ pathLength: 0 }}
                                animate={{ pathLength: 1 }}
                                transition={{ duration: 0.3 }}
                                width="8" height="8" viewBox="0 0 10 10" fill="none"
                              >
                                <path d="M2 5L4 7L8 3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                              </motion.svg>
                            )}
                          </motion.div>
                          <span className="text-[10px] text-gray-500">{item.label}</span>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}

                <motion.div variants={itemVariants}>
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.01, y: -1 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm text-white transition-all duration-300 disabled:opacity-50"
                    style={{
                      background: "linear-gradient(135deg, #0B1F3A 0%, #163B6D 100%)",
                      boxShadow: "0 4px 15px rgba(11, 31, 58, 0.3)",
                    }}
                  >
                    {isSubmitting ? (
                      "Aguarde..."
                    ) : isLogin ? (
                      <>
                        <LogIn className="w-4 h-4" /> Entrar
                      </>
                    ) : (
                      <>
                        <UserPlus className="w-4 h-4" /> Criar Conta
                      </>
                    )}
                  </motion.button>
                </motion.div>
              </motion.form>
            </AnimatePresence>

            <div className="mt-6 text-center">
              <div className="relative mb-4">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t" style={{ borderColor: "#E5E7EB" }} />
                </div>
                <div className="relative flex justify-center">
                  <span className="px-3 text-xs text-gray-400" style={{ background: "rgba(255,255,255,0.95)" }}>
                    {isLogin ? "Novo por aqui?" : "Já tem conta?"}
                  </span>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  setIsLogin(!isLogin);
                  setPassword("");
                  setShowPassword(false);
                }}
                className="text-sm font-semibold px-6 py-2 rounded-xl transition-all duration-300"
                style={{
                  color: "#0B1F3A",
                  background: "rgba(11, 31, 58, 0.05)",
                  border: "1px solid rgba(11, 31, 58, 0.1)",
                }}
              >
                {isLogin ? "Criar uma conta gratuita" : "Entrar na minha conta"}
              </motion.button>
            </div>
          </div>

          <p className="text-center text-white/30 text-xs mt-6">
            © 2026 EduConnect · Todos os direitos reservados
          </p>
        </motion.div>
      </div>
    </>
  );
}
