"use client";

import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

import { authClient } from "@/app/_lib/auth-client";
import { Button } from "@/components/ui/button";

export function ProfileLogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    const { error } = await authClient.signOut();

    if (!error) {
      router.replace("/auth");
    }
  };

  return (
    <Button
      type="button"
      variant="ghost"
      className="h-auto gap-2 rounded-full px-4 py-2 text-base font-semibold text-destructive hover:bg-transparent hover:text-destructive"
      onClick={handleLogout}
    >
      Sair da conta
      <LogOut className="size-4" />
    </Button>
  );
}
