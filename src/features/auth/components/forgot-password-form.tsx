"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { Loader2, ArrowLeft, ArrowRight, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { forgotPasswordSchema, type ForgotPasswordInput } from "../schemas/auth.schema";
import type { AuthView } from "../types";

interface ForgotPasswordFormProps {
  onSwitchView: (view: AuthView) => void;
}

export function ForgotPasswordForm({ onSwitchView }: ForgotPasswordFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { register, handleSubmit, formState: { errors } } = useForm<ForgotPasswordInput>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async (_data: ForgotPasswordInput) => {
    setIsLoading(true);
    setError(null);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao enviar e-mail");
    } finally {
      setIsLoading(false);
    }
  };

  if (submitted) {
    return (
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        className="flex flex-col space-y-4"
      >
        <div className="rounded-lg bg-muted/30 border border-border p-4 flex flex-col items-center text-center space-y-2">
          <CheckCircle className="w-6 h-6 text-foreground" />
          <p className="text-xs text-foreground font-medium leading-relaxed">
            Se houver uma conta associada a este e-mail, enviamos o link de recuperação.
          </p>
        </div>

        <Button
          onClick={() => onSwitchView("login")}
          variant="outline"
          className="w-full h-10 rounded-lg border-border text-foreground hover:bg-muted font-medium text-xs transition-all duration-150 cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5 mr-1.5" />
          Voltar para login
        </Button>
      </motion.div>
    );
  }

  return (
    <div className="flex flex-col space-y-4">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        <div className="space-y-1">
          <Label htmlFor="email" className="text-xs font-medium text-foreground">E-mail cadastrado</Label>
          <Input
            id="email"
            type="email"
            placeholder="seu@email.com"
            disabled={isLoading}
            className="h-9.5 rounded-lg bg-muted/20 border-border focus-visible:bg-card focus-visible:border-foreground focus-visible:ring-1 focus-visible:ring-foreground transition-all duration-150 text-xs"
            {...register("email")}
          />
          {errors.email && <p className="text-[11px] text-destructive font-medium mt-0.5">{errors.email.message}</p>}
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
              Enviar link de redefinição
              <ArrowRight className="w-3.5 h-3.5 ml-1.5 transition-transform duration-150 group-hover:translate-x-0.5" />
            </>
          )}
        </Button>
      </form>

      <div className="text-center">
        <button
          type="button"
          onClick={() => onSwitchView("login")}
          className="text-xs text-muted-foreground hover:text-foreground transition-colors inline-flex items-center font-medium cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5 mr-1" />
          Voltar para login
        </button>
      </div>
    </div>
  );
}