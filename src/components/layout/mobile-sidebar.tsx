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
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

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

interface MobileSidebarProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function MobileSidebar({ open, onOpenChange }: MobileSidebarProps) {
  const pathname = usePathname();

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="left" className="w-64 p-0">
        <SheetHeader className="p-6">
          <SheetTitle>NexerX</SheetTitle>
        </SheetHeader>

        <Separator />

        <nav className="px-4 py-6 space-y-6">
          {navigation.map((section) => (
            <div key={section.label}>
              <p className="px-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                {section.label}
              </p>
              <div className="space-y-2">
                {section.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href;

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => onOpenChange(false)}
                    >
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
      </SheetContent>
    </Sheet>
  );
}
