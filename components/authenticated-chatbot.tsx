"use client";

import { useEffect, useRef } from "react";

import { authClient } from "@/app/_lib/auth-client";
import {
  detectUserTimezone,
  getLastSentTimezone,
  setLastSentTimezone,
  upsertUserTimezone,
} from "@/lib/user-timezone";

import { GlobalChatbot } from "@/components/global-chatbot";

export function AuthenticatedChatbot() {
  const { data: session, isPending } = authClient.useSession();
  const isSyncingTimezoneRef = useRef(false);

  useEffect(() => {
    if (isPending || !session?.user || isSyncingTimezoneRef.current) {
      return;
    }

    const timezone = detectUserTimezone();

    if (!timezone || getLastSentTimezone() === timezone) {
      return;
    }

    isSyncingTimezoneRef.current = true;

    const syncTimezone = async () => {
      try {
        await upsertUserTimezone(timezone);
        setLastSentTimezone(timezone);
      } catch {
      } finally {
        isSyncingTimezoneRef.current = false;
      }
    };

    void syncTimezone();
  }, [isPending, session?.user]);

  if (isPending || !session?.user) {
    return null;
  }

  return <GlobalChatbot />;
}
