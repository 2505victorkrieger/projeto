"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { registerSchema, type RegisterInput } from "../schemas/auth.schema";
import type { AuthView } from "../types";
import { GoogleIcon, GithubIcon } from "./social-icons";

interface RegisterFormProps {
  onSwitchView: (view: AuthView) => void;
}

export function RegisterForm({ onSwitchView }: RegisterFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { register, handleSubmit, formState: { errors } } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (_data: RegisterInput) => {
    setIsLoading(true);
    setError(null);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      onSwitchView("login");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao criar conta");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col space-y-4">
      {/* Logins Sociais */}
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
            ou cadastre-se
          </span>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-2.5">
        <div className="space-y-1">
          <Label htmlFor="name" className="text-xs font-medium text-foreground">Nome completo</Label>
          <Input
            id="name"
            placeholder="Seu nome"
            disabled={isLoading}
            className="h-9 rounded-lg bg-muted/20 border-border focus-visible:bg-card focus-visible:border-foreground focus-visible:ring-1 focus-visible:ring-foreground transition-all duration-150 text-xs"
            {...register("name")}
          />
          {errors.name && <p className="text-[11px] text-destructive font-medium mt-0.5">{errors.name.message}</p>}
        </div>

        <div className="space-y-1">
          <Label htmlFor="email" className="text-xs font-medium text-foreground">E-mail</Label>
          <Input
            id="email"
            type="email"
            placeholder="seu@email.com"
            disabled={isLoading}
            className="h-9 rounded-lg bg-muted/20 border-border focus-visible:bg-card focus-visible:border-foreground focus-visible:ring-1 focus-visible:ring-foreground transition-all duration-150 text-xs"
            {...register("email")}
          />
          {errors.email && <p className="text-[11px] text-destructive font-medium mt-0.5">{errors.email.message}</p>}
        </div>

        <div className="space-y-1">
          <Label htmlFor="password" className="text-xs font-medium text-foreground">Senha</Label>
          <Input
            id="password"
            type="password"
            placeholder="••••••••"
            disabled={isLoading}
            className="h-9 rounded-lg bg-muted/20 border-border focus-visible:bg-card focus-visible:border-foreground focus-visible:ring-1 focus-visible:ring-foreground transition-all duration-150 text-xs"
            {...register("password")}
          />
          {errors.password && <p className="text-[11px] text-destructive font-medium mt-0.5">{errors.password.message}</p>}
        </div>

        <div className="space-y-1">
          <Label htmlFor="confirmPassword" className="text-xs font-medium text-foreground">Confirmar senha</Label>
          <Input
            id="confirmPassword"
            type="password"
            placeholder="••••••••"
            disabled={isLoading}
            className="h-9 rounded-lg bg-muted/20 border-border focus-visible:bg-card focus-visible:border-foreground focus-visible:ring-1 focus-visible:ring-foreground transition-all duration-150 text-xs"
            {...register("confirmPassword")}
          />
          {errors.confirmPassword && <p className="text-[11px] text-destructive font-medium mt-0.5">{errors.confirmPassword.message}</p>}
        </div>

        {error && (
          <div className="rounded-lg bg-destructive/10 border border-destructive/20 p-2.5 text-xs text-destructive font-medium">
            {error}
          </div>
        )}

        <Button 
          type="submit" 
          className="w-full h-10 rounded-lg bg-foreground text-background hover:bg-foreground/90 font-semibold text-xs shadow-sm transition-all duration-150 group flex items-center justify-center active:scale-[0.98] cursor-pointer mt-1" 
          disabled={isLoading}
        >
          {isLoading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <>
              Criar conta
              <ArrowRight className="w-3.5 h-3.5 ml-1.5 transition-transform duration-150 group-hover:translate-x-0.5" />
            </>
          )}
        </Button>
      </form>

      <p className="text-center text-xs text-muted-foreground pt-1">
        Já tem uma conta?{" "}
        <button
          type="button"
          onClick={() => onSwitchView("login")}
          className="text-foreground font-semibold hover:underline underline-offset-4 cursor-pointer"
        >
          Fazer login
        </button>
      </p>
    </div>
  );
}