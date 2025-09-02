"use client";
import QRCode from "react-qr-code";
import { cn } from "@/lib/utils";

export function QrPreview({
  url = "https://example.com/menu",
  className,
}: {
  url?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "inline-flex items-center justify-center p-4 rounded-xl border bg-card",
        className
      )}
    >
      <div className="bg-white p-3 rounded-md shadow-sm">
        <QRCode value={url} size={140} bgColor="#ffffff" fgColor="#111111" />
      </div>
    </div>
  );
}
