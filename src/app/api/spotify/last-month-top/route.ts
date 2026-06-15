import { NextResponse } from "next/server";

export const revalidate = 600;

export async function GET() {
  return NextResponse.json(
    { tracks: [] },
    {
      headers: {
        "Cache-Control": "public, s-maxage=600, stale-while-revalidate=120",
      },
    },
  );
}
