export function Logo({
  variant = "horizontal",
  className = "",
  dark = false,
}: {
  variant?: "horizontal" | "stacked" | "icon";
  className?: string;
  dark?: boolean;
}) {
  const textColor = dark ? "#ffffff" : "#0d1b3e";
  const dotColor = "#0ea5a0";

  if (variant === "icon") {
    return (
      <svg
        viewBox="0 0 48 48"
        className={className}
        aria-label="eyetest.co.uk"
        role="img"
      >
        <defs>
          <linearGradient id="eyeGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#14b8b0" />
            <stop offset="100%" stopColor="#0c8a86" />
          </linearGradient>
          <filter id="eyeShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="1" stdDeviation="1.5" floodColor="#0d1b3e" floodOpacity="0.15" />
          </filter>
        </defs>
        <g transform="translate(24, 24)" filter="url(#eyeShadow)">
          <path d="M-20,0 C-10,13 10,13 20,0 C10,-13 -10,-13 -20,0Z" fill="url(#eyeGrad)" />
          <circle cx="0" cy="0" r="8.5" fill="#0d1b3e" />
          <circle cx="0" cy="0" r="4" fill="#0ea5a0" />
          <circle cx="2.2" cy="-2.2" r="1.6" fill="#ffffff" opacity="0.9" />
          <circle cx="-1" cy="1.2" r="0.7" fill="#ffffff" opacity="0.4" />
        </g>
      </svg>
    );
  }

  if (variant === "stacked") {
    return (
      <svg
        viewBox="0 0 180 80"
        className={className}
        aria-label="eyetest.co.uk"
        role="img"
      >
        <defs>
          <linearGradient id="eyeGradS" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#14b8b0" />
            <stop offset="100%" stopColor="#0c8a86" />
          </linearGradient>
          <filter id="eyeShadowS" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="1" stdDeviation="1" floodColor="#0d1b3e" floodOpacity="0.12" />
          </filter>
        </defs>
        <g transform="translate(90, 22)" filter="url(#eyeShadowS)">
          <path d="M-18,0 C-9,12 9,12 18,0 C9,-12 -9,-12 -18,0Z" fill="url(#eyeGradS)" />
          <circle cx="0" cy="0" r="7.5" fill="#0d1b3e" />
          <circle cx="0" cy="0" r="3.5" fill="#0ea5a0" />
          <circle cx="2" cy="-2" r="1.4" fill="#ffffff" opacity="0.9" />
          <circle cx="-0.8" cy="1" r="0.6" fill="#ffffff" opacity="0.4" />
        </g>
        <text
          x="90"
          y="62"
          textAnchor="middle"
          fontFamily="Outfit, sans-serif"
          fontWeight="700"
          fontSize="22"
          letterSpacing="-0.5"
        >
          <tspan fill={textColor}>eye</tspan>
          <tspan fill={textColor}>test</tspan>
          <tspan fill={dotColor}>.</tspan>
          <tspan fill={textColor}>co</tspan>
          <tspan fill={dotColor}>.</tspan>
          <tspan fill={textColor}>uk</tspan>
        </text>
      </svg>
    );
  }

  // Horizontal (default) — icon tighter to text
  return (
    <svg
      viewBox="0 0 260 44"
      className={className}
      aria-label="eyetest.co.uk"
      role="img"
    >
      <defs>
        <linearGradient id="eyeGradH" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#14b8b0" />
          <stop offset="100%" stopColor="#0c8a86" />
        </linearGradient>
        <filter id="eyeShadowH" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="1" stdDeviation="1" floodColor="#0d1b3e" floodOpacity="0.12" />
        </filter>
      </defs>
      <g transform="translate(22, 22)" filter="url(#eyeShadowH)">
        <path d="M-18,0 C-9,12 9,12 18,0 C9,-12 -9,-12 -18,0Z" fill="url(#eyeGradH)" />
        <circle cx="0" cy="0" r="7.5" fill="#0d1b3e" />
        <circle cx="0" cy="0" r="3.5" fill="#0ea5a0" />
        <circle cx="2" cy="-2" r="1.4" fill="#ffffff" opacity="0.9" />
        <circle cx="-0.8" cy="1" r="0.6" fill="#ffffff" opacity="0.4" />
      </g>
      <text
        x="48"
        y="29"
        fontFamily="Outfit, sans-serif"
        fontWeight="700"
        fontSize="26"
        letterSpacing="-0.5"
      >
        <tspan fill={textColor}>eye</tspan>
        <tspan fill={textColor}>test</tspan>
        <tspan fill={dotColor}>.</tspan>
        <tspan fill={textColor}>co</tspan>
        <tspan fill={dotColor}>.</tspan>
        <tspan fill={textColor}>uk</tspan>
      </text>
    </svg>
  );
}
