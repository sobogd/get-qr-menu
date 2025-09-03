import { NextResponse } from "next/server";
import { createDemoRestaurant } from "@/lib/createDemoRestaurant";
import { COOKIE_SLUG } from "@/constants";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const locale = typeof body?.locale === "string" ? body.locale : "en";

    // Use central helper to create demo restaurant and return slug
    const slug = await createDemoRestaurant(locale);

    const res = NextResponse.json({ ok: true, slug });
    res.cookies.set(COOKIE_SLUG, slug, {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 30, // 30 days
    });
    return res;
  } catch (e) {
    console.error("create-demo error", e);
    return NextResponse.json({ ok: false, error: "FAILED" }, { status: 500 });
  }
}
