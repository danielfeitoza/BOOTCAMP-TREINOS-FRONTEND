"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  House,
  Calendar,
  Sparkles,
  ChartNoAxesColumn,
  UserRound,
} from "lucide-react";

import { Button } from "@/components/ui/button";

const NAV_ITEMS: {
  icon: typeof House;
  href: string;
  label: string;
  isCenter?: boolean;
}[] = [
  { icon: House, href: "/", label: "Home" },
  { icon: Calendar, href: "#", label: "Agenda" },
  { icon: Sparkles, href: "#", label: "AI", isCenter: true },
  { icon: ChartNoAxesColumn, href: "#", label: "Estatísticas" },
  { icon: UserRound, href: "#", label: "Perfil" },
];

export function BottomNavbar() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 z-50 flex w-full items-center justify-center gap-6 rounded-t-4xl border-t border-border bg-card px-6 py-4">
      {NAV_ITEMS.map((item) => {
        const isActive = pathname === item.href;

        if (item.isCenter) {
          return (
            <Button
              key={item.label}
              variant="default"
              size="icon-lg"
              className="rounded-full"
              aria-label={item.label}
            >
              <item.icon className="size-6" />
            </Button>
          );
        }

        return (
          <Link key={item.label} href={item.href} aria-label={item.label}>
            <Button
              variant="ghost"
              size="icon-lg"
              className="text-muted-foreground hover:text-foreground"
              asChild
            >
              <span>
                <item.icon
                  className={`size-6 ${isActive ? "text-foreground" : ""}`}
                />
              </span>
            </Button>
          </Link>
        );
      })}
    </nav>
  );
}
