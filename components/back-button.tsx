"use client";

import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

type BackButtonProps = {
  className?: string;
};

export function BackButton({ className }: BackButtonProps) {
  const router = useRouter();

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      className={cn(
        "rounded-full bg-overlay-foreground/15 text-overlay-foreground hover:bg-overlay-foreground/25 hover:text-overlay-foreground",
        className,
      )}
      onClick={() => router.back()}
      aria-label="Voltar"
    >
      <ChevronLeft className="size-5" />
    </Button>
  );
}
