import { cookies } from "next/headers";
import { COOKIE_SLUG } from "@/constants";
import en from "@/i18n/messages/en.json";
import ru from "@/i18n/messages/ru.json";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import LoginForm from "@/components/auth/LoginForm";

type Props = {
  params: { locale: string };
};

export default async function LoginPage({ params }: Props) {
  // server-side translations: pick messages by locale
  // params can be a Promise in some Next.js runtimes — await it to be safe
  const resolvedParams = await params;
  const locale = resolvedParams?.locale ?? "en";
  const messages = locale === "ru" ? ru : en;

  // preserve cookie reading if needed for prefill or analytics
  const cookieStore = await cookies();
  const slug = cookieStore.get(COOKIE_SLUG)?.value;

  return (
    <main className="min-h-dvh flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>
            {/* emoji at start of title */}
            <span aria-hidden className="mr-2">
              🔐
            </span>
            {messages?.login?.title ?? "Sign in"}
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* render interactive form client-side, but pass server-side messages */}
          <LoginForm messages={messages} />
        </CardContent>
      </Card>
    </main>
  );
}
