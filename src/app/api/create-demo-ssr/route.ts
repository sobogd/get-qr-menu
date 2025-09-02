import { NextRequest, NextResponse } from "next/server";
import { createDemoRestaurant } from "@/lib/createDemoRestaurant";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const locale = searchParams.get("locale") || "en";
  const base = locale.toLowerCase().split("-")[0] as "en" | "ru";

  const rid = await createDemoRestaurant(base);

  // Абсолютный URL для редиректа
  const host = req.headers.get("host");
  const protocol = host?.includes("localhost") ? "http" : "https";
  const url = `${protocol}://${host}/${base}/${rid}`;

  const response = NextResponse.redirect(url);
  response.cookies.set({
    name: "gqm_rid",
    value: rid,
    path: "/",
    httpOnly: true,
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 30, // 30 дней
  });
  return response;
}
