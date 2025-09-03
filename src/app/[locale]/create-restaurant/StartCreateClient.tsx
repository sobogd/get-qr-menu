"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type Props = {
  locale: string;
};

export default function StartCreateClient({ locale }: Props) {
  const [status, setStatus] = useState<"loading" | "error">("loading");
  const router = useRouter();

  useEffect(() => {
    let mounted = true;

    async function create() {
      try {
        const res = await fetch("/api/create-demo", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ locale }),
        });

        const json = await res.json();
        if (!mounted) return;

        if (res.ok && json?.slug) {
          window.location.href = `/${locale}/${json.slug}`;
        } else {
          console.error("create-demo failed", json);
          setStatus("error");
        }
      } catch (err) {
        console.error("create-demo error", err);
        if (mounted) setStatus("error");
      }
    }

    create();

    return () => {
      mounted = false;
    };
  }, [locale, router]);

  if (status === "error") {
    return (
      <main className="min-h-dvh flex items-center justify-center p-4">
        <div className="w-full max-w-md border rounded p-6">
          <h2 className="text-lg font-semibold mb-2">Failed to create demo</h2>
          <p className="text-sm text-muted-foreground">
            Something went wrong while creating the demo restaurant. Please try
            again later.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-dvh flex items-center justify-center p-4">
      <div className="w-full max-w-md border rounded bg-white">
        <div className="p-6">
          <h3 className="text-xl font-semibold mb-4">
            Creating your demo restaurant
          </h3>
          <div className="relative w-full h-2 bg-gray-200 rounded overflow-hidden mb-4">
            <div
              className="absolute inset-y-0 w-1/3 bg-green-500 rounded"
              style={{
                animation: "indeterminate 2s ease-in-out infinite",
                position: "absolute",
              }}
            />
          </div>
          <style>{`@keyframes indeterminate {0% { left: -30%; }50% { left: 50%; }100% { left: 110%; }}`}</style>
          <p className="text-sm text-muted-foreground">Preparing demo data…</p>
        </div>
      </div>
    </main>
  );
}
