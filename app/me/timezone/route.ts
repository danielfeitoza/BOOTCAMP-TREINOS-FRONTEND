import { upsertUserTimezone } from "@/app/_lib/api/fetch-generated";

export async function PATCH(request: Request) {
  try {
    const body = (await request.json()) as { timezone?: string };

    if (!body.timezone) {
      return Response.json(
        { error: "Timezone is required" },
        { status: 400 },
      );
    }

    const response = await upsertUserTimezone({ timezone: body.timezone });

    return Response.json(response.data, { status: response.status });
  } catch {
    return Response.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
