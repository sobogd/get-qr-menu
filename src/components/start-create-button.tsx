"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export function CreateNewButton({
  base,
  className,
  children,
}: {
  base: "en" | "ru";
  className?: string;
  children?: React.ReactNode;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  return (
    <Button
      className={className}
      disabled={loading}
      onClick={async () => {
        try {
          setLoading(true);
          const res = await fetch("/api/create-demo", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ locale: base }),
          });
          const data = await res.json();
          const rid = data?.restaurantId as string | undefined;
          if (rid) {
            router.push(`/${base}/${rid}`);
          } else {
            router.push(`/${base}`);
          }
        } finally {
          setLoading(false);
        }
      }}
    >
      {loading
        ? base === "ru"
          ? "Создаём…"
          : "Creating…"
        : children ?? (base === "ru" ? "Создать" : "Create")}
    </Button>
  );
}
