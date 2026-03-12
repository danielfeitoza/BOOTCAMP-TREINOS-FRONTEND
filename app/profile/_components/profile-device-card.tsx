"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Watch } from "lucide-react";

import { ProfileDeviceTutorialModal } from "./profile-device-tutorial-modal";
import { ProfileDeviceUnlinkModal } from "./profile-device-unlink-modal";

type ProfileDeviceCardProps = {
  deviceName: string | null;
};

export function ProfileDeviceCard({ deviceName }: ProfileDeviceCardProps) {
  const router = useRouter();
  const [currentDeviceName, setCurrentDeviceName] = useState(deviceName);
  const [isTutorialOpen, setIsTutorialOpen] = useState(false);
  const [isUnlinkModalOpen, setIsUnlinkModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const hasDevice = Boolean(currentDeviceName);

  const handleDeleteSmartwatch = async () => {
    setIsDeleting(true);

    try {
      const response = await fetch("/profile/smartwatch", {
        method: "DELETE",
      });

      if (response.status === 401) {
        router.push("/auth");
        return;
      }

      if (response.status === 200 || response.status === 404) {
        setCurrentDeviceName(null);
        setIsUnlinkModalOpen(false);
        router.refresh();
      }
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <div className="col-span-2 flex flex-col items-center gap-4 rounded-xl bg-primary/8 p-5 text-center">
        <div className="flex items-center justify-center gap-3 text-primary">
          <Watch className="size-8" />
          <p className="font-heading text-[22px] leading-[1.1] font-semibold text-foreground">
            Dispositivo vinculado
          </p>
        </div>

        <p className="font-heading text-[16px] leading-[1.2] font-semibold text-foreground">
          {currentDeviceName ?? "Não existe dispositivo vinculado"}
        </p>

        {hasDevice ? (
          <p className="max-w-xl text-sm leading-relaxed text-muted-foreground">
            Remover dispositivo?{" "}
            <button
              type="button"
              className="font-medium text-destructive underline underline-offset-4"
              onClick={() => setIsUnlinkModalOpen(true)}
            >
              Desvincular smartwatch
            </button>
            .
          </p>
        ) : (
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
        )}
      </div>

      <ProfileDeviceTutorialModal
        open={isTutorialOpen}
        onClose={() => setIsTutorialOpen(false)}
      />
      <ProfileDeviceUnlinkModal
        open={isUnlinkModalOpen}
        isLoading={isDeleting}
        onClose={() => setIsUnlinkModalOpen(false)}
        onConfirm={handleDeleteSmartwatch}
      />
    </>
  );
}
