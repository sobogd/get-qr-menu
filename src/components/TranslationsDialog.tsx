"use client";

import React, { useState } from "react";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui";
import { Button, Input, Label } from "@/components/ui";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const LANGUAGES = ["en", "ru", "es"] as const;

type Translation = { lang: string; name: string; description?: string };
type Props = {
  dishId: string;
  initial: Translation[];
  onClose?: () => void;
};

export function TranslationsDialog({ dishId, initial, onClose }: Props) {
  const [translations, setTranslations] = useState<Translation[]>(
    LANGUAGES.map((lang) => {
      const found = initial.find((t) => t.lang === lang);
      return {
        lang,
        name: found?.name || "",
        description: found?.description || "",
      };
    })
  );

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async () => {
      const res = await fetch(`/api/dishes/${dishId}/translations`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(translations),
      });
      if (!res.ok) throw new Error("Failed to update translations");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["dish"] });
      onClose?.();
    },
  });

  const save = () => {
    mutation.mutate();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Translations</Button>
      </DialogTrigger>
      <DialogContent>
        {translations.map((t, i) => (
          <div key={t.lang} className="space-y-1 mb-4">
            <Label>{t.lang.toUpperCase()}</Label>
            <Input
              placeholder="Name"
              value={t.name}
              onChange={(e) => {
                const arr = [...translations];
                arr[i].name = e.target.value;
                setTranslations(arr);
              }}
            />
            <Input
              placeholder="Description"
              value={t.description}
              onChange={(e) => {
                const arr = [...translations];
                arr[i].description = e.target.value;
                setTranslations(arr);
              }}
            />
          </div>
        ))}
        <Button
          onClick={save}
          className="mt-2"
          disabled={mutation.status === "pending"}
        >
          {mutation.status === "pending" ? "Saving..." : "Save Translations"}
        </Button>
      </DialogContent>
    </Dialog>
  );
}
