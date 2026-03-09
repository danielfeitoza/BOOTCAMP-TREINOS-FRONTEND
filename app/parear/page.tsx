import Link from "next/link";
import { headers } from "next/headers";
import { Watch } from "lucide-react";
import { redirect } from "next/navigation";

import { authClient } from "@/app/_lib/auth-client";
import { pairSmartwatch } from "@/app/_lib/services/smartwatch";
import { Button } from "@/components/ui/button";

type PairPageProps = {
  searchParams: Promise<{
    deviceCode?: string | string[];
    deviceName?: string | string[];
  }>;
};

const UUID_REGEX =
  /^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$/;

function getSingleValue(value?: string | string[]): string | undefined {
  if (Array.isArray(value)) {
    return value[0];
  }

  return value;
}

function decodeDeviceName(value: string): string {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}

function buildReturnToPath({
  deviceCode,
  deviceName,
}: {
  deviceCode?: string;
  deviceName?: string;
}): string {
  const params = new URLSearchParams();

  if (deviceCode) {
    params.set("deviceCode", deviceCode);
  }

  if (deviceName) {
    params.set("deviceName", deviceName);
  }

  const queryString = params.toString();

  if (!queryString) {
    return "/parear";
  }

  return `/parear?${queryString}`;
}

export default async function PairPage({ searchParams }: PairPageProps) {
  const resolvedSearchParams = await searchParams;
  const deviceCode = getSingleValue(resolvedSearchParams.deviceCode);
  const rawDeviceName = getSingleValue(resolvedSearchParams.deviceName);
  const decodedDeviceName = rawDeviceName ? decodeDeviceName(rawDeviceName) : "";
  const deviceName = decodedDeviceName.trim();
  const returnTo = buildReturnToPath({ deviceCode, deviceName: rawDeviceName });

  const session = await authClient.getSession({
    fetchOptions: {
      headers: await headers(),
    },
  });

  if (!session.data?.user) {
    redirect(`/auth?returnTo=${encodeURIComponent(returnTo)}`);
  }

  const hasValidDeviceCode = Boolean(deviceCode && UUID_REGEX.test(deviceCode));
  const hasValidDeviceName = Boolean(deviceName);

  if (!hasValidDeviceCode || !hasValidDeviceName) {
    return (
      <div className="flex min-h-svh flex-col items-center justify-center bg-background px-5">
        <div className="flex w-full max-w-md flex-col items-center gap-4 rounded-2xl border border-border bg-card p-6 text-center">
          <h1 className="font-heading text-2xl font-semibold text-foreground">
            Não foi possível vincular o dispositivo
          </h1>
          <p className="text-sm text-muted-foreground">
            Verifique se o link de pareamento contém os parâmetros corretos e tente
            novamente.
          </p>
          <Button asChild className="w-full">
            <Link href="/">Voltar para o início</Link>
          </Button>
        </div>
      </div>
    );
  }

  const response = await pairSmartwatch({
    deviceCode,
    deviceName,
  });

  if (response.status === 401) {
    redirect(`/auth?returnTo=${encodeURIComponent(returnTo)}`);
  }

  if (response.status === 200) {
    return (
      <div className="flex min-h-svh flex-col items-center justify-center bg-background px-5">
        <div className="flex w-full max-w-md flex-col items-center gap-4 rounded-2xl border border-border bg-card p-6 text-center">
          <div className="flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
            <Watch className="size-6" />
          </div>
          <h1 className="font-heading text-2xl font-semibold text-foreground">
            Dispositivo vinculado com sucesso
          </h1>
          <p className="text-sm text-muted-foreground">{deviceName}</p>
          <Button asChild className="w-full">
            <Link href="/profile">Ir para meu perfil</Link>
          </Button>
        </div>
      </div>
    );
  }

  const errorMessage =
    response.status === 409 &&
    response.data.code === "SMARTWATCH_DEVICE_CODE_IN_USE"
      ? "Este dispositivo já está vinculado a outra conta."
      : "Não foi possível concluir o pareamento agora. Tente novamente em instantes.";

  return (
    <div className="flex min-h-svh flex-col items-center justify-center bg-background px-5">
      <div className="flex w-full max-w-md flex-col items-center gap-4 rounded-2xl border border-border bg-card p-6 text-center">
        <h1 className="font-heading text-2xl font-semibold text-foreground">
          Pareamento não concluído
        </h1>
        <p className="text-sm text-muted-foreground">{errorMessage}</p>
        <Button asChild className="w-full">
          <Link href="/">Voltar para o início</Link>
        </Button>
      </div>
    </div>
  );
}
