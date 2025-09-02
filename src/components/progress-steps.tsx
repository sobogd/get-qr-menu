"use client";
import { CheckCircle2, Circle } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";

declare global {
  interface Window {
    __gs_progress_started__?: boolean;
  }
}

type Props = {
  steps: string[];
  /** Duration per step in ms. Default 600ms. */
  stepDurationMs?: number;
  className?: string;
  onComplete?: () => void;
};

function Ellipsis({ speedMs = 400 }: { speedMs?: number }) {
  const [dots, setDots] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setDots((d) => (d + 1) % 4), speedMs);
    return () => clearInterval(t);
  }, [speedMs]);
  return <span aria-hidden="true">{".".repeat(dots)}</span>;
}

export function ProgressSteps({
  steps,
  stepDurationMs = 600,
  className,
  onComplete,
}: Props) {
  const [active, setActive] = useState(0);
  const onCompleteRef = useRef(onComplete);
  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  // Precompute timeouts schedule
  const schedule = useMemo(() => {
    return steps.map((_, idx) => (idx + 1) * stepDurationMs);
  }, [steps, stepDurationMs]);

  useEffect(() => {
    const isDev = process.env.NODE_ENV !== "production";
    // Prevent duplicate animation on React Strict Mode remount in dev
    if (isDev && typeof window !== "undefined") {
      const key = "__gs_progress_started__";
      if (window[key]) {
        setActive(steps.length);
        onCompleteRef.current?.();
        return;
      }
      window[key] = true;
    }

    setActive(0);
    const timers: ReturnType<typeof setTimeout>[] = [];
    schedule.forEach((ms, idx) => {
      timers.push(
        setTimeout(() => {
          setActive(idx + 1);
          if (idx + 1 === steps.length) {
            onCompleteRef.current?.();
          }
        }, ms)
      );
    });
    return () => timers.forEach(clearTimeout);
  }, [schedule, steps.length]);

  const progress = Math.min(active / steps.length, 1);

  return (
    <div className={className}>
      {/* Progress bar */}
      <div className="mb-3 h-1.5 w-full overflow-hidden rounded-full bg-muted">
        <div
          className="h-full rounded-full bg-primary transition-all duration-500"
          style={{ width: `${progress * 100}%` }}
        />
      </div>
      <ul className="mx-auto grid gap-2 text-left" aria-live="polite">
        {steps.map((label, idx) => {
          const isDone = active > idx;
          const isActive = active === idx;
          return (
            <li
              key={idx}
              className={
                "flex items-center gap-3 rounded-md border bg-card px-3 py-2 text-sm transition-colors " +
                (isActive
                  ? "border-primary/50 bg-accent/40 text-foreground"
                  : isDone
                  ? "text-foreground"
                  : "text-muted-foreground")
              }
            >
              {isDone ? (
                <CheckCircle2 className="size-4 text-primary shrink-0" />
              ) : isActive ? (
                <span className="size-2 shrink-0 rounded-full bg-primary animate-pulse inline-block" />
              ) : (
                <Circle className="size-4 text-muted-foreground shrink-0" />
              )}
              <span>
                {label}
                {isActive && <Ellipsis />}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
