"use client";

import { ReactNode, useState } from "react";
import { Sidebar } from "./sidebar";
import { Header } from "./header";
import { MobileSidebar } from "./mobile-sidebar";

interface AppShellProps {
  children: ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="flex h-screen bg-background">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
        <Sidebar />
      </aside>

      {/* Mobile Sidebar */}
      <MobileSidebar open={mobileMenuOpen} onOpenChange={setMobileMenuOpen} />

      {/* Main content */}
      <div className="flex flex-col flex-1 md:ml-64">
        <Header onMobileMenuClick={() => setMobileMenuOpen(true)} />
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
