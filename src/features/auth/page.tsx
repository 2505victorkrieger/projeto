"use client";

import { Suspense, useEffect, useState, type SVGProps } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "framer-motion";
import {
  AlertCircle,
  ArrowRight,
  Briefcase,
  Check,
  Eye,
  EyeOff,
  FileText,
  KeyRound,
  Loader2,
  Lock,
  Mail,
  Moon,
  Sun,
  User,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authClient } from "@/lib/auth-client";
import {
  loginSchema,
  registerSchema,
  type LoginInput,
  type RegisterInput,
} from "./schemas/auth.schema";

export type AuthView = "login" | "register";

/* ==========================================================================
   Ícones Vetoriais das Mídias Sociais
   ========================================================================== */

function GoogleIcon({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg className={`h-4 w-4 shrink-0 ${className || ""}`} viewBox="0 0 24 24" {...props}>
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        fill="#EA4335"
      />
    </svg>
  );
}

function GithubIcon({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg className={`h-4 w-4 shrink-0 fill-current ${className || ""}`} viewBox="0 0 24 24" {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
      />
    </svg>
  );
}

/* ==========================================================================
   Classes Utilitárias de Componentes de Vidro
   ========================================================================== */

const glassInputWrapper =
  "relative flex items-center transition-all rounded-xl border border-zinc-300/90 dark:border-white/10 bg-white dark:bg-white/[0.03] focus-within:bg-white dark:focus-within:bg-white/[0.06] focus-within:border-teal-600 dark:focus-within:border-teal-400 focus-within:ring-2 focus-within:ring-teal-500/20";

const glassInputField =
  "h-10.5 w-full bg-transparent px-3.5 pl-10 text-xs font-normal text-zinc-900 dark:text-white placeholder:text-zinc-400 dark:placeholder:text-zinc-500 focus:outline-none border-none shadow-none focus-visible:ring-0 focus-visible:ring-offset-0";

const glassSocialButton =
  "h-10 w-full rounded-xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-white/[0.04] hover:bg-zinc-100/80 hover:border-zinc-300 dark:hover:bg-white/[0.08] dark:hover:border-white/20 text-xs font-semibold text-zinc-900 dark:text-zinc-100 transition-all duration-200 active:scale-[0.98] shadow-xs flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:pointer-events-none";

/* ==========================================================================
   Formulário de Login
   ========================================================================== */

interface LoginFormProps {
  onSwitchView: (view: AuthView) => void;
}

function LoginForm({ onSwitchView }: LoginFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({ resolver: zodResolver(loginSchema) });

  const onSubmit = async (data: LoginInput) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await authClient.signIn.email({ ...data, callbackURL: "/dashboard" });
      if (result?.error) {
        setError(result.error.message || "E-mail ou senha incorretos.");
        setIsLoading(false);
        return;
      }
      router.push("/dashboard");
    } catch {
      setError("Falha na conexão com o servidor. Tente novamente.");
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-4 sm:gap-5">
      <div className="space-y-1 text-left">
        <h2 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-white">
          Acessar workspace
        </h2>
        <p className="text-xs text-zinc-600 dark:text-zinc-400">
          Entre na sua conta para gerenciar seus projetos e clientes.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-2.5">
        <button type="button" className={glassSocialButton} disabled={isLoading}>
          <GoogleIcon />
          <span>Google</span>
        </button>
        <button type="button" className={glassSocialButton} disabled={isLoading}>
          <GithubIcon className="text-zinc-900 dark:text-white" />
          <span>GitHub</span>
        </button>
      </div>

      <div className="relative flex items-center py-0.5">
        <div className="h-px flex-1 bg-zinc-200 dark:bg-white/10" />
        <span className="px-3 text-[10px] font-mono uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
          ou via e-mail
        </span>
        <div className="h-px flex-1 bg-zinc-200 dark:bg-white/10" />
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3.5" noValidate>
        <div className="space-y-1.5">
          <Label htmlFor="login-email" className="text-[11px] font-semibold text-zinc-800 dark:text-zinc-200">
            E-mail
          </Label>
          <div className={glassInputWrapper}>
            <Mail className="absolute left-3.5 h-4 w-4 text-zinc-400 dark:text-zinc-500" />
            <Input
              id="login-email"
              type="email"
              autoComplete="email"
              placeholder="seu@email.com"
              disabled={isLoading}
              className={glassInputField}
              {...register("email")}
            />
          </div>
          {errors.email && (
            <p className="flex items-center gap-1 text-[11px] font-medium text-red-600 dark:text-red-400">
              <AlertCircle className="h-3 w-3 shrink-0" />
              {errors.email.message}
            </p>
          )}
        </div>

        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <Label htmlFor="login-password" className="text-[11px] font-semibold text-zinc-800 dark:text-zinc-200">
              Senha
            </Label>
            <Link
              href="/forgot-password"
              className="text-[11px] font-medium text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-colors"
            >
              Esqueceu?
            </Link>
          </div>
          <div className={glassInputWrapper}>
            <Lock className="absolute left-3.5 h-4 w-4 text-zinc-400 dark:text-zinc-500" />
            <Input
              id="login-password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              placeholder="••••••••"
              disabled={isLoading}
              className={`${glassInputField} pr-10`}
              {...register("password")}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? "Ocultar senha" : "Exibir senha"}
              className="absolute right-3 p-1 text-zinc-400 hover:text-zinc-700 dark:text-zinc-500 dark:hover:text-white transition-colors focus:outline-none cursor-pointer"
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
          {errors.password && (
            <p className="flex items-center gap-1 text-[11px] font-medium text-red-600 dark:text-red-400">
              <AlertCircle className="h-3 w-3 shrink-0" />
              {errors.password.message}
            </p>
          )}
        </div>

        {error && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            role="alert"
            className="flex items-start gap-2 rounded-xl border border-red-500/20 bg-red-500/10 p-3 text-xs font-medium text-red-600 dark:text-red-400"
          >
            <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
            <span>{error}</span>
          </motion.div>
        )}

        <Button
          type="submit"
          disabled={isLoading}
          className="group relative h-10.5 w-full overflow-hidden rounded-xl bg-zinc-900 text-xs font-semibold text-white shadow-md transition-all duration-200 hover:bg-black active:scale-[0.98] disabled:cursor-not-allowed disabled:bg-zinc-700 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-100 dark:disabled:bg-zinc-700"
        >
          {isLoading ? (
            <span className="inline-flex items-center justify-center gap-2">
              <span className="flex h-4 w-4 items-center justify-center">
                <Loader2 className="h-4 w-4 animate-spin" />
              </span>
              <span>Entrando...</span>
            </span>
          ) : (
            <span className="flex items-center justify-center gap-2">
              Entrar no sistema
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </span>
          )}
        </Button>
      </form>

      <div className="pt-1 text-center text-xs text-zinc-500 dark:text-zinc-400">
        Não tem uma conta?{" "}
        <button
          type="button"
          onClick={() => onSwitchView("register")}
          className="font-semibold text-teal-600 dark:text-teal-400 hover:underline cursor-pointer"
        >
          Criar conta
        </button>
      </div>
    </div>
  );
}

/* ==========================================================================
   Formulário de Registro
   ========================================================================== */

interface RegisterFormProps {
  onSwitchView: (view: AuthView) => void;
}

function RegisterForm({ onSwitchView }: RegisterFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterInput>({ resolver: zodResolver(registerSchema) });

  const watchPassword = watch("password", "");

  const hasMinLength = watchPassword.length >= 8;
  const hasLetter = /[a-zA-Z]/.test(watchPassword);
  const hasNumber = /[0-9]/.test(watchPassword);

  const onSubmit = async ({ name, email, password }: RegisterInput) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await authClient.signUp.email({ name, email, password, callbackURL: "/dashboard" });
      if (result?.error) {
        setError(result.error.message || "Não foi possível criar a conta.");
        setIsLoading(false);
        return;
      }
      router.push("/dashboard");
    } catch {
      setError("Erro durante o cadastro. Tente novamente.");
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-3.5 sm:gap-4">
      <div className="space-y-1 text-left">
        <h2 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-white">
          Criar sua conta
        </h2>
        <p className="text-xs text-zinc-600 dark:text-zinc-400">
          Comece seu teste de 14 dias sem cartão de crédito.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-2.5">
        <button type="button" className={glassSocialButton} disabled={isLoading}>
          <GoogleIcon />
          <span>Google</span>
        </button>
        <button type="button" className={glassSocialButton} disabled={isLoading}>
          <GithubIcon className="text-zinc-900 dark:text-white" />
          <span>GitHub</span>
        </button>
      </div>

      <div className="relative flex items-center py-0.5">
        <div className="h-px flex-1 bg-zinc-200 dark:bg-white/10" />
        <span className="px-3 text-[10px] font-mono uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
          ou preencha os dados
        </span>
        <div className="h-px flex-1 bg-zinc-200 dark:bg-white/10" />
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-2.5 sm:space-y-3" noValidate>
        <div className="space-y-1">
          <Label htmlFor="reg-name" className="text-[11px] font-semibold text-zinc-800 dark:text-zinc-200">
            Nome completo
          </Label>
          <div className={glassInputWrapper}>
            <User className="absolute left-3.5 h-4 w-4 text-zinc-400 dark:text-zinc-500" />
            <Input
              id="reg-name"
              placeholder="Ex: Lucas Silva"
              disabled={isLoading}
              className={glassInputField}
              {...register("name")}
            />
          </div>
          {errors.name && (
            <p className="flex items-center gap-1 text-[11px] font-medium text-red-600 dark:text-red-400">
              <AlertCircle className="h-3 w-3 shrink-0" />
              {errors.name.message}
            </p>
          )}
        </div>

        <div className="space-y-1">
          <Label htmlFor="reg-email" className="text-[11px] font-semibold text-zinc-800 dark:text-zinc-200">
            E-mail
          </Label>
          <div className={glassInputWrapper}>
            <Mail className="absolute left-3.5 h-4 w-4 text-zinc-400 dark:text-zinc-500" />
            <Input
              id="reg-email"
              type="email"
              autoComplete="email"
              placeholder="voce@empresa.com"
              disabled={isLoading}
              className={glassInputField}
              {...register("email")}
            />
          </div>
          {errors.email && (
            <p className="flex items-center gap-1 text-[11px] font-medium text-red-600 dark:text-red-400">
              <AlertCircle className="h-3 w-3 shrink-0" />
              {errors.email.message}
            </p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-2.5">
          <div className="space-y-1">
            <Label htmlFor="reg-password" className="text-[11px] font-semibold text-zinc-800 dark:text-zinc-200">
              Senha
            </Label>
            <div className={glassInputWrapper}>
              <Lock className="absolute left-3.5 h-4 w-4 text-zinc-400 dark:text-zinc-500" />
              <Input
                id="reg-password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                disabled={isLoading}
                className={`${glassInputField} pr-8`}
                {...register("password")}
              />
            </div>
          </div>

          <div className="space-y-1">
            <Label htmlFor="reg-confirm" className="text-[11px] font-semibold text-zinc-800 dark:text-zinc-200">
              Confirmar
            </Label>
            <div className={glassInputWrapper}>
              <KeyRound className="absolute left-3.5 h-4 w-4 text-zinc-400 dark:text-zinc-500" />
              <Input
                id="reg-confirm"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                disabled={isLoading}
                className={`${glassInputField} pr-8`}
                {...register("confirmPassword")}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Ocultar senha" : "Exibir senha"}
                className="absolute right-2.5 p-1 text-zinc-400 hover:text-zinc-700 dark:text-zinc-500 dark:hover:text-white transition-colors focus:outline-none cursor-pointer"
              >
                {showPassword ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
              </button>
            </div>
          </div>
        </div>

        {(errors.password || errors.confirmPassword) && (
          <p className="flex items-center gap-1 text-[11px] font-medium text-red-600 dark:text-red-400">
            <AlertCircle className="h-3 w-3 shrink-0" />
            {errors.password?.message || errors.confirmPassword?.message}
          </p>
        )}

        <AnimatePresence>
          {watchPassword.length > 0 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <div className="flex items-center gap-3 rounded-lg border border-zinc-200 dark:border-white/10 bg-zinc-100/60 dark:bg-white/[0.02] px-3 py-1 font-mono text-[10px] text-zinc-500 dark:text-zinc-400">
                <span className={`flex items-center gap-1 ${hasMinLength ? "text-emerald-600 dark:text-emerald-400 font-medium" : ""}`}>
                  <Check className={`h-3 w-3 ${hasMinLength ? "opacity-100" : "opacity-30"}`} /> 8+
                </span>
                <span className={`flex items-center gap-1 ${hasLetter ? "text-emerald-600 dark:text-emerald-400 font-medium" : ""}`}>
                  <Check className={`h-3 w-3 ${hasLetter ? "opacity-100" : "opacity-30"}`} /> letras
                </span>
                <span className={`flex items-center gap-1 ${hasNumber ? "text-emerald-600 dark:text-emerald-400 font-medium" : ""}`}>
                  <Check className={`h-3 w-3 ${hasNumber ? "opacity-100" : "opacity-30"}`} /> números
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {error && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            role="alert"
            className="flex items-start gap-2 rounded-xl border border-red-500/20 bg-red-500/10 p-2.5 text-xs font-medium text-red-600 dark:text-red-400"
          >
            <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
            <span>{error}</span>
          </motion.div>
        )}

        <Button
          type="submit"
          disabled={isLoading}
          className="group relative mt-1 h-10.5 w-full overflow-hidden rounded-xl bg-zinc-900 text-xs font-semibold text-white shadow-md transition-all duration-200 hover:bg-black active:scale-[0.98] disabled:cursor-not-allowed disabled:bg-zinc-700 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-100 dark:disabled:bg-zinc-700"
        >
          {isLoading ? (
            <span className="inline-flex items-center justify-center gap-2">
              <span className="flex h-4 w-4 items-center justify-center">
                <Loader2 className="h-4 w-4 animate-spin" />
              </span>
              <span>Criando conta...</span>
            </span>
          ) : (
            <span className="flex items-center justify-center gap-2">
              Finalizar cadastro
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </span>
          )}
        </Button>
      </form>

      <div className="pt-0.5 text-center text-xs text-zinc-500 dark:text-zinc-400">
        Já tem uma conta?{" "}
        <button
          type="button"
          onClick={() => onSwitchView("login")}
          className="font-semibold text-teal-600 dark:text-teal-400 hover:underline cursor-pointer"
        >
          Fazer login
        </button>
      </div>
    </div>
  );
}

/* ==========================================================================
   Shell Principal com Animações Fluidas e Zonas de Segurança Sem Corte
   ========================================================================== */

interface AuthShellProps {
  initialView: AuthView;
}

function AuthShell({ initialView }: AuthShellProps) {
  const [view, setView] = useState<AuthView>(initialView);
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const isDark = document.documentElement.classList.contains("dark");
    setTheme(isDark ? "dark" : "light");
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    document.documentElement.classList.toggle("dark", nextTheme === "dark");
    document.documentElement.style.colorScheme = nextTheme;
    localStorage.setItem("theme", nextTheme);
  };

  const isRegister = view === "register";

  return (
    <main className="relative flex min-h-screen w-full items-center justify-center bg-zinc-100 dark:bg-[#030305] p-4 sm:p-6 lg:p-8 overflow-hidden transition-colors duration-300">
      
      {/* Luzes Ambientais de Fundo */}
      <div className="ambient-glow-teal -top-40 -left-40 opacity-80 dark:opacity-60" />
      <div className="ambient-glow-indigo -bottom-40 -right-40 opacity-70 dark:opacity-50" />

      {/* Botão Flutuante do Tema */}
      {mounted && (
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={toggleTheme}
          aria-label={theme === "dark" ? "Alternar para modo claro" : "Alternar para modo escuro"}
          className="fixed top-4 right-4 z-50 h-9 w-9 rounded-xl border border-zinc-200 dark:border-white/10 bg-white/80 dark:bg-white/5 backdrop-blur-md text-zinc-600 dark:text-zinc-300 cursor-pointer hover:bg-zinc-200 dark:hover:bg-white/10"
        >
          {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </Button>
      )}

      {/* Container Principal Expandido para 980px */}
      <div className="glowing-frame relative z-10 w-full max-w-[980px] min-h-[580px] overflow-hidden rounded-3xl border border-zinc-200/80 dark:border-white/10 bg-white/80 dark:bg-[#08080c]/80 text-zinc-900 dark:text-white">
        
        {/* LAYOUT DESKTOP */}
        <div className="hidden lg:grid grid-cols-2 min-h-[580px] relative w-full h-full">
          
          {/* Formulário de Registro (Esquerda) */}
          <div className="p-8 xl:p-10 flex flex-col justify-center max-w-[360px] mx-auto w-full">
            {isRegister && <RegisterForm onSwitchView={setView} />}
          </div>

          {/* Formulário de Login (Direita) */}
          <div className="p-8 xl:p-10 flex flex-col justify-center max-w-[360px] mx-auto w-full">
            {!isRegister && <LoginForm onSwitchView={setView} />}
          </div>

          {/* PAINEL OVERLAY DIAGONAL DESLIZANTE COM LARGURA DE 53% E ZONAS DE SEGURANÇA */}
          <motion.div
            className="absolute top-0 bottom-0 w-[53%] bg-[#08080d] text-white p-8 xl:p-10 flex flex-col justify-between z-20 overflow-hidden shadow-2xl"
            initial={false}
            animate={{
              x: isRegister ? "88.6%" : "0%",
              clipPath: isRegister
                ? "polygon(12% 0, 100% 0, 100% 100%, 0% 100%)" // Diagonal (\)
                : "polygon(0 0, 100% 0, 88% 100%, 0 100%)",   // Diagonal (/)
            }}
            transition={{
              type: "spring",
              stiffness: 240,
              damping: 26,
            }}
          >
            {/* Gradient interno de iluminação */}
            <div className="absolute inset-0 bg-gradient-to-br from-teal-500/10 via-transparent to-indigo-500/5 pointer-events-none" />

            {/* Topbar Institucional com recuo para não encostar na diagonal do Registro */}
            <div className={`relative z-10 flex items-center justify-between ${isRegister ? "pl-8" : "pr-2"}`}>
              <div className="flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-white font-mono text-xs font-black text-black shadow-md">
                  NX
                </div>
                <span className="text-sm font-bold tracking-tight text-white">NexerX</span>
              </div>

              <span className="inline-flex items-center gap-1.5 rounded-full border border-teal-500/20 bg-teal-500/10 px-2.5 py-1 text-[10px] font-medium text-teal-300 backdrop-blur-md">
                CRM Freelance
              </span>
            </div>

            {/* Conteúdo Central Animado */}
            <AnimatePresence mode="wait">
              <motion.div
                key={isRegister ? "register-info" : "login-info"}
                initial={{ opacity: 0, y: 10, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.98 }}
                transition={{ duration: 0.18, ease: "easeOut" }}
                className={`relative z-10 my-auto py-4 max-w-[270px] ${
                  isRegister ? "ml-auto mr-4" : "ml-2 mr-auto"
                }`}
              >
                <h1 className="text-2xl font-bold leading-tight tracking-tight text-white xl:text-3xl">
                  {isRegister ? "Crie seu Workspace agora!" : "Bem-vindo novamente!"}
                </h1>
                <p className="mt-3 text-xs leading-relaxed text-zinc-400">
                  {isRegister
                    ? "Organize seus projetos, envie orçamentos e controle seus recebimentos em um só lugar."
                    : "Acesse seu painel para acompanhar clientes, propostas e entregas do seu dia."}
                </p>

                {/* Pilares Reais do CRM */}
                <div className="mt-6 space-y-3 border-t border-white/10 pt-5">
                  <div className="flex items-center gap-3 text-xs text-zinc-300">
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-teal-500/15 text-teal-400 border border-teal-500/20">
                      <FileText className="h-3.5 w-3.5" />
                    </div>
                    <span>Propostas e contratos profissionais</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-zinc-300">
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-emerald-500/15 text-emerald-400 border border-emerald-500/20">
                      <Users className="h-3.5 w-3.5" />
                    </div>
                    <span>Pipeline de clientes e projetos</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-zinc-300">
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-indigo-500/15 text-indigo-400 border border-indigo-500/20">
                      <Briefcase className="h-3.5 w-3.5" />
                    </div>
                    <span>Previsão de faturamento mensal</span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Footer com Recuo de Segurança à Direita no Login */}
            <div className={`relative z-10 flex items-center justify-between border-t border-white/10 pt-4 text-[11px] text-zinc-400 ${!isRegister ? "pr-10" : "pl-6"}`}>
              <span>© 2026 NexerX</span>
              <span className="font-medium text-zinc-300">Feito para Freelancers</span>
            </div>
          </motion.div>
        </div>

        {/* LAYOUT MOBILE (< lg) */}
        <div className="lg:hidden flex flex-col p-6 sm:p-8">
          <div className="flex items-center gap-2.5 mb-6">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-zinc-900 dark:bg-white font-mono text-xs font-black text-white dark:text-black">
              NX
            </div>
            <span className="text-base font-bold text-zinc-900 dark:text-white">NexerX</span>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={view}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.15 }}
            >
              {view === "login" && <LoginForm onSwitchView={setView} />}
              {view === "register" && <RegisterForm onSwitchView={setView} />}
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </main>
  );
}

/* ==========================================================================
   Entrada da Página
   ========================================================================== */

function AuthFeaturePageContent() {
  const searchParams = useSearchParams();
  const viewParam = searchParams.get("view") as AuthView | null;

  const validViews: AuthView[] = ["login", "register"];
  const initialView: AuthView = viewParam && validViews.includes(viewParam) ? viewParam : "login";

  return <AuthShell initialView={initialView} />;
}

export default function AuthPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-zinc-100 dark:bg-[#030305]">
          <Loader2 className="h-5 w-5 animate-spin text-zinc-400" />
        </div>
      }
    >
      <AuthFeaturePageContent />
    </Suspense>
  );
}