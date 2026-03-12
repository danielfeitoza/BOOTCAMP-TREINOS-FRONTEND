"use client";

import { useEffect, useId } from "react";
import { X } from "lucide-react";

import { Button } from "@/components/ui/button";

type ProfileDeviceUnlinkModalProps = {
  open: boolean;
  isLoading: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

export function ProfileDeviceUnlinkModal({
  open,
  isLoading,
  onClose,
  onConfirm,
}: ProfileDeviceUnlinkModalProps) {
  const titleId = useId();

  useEffect(() => {
    if (!open) {
      return;
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && !isLoading) {
        onClose();
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isLoading, onClose, open]);

  if (!open) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 py-6"
      onClick={isLoading ? undefined : onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="relative flex w-full max-w-md flex-col gap-5 rounded-3xl bg-background p-6 text-foreground shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <Button
          type="button"
          variant="ghost"
          size="icon-sm"
          className="absolute top-4 right-4"
          onClick={onClose}
          aria-label="Fechar confirmação"
          disabled={isLoading}
        >
          <X className="size-4" />
        </Button>

        <div className="flex flex-col gap-2 pr-10">
          <h2 id={titleId} className="font-heading text-2xl font-semibold leading-tight">
            Desvincular smartwatch
          </h2>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Você tem certeza que quer desvincular o smartwatch?
          </p>
        </div>

        <div className="flex justify-end gap-3">
          <Button type="button" variant="outline" onClick={onClose} disabled={isLoading}>
            Não
          </Button>
          <Button type="button" variant="destructive" onClick={onConfirm} disabled={isLoading}>
            {isLoading ? "Desvinculando..." : "Sim"}
          </Button>
        </div>
      </div>
    </div>
  );
}
