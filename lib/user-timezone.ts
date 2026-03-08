const LAST_SENT_TIMEZONE_KEY = "fitai:last-sent-timezone";

export function detectUserTimezone() {
  try {
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone?.trim();

    if (!timezone) {
      return null;
    }

    return timezone;
  } catch {
    return null;
  }
}

export function getLastSentTimezone() {
  if (typeof window === "undefined") {
    return null;
  }

  return localStorage.getItem(LAST_SENT_TIMEZONE_KEY);
}

export function setLastSentTimezone(timezone: string) {
  if (typeof window === "undefined") {
    return;
  }

  localStorage.setItem(LAST_SENT_TIMEZONE_KEY, timezone);
}

export async function upsertUserTimezone(timezone: string) {
  const response = await fetch("/me/timezone", {
    method: "PATCH",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ timezone }),
  });

  if (!response.ok) {
    throw new Error("Failed to upsert timezone");
  }
}
