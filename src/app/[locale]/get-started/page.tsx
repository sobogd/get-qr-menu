import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function GetStartedPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const base = (locale || "en").toLowerCase().split("-")[0] as "en" | "ru";
  const cookieStore = await cookies();
  const rid = cookieStore.get("gqm_rid")?.value;
  if (rid) {
    redirect(`/${base}/${rid}`);
  } else {
    redirect(`/api/create-demo-ssr?locale=${base}`);
  }
}
