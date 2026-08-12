"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LoginForm } from "./login-form";
import { RegisterForm } from "./register-form";
import { ForgotPasswordForm } from "./forgot-password-form";
import type { AuthView } from "../types";

interface AuthShellProps {
  initialView: AuthView;
}

const viewConfig: Record<AuthView, { title: string; description: string }> = {
  login: {
    title: "Entrar no NexerX",
    description: "Digite seu e-mail para acessar o seu workspace",
  },
  register: {
    title: "Criar sua conta",
    description: "Comece a gerenciar seus projetos com autonomia",
  },
  "forgot-password": {
    title: "Recuperar senha",
    description: "Enviaremos as instruções de redefinição para seu e-mail",
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
    const root = document.documentElement;

    root.classList.toggle("dark", nextTheme === "dark");
    root.style.colorScheme = nextTheme;
    localStorage.setItem("theme", nextTheme);
    setTheme(nextTheme);
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-4 sm:p-6 bg-background selection:bg-foreground selection:text-background transition-colors duration-200">
      
      {/* Container Principal do Formulário */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="w-full max-w-[380px]"
      >
        <Card className="bg-card border border-border shadow-xl dark:shadow-[0_16px_36px_rgba(0,0,0,0.4)] rounded-2xl p-6 sm:p-7 relative overflow-hidden">
          
          {/* Header Minimalista */}
          <CardHeader className="space-y-1.5 p-0 pb-6 text-left">
            <div className="w-9 h-9 bg-foreground rounded-lg flex items-center justify-center mb-3">
              <span className="text-background font-black text-base tracking-tight">NX</span>
            </div>

            <motion.div
              key={config.title}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.15 }}
            >
              <CardTitle className="text-lg font-bold tracking-tight text-foreground">
                {config.title}
              </CardTitle>
              <CardDescription className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                {config.description}
              </CardDescription>
            </motion.div>
          </CardHeader>

          {/* Conteúdo dinâmico das telas */}
          <CardContent className="p-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={view}
                initial={{ opacity: 0, x: 4 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -4 }}
                transition={{ duration: 0.15 }}
              >
                {view === "login" && <LoginForm onSwitchView={setView} />}
                {view === "register" && <RegisterForm onSwitchView={setView} />}
                {view === "forgot-password" && (
                  <ForgotPasswordForm onSwitchView={setView} />
                )}
              </motion.div>
            </AnimatePresence>
          </CardContent>
        </Card>
      </motion.div>

      {/* Controller de Tema Discreto */}
      {mounted && (
        <div className="fixed bottom-4 right-4 z-50">
          <Button
            type="button"
            variant="outline"
            size="icon"
            className="h-9 w-9 rounded-full border-border bg-card shadow-sm hover:bg-muted active:scale-95 transition-all duration-150 cursor-pointer"
            onClick={toggleTheme}
            aria-label={theme === "dark" ? "Ativar modo claro" : "Ativar modo escuro"}
          >
            {theme === "dark" ? (
              <Sun className="h-4 w-4 text-foreground" />
            ) : (
              <Moon className="h-4 w-4 text-foreground" />
            )}
          </Button>
        </div>
      )}
    </div>
  );
}