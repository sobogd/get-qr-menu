"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
// ...existing code...
import { sendVerificationCode } from "@/actions/send-verification-code";
import { verifyCode } from "@/actions/verify-code";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export default function LoginForm({
  messages,
}: {
  messages?: {
    Auth?: {
      emailLabel?: string;
      emailPlaceholder?: string;
      sendCode?: string;
      sending?: string;
      codeHint?: string;
      back?: string;
      verify?: string;
      verifying?: string;
    };
    login?: { title?: string };
  };
}) {
  const router = useRouter();
  const [step, setStep] = useState<"email" | "code" | "select">("email");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [code, setCode] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [sentTo, setSentTo] = useState<string | null>(null);
  const [restaurants, setRestaurants] = useState<
    { id: string; slug: string | null; name: string; defaultLocale: string }[]
  >([]);

  // OTP helpers (client-side, controlled 6-digit inputs)
  const otpInputsRef = React.useRef<Array<HTMLInputElement | null>>([]);
  const otpLength = 6;

  React.useEffect(() => {
    otpInputsRef.current = otpInputsRef.current.slice(0, otpLength);
  }, []);

  function focusNext(index: number) {
    const next = otpInputsRef.current[index + 1];
    if (next) {
      next.focus();
      next.select?.();
    }
  }

  function handleOtpChange(index: number, val: string) {
    const ch = val.replace(/\D/g, "").slice(-1);
    const arr = code.split("");
    while (arr.length < otpLength) arr.push("");
    arr[index] = ch;
    const newCode = arr.join("").slice(0, otpLength);
    setCode(newCode);
    if (ch) focusNext(index);
  }

  function handleOtpPaste(e: React.ClipboardEvent<HTMLInputElement>) {
    const paste = e.clipboardData
      .getData("Text")
      .replace(/\D/g, "")
      .slice(0, otpLength);
    if (!paste) return;
    setCode(paste);
    paste.split("").forEach((c, i) => {
      const input = otpInputsRef.current[i];
      if (input) input.value = c;
    });
    const last =
      otpInputsRef.current[Math.min(paste.length - 1, otpLength - 1)];
    last?.focus();
  }

  async function handleSendCode(e?: React.FormEvent) {
    e?.preventDefault();
    setError(null);
    const normalized = email.trim().toLowerCase();
    if (!normalized) {
      setError("Please enter an email");
      return;
    }

    setLoading(true);
    try {
      // Call server action (will run on the server).
      const data = await sendVerificationCode(normalized as string);
      if (!data?.ok) {
        setError(data?.error || "Failed to send code");
        setLoading(false);
        return;
      }

      setSentTo(normalized);
      setStep("code");
    } catch (err) {
      console.error(err);
      setError("Network error");
    } finally {
      setLoading(false);
    }
  }

  async function handleVerifyCode(e?: React.FormEvent) {
    e?.preventDefault();
    setError(null);
    if (!sentTo) {
      setError("Missing email");
      return;
    }
    if (code.trim().length === 0) {
      setError("Enter the verification code");
      return;
    }

    setLoading(true);
    try {
      const data = await verifyCode(sentTo as string, code.trim());
      if (!data?.ok) {
        setError(data?.error || "Invalid code");
        setLoading(false);
        return;
      }

      // Backend now returns `restaurants` array (may be empty).
      const returned: {
        restaurants?: {
          id: string;
          slug?: string | null;
          name: string;
          defaultLocale?: string;
        }[];
      } = data;

      const parts =
        typeof window !== "undefined"
          ? window.location.pathname.split("/")
          : ["", "en"];
      const locale = parts[1] || "en";

      const list = returned?.restaurants ?? [];

      if (list.length === 0) {
        // No restaurants linked: go to locale root
        router.push(`/${locale}`);
      } else if (list.length === 1) {
        // Single restaurant: redirect immediately (prefer slug, fallback to id)
        const r = list[0];
        router.push(`/${r.defaultLocale ?? locale}/${r.slug ?? r.id}`);
      } else {
        // Multiple restaurants: show selection UI
        setRestaurants(
          list.map((r) => ({
            id: r.id,
            slug: r.slug ?? null,
            name: r.name,
            defaultLocale: r.defaultLocale ?? locale,
          }))
        );
        setStep("select");
      }
    } catch (err) {
      console.error(err);
      setError("Network error");
    } finally {
      setLoading(false);
    }
  }

  // The Card wrapper and header are rendered on the server page.
  // This component only renders the interactive form (client).
  return (
    <>
      {step === "email" ? (
        <form onSubmit={handleSendCode} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              {messages?.Auth?.emailLabel ?? "Email"}
            </label>
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={
                messages?.Auth?.emailPlaceholder ?? "you@example.com"
              }
              type="email"
              required
            />
          </div>

          {error && <div className="text-sm text-red-600">{error}</div>}

          <div className="flex justify-start">
            <Button
              type="submit"
              className={cn(loading && "opacity-70")}
              disabled={loading}
            >
              {loading
                ? messages?.Auth?.sending ?? "Sending..."
                : messages?.Auth?.sendCode ?? "Send code"}
            </Button>
          </div>
        </form>
      ) : step === "code" ? (
        <form onSubmit={handleVerifyCode} className="space-y-4">
          <div>
            <div className="text-sm text-muted-foreground mb-2">
              {messages?.Auth?.codeHint ?? "Enter the 6-digit code sent to"}{" "}
              <strong>{sentTo}</strong>
            </div>

            <div className="mb-2">
              <div className="flex items-center gap-2">
                {Array.from({ length: otpLength }).map((_, i) => (
                  <input
                    key={i}
                    ref={(el) => {
                      otpInputsRef.current[i] = el;
                    }}
                    value={code[i] ?? ""}
                    onChange={(e) => handleOtpChange(i, e.target.value)}
                    onPaste={handleOtpPaste}
                    onKeyDown={(e) => {
                      // handle backspace and arrow navigation
                      if (e.key === "Backspace") {
                        // prevent the browser default deletion behavior
                        e.preventDefault();
                        const arr = code.split("");
                        while (arr.length < otpLength) arr.push("");
                        if (arr[i]) {
                          // current digit exists — clear it and focus current
                          arr[i] = "";
                          setCode(arr.join("").slice(0, otpLength));
                          // clear input element value too
                          const curInput = otpInputsRef.current[i];
                          if (curInput) curInput.value = "";
                          // keep focus on current input
                          curInput?.focus();
                        } else {
                          // current empty — move to previous, clear it and focus
                          const prevIndex = i - 1;
                          if (prevIndex >= 0) {
                            arr[prevIndex] = "";
                            setCode(arr.join("").slice(0, otpLength));
                            const prev = otpInputsRef.current[prevIndex];
                            if (prev) {
                              prev.value = "";
                              prev.focus();
                            }
                          }
                        }
                      } else if (e.key === "ArrowLeft") {
                        e.preventDefault();
                        const prev = otpInputsRef.current[i - 1];
                        if (prev) prev.focus();
                      } else if (e.key === "ArrowRight") {
                        e.preventDefault();
                        const next = otpInputsRef.current[i + 1];
                        if (next) next.focus();
                      }
                    }}
                    inputMode="numeric"
                    pattern="\d*"
                    maxLength={1}
                    className="h-9 w-9 text-center border border-input rounded-md text-sm shadow-sm"
                    aria-label={`Digit ${i + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>

          {error && <div className="text-sm text-red-600">{error}</div>}

          <div className="flex items-center justify-start gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setStep("email");
                setCode("");
                setError(null);
              }}
            >
              {messages?.Auth?.back ?? "Back"}
            </Button>

            <Button type="submit" disabled={loading || code.trim().length < 4}>
              {loading
                ? messages?.Auth?.verifying ?? "Verifying..."
                : messages?.Auth?.verify ?? "Verify"}
            </Button>
          </div>
        </form>
      ) : (
        <div className="space-y-4">
          <div className="text-sm text-muted-foreground">
            Select a restaurant to continue:
          </div>

          <div className="flex flex-col gap-2">
            {restaurants.map((r) => (
              <Button
                key={r.id}
                variant="outline"
                onClick={() => {
                  const parts =
                    typeof window !== "undefined"
                      ? window.location.pathname.split("/")
                      : ["", "en"];
                  const locale = parts[1] || r.defaultLocale || "en";
                  router.push(
                    `/${r.defaultLocale ?? locale}/${r.slug ?? r.id}`
                  );
                }}
              >
                {r.name}
              </Button>
            ))}
          </div>

          <div>
            <Button
              type="button"
              variant="ghost"
              onClick={() => {
                // fallback: go to site's root for current locale
                const parts =
                  typeof window !== "undefined"
                    ? window.location.pathname.split("/")
                    : ["", "en"];
                const locale = parts[1] || "en";
                router.push(`/${locale}`);
              }}
            >
              Continue without selection
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
