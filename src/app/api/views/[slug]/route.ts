import { NextRequest, NextResponse } from "next/server";
import { redis } from "@/lib/redis";
import { warn } from "console";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;

  if (!slug) {
    return NextResponse.json({ error: "slug mancante" }, { status: 400 });
  }

  const views = await redis.incr(`pageviews:post:${slug}`);
  return NextResponse.json({ views });
}

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;

  if (!slug) {
    return NextResponse.json({ error: "Slug mancante" }, { status: 400 });
  }

  const views = (await redis.get<number>(`pageviews:post:${slug}`)) || 0;

  return NextResponse.json({ views });
}
