"use client";

import { useState } from "react";

import { authClient } from "@/app/_lib/auth-client";
import { GoogleIcon } from "@/components/google-icon";
import { Button } from "@/components/ui/button";

export function GoogleLoginButton() {
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleLogin = async () => {
    setIsLoading(true);

    const { error } = await authClient.signIn.social({
      provider: "google",
      callbackURL: `${process.env.NEXT_PUBLIC_BASE_URL}`,
    });

    if (error) {
      setIsLoading(false);
    }
  };

  return (
    <Button
      variant="ghost"
      className="h-9.5 rounded-full bg-foreground px-6 text-sm font-semibold text-background hover:bg-foreground/90 hover:text-background dark:bg-foreground dark:hover:bg-foreground/90"
      onClick={handleGoogleLogin}
      disabled={isLoading}
    >
      <GoogleIcon />
      Fazer login com Google
    </Button>
  );
}
