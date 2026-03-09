import Image from "next/image";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { authClient } from "@/app/_lib/auth-client";

import { GoogleLoginButton } from "./_components/google-login-button";

type AuthPageProps = {
  searchParams: Promise<{
    returnTo?: string | string[];
  }>;
};

function getSingleValue(value?: string | string[]): string | undefined {
  if (Array.isArray(value)) {
    return value[0];
  }

  return value;
}

function getSafeReturnToPath(returnTo?: string): string | undefined {
  if (!returnTo) {
    return undefined;
  }

  if (!returnTo.startsWith("/") || returnTo.startsWith("//")) {
    return undefined;
  }

  return returnTo;
}

export default async function AuthPage({ searchParams }: AuthPageProps) {
  const session = await authClient.getSession({
    fetchOptions: {
      headers: await headers(),
    },
  });

  if (session.data?.user) {
    redirect("/");
  }

  const resolvedSearchParams = await searchParams;
  const returnTo = getSafeReturnToPath(
    getSingleValue(resolvedSearchParams.returnTo),
  );

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
          <GoogleLoginButton callbackPath={returnTo} />
        </div>
        <p className="text-xs text-primary-foreground/70">
          ©2026 Copyright FIT.AI. Todos os direitos reservados
        </p>
      </div>
    </div>
  );
}
