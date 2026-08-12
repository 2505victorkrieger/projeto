"use client";

import { ReactNode } from "react";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface AuthFormLayoutProps {
  title: string;
  description: string;
  children: ReactNode;
  footerText: string;
  footerLink: {
    text: string;
    href: string;
  };
}

export function AuthFormLayout({
  title,
  description,
  children,
  footerText,
  footerLink,
}: AuthFormLayoutProps) {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {children}
          <p className="text-center text-sm text-muted-foreground">
            {footerText}{" "}
            <Link
              href={footerLink.href}
              className="text-primary hover:underline font-medium"
            >
              {footerLink.text}
            </Link>
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
