"use client";

import { useTheme } from "next-themes";
import { Toaster as Sonner } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      // sonner types expect `className` not `classNames` — cast to any to preserve runtime options
      toastOptions={
        {
          classNames: {
            toast:
              "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
            description: "group-[.toast]:text-muted-foreground",
            actionButton:
              "group-[.toast]:bg-primary group-[.toaster]:text-primary-foreground",
            cancelButton:
              "group-[.toast]:bg-muted group-[.toaster]:text-muted-foreground",
          },
        } as any
      }
      {...props}
    />
  );
};

export { Toaster };
