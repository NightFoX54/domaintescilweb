export default function NICTRBadge() {
  return (
    <svg
      role="img"
      aria-label="NIC.TR Yetkili"
      width="54"
      height="54"
      viewBox="0 0 54 54"
      className="text-brand-accent"
    >
      <title>NIC.TR Yetkili</title>
      <circle
        cx="27"
        cy="27"
        r="22"
        fill="rgba(0,212,255,0.08)"
        stroke="currentColor"
        strokeWidth="2"
      />
      <rect
        x="16"
        y="18"
        width="22"
        height="22"
        rx="6"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        opacity="0.35"
      />
      <path
        d="M21 32l4-10 4 10 4-10"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
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
        NIC.TR
      </text>
    </svg>
  );
}

