"use client";

import { useRouter } from "next/navigation";

import { authClient } from "@/_lib/auth-client";

export default function Home() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  if (isPending) {
    return null;
  }

  if (!session) {
    router.replace("/auth");
    return null;
  }

  return (
    <div className="flex min-h-svh items-center justify-center">
      <p className="text-foreground">Bem-vindo, {session.user.name}!</p>
    </div>
  );
}
