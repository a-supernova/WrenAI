import { deleteSession } from "@/lib/auth";

export async function GET(req: Request) {
  await deleteSession();
  return Response.json({});
}