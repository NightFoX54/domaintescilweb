export default function ICANNBadge() {
  return (
    <svg
      role="img"
      aria-label="ICANN Akredite"
      width="54"
      height="54"
      viewBox="0 0 54 54"
      className="text-brand-accent"
    >
      <title>ICANN Akredite</title>
      <circle cx="27" cy="27" r="22" fill="rgba(0,212,255,0.08)" stroke="currentColor" strokeWidth="2" />
      <path
        d="M18 28c0-6 4.5-10 10-10s10 4 10 10-4.5 10-10 10-10-4-10-10Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        opacity="0.35"
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
        ICANN
      </text>
    </svg>
  );
}

