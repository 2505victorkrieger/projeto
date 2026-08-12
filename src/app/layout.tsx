import type { Metadata } from "next";
import { ReactNode } from "react";
import { QueryProvider } from "@/providers/query-provider";
import { ThemeInitializer } from "@/components/theme/theme-init";
import "./globals.css";

export const metadata: Metadata = {
  title: "NexerX - CRM para Freelancers",
  description: "Gerencie seus clientes, projetos e finanças com facilidade",
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body>
        <ThemeInitializer />
        <QueryProvider>
          {children}
        </QueryProvider>
      </body>
    </html>
  );
}
