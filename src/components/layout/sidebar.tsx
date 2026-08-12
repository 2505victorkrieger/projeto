"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  FolderOpen,
  CheckSquare,
  BarChart3,
  Settings,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const navigation = [
  {
    label: "Principal",
    items: [
      {
        label: "Dashboard",
        href: "/dashboard",
        icon: LayoutDashboard,
      },
    ],
  },
  {
    label: "CRM",
    items: [
      {
        label: "Clientes",
        href: "/clients",
        icon: Users,
      },
      {
        label: "Projetos",
        href: "/projects",
        icon: FolderOpen,
      },
      {
        label: "Tarefas",
        href: "/tasks",
        icon: CheckSquare,
      },
    ],
  },
  {
    label: "Financeiro",
    items: [
      {
        label: "Financeiro",
        href: "/finance",
        icon: BarChart3,
      },
    ],
  },
  {
    label: "Configurações",
    items: [
      {
        label: "Configurações",
        href: "/settings",
        icon: Settings,
      },
    ],
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="flex flex-col h-full bg-card border-r">
      {/* Logo */}
      <div className="p-6">
        <h1 className="text-2xl font-bold text-primary">NexerX</h1>
      </div>

      <Separator />

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-4 py-6">
        {navigation.map((section) => (
          <div key={section.label} className="mb-6">
            <p className="px-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
              {section.label}
            </p>
            <div className="space-y-2">
              {section.items.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;

                return (
                  <Link key={item.href} href={item.href}>
                    <Button
                      variant={isActive ? "default" : "ghost"}
                      className="w-full justify-start"
                      size="sm"
                    >
                      <Icon className="mr-2 h-4 w-4" />
                      {item.label}
                    </Button>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      <Separator />

      {/* Bottom section - placeholder for user info */}
      <div className="p-4 space-y-2">
        <Button
          variant="ghost"
          className="w-full justify-start text-xs"
          size="sm"
        >
          Usuário
        </Button>
      </div>
    </div>
  );
}
