"use client";

import { authClient } from "@/app/_lib/auth-client";

import { GlobalChatbot } from "@/components/global-chatbot";

export function AuthenticatedChatbot() {
  const { data: session, isPending } = authClient.useSession();

  if (isPending || !session?.user) {
    return null;
  }

  return <GlobalChatbot />;
}
