"use client";

import { useEffect, useId } from "react";
import { X } from "lucide-react";

import { Button } from "@/components/ui/button";

type ProfileDeviceTutorialModalProps = {
  open: boolean;
  onClose: () => void;
};

const smartphoneSteps = [
  "Abra o app Zepp no seu celular.",
  "Vá até a loja de aplicativos.",
  "Toque em App Store.",
  "Busque por FIT.AI.",
  "Toque em Install.",
];

const smartwatchSteps = [
  "Busque pelo FIT.AI.",
  "Toque nele e aguarde.",
  "O relógio vai gerar um QR Code.",
  "Escaneie o código com seu smartphone.",
  "Uma página web será aberta.",
  "Essa página informará que o dispositivo foi vinculado com sucesso.",
  "Toque em Ir para meu perfil.",
];

export function ProfileDeviceTutorialModal({
  open,
  onClose,
}: ProfileDeviceTutorialModalProps) {
  const titleId = useId();

  useEffect(() => {
    if (!open) {
      return;
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, [open, onClose]);

  if (!open) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 py-6"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="relative flex max-h-[90vh] w-full max-w-2xl flex-col gap-6 overflow-y-auto rounded-3xl bg-background p-6 text-foreground shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <Button
          type="button"
          variant="ghost"
          size="icon-sm"
          className="absolute top-4 right-4"
          onClick={onClose}
          aria-label="Fechar tutorial"
        >
          <X className="size-4" />
        </Button>

        <div className="flex flex-col gap-2 pr-10">
          <h2 id={titleId} className="font-heading text-2xl font-semibold leading-tight">
            Siga o passo a passo para vincular seu smartwatch Amazfit.
          </h2>
          <p className="text-sm text-muted-foreground">
            Seguindo esses passos, seu dispositivo estará vinculado.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <section className="rounded-2xl bg-primary/8 p-5">
            <h3 className="font-heading text-lg font-semibold">No seu smartphone:</h3>
            <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm leading-relaxed text-muted-foreground">
              {smartphoneSteps.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
          </section>

          <section className="rounded-2xl bg-primary/8 p-5">
            <h3 className="font-heading text-lg font-semibold">No seu smartwatch:</h3>
            <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm leading-relaxed text-muted-foreground">
              {smartwatchSteps.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
          </section>
        </div>
      </div>
    </div>
  );
}
