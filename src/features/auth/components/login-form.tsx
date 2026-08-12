"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { loginSchema, type LoginInput } from "../schemas/auth.schema";
import type { AuthView } from "../types";
import { GithubIcon, GoogleIcon } from "./social-icons";

interface LoginFormProps { onSwitchView: (view: AuthView) => void; }

const inputClass = "h-11 rounded-xl border-black/[0.10] bg-white/70 px-3.5 text-sm shadow-sm shadow-black/[0.02] placeholder:text-muted-foreground/70 transition-all duration-200 focus-visible:border-foreground focus-visible:bg-white focus-visible:ring-4 focus-visible:ring-foreground/10 dark:border-white/10 dark:bg-white/[0.04] dark:focus-visible:bg-white/[0.07]";
const socialClass = "h-11 rounded-xl border-black/[0.10] bg-white/60 text-xs font-semibold text-foreground shadow-sm shadow-black/[0.02] transition-all duration-200 hover:-translate-y-0.5 hover:border-foreground/30 hover:bg-muted hover:text-foreground hover:shadow-md hover:shadow-black/10 active:translate-y-0 dark:border-white/10 dark:bg-white/[0.04] dark:hover:bg-white/10 dark:hover:text-white";

export function LoginForm({ onSwitchView }: LoginFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { register, handleSubmit, formState: { errors } } = useForm<LoginInput>({ resolver: zodResolver(loginSchema) });

  const onSubmit = async (_data: LoginInput) => {
    setIsLoading(true);
    setError(null);
    try { await new Promise((resolve) => setTimeout(resolve, 1000)); }
    catch (err) { setError(err instanceof Error ? err.message : "E-mail ou senha inválidos"); }
    finally { setIsLoading(false); }
  };

  return <div className="flex flex-col gap-5">
    <div className="grid grid-cols-2 gap-3">
      <Button type="button" variant="outline" className={socialClass} disabled={isLoading}><GoogleIcon className="mr-2 h-4 w-4" />Google</Button>
      <Button type="button" variant="outline" className={socialClass} disabled={isLoading}><GithubIcon className="mr-2 h-4 w-4" />GitHub</Button>
    </div>
    <div className="relative flex items-center"><div className="h-px flex-1 bg-border" /><span className="px-3 text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">ou use seu e-mail</span><div className="h-px flex-1 bg-border" /></div>
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-1.5"><Label htmlFor="email" className="text-xs font-semibold">E-mail</Label><Input id="email" type="email" placeholder="voce@empresa.com" disabled={isLoading} className={inputClass} {...register("email")} />{errors.email && <p className="text-xs font-medium text-destructive">{errors.email.message}</p>}</div>
      <div className="space-y-1.5"><div className="flex items-center justify-between"><Label htmlFor="password" className="text-xs font-semibold">Senha</Label><button type="button" onClick={() => onSwitchView("forgot-password")} className="text-xs font-semibold text-foreground transition-colors hover:text-muted-foreground">Esqueceu a senha?</button></div><Input id="password" type="password" placeholder="Sua senha" disabled={isLoading} className={inputClass} {...register("password")} />{errors.password && <p className="text-xs font-medium text-destructive">{errors.password.message}</p>}</div>
      <label htmlFor="remember" className="flex w-fit cursor-pointer items-center gap-2.5 py-0.5"><input type="checkbox" id="remember" className="h-4 w-4 rounded border-black/15 accent-foreground dark:border-white/20" /><span className="text-xs text-muted-foreground">Manter minha sessão ativa</span></label>
      {error && <div className="rounded-xl border border-destructive/20 bg-destructive/10 px-3 py-2.5 text-xs font-medium text-destructive">{error}</div>}
      <Button type="submit" disabled={isLoading} className="group h-12 w-full rounded-xl bg-foreground text-sm font-semibold text-background shadow-[0_12px_24px_-10px_rgba(0,0,0,0.55)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-foreground/90 hover:shadow-[0_18px_30px_-10px_rgba(0,0,0,0.65)] active:translate-y-0">{isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <>Entrar no NexerX <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" /></>}</Button>
    </form>
    <p className="pt-0.5 text-center text-xs text-muted-foreground">Ainda não tem uma conta? <button type="button" onClick={() => onSwitchView("register")} className="font-semibold text-foreground transition-colors hover:text-foreground/70">Criar conta</button></p>
  </div>;
}
