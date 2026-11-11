import Link from "next/link";
import { RevealOnView } from "@/components/RevealOnView";

type Tone = "teal" | "amber" | "red";

type Step = {
  title: string;
  when: string;
  body: string;
  /** One-line version for mobile */
  short: string;
  link: { label: string; href: string; external?: boolean };
  tone: Tone;
  icon: "pharmacy" | "eye" | "gp" | "phone" | "alert";
  highlight?: boolean;
};

const STEPS: Step[] = [
  {
    title: "Pharmacist",
    short: "Itchy, sticky or gritty eyes. Ask about eye drops.",
    when: "Mild symptoms",
    body: "For itchy, sticky or gritty eyes, a pharmacist can give advice and may suggest eye drops or other treatment.",
    link: { label: "Find a pharmacy", href: "https://www.nhs.uk/service-search/pharmacy/find-a-pharmacy", external: true },
    tone: "teal",
    icon: "pharmacy",
  },
  {
    title: "Optician",
    short: "Some also give free NHS urgent eye care. Phone first.",
    when: "Vision or eye checks",
    body: "An optician can check your vision and examine your eyes. In many parts of England, some opticians also give free NHS urgent eye care. Phone first rather than walking in.",
    link: { label: "Find an optician", href: "/locations" },
    tone: "teal",
    icon: "eye",
    highlight: true,
  },
  {
    title: "Your GP surgery",
    short: "Symptoms not improving, or getting worse.",
    when: "Not getting better",
    body: "Contact your GP surgery if symptoms do not improve, get worse, or a pharmacist or optician advises you to.",
    link: { label: "Find a GP", href: "https://www.nhs.uk/service-search/find-a-gp", external: true },
    tone: "teal",
    icon: "gp",
  },
  {
    title: "NHS 111",
    short: "Urgent, or not sure where to go. Call 111.",
    when: "Urgent or unsure",
    body: "For urgent advice, or if you are not sure where to go, call 111 or use 111 online. Always call 111 for a child under 5.",
    link: { label: "Use NHS 111 online", href: "https://111.nhs.uk/", external: true },
    tone: "amber",
    icon: "phone",
  },
  {
    title: "999 or A&E",
    short: "Serious injury, chemical in the eye, or sudden pain or vision loss.",
    when: "Emergency",
    body: "For a serious eye injury, a chemical in the eye, or sudden severe eye pain or loss of vision. Do not drive yourself.",
    link: { label: "Emergency eye care", href: "/find/emergency-eye-test-near-me" },
    tone: "red",
    icon: "alert",
  },
];

const TONE = {
  teal: { badge: "bg-[var(--color-primary)]", soft: "bg-teal-50 text-teal-700", link: "text-[var(--color-primary)]" },
  amber: { badge: "bg-amber-500", soft: "bg-amber-50 text-amber-700", link: "text-amber-700" },
  red: { badge: "bg-red-600", soft: "bg-red-50 text-red-700", link: "text-red-700" },
};

function Icon({ name, className }: { name: Step["icon"]; className?: string }) {
  const p = { className, fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 2, "aria-hidden": true } as const;
  switch (name) {
    case "pharmacy":
      return (
        <svg {...p}>
          <rect x="3" y="3" width="18" height="18" rx="4" />
          <path strokeLinecap="round" d="M12 8v8M8 12h8" />
        </svg>
      );
    case "eye":
      return (
        <svg {...p}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12z" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      );
    case "gp":
      return (
        <svg {...p}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 3v5a4 4 0 008 0V3M10 12v3a5 5 0 0010 0v-2" />
          <circle cx="20" cy="11" r="2" />
        </svg>
      );
    case "phone":
      return (
        <svg {...p}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h2.3a1 1 0 01.95.68l1.2 3.6a1 1 0 01-.5 1.2l-1.6.8a11 11 0 005.4 5.4l.8-1.6a1 1 0 011.2-.5l3.6 1.2a1 1 0 01.68.95V19a2 2 0 01-2 2h-1C9.7 21 3 14.3 3 6V5z" />
        </svg>
      );
    case "alert":
      return (
        <svg {...p}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v4m0 4h.01M10.3 3.9L1.8 18a2 2 0 001.7 3h17a2 2 0 001.7-3L13.7 3.9a2 2 0 00-3.4 0z" />
        </svg>
      );
  }
}

function StepLink({ s }: { s: Step }) {
  const t = TONE[s.tone];
  if (s.highlight) {
    return (
      <Link
        href={s.link.href}
        className="wtgh-shine mt-auto inline-flex items-center justify-center gap-1.5 rounded-lg bg-[var(--color-primary)] px-3 py-2 lg:py-2.5 text-sm font-semibold text-white hover:opacity-90 transition-opacity"
      >
        {s.link.label}
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
        </svg>
      </Link>
    );
  }
  const cls = `mt-auto inline-flex items-center gap-1 text-sm font-semibold ${t.link} hover:underline`;
  const arrow = (
    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
      {s.link.external ? (
        <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
      ) : (
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
      )}
    </svg>
  );
  return s.link.external ? (
    <a href={s.link.href} target="_blank" rel="noopener noreferrer" className={cls}>
      {s.link.label}
      {arrow}
    </a>
  ) : (
    <Link href={s.link.href} className={cls}>
      {s.link.label}
      {arrow}
    </Link>
  );
}

export function WhereToGetHelp() {
  return (
    <section
      className="relative overflow-hidden bg-[var(--color-navy)] py-10 sm:py-20"
      aria-labelledby="where-to-get-help-heading"
    >
      {/* Soft animated glows */}
      <span aria-hidden="true" className="wtgh-glow pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-teal-400/30 blur-3xl" />
      <span aria-hidden="true" className="wtgh-glow pointer-events-none absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-red-500/20 blur-3xl" style={{ animationDelay: "3s" }} />

      <RevealOnView className="wtgh relative max-w-6xl mx-auto px-4">
        <div className="text-center mb-6 lg:mb-10">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-bold text-teal-300 ring-1 ring-white/15 mb-4">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-teal-300 opacity-75 motion-reduce:animate-none" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-teal-300" />
            </span>
            Not sure where to go?
          </span>
          <h2
            id="where-to-get-help-heading"
            className="text-2xl sm:text-4xl font-bold text-white mb-2 lg:mb-3"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Where to get help with an eye problem
          </h2>
          <p className="text-sm sm:text-base text-gray-300 max-w-2xl mx-auto">
            Start with the step that matches your symptoms. This is general guidance, not medical advice, and if you are unsure, call NHS 111.
          </p>
        </div>

        {/* Urgency scale (desktop) */}
        <div className="hidden lg:block mb-6 px-[10%]">
          <div className="h-2 rounded-full bg-white/10 overflow-hidden">
            <div className="wtgh-bar h-full rounded-full bg-gradient-to-r from-teal-400 via-teal-400 via-55% to-red-500" />
          </div>
          <div className="mt-2 flex justify-between text-[11px] font-semibold uppercase tracking-wide">
            <span className="text-teal-300">Less urgent</span>
            <span className="text-red-400">More urgent</span>
          </div>
        </div>

        <ol className="relative grid gap-2.5 lg:gap-4 lg:grid-cols-5">
          {/* Vertical line (mobile and tablet) */}
          <span aria-hidden="true" className="lg:hidden absolute left-[22px] top-4 bottom-4 w-1 rounded-full bg-white/10 overflow-hidden">
            <span className="wtgh-bar-v block h-full w-full bg-gradient-to-b from-teal-400 via-teal-400 via-55% to-red-500" />
          </span>
          {STEPS.map((s, i) => {
            const t = TONE[s.tone];
            return (
              <li key={s.title} className="wtgh-step relative pl-14 lg:pl-0">
                <div
                  className={`wtgh-card relative flex h-full flex-col rounded-2xl bg-white p-3.5 lg:p-5 ${
                    s.highlight
                      ? "shadow-xl ring-4 ring-teal-300/60 lg:-translate-y-2"
                      : s.tone === "red"
                        ? "shadow-lg ring-1 ring-red-300 bg-gradient-to-b from-red-50 to-white"
                        : "shadow-lg"
                  }`}
                >
                  {s.highlight && (
                    <span className="absolute -top-2.5 right-3 rounded-full bg-teal-300 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-[var(--color-navy)] shadow">
                      Book with us
                    </span>
                  )}
                  <span
                    className={`absolute left-[-46px] top-3 lg:static lg:mb-4 flex h-11 w-11 items-center justify-center rounded-full text-white shadow-md ring-4 ring-[var(--color-navy)] lg:ring-white ${t.badge} ${
                      s.highlight ? "wtgh-ping" : ""
                    }`}
                  >
                    <Icon name={s.icon} className="h-5 w-5" />
                  </span>
                  <div className="mb-1 flex flex-wrap items-center gap-x-2 gap-y-1 lg:block">
                    <div className="flex items-center gap-2 lg:mb-1">
                      <span className="text-xs font-bold text-gray-400">{i + 1}</span>
                      <h3 className="text-[15px] lg:text-base font-bold text-[var(--color-navy)]" style={{ fontFamily: "var(--font-display)" }}>
                        {s.title}
                      </h3>
                    </div>
                    <span className={`lg:mb-3 inline-flex w-fit rounded-full px-2 py-0.5 text-[10px] lg:text-[11px] font-semibold ${t.soft}`}>
                      {s.when}
                    </span>
                  </div>
                  <p className="mb-2 text-[13px] leading-snug text-gray-600 lg:hidden">{s.short}</p>
                  <p className="mb-4 hidden text-sm leading-relaxed text-gray-600 lg:block">{s.body}</p>
                  <StepLink s={s} />
                </div>
              </li>
            );
          })}
        </ol>

        <p className="text-[11px] text-gray-400 mt-8 text-center">
          Based on NHS guidance, checked November 2026. Services differ in Scotland, Wales and Northern Ireland, and NHS 111 can tell you where to go.
        </p>
      </RevealOnView>
    </section>
  );
}
