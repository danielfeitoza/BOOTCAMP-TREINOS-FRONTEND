import { cookies } from "next/headers";

function getApiBaseUrl() {
  return process.env.NEXT_PUBLIC_API_URL;
}

export async function POST(request: Request) {
  const apiBaseUrl = getApiBaseUrl();

  if (!apiBaseUrl) {
    return Response.json(
      { message: "NEXT_PUBLIC_API_URL não configurada." },
      { status: 500 },
    );
  }

  const cookieStore = await cookies();
  const body = await request.text();
  const contentType = request.headers.get("content-type");

  const response = await fetch(`${apiBaseUrl}/ai`, {
    method: "POST",
    headers: {
      ...(contentType ? { "content-type": contentType } : {}),
      cookie: cookieStore.toString(),
    },
    body,
  });

  return new Response(response.body, {
    status: response.status,
    headers: response.headers,
  });
}
