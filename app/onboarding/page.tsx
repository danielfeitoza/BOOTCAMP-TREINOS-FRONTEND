import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { authClient } from "@/app/_lib/auth-client";
import { ensureOnboarding } from "@/app/_lib/ensure-onboarding";

import { Chat } from "./_components/chat";

export default async function OnboardingPage() {
  const session = await authClient.getSession({
    fetchOptions: {
      headers: await headers(),
    },
  });

  if (!session.data?.user) {
    redirect("/auth");
  }

  await ensureOnboarding({ pathname: "/onboarding" });

  return <Chat />;
}
