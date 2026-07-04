import { discoverMovies } from "@/services/tmdb";
import { getPositivePage, optionalParam } from "@/utils/api";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const data = await discoverMovies({
    page: getPositivePage(searchParams),
    genre: optionalParam(searchParams, "genre"),
    year: optionalParam(searchParams, "year"),
    sort: optionalParam(searchParams, "sort"),
  });

  return NextResponse.json(data);
}
