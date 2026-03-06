"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  House,
  Calendar,
  Sparkles,
  ChartNoAxesColumn,
  UserRound,
} from "lucide-react";

import { Button } from "@/components/ui/button";

type BottomNavbarContentProps = {
  agendaHref: string;
};

const NAV_ITEMS: {
  icon: typeof House;
  href: string;
  label: string;
  isCenter?: boolean;
  isWorkoutPlanRoute?: boolean;
}[] = [
  { icon: House, href: "/", label: "Home" },
  {
    icon: Calendar,
    href: "",
    label: "Agenda",
    isWorkoutPlanRoute: true,
  },
  { icon: Sparkles, href: "#", label: "AI", isCenter: true },
  { icon: ChartNoAxesColumn, href: "#", label: "Estatísticas" },
  { icon: UserRound, href: "#", label: "Perfil" },
];

export function BottomNavbarContent({ agendaHref }: BottomNavbarContentProps) {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 z-50 flex w-full items-center justify-center gap-6 rounded-t-4xl border-t border-border bg-card px-6 py-4">
      {NAV_ITEMS.map((item) => {
        const href = item.isWorkoutPlanRoute ? agendaHref : item.href;
        const isWorkoutPlanPath = pathname.startsWith("/workout-plans/");
        const isActive = item.isWorkoutPlanRoute
          ? isWorkoutPlanPath
          : pathname === href;

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
          <Link key={item.label} href={href} aria-label={item.label}>
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
