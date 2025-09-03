"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useQuery, useMutation } from "@tanstack/react-query";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTrigger,
  Drawer,
  DrawerContent,
  DrawerTrigger,
  Input,
  Label,
} from "@/components/ui";

type Dish = {
  id: string;
  basePrice: number;
  photoUrl: string | null;
  translations: { lang: string; name: string }[];
};

async function fetchDish({
  queryKey,
}: {
  queryKey: [string, { itemId: string }];
}) {
  const [, { itemId }] = queryKey;
  const res = await fetch(`/api/dishes/${itemId}`);
  if (!res.ok) throw new Error("Failed to load dish");
  return (await res.json()) as Dish;
}

async function updateDish(data: {
  id: string;
  basePrice: number;
  photoUrl: string;
}) {
  const res = await fetch(`/api/dishes/${data.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      basePrice: data.basePrice,
      photoUrl: data.photoUrl,
    }),
  });
  if (!res.ok) throw new Error("Failed to update dish");
  return res.json();
}

export default function EditItemPage() {
  const params = useParams() as {
    locale: string;
    restaurantId: string;
    itemId: string;
  };
  const router = useRouter();
  const { itemId, locale } = params;
  const { data: dish, isLoading } = useQuery({
    queryKey: ["dish", { itemId }],
    queryFn: fetchDish,
  });
  const mutation = useMutation({
    mutationFn: updateDish,
    onSuccess: () => router.refresh(),
  });

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [photoUrl, setPhotoUrl] = useState("");

  useEffect(() => {
    if (dish) {
      const tr = dish.translations.find((t) => t.lang === locale);
      setName(tr?.name ?? "");
      setPrice(dish.basePrice);
      setPhotoUrl(dish.photoUrl ?? "");
    }
  }, [dish, locale]);

  if (isLoading || !dish) return <div>Loading...</div>;

  const handleSave = () => {
    mutation.mutate({ id: itemId, basePrice: price, photoUrl });
  };

  return (
    <div className="container mx-auto max-w-md p-4 space-y-6">
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
        <Drawer>
          <DrawerTrigger asChild>
            <Button variant="outline">Options</Button>
          </DrawerTrigger>
          <DrawerContent side="right" size="lg">
            <div>Options editor placeholder</div>
          </DrawerContent>
        </Drawer>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">Translations</Button>
          </DialogTrigger>
          <DialogContent>
            <div>Translations editor placeholder</div>
          </DialogContent>
        </Dialog>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">Allergens</Button>
          </DialogTrigger>
          <DialogContent>
            <div>Allergens editor placeholder</div>
          </DialogContent>
        </Dialog>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">Tags</Button>
          </DialogTrigger>
          <DialogContent>
            <div>Tags editor placeholder</div>
          </DialogContent>
        </Dialog>
      </div>
      <Button onClick={handleSave} className="w-full">
        Save
      </Button>
    </div>
  );
}
