"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { AuthShell } from "@/features/auth";
import type { AuthView } from "@/features/auth";

function AuthPageContent() {
  const searchParams = useSearchParams();
  const view = searchParams.get("view") as AuthView | null;

  // Validate and fallback to "login" if invalid
  const validViews: AuthView[] = ["login", "register", "forgot-password"];
  const initialView: AuthView = view && validViews.includes(view) ? view : "login";

  return <AuthShell initialView={initialView} />;
}

export default function AuthPage() {
  return (
    <Suspense fallback={<div>Carregando...</div>}>
      <AuthPageContent />
    </Suspense>
  );
}
