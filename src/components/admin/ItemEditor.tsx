"use client";

import React, { useEffect, useState } from "react";
import {
  useQuery,
  useMutation,
  QueryFunctionContext,
} from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { Dialog, DialogContent } from "@/components/ui";
import { Button, Input, Label } from "@/components/ui";

type Dish = {
  id: string;
  basePrice: number;
  photoUrl: string | null;
  translations: { lang: string; name: string }[];
};

async function fetchDish(
  ctx: QueryFunctionContext<readonly [string, { itemId?: string | null }]>
) {
  const [, { itemId }] = ctx.queryKey;
  if (!itemId) throw new Error("No itemId provided to fetchDish");
  const res = await fetch(`/api/dishes/${itemId}`);
  if (!res.ok) throw new Error("Failed to load dish");
  return (await res.json()) as Dish;
}

async function updateDish(data: {
  id: string;
  basePrice: number;
  photoUrl: string;
  name?: string;
  lang?: string;
}) {
  const res = await fetch(`/api/dishes/${data.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      basePrice: data.basePrice,
      photoUrl: data.photoUrl,
      name: data.name,
      lang: data.lang,
    }),
  });
  if (!res.ok) throw new Error("Failed to update dish");
  return res.json();
}

async function createDish(data: {
  basePrice: number;
  photoUrl: string;
  name?: string;
  lang?: string;
  restaurantId?: string;
  categoryId?: string | null;
}) {
  const res = await fetch(`/api/dishes`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to create dish");
  return res.json();
}

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  itemId?: string | null;
  locale: string;
  restaurantId: string;
  defaultCategoryId?: string | null;
};

export function ItemEditor({
  open,
  onOpenChange,
  itemId,
  locale,
  restaurantId,
  defaultCategoryId,
}: Props) {
  const router = useRouter();

  const { data: dish, isLoading } = useQuery<
    Dish,
    Error,
    Dish,
    readonly [string, { itemId?: string | null }]
  >({
    queryKey: ["dish", { itemId }],
    queryFn: fetchDish,
    enabled: !!itemId,
  });

  const updateMutation = useMutation({
    mutationFn: updateDish,
    onSuccess: () => {
      router.refresh();
      onOpenChange(false);
    },
  });

  const createMutation = useMutation({
    mutationFn: createDish,
    onSuccess: () => {
      router.refresh();
      onOpenChange(false);
    },
  });

  const [name, setName] = useState("");
  const [price, setPrice] = useState<number>(0);
  const [photoUrl, setPhotoUrl] = useState("");

  useEffect(() => {
    if (dish) {
      const tr = dish.translations.find((t) => t.lang === locale);
      setName(tr?.name ?? "");
      setPrice(dish.basePrice);
      setPhotoUrl(dish.photoUrl ?? "");
    } else if (!itemId) {
      // new item: reset fields (keep defaults when dialog reopened for new)
      setName("");
      setPrice(0);
      setPhotoUrl("");
    }
  }, [dish, locale, itemId]);

  const handleSave = () => {
    if (itemId) {
      updateMutation.mutate({
        id: itemId,
        basePrice: price,
        photoUrl,
        name,
        lang: locale,
      });
    } else {
      createMutation.mutate({
        basePrice: price,
        photoUrl,
        name,
        lang: locale,
        restaurantId,
        categoryId: defaultCategoryId ?? null,
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <div className="container mx-auto max-w-md p-4 space-y-6">
          {isLoading ? (
            <div>Loading...</div>
          ) : (
            <>
              <div>
                <Label htmlFor="photoUrl">Photo URL</Label>
                <Input
                  id="photoUrl"
                  value={photoUrl}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setPhotoUrl(e.target.value)
                  }
                />
              </div>
              <div>
                <Label htmlFor="name">Name ({locale})</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setName(e.target.value)
                  }
                />
              </div>
              <div>
                <Label htmlFor="price">Price</Label>
                <Input
                  id="price"
                  type="number"
                  value={price}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setPrice(Number(e.target.value))
                  }
                />
              </div>

              <div className="flex space-x-2">
                {/* Placeholders for editors kept as simple buttons in modal */}
                <Button variant="outline">Options</Button>
                <Button variant="outline">Translations</Button>
                <Button variant="outline">Allergens</Button>
                <Button variant="outline">Tags</Button>
              </div>
              <Button onClick={handleSave} className="w-full">
                Save
              </Button>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default ItemEditor;
