"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Moon, ShieldCheck, Sparkles, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LoginForm } from "./login-form";
import { RegisterForm } from "./register-form";
import { ForgotPasswordForm } from "./forgot-password-form";
import type { AuthView } from "../types";

interface AuthShellProps {
  initialView: AuthView;
}

const viewConfig: Record<AuthView, { eyebrow: string; title: string; description: string }> = {
  login: {
    eyebrow: "Bem-vindo de volta",
    title: "Entre no seu espaço.",
    description: "Continue de onde parou e mantenha seu trabalho em movimento.",
  },
  register: {
    eyebrow: "Comece sem custo",
    title: "Seu melhor trabalho começa aqui.",
    description: "Organize clientes, projetos e rotina em um só lugar.",
  },
  "forgot-password": {
    eyebrow: "Acesso seguro",
    title: "Vamos recuperar seu acesso.",
    description: "Informe seu e-mail e enviaremos as próximas instruções.",
  },
};

export function AuthShell({ initialView }: AuthShellProps) {
  const [view, setView] = useState<AuthView>(initialView);
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [mounted, setMounted] = useState(false);
  const config = viewConfig[view];

  useEffect(() => {
    setMounted(true);
    const root = document.documentElement;
    const isDark = root.classList.contains("dark") ||
      (!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches);
    setTheme(isDark ? "dark" : "light");
    root.classList.toggle("dark", isDark);
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    document.documentElement.classList.toggle("dark", nextTheme === "dark");
    document.documentElement.style.colorScheme = nextTheme;
    localStorage.setItem("theme", nextTheme);
    setTheme(nextTheme);
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#f7f7f8] px-4 py-6 selection:bg-violet-600 selection:text-white dark:bg-[#09090b] sm:px-6 lg:p-8">
      <div className="auth-grid pointer-events-none absolute inset-0 opacity-50 dark:opacity-20" />
      <div className="pointer-events-none absolute -left-32 top-[-12rem] h-[32rem] w-[32rem] rounded-full bg-violet-400/20 blur-[100px] dark:bg-violet-600/15" />
      <div className="pointer-events-none absolute -right-28 bottom-[-12rem] h-[28rem] w-[28rem] rounded-full bg-blue-400/20 blur-[100px] dark:bg-blue-500/10" />

      <div className="relative mx-auto grid min-h-[calc(100vh-3rem)] w-full max-w-[1180px] overflow-hidden rounded-[2rem] border border-black/[0.07] bg-white/70 shadow-[0_28px_80px_-32px_rgba(15,23,42,0.32)] backdrop-blur-xl dark:border-white/[0.09] dark:bg-white/[0.03] lg:grid-cols-[1.08fr_0.92fr]">
        <section className="relative hidden overflow-hidden bg-[#111225] p-10 text-white lg:flex lg:flex-col xl:p-14">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_16%,rgba(139,92,246,0.55),transparent_25%),radial-gradient(circle_at_80%_84%,rgba(59,130,246,0.38),transparent_29%)]" />
          <div className="absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(255,255,255,.07)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.07)_1px,transparent_1px)] [background-size:44px_44px]" />
          <div className="relative flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-sm font-black tracking-[-0.12em] shadow-lg shadow-black/20">NX</div>
            <span className="text-base font-semibold tracking-[-0.02em]">NexerX</span>
          </div>

          <div className="relative my-auto max-w-md py-14">
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-[11px] font-medium tracking-wide text-violet-100 backdrop-blur-sm">
              <Sparkles className="h-3.5 w-3.5" />
              Feito para quem faz acontecer
            </div>
            <h1 className="text-4xl font-semibold leading-[1.08] tracking-[-0.055em] xl:text-5xl">Menos operação.<br />Mais impulso.</h1>
            <p className="mt-6 max-w-sm text-sm leading-6 text-violet-100/75">O espaço de trabalho que deixa seu negócio mais organizado, claro e pronto para crescer.</p>
          </div>

          <div className="relative grid grid-cols-2 gap-3">
            <div className="rounded-2xl border border-white/10 bg-white/[0.08] p-4 backdrop-blur-sm">
              <div className="mb-5 h-1.5 w-16 rounded-full bg-violet-300" />
              <p className="text-2xl font-semibold tracking-[-0.04em]">Tudo em foco</p>
              <p className="mt-1 text-xs text-violet-100/60">Clientes, projetos e finanças.</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.08] p-4 backdrop-blur-sm">
              <ShieldCheck className="mb-4 h-5 w-5 text-violet-200" />
              <p className="text-xs font-medium leading-5 text-violet-100">Seu espaço é privado, seguro e sempre seu.</p>
            </div>
          </div>
        </section>

        <section className="relative flex min-h-full items-center justify-center px-5 py-12 sm:px-10 lg:px-14">
          <div className="absolute left-6 top-6 flex items-center gap-2 lg:hidden">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#111225] text-[11px] font-black tracking-[-0.1em] text-white">NX</div>
            <span className="text-sm font-semibold tracking-[-0.02em] text-foreground">NexerX</span>
          </div>
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }} className="w-full max-w-[390px] pt-10 lg:pt-0">
            <Card className="border-0 bg-transparent p-0 shadow-none">
              <CardHeader className="p-0 pb-7">
                <div className="mb-5 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-violet-600 dark:text-violet-400">
                  <span className="h-px w-5 bg-current" />
                  {config.eyebrow}
                </div>
                <AnimatePresence mode="wait">
                  <motion.div key={view} initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }} transition={{ duration: 0.2 }}>
                    <CardTitle className="text-[2rem] font-semibold leading-[1.08] tracking-[-0.045em] text-foreground sm:text-[2.25rem]">{config.title}</CardTitle>
                    <CardDescription className="mt-3 max-w-sm text-sm leading-6 text-muted-foreground">{config.description}</CardDescription>
                  </motion.div>
                </AnimatePresence>
              </CardHeader>
              <CardContent className="p-0">
                <AnimatePresence mode="wait">
                  <motion.div key={view} initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -12 }} transition={{ duration: 0.22, ease: "easeOut" }}>
                    {view === "login" && <LoginForm onSwitchView={setView} />}
                    {view === "register" && <RegisterForm onSwitchView={setView} />}
                    {view === "forgot-password" && <ForgotPasswordForm onSwitchView={setView} />}
                  </motion.div>
                </AnimatePresence>
              </CardContent>
            </Card>
            <div className="mt-8 flex items-center justify-center gap-2 text-[11px] text-muted-foreground"><Check className="h-3.5 w-3.5 text-emerald-500" /> Seus dados são protegidos com segurança.</div>
          </motion.div>
        </section>
      </div>

      {mounted && <Button type="button" variant="outline" size="icon" className="fixed bottom-5 right-5 z-20 h-10 w-10 rounded-full border-black/10 bg-white/80 shadow-lg shadow-black/5 backdrop-blur hover:scale-105 hover:bg-white dark:border-white/10 dark:bg-white/10 dark:hover:bg-white/15" onClick={toggleTheme} aria-label={theme === "dark" ? "Ativar modo claro" : "Ativar modo escuro"}>{theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}</Button>}
    </main>
  );
}
