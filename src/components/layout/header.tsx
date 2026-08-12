"use client";

import { useEffect, useState } from "react";
import { Menu, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface HeaderProps {
  onMobileMenuClick?: () => void;
}

export function Header({ onMobileMenuClick }: HeaderProps) {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const root = document.documentElement;
    const currentTheme = root.classList.contains("dark") ? "dark" : "light";
    setTheme(currentTheme);
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    const root = document.documentElement;

    root.classList.toggle("dark", nextTheme === "dark");
    root.style.colorScheme = nextTheme;
    localStorage.setItem("theme", nextTheme);
    setTheme(nextTheme);
  };

  return (
    <header className="flex h-16 items-center justify-between border-b bg-card px-6 py-4">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={onMobileMenuClick}
          aria-label="Abrir menu mobile"
        >
          <Menu className="h-5 w-5" />
        </Button>

        <h1 className="text-lg font-semibold text-foreground">Dashboard</h1>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex items-center rounded-full border border-border bg-muted p-1 shadow-sm">
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              "h-8 w-8 rounded-full transition-all",
              theme === "dark"
                ? "bg-foreground text-background shadow-sm"
                : "bg-background text-foreground"
            )}
            onClick={toggleTheme}
            aria-label={
              theme === "dark" ? "Ativar modo claro" : "Ativar modo escuro"
            }
            aria-pressed={theme === "dark"}
            title={theme === "dark" ? "Modo escuro ativo" : "Modo claro ativo"}
          >
            {theme === "dark" ? (
              <Sun className="h-4 w-4" />
            ) : (
              <Moon className="h-4 w-4" />
            )}
          </Button>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-9 w-9 rounded-full">
              <Avatar className="h-9 w-9">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>VK</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Perfil</DropdownMenuItem>
            <DropdownMenuItem>Configurações</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Sair</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
