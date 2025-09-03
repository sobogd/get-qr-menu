import StartCreateClient from "./StartCreateClient";

export default async function GetStartedPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return <StartCreateClient locale={locale} />;
}
