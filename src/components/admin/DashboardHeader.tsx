"use client";

// ...existing code...
import Link from "next/link";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { ChangeEvent } from "react";
import { QrCode, Copy, Settings, Plus } from "lucide-react";

interface DashboardHeaderProps {
  base: "en" | "ru";
  restaurantId: string;
  firstCategoryId?: string;
  query: string;
  onQueryChange: (value: string) => void;
  onAddItem?: () => void;
}

export function DashboardHeader({
  base,
  restaurantId,
  firstCategoryId,
  query,
  onQueryChange,
  onAddItem,
}: DashboardHeaderProps) {
  const t = useTranslations("Dashboard.header");
  // copy feedback state intentionally omitted (not used)

  const copyLink = () => {
    const url = `${location.origin}/${base}/${restaurantId}`;
    navigator.clipboard.writeText(url);
  };

  const publicUrl = `https://${restaurantId}.get-qr-menu.com`;
  const displayPublicUrl = publicUrl.replace(/^https?:\/\//, "");

  return (
    <div className="pt-2 sm:pt-0">
      <div className="mb-4 w-full">
        <div className="flex flex-col items-center justify-center">
          <div className="w-full bg-muted/50 rounded flex flex-col items-center gap-2 text-center">
            <div className="flex flex-col sm:flex-row items-center sm:justify-between w-full gap-2 py-1">
              <div className="flex flex-col sm:flex-row items-center gap-0 sm:gap-1 text-sm px-3 w-full sm:w-auto justify-center text-center">
                <span className="mb-1 sm:mb-0 text-xs sm:text-sm">
                  {t("liveNote")}:
                </span>
                <Link href={publicUrl} className="w-full sm:w-auto">
                  <Button
                    variant="link"
                    size="sm"
                    className="!px-0 !py-0 sm:py-1 !h-auto w-full sm:w-auto truncate"
                  >
                    <span className="text-xs sm:text-sm">
                      {displayPublicUrl}
                    </span>
                  </Button>
                </Link>
              </div>
              <div className="flex flex-col sm:flex-row items-center gap-0 sm:gap-3 w-full sm:w-auto justify-center sm:justify-end mt-2 sm:mt-0 pr-2">
                <span className="text-muted-foreground text-xs items-center sm:mr-4 mr-0">
                  Share your menu with guests:
                </span>
                <div className="flex items-center gap-2">
                  <Button
                    variant="link"
                    size="sm"
                    onClick={copyLink}
                    className="!px-2"
                  >
                    <QrCode className="h-4 w-4" />
                    <span className="text-xs">{t("getQr")}</span>
                  </Button>
                  <Button
                    variant="link"
                    size="sm"
                    onClick={copyLink}
                    className="!px-2"
                  >
                    <Copy className="h-4 w-4" />
                    <span className="text-xs">{t("copyLink")}</span>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="sticky top-0 z-20 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60 mb-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 sm:gap-3">
          <div className="hidden sm:flex sm:min-w-0 sm:flex-1">
            <Input
              value={query}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                onQueryChange(e.target.value)
              }
              placeholder={t("searchPlaceholder")}
              className="w-full max-h-8"
            />
          </div>
          <div className="flex flex-col sm:flex-row flex-wrap gap-2 sm:gap-3 items-center justify-end">
            {/* reorder button removed - ordering is handled in the dashboard */}
            <Link
              href={`/${base}/${restaurantId}/settings`}
              className="w-full sm:w-auto"
            >
              <Button
                size="sm"
                variant="outline"
                className="w-full sm:w-auto px-3 py-1 text-sm"
              >
                <Settings className="mr-0.5 h-4 w-4" />
                <span className="text-xs sm:text-sm">Restaurant Setting</span>
              </Button>
            </Link>
            <div className="flex w-full gap-2 sm:gap-3 sm:w-auto">
              <Link
                href={`/${base}/${restaurantId}/categories/new`}
                className="flex-1"
              >
                <Button
                  size="sm"
                  variant="default"
                  className="w-full flex-1 px-3 py-2 text-sm"
                >
                  <Plus className="mr-0.5 h-4 w-4" />
                  <span className="text-xs sm:text-sm">Add Category</span>
                </Button>
              </Link>
              {onAddItem ? (
                <div className="flex-1">
                  <Button
                    size="sm"
                    variant="default"
                    onClick={onAddItem}
                    className="w-full flex-1 px-3 py-2 text-sm"
                  >
                    <Plus className="mr-0.5 h-4 w-4" />
                    <span className="text-xs sm:text-sm">Add Item</span>
                  </Button>
                </div>
              ) : (
                <Link
                  href={`/${base}/${restaurantId}/items/new${
                    firstCategoryId ? `?category=${firstCategoryId}` : ""
                  }`}
                  className="flex-1"
                >
                  <Button
                    size="sm"
                    variant="default"
                    className="w-full flex-1 px-3 py-2 text-sm"
                  >
                    <Plus className="mr-0.5 h-4 w-4" />
                    <span className="text-xs sm:text-sm">Add Item</span>
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
