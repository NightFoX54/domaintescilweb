export default function SSLBadge() {
  return (
    <svg
      role="img"
      aria-label="SSL Güven Mührü"
      width="54"
      height="54"
      viewBox="0 0 54 54"
      className="text-brand-primary"
    >
      <title>SSL Güven Mührü</title>
      <circle cx="27" cy="27" r="22" fill="rgba(0,71,255,0.08)" stroke="currentColor" strokeWidth="2" />
      <path
        d="M19 20c0 10 8 15 8 15s8-5 8-15v-3l-8-3-8 3v3Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M23 27l2.2 2.2L31.5 22.9"
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
        SSL
      </text>
    </svg>
  );
}

