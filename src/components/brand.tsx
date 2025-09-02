"use client";
import { QrCode } from "lucide-react";
import { Inter } from "next/font/google";
import * as React from "react";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"] });

type BrandProps = {
  size?: "sm" | "md" | "lg";
  className?: string;
};

export function Brand({ size = "md", className }: BrandProps) {
  const iconSize =
    size === "sm" ? "size-4" : size === "lg" ? "size-6" : "size-5";
  const textSize =
    size === "sm" ? "text-sm" : size === "lg" ? "text-lg" : "text-base";
  const containerH = size === "sm" ? "h-5" : size === "lg" ? "h-7" : "h-6";
  return (
    <span
      className={cn("inline-flex items-center gap-2", containerH, className)}
    >
      <QrCode className={cn(iconSize, "text-primary")} aria-hidden="true" />
      <span
        className={cn(inter.className, "font-semibold leading-none", textSize)}
      >
        Get QR Menu
      </span>
    </span>
  );
}
