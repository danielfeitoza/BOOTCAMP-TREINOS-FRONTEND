import { deleteSmartwatch } from "@/app/_lib/api/fetch-generated";

export async function DELETE() {
  try {
    const response = await deleteSmartwatch();

    return Response.json(response.data, { status: response.status });
  } catch {
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
