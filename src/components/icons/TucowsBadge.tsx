export default function TucowsBadge() {
  return (
    <svg
      role="img"
      aria-label="Tucows Altyapısı"
      width="54"
      height="54"
      viewBox="0 0 54 54"
      className="text-brand-accent"
    >
      <title>Tucows Altyapısı</title>
      <circle cx="27" cy="27" r="22" fill="rgba(0,212,255,0.08)" stroke="currentColor" strokeWidth="2" />
      <path
        d="M17 24c4-9 16-9 20 0M19 33c3 6 13 6 16 0"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M22 27h10"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <text
        x="27"
        y="31"
        textAnchor="middle"
        fontSize="10"
        fontWeight="800"
        fill="currentColor"
        style={{ fontFamily: "JetBrains Mono, monospace" }}
      >
        TUCO
      </text>
    </svg>
  );
}

