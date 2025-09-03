"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { ChevronsDown, ChevronsUp, Copy, Pencil, Trash2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { DashboardHeader } from "./DashboardHeader";
import ItemEditor from "./ItemEditor";

type CategoryDTO = { id: string; name: string; sortIndex: number };
type ItemDTO = {
  id: string;
  name: string | null;
  priceCents: number;
  currency: string;
  available: boolean;
  categoryId: string | null;
  isDemo?: boolean;
};

interface RestaurantDashboardProps {
  base: "en" | "ru";
  restaurantId: string;
  restaurantName: string;
  categories: CategoryDTO[];
  items: ItemDTO[];
}

export function RestaurantDashboard({
  base,
  restaurantId,
  categories: initialCategories,
  items: initialItems,
}: RestaurantDashboardProps) {
  const t = useTranslations("Dashboard");
  const [query, setQuery] = useState("");
  const [categories, setCategories] = useState(initialCategories);
  const [items, setItems] = useState(initialItems);
  const [dirty, setDirty] = useState(false);
  const persistingRef = useRef(false);

  const [editorOpen, setEditorOpen] = useState(false);
  const [editingItemId, setEditingItemId] = useState<string | null>(null);
  const [defaultCategoryId, setDefaultCategoryId] = useState<string | null>(
    categories[0]?.id ?? null
  );

  useEffect(() => {
    try {
      const seen = localStorage.getItem("gqm_onboarding_done");
      if (!seen) {
        localStorage.setItem("gqm_onboarding_done", "true");
      }
    } catch {}
  }, []);

  // helper for reordering arrays
  function reorderArray<T>(arr: T[], from: number, to: number): T[] {
    const a = [...arr];
    const [moved] = a.splice(from, 1);
    if (moved === undefined) return a;
    a.splice(to, 0, moved);
    return a;
  }

  function moveCategory(id: string, dir: "up" | "down") {
    const prevCats = [...categories];
    const idx = prevCats.findIndex((c) => c.id === id);
    if (idx === -1) return;
    const to =
      dir === "up"
        ? Math.max(0, idx - 1)
        : Math.min(prevCats.length - 1, idx + 1);
    if (to === idx) return;
    const next = reorderArray(prevCats, idx, to);
    setCategories(next);
    if (!persistingRef.current) {
      void (async () => {
        persistingRef.current = true;
        try {
          await persistCategoryOrder(next, prevCats);
        } finally {
          persistingRef.current = false;
        }
      })();
    }
  }

  async function persistCategoryOrder(
    nextCats: CategoryDTO[],
    prevCats: CategoryDTO[]
  ) {
    const order = nextCats.map((c) => c.id);
    try {
      const res = await fetch(
        `/api/restaurants/${restaurantId}/categories/reorder`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ order }),
        }
      );
      if (!res.ok) throw new Error("categories reorder failed");
      setDirty(false);
      toast.success(t("header.saved"));
      return true;
    } catch {
      setCategories(prevCats);
      toast.error(t("header.saveFailed"));
      return false;
    }
  }

  async function saveOrder(newCats?: CategoryDTO[], newItems?: ItemDTO[]) {
    const catsToSend = newCats ?? categories;
    const itemsToSend = newItems ?? items;
    const order = catsToSend.map((c) => c.id);
    const groupsMap: Record<string, string[]> = {};
    catsToSend.forEach((c) => (groupsMap[c.id] = []));
    itemsToSend.forEach(
      (i) => i.categoryId && groupsMap[i.categoryId]?.push(i.id)
    );
    const groups = Object.entries(groupsMap).map(([categoryId, items]) => ({
      categoryId,
      items,
    }));
    const catRes = await fetch(
      `/api/restaurants/${restaurantId}/categories/reorder`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ order }),
      }
    );
    if (!catRes.ok) return;
    try {
      await fetch(`/api/restaurants/${restaurantId}/items/reorder`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ groups }),
      });
    } catch {
      // ignore item reorder errors for now
    }
    setDirty(false);
    toast.success(t("header.saved"));
  }

  function cancelOrder() {
    setCategories(initialCategories);
    setItems(initialItems);
    setDirty(false);
  }

  const displayedCategories = categories
    .map((cat) => {
      const filteredItems = items.filter(
        (i) =>
          i.categoryId === cat.id &&
          i.name?.toLowerCase().includes(query.toLowerCase())
      );
      return { ...cat, filteredItems };
    })
    .filter((c) => c.filteredItems.length > 0);

  return (
    <div className="container mx-auto max-w-4xl p-2">
      <DashboardHeader
        base={base}
        restaurantId={restaurantId}
        firstCategoryId={categories[0]?.id}
        query={query}
        onQueryChange={setQuery}
        onAddItem={() => {
          setEditingItemId(null);
          setDefaultCategoryId(categories[0]?.id ?? null);
          setEditorOpen(true);
        }}
      />

      {dirty && (
        <Alert className="sticky top-0 z-30 mt-2">
          <AlertTitle>{t("header.orderChanged")}</AlertTitle>
          <AlertDescription>{t("header.saveOrCancel")}</AlertDescription>
          <div className="flex gap-2 mt-2">
            <Button size="sm" onClick={() => saveOrder()}>
              {t("header.saveOrder")}
            </Button>
            <Button size="sm" variant="outline" onClick={cancelOrder}>
              {t("header.cancel")}
            </Button>
          </div>
        </Alert>
      )}

      <div className="space-y-4 mt-2">
        {displayedCategories.map((cat, index) => (
          <div key={cat.id} className="group border rounded-lg bg-background">
            <div className="bg-muted/50 flex items-center justify-between p-2">
              <div className="flex items-center gap-2">
                <div className="flex">
                  <Button
                    className="w-8 h-8"
                    variant="ghost"
                    onClick={() => moveCategory(cat.id, "up")}
                    disabled={index === 0}
                  >
                    <ChevronsUp />
                  </Button>
                  <Button
                    className="w-8 h-8"
                    variant="ghost"
                    disabled={index === categories.length - 1}
                    onClick={() => moveCategory(cat.id, "down")}
                  >
                    <ChevronsDown />
                  </Button>
                </div>
                <h3 className="font-medium text-md flex items-center gap-2 truncate">
                  {cat.name}
                </h3>
              </div>
              <div className="flex gap-1">
                <Button className="w-8 h-8" variant="ghost">
                  <Pencil />
                </Button>
                <Button className="w-8 h-8" variant="ghost">
                  <Trash2 />
                </Button>
              </div>
            </div>
            <ul className="divide-y">
              {cat.filteredItems.map((i) => (
                <li
                  key={i.id}
                  className="flex items-center justify-between p-2"
                >
                  <div className="min-w-0 flex items-center gap-3">
                    <div className="flex items-center gap-2 min-w-0">
                      <div className="flex">
                        <Button
                          className="w-8 h-8"
                          variant="ghost"
                          disabled={index === 0}
                        >
                          <ChevronsUp />
                        </Button>
                        <Button
                          className="w-8 h-8"
                          variant="ghost"
                          disabled={index === categories.length - 1}
                        >
                          <ChevronsDown />
                        </Button>
                      </div>
                      <span className="text-sm truncate min-w-0">{i.name}</span>
                      <Badge
                        variant="secondary"
                        className="hidden sm:inline-flex shrink-0"
                      >
                        {(i.priceCents / 100).toFixed(2)} {i.currency}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row items-center gap-2">
                    <div className="hidden sm:inline-flex">
                      <Switch
                        checked={i.available}
                        onCheckedChange={async (checked: boolean) => {
                          const upd = items.map((x) =>
                            x.id === i.id ? { ...x, available: checked } : x
                          );
                          setItems(upd);
                          await fetch(`/api/items/${i.id}/availability`, {
                            method: "PATCH",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({ available: checked }),
                          });
                        }}
                        className="rounded-full"
                      />
                    </div>
                    <div className="flex gap-1">
                      <Button
                        className="w-8 h-8"
                        variant="ghost"
                        onClick={() => {
                          setEditingItemId(i.id);
                          setEditorOpen(true);
                        }}
                      >
                        <Pencil />
                      </Button>
                      <Button className="w-8 h-8" variant="ghost">
                        <Copy />
                      </Button>
                      <Button className="w-8 h-8" variant="ghost">
                        <Trash2 />
                      </Button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <ItemEditor
        open={editorOpen}
        onOpenChange={(open: boolean) => setEditorOpen(open)}
        itemId={editingItemId}
        locale={base}
        restaurantId={restaurantId}
        defaultCategoryId={defaultCategoryId}
      />
    </div>
  );
}
