"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { forgotPasswordSchema, type ForgotPasswordInput } from "../schemas/auth.schema";
import type { AuthView } from "../types";

interface ForgotPasswordFormProps { onSwitchView: (view: AuthView) => void; }
const inputClass = "h-12 rounded-xl border-black/[0.10] bg-white/70 px-3.5 text-sm shadow-sm shadow-black/[0.02] placeholder:text-muted-foreground/70 transition-all duration-200 focus-visible:border-violet-500 focus-visible:bg-white focus-visible:ring-4 focus-visible:ring-violet-500/10 dark:border-white/10 dark:bg-white/[0.04] dark:focus-visible:bg-white/[0.07]";

export function ForgotPasswordForm({ onSwitchView }: ForgotPasswordFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { register, handleSubmit, formState: { errors } } = useForm<ForgotPasswordInput>({ resolver: zodResolver(forgotPasswordSchema) });
  const onSubmit = async (_data: ForgotPasswordInput) => { setIsLoading(true); setError(null); try { await new Promise((resolve) => setTimeout(resolve, 1000)); setSubmitted(true); } catch (err) { setError(err instanceof Error ? err.message : "Erro ao enviar e-mail"); } finally { setIsLoading(false); } };

  if (submitted) return <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="space-y-5"><div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/[0.07] p-5"><div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400"><CheckCircle2 className="h-5 w-5" /></div><p className="text-sm font-semibold text-foreground">Confira sua caixa de entrada.</p><p className="mt-1.5 text-sm leading-6 text-muted-foreground">Se encontrarmos uma conta com este e-mail, enviaremos um link seguro para redefinir sua senha.</p></div><Button type="button" variant="outline" onClick={() => onSwitchView("login")} className="h-11 w-full rounded-xl border-black/[0.1] bg-white/60 text-sm font-semibold transition-all hover:bg-violet-50 hover:text-violet-700 dark:border-white/10 dark:bg-white/[0.04] dark:hover:bg-violet-500/10 dark:hover:text-violet-300"><ArrowLeft className="mr-2 h-4 w-4" />Voltar para login</Button></motion.div>;

  return <div className="space-y-6"><form onSubmit={handleSubmit(onSubmit)} className="space-y-5"><div className="space-y-1.5"><Label htmlFor="email" className="text-xs font-semibold">E-mail cadastrado</Label><Input id="email" type="email" placeholder="voce@empresa.com" disabled={isLoading} className={inputClass} {...register("email")} />{errors.email && <p className="text-xs font-medium text-destructive">{errors.email.message}</p>}</div>{error && <div className="rounded-xl border border-destructive/20 bg-destructive/10 px-3 py-2.5 text-xs font-medium text-destructive">{error}</div>}<Button type="submit" disabled={isLoading} className="group h-12 w-full rounded-xl bg-gradient-to-r from-violet-600 via-indigo-600 to-blue-600 text-sm font-semibold text-white shadow-[0_10px_22px_-8px_rgba(99,102,241,0.8)] transition-all duration-300 hover:-translate-y-0.5 hover:from-violet-500 hover:via-indigo-500 hover:to-blue-500 hover:shadow-[0_16px_28px_-8px_rgba(99,102,241,0.75)] active:translate-y-0">{isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <>Enviar link de acesso <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" /></>}</Button></form><button type="button" onClick={() => onSwitchView("login")} className="mx-auto flex items-center gap-1.5 text-xs font-semibold text-muted-foreground transition-colors hover:text-violet-600 dark:hover:text-violet-400"><ArrowLeft className="h-3.5 w-3.5" />Voltar para login</button></div>;
}
