"use client";

import { useState } from "react";
import { Watch } from "lucide-react";

import { ProfileDeviceTutorialModal } from "./profile-device-tutorial-modal";

type ProfileDeviceCardProps = {
  deviceName: string | null;
};

export function ProfileDeviceCard({ deviceName }: ProfileDeviceCardProps) {
  const [isTutorialOpen, setIsTutorialOpen] = useState(false);
  const hasDevice = Boolean(deviceName);

  return (
    <>
      <div className="col-span-2 flex flex-col items-center gap-4 rounded-xl bg-primary/8 p-5 text-center">
        <div className="flex items-center justify-center gap-3 text-primary">
          <Watch className="size-8" />
          <p className="font-heading text-4xl leading-[1.1] font-semibold text-foreground">
            Dispositivo vinculado
          </p>
        </div>

        <p className="font-heading text-2xl leading-[1.2] font-semibold text-foreground">
          {deviceName ?? "Não existe dispositivo vinculado"}
        </p>

        {!hasDevice ? (
          <p className="max-w-xl text-sm leading-relaxed text-muted-foreground">
            Para vincular um dispositivo, você pode ver o tutorial,{" "}
            <button
              type="button"
              className="font-medium text-primary underline underline-offset-4"
              onClick={() => setIsTutorialOpen(true)}
            >
              clicando aqui
            </button>
            .
          </p>
        ) : null}
      </div>

      <ProfileDeviceTutorialModal
        open={isTutorialOpen}
        onClose={() => setIsTutorialOpen(false)}
      />
    </>
  );
}
