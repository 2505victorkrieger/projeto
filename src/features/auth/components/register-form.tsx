"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { registerSchema, type RegisterInput } from "../schemas/auth.schema";
import type { AuthView } from "../types";
import { GithubIcon, GoogleIcon } from "./social-icons";

interface RegisterFormProps { onSwitchView: (view: AuthView) => void; }

const inputClass = "h-10.5 rounded-xl border-black/[0.10] bg-white/70 px-3.5 text-sm shadow-sm shadow-black/[0.02] placeholder:text-muted-foreground/70 transition-all duration-200 focus-visible:border-violet-500 focus-visible:bg-white focus-visible:ring-4 focus-visible:ring-violet-500/10 dark:border-white/10 dark:bg-white/[0.04] dark:focus-visible:bg-white/[0.07]";
const socialClass = "h-10 rounded-xl border-black/[0.10] bg-white/60 text-xs font-semibold text-foreground shadow-sm shadow-black/[0.02] transition-all duration-200 hover:-translate-y-0.5 hover:border-violet-500/30 hover:bg-violet-50 hover:text-violet-700 hover:shadow-md hover:shadow-violet-500/10 active:translate-y-0 dark:border-white/10 dark:bg-white/[0.04] dark:hover:bg-violet-500/10 dark:hover:text-violet-300";

export function RegisterForm({ onSwitchView }: RegisterFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { register, handleSubmit, formState: { errors } } = useForm<RegisterInput>({ resolver: zodResolver(registerSchema) });
  const onSubmit = async (_data: RegisterInput) => { setIsLoading(true); setError(null); try { await new Promise((resolve) => setTimeout(resolve, 1000)); onSwitchView("login"); } catch (err) { setError(err instanceof Error ? err.message : "Erro ao criar conta"); } finally { setIsLoading(false); } };

  return <div className="flex flex-col gap-4">
    <div className="grid grid-cols-2 gap-3"><Button type="button" variant="outline" className={socialClass} disabled={isLoading}><GoogleIcon className="mr-2 h-4 w-4" />Google</Button><Button type="button" variant="outline" className={socialClass} disabled={isLoading}><GithubIcon className="mr-2 h-4 w-4" />GitHub</Button></div>
    <div className="relative flex items-center"><div className="h-px flex-1 bg-border" /><span className="px-3 text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">ou cadastre-se</span><div className="h-px flex-1 bg-border" /></div>
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
      <div className="space-y-1"><Label htmlFor="name" className="text-xs font-semibold">Nome completo</Label><Input id="name" placeholder="Como devemos te chamar?" disabled={isLoading} className={inputClass} {...register("name")} />{errors.name && <p className="text-xs font-medium text-destructive">{errors.name.message}</p>}</div>
      <div className="space-y-1"><Label htmlFor="email" className="text-xs font-semibold">E-mail profissional</Label><Input id="email" type="email" placeholder="voce@empresa.com" disabled={isLoading} className={inputClass} {...register("email")} />{errors.email && <p className="text-xs font-medium text-destructive">{errors.email.message}</p>}</div>
      <div className="grid grid-cols-2 gap-3"><div className="space-y-1"><Label htmlFor="password" className="text-xs font-semibold">Senha</Label><Input id="password" type="password" placeholder="Crie uma senha" disabled={isLoading} className={inputClass} {...register("password")} />{errors.password && <p className="text-xs font-medium text-destructive">{errors.password.message}</p>}</div><div className="space-y-1"><Label htmlFor="confirmPassword" className="text-xs font-semibold">Confirmar senha</Label><Input id="confirmPassword" type="password" placeholder="Repita a senha" disabled={isLoading} className={inputClass} {...register("confirmPassword")} />{errors.confirmPassword && <p className="text-xs font-medium text-destructive">{errors.confirmPassword.message}</p>}</div></div>
      {error && <div className="rounded-xl border border-destructive/20 bg-destructive/10 px-3 py-2.5 text-xs font-medium text-destructive">{error}</div>}
      <Button type="submit" disabled={isLoading} className="group mt-1 h-11 w-full rounded-xl bg-gradient-to-r from-violet-600 via-indigo-600 to-blue-600 text-sm font-semibold text-white shadow-[0_10px_22px_-8px_rgba(99,102,241,0.8)] transition-all duration-300 hover:-translate-y-0.5 hover:from-violet-500 hover:via-indigo-500 hover:to-blue-500 hover:shadow-[0_16px_28px_-8px_rgba(99,102,241,0.75)] active:translate-y-0">{isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <>Criar minha conta <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" /></>}</Button>
    </form>
    <p className="pt-0.5 text-center text-xs text-muted-foreground">Já tem uma conta? <button type="button" onClick={() => onSwitchView("login")} className="font-semibold text-foreground transition-colors hover:text-violet-600 dark:hover:text-violet-400">Fazer login</button></p>
  </div>;
}
