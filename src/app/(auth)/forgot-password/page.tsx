"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Loader2,
  Mail,
  Moon,
  ShieldCheck,
  Sun,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  forgotPasswordSchema,
  type ForgotPasswordInput,
} from "@/features/auth/schemas/auth.schema";

const glassInputWrapper =
  "relative flex items-center transition-colors duration-150 rounded-xl border border-zinc-300 dark:border-white/10 bg-white/80 dark:bg-white/[0.03] focus-within:bg-white dark:focus-within:bg-white/[0.06] focus-within:border-teal-600 dark:focus-within:border-teal-400 focus-within:ring-2 focus-within:ring-teal-500/20";

const glassInputField =
  "h-10.5 w-full bg-transparent px-3.5 pl-10 text-xs font-normal text-zinc-900 dark:text-white placeholder:text-zinc-400 dark:placeholder:text-zinc-500 focus:outline-none border-none shadow-none focus-visible:ring-0 focus-visible:ring-offset-0";

export default function ForgotPasswordPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const isDark = document.documentElement.classList.contains("dark");
    setTheme(isDark ? "dark" : "light");
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";

    const applyTheme = () => {
      setTheme(nextTheme);
      document.documentElement.classList.toggle("dark", nextTheme === "dark");
      document.documentElement.style.colorScheme = nextTheme;
      localStorage.setItem("theme", nextTheme);
    };

    if (typeof document !== "undefined" && "startViewTransition" in document) {
      (document as unknown as { startViewTransition: (cb: () => void) => void }).startViewTransition(applyTheme);
    } else {
      applyTheme();
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordInput>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async (_data: ForgotPasswordInput) => {
    setIsLoading(true);
    setError(null);

    try {
      await new Promise((resolve) => setTimeout(resolve, 800));
      setSubmitted(true);
    } catch {
      setError("Não foi possível solicitar a redefinição de senha.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="relative flex min-h-screen w-full items-center justify-center bg-zinc-100 dark:bg-[#030305] px-4 py-10 transition-colors duration-200 sm:px-6 lg:px-8 overflow-hidden">
      <div className="ambient-glow-teal -top-40 -left-40 opacity-80 dark:opacity-60" />
      <div className="ambient-glow-indigo -bottom-40 -right-40 opacity-70 dark:opacity-50" />

      {mounted && (
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={toggleTheme}
          aria-label={theme === "dark" ? "Alternar para modo claro" : "Alternar para modo escuro"}
          className="fixed top-4 right-4 z-50 h-9 w-9 rounded-xl border border-zinc-200 dark:border-white/10 bg-white/80 dark:bg-white/5 backdrop-blur-md text-zinc-600 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-white/10 hover:text-zinc-900 dark:hover:text-white transition-colors duration-150 cursor-pointer"
        >
          {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </Button>
      )}

      <div className="glowing-frame relative z-10 w-full max-w-[440px] overflow-hidden rounded-3xl border border-zinc-200/80 bg-white/80 text-zinc-900 dark:border-white/10 dark:bg-[#08080c]/80 dark:text-white shadow-2xl">
        <div className="h-1 w-full bg-gradient-to-r from-teal-500 via-cyan-500 to-indigo-500" />

        <div className="p-6 sm:p-8">
          <div className="mb-6 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-zinc-900 font-mono text-xs font-black text-white dark:bg-white dark:text-black shadow-md">
                NX
              </div>
              <div>
                <div className="text-sm font-bold tracking-tight text-zinc-900 dark:text-white">
                  NexerX
                </div>
                <div className="text-[10px] font-medium tracking-wider text-zinc-500 dark:text-zinc-400">
                  CRM Freelance
                </div>
              </div>
            </div>

            <span className="inline-flex items-center gap-1.5 rounded-full border border-teal-500/20 bg-teal-500/10 px-2.5 py-1 text-[10px] font-medium text-teal-600 dark:text-teal-400">
              <ShieldCheck className="h-3 w-3" />
              Seguro
            </span>
          </div>

          {!submitted ? (
            <>
              <div className="space-y-1.5 text-left">
                <h1 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-white">
                  Recuperar acesso
                </h1>
                <p className="text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
                  Informe seu e-mail cadastrado para receber o link de acesso ao seu workspace.
                </p>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4" noValidate>
                <div className="space-y-1.5">
                  <Label
                    htmlFor="forgot-email"
                    className="text-[11px] font-semibold text-zinc-800 dark:text-zinc-200"
                  >
                    E-mail cadastrado
                  </Label>
                  <div className={glassInputWrapper}>
                    <Mail className="absolute left-3.5 h-4 w-4 text-zinc-400 dark:text-zinc-500" />
                    <Input
                      id="forgot-email"
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

                {error && (
                  <div
                    role="alert"
                    className="rounded-xl border border-red-500/20 bg-red-500/10 px-3 py-2.5 text-xs font-medium text-red-600 dark:text-red-400"
                  >
                    {error}
                  </div>
                )}

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="group relative h-10.5 w-full overflow-hidden rounded-xl bg-zinc-900 text-xs font-semibold text-white shadow-md transition-colors duration-150 hover:bg-black active:scale-[0.98] disabled:cursor-not-allowed disabled:bg-zinc-700 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-100 dark:disabled:bg-zinc-700"
                >
                  {isLoading ? (
                    <span className="inline-flex items-center justify-center gap-2">
                      <span className="flex h-4 w-4 items-center justify-center">
                        <Loader2 className="h-4 w-4 animate-spin" />
                      </span>
                      <span>Enviando...</span>
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      Enviar link de acesso
                      <ArrowRight className="h-3.5 w-3.5 transition-transform duration-150 group-hover:translate-x-0.5" />
                    </span>
                  )}
                </Button>
              </form>

              <div className="mt-5 text-center text-xs text-zinc-500 dark:text-zinc-400">
                Lembrou da senha?{" "}
                <Link
                  href="/auth"
                  className="font-semibold text-teal-600 hover:underline dark:text-teal-400 cursor-pointer"
                >
                  Voltar ao login
                </Link>
              </div>
            </>
          ) : (
            <div className="space-y-5 text-left">
              <div className="rounded-2xl border border-zinc-200 bg-zinc-100/60 p-5 dark:border-white/10 dark:bg-white/[0.03]">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
                  <CheckCircle2 className="h-5 w-5" />
                </div>
                <h2 className="text-lg font-bold tracking-tight text-zinc-900 dark:text-white">
                  Instruções enviadas!
                </h2>
                <p className="mt-2 text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
                  Se existir uma conta associada a este e-mail, as instruções de redefinição serão
                  enviadas em instantes. Verifique também sua caixa de spam.
                </p>
              </div>

              <Link
                href="/auth"
                className="inline-flex h-10.5 w-full items-center justify-center gap-2 rounded-xl border border-zinc-200 bg-white px-4 text-xs font-semibold text-zinc-800 transition-colors duration-150 hover:bg-zinc-100 dark:border-white/10 dark:bg-white/[0.04] dark:text-zinc-200 dark:hover:bg-white/[0.08] active:scale-[0.98] cursor-pointer"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                Voltar ao login
              </Link>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}