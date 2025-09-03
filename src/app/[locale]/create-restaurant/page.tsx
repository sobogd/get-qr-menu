import StartCreateClient from "./StartCreateClient";

export default function GetStartedPage({
  params,
}: {
  params: { locale: string };
}) {
  const locale = params.locale;

  // Client component will call the route handler, show the loader and redirect on success.
  return <StartCreateClient locale={locale} />;
}
