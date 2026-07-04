import { discoverMovies } from "@/services/tmdb";
import { getPositivePage, optionalParam } from "@/utils/api";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const data = await discoverMovies({
    page: getPositivePage(searchParams),
    query: optionalParam(searchParams, "query"),
  });

  return NextResponse.json(data);
}
