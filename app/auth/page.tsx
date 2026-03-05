"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { GoogleIcon } from "@/components/google-icon";
import { Button } from "@/components/ui/button";
import { authClient } from "@/_lib/auth-client";

export default function AuthPage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const [isLoading, setIsLoading] = useState(false);

  if (isPending) {
    return null;
  }

  if (session) {
    router.replace("/");
    return null;
  }

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
    <div className="relative flex h-svh w-full flex-col">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-background" />
        <Image
          src="/login-bg.png"
          alt="Background"
          fill
          className="object-cover"
          priority
        />
      </div>

      <div className="absolute left-1/2 top-12 z-10 -translate-x-1/2">
        <Image
          src="/fit-ai-logo.svg"
          alt="FIT.AI"
          width={85}
          height={38}
          priority
        />
      </div>

      <div className="z-10 mt-auto flex w-full flex-col items-center gap-15 rounded-t-4xl bg-primary px-5 pb-10 pt-12">
        <div className="flex w-full max-w-90.5 flex-col items-center gap-6">
          <h1 className="w-full text-center font-heading text-[32px] font-semibold leading-[1.05] text-primary-foreground">
            O app que vai transformar a forma como você treina.
          </h1>
          <Button
            variant="ghost"
            className="h-9.5 rounded-full bg-foreground px-6 text-sm font-semibold text-background hover:bg-foreground/90 hover:text-background dark:bg-foreground dark:hover:bg-foreground/90"
            onClick={handleGoogleLogin}
            disabled={isLoading}
          >
            <GoogleIcon />
            Fazer login com Google
          </Button>
        </div>
        <p className="text-xs text-primary-foreground/70">
          ©2026 Copyright FIT.AI. Todos os direitos reservados
        </p>
      </div>
    </div>
  );
}
