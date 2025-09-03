"use server";

import { createDemoRestaurant } from "@/lib/createDemoRestaurant";

export async function createDemo(locale = "en") {
  try {
    const slug = await createDemoRestaurant(locale);
    return { ok: true, slug };
  } catch (e) {
    console.error("createDemo action error", e);
    return { ok: false, error: "FAILED" };
  }
}
