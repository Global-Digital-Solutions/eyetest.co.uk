import type { ReactNode } from "react";

/** Shared building blocks so every eyetest.co.uk tool looks the same */

export function ToolCard({ title, intro, children }: { title: string; intro: string; children: ReactNode }) {
  return (
    <div className="not-prose bg-gradient-to-br from-[var(--color-primary)]/5 to-white border border-[var(--color-primary)]/20 rounded-3xl p-5 sm:p-8 my-8">
      <h2 className="text-xl sm:text-2xl font-bold text-[var(--color-navy)] mb-1" style={{ fontFamily: "var(--font-display)" }}>
        {title}
      </h2>
      <p className="text-sm text-gray-500 mb-6">{intro}</p>
      {children}
    </div>
  );
}

export function Step({ n, label, children }: { n: number; label: string; children: ReactNode }) {
  return (
    <fieldset className="mb-6">
      <legend className="text-sm font-semibold text-[var(--color-navy)] mb-2">
        {n}. {label}
      </legend>
      {children}
    </fieldset>
  );
}

export function Choice({
  selected,
  onClick,
  children,
  wide,
}: {
  selected: boolean;
  onClick: () => void;
  children: ReactNode;
  wide?: boolean;
}) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onClick}
      className={`px-3 py-2.5 rounded-xl text-sm font-medium border transition-colors ${wide ? "text-left" : ""} ${
        selected
          ? "bg-[var(--color-primary)] text-white border-[var(--color-primary)]"
          : "bg-white text-gray-700 border-gray-200 hover:border-[var(--color-primary)]/50"
      }`}
    >
      {children}
    </button>
  );
}

export function Result({ tone, title, children }: { tone: "good" | "warn" | "alert" | "info"; title: string; children: ReactNode }) {
  const t = {
    good: "bg-green-50 border-green-200 text-green-800",
    warn: "bg-amber-50 border-amber-200 text-amber-900",
    alert: "bg-red-50 border-red-200 text-red-800",
    info: "bg-white border-[var(--color-primary)]/30 text-[var(--color-navy)]",
  }[tone];
  return (
    <div className={`rounded-2xl border p-5 ${t}`} aria-live="polite">
      <p className="font-bold text-base mb-2">{title}</p>
      <div className="text-sm leading-relaxed space-y-2 opacity-90">{children}</div>
    </div>
  );
}

export function Note({ children }: { children: ReactNode }) {
  return <p className="text-xs text-gray-500 mt-4 leading-relaxed">{children}</p>;
}
