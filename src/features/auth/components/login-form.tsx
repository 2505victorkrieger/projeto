"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { loginSchema, type LoginInput } from "../schemas/auth.schema";
import type { AuthView } from "../types";
import { GoogleIcon, GithubIcon } from "./social-icons";

interface LoginFormProps {
  onSwitchView: (view: AuthView) => void;
}

export function LoginForm({ onSwitchView }: LoginFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { register, handleSubmit, formState: { errors } } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (_data: LoginInput) => {
    setIsLoading(true);
    setError(null);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
    } catch (err) {
      setError(err instanceof Error ? err.message : "E-mail ou senha inválidos");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col space-y-4">
      {/* Logins Sociais em Grid de 2 Colunas */}
      <div className="grid grid-cols-2 gap-2">
        <Button
          type="button"
          variant="outline"
          className="h-9 rounded-lg border-border bg-card hover:bg-muted hover:border-foreground/30 text-foreground text-xs font-medium transition-all duration-150 cursor-pointer active:scale-[0.98]"
          disabled={isLoading}
        >
          <GoogleIcon />
          Google
        </Button>

        <Button
          type="button"
          variant="outline"
          className="h-9 rounded-lg border-border bg-card hover:bg-muted hover:border-foreground/30 text-foreground text-xs font-medium transition-all duration-150 cursor-pointer active:scale-[0.98]"
          disabled={isLoading}
        >
          <GithubIcon />
          GitHub
        </Button>
      </div>

      <div className="relative my-0.5">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-border" />
        </div>
        <div className="relative flex justify-center text-[10px] uppercase tracking-wider">
          <span className="bg-card px-2 text-muted-foreground font-medium">
            ou com e-mail
          </span>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        {/* E-mail */}
        <div className="space-y-1">
          <Label htmlFor="email" className="text-xs font-medium text-foreground">
            E-mail
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="seu@email.com"
            disabled={isLoading}
            className="h-9.5 rounded-lg bg-muted/20 border-border focus-visible:bg-card focus-visible:border-foreground focus-visible:ring-1 focus-visible:ring-foreground transition-all duration-150 text-xs"
            {...register("email")}
          />
          {errors.email && (
            <p className="text-[11px] text-destructive font-medium mt-0.5">{errors.email.message}</p>
          )}
        </div>

        {/* Senha */}
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <Label htmlFor="password" className="text-xs font-medium text-foreground">
              Senha
            </Label>
            <button
              type="button"
              onClick={() => onSwitchView("forgot-password")}
              className="text-xs text-muted-foreground hover:text-foreground font-medium transition-colors cursor-pointer"
            >
              Esqueceu?
            </button>
          </div>
          <Input
            id="password"
            type="password"
            placeholder="••••••••"
            disabled={isLoading}
            className="h-9.5 rounded-lg bg-muted/20 border-border focus-visible:bg-card focus-visible:border-foreground focus-visible:ring-1 focus-visible:ring-foreground transition-all duration-150 text-xs"
            {...register("password")}
          />
          {errors.password && (
            <p className="text-[11px] text-destructive font-medium mt-0.5">{errors.password.message}</p>
          )}
        </div>

        {/* Checkbox "Lembrar de Mim" com Hitbox Expandida */}
        <div className="pt-0.5">
          <label 
            htmlFor="remember" 
            className="inline-flex items-center gap-2 cursor-pointer group select-none py-1"
          >
            <input
              type="checkbox"
              id="remember"
              className="h-3.5 w-3.5 rounded border-border bg-muted/30 text-foreground focus:ring-1 focus:ring-foreground cursor-pointer accent-foreground"
            />
            <span className="text-xs text-muted-foreground group-hover:text-foreground transition-colors font-normal">
              Lembrar deste dispositivo
            </span>
          </label>
        </div>

        {error && (
          <div className="rounded-lg bg-destructive/10 border border-destructive/20 p-2.5 text-xs text-destructive font-medium">
            {error}
          </div>
        )}

        {/* Botão Primário com Alto Contraste e Transição de Hover */}
        <Button 
          type="submit" 
          className="w-full h-10 rounded-lg bg-foreground text-background hover:bg-foreground/90 font-semibold text-xs shadow-sm transition-all duration-150 group flex items-center justify-center active:scale-[0.98] cursor-pointer mt-1" 
          disabled={isLoading}
        >
          {isLoading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <>
              Entrar
              <ArrowRight className="w-3.5 h-3.5 ml-1.5 transition-transform duration-150 group-hover:translate-x-0.5" />
            </>
          )}
        </Button>
      </form>

      {/* Alternar para Cadastro */}
      <p className="text-center text-xs text-muted-foreground pt-1">
        Não tem uma conta?{" "}
        <button
          type="button"
          onClick={() => onSwitchView("register")}
          className="text-foreground font-semibold hover:underline underline-offset-4 cursor-pointer"
        >
          Criar conta
        </button>
      </p>
    </div>
  );
}