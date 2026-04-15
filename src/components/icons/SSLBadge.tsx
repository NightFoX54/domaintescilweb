export default function SSLBadge() {
  return (
    <svg
      role="img"
      aria-label="SSL Güven Mührü"
      width="54"
      height="54"
      viewBox="0 0 54 54"
      className="text-brand-accent"
    >
      <title>SSL Güven Mührü</title>
      <circle cx="27" cy="27" r="22" fill="rgba(0,212,255,0.08)" stroke="currentColor" strokeWidth="2" />
      <path
        d="M27 16l10 4v7c0 8-6.5 13-10 14-3.5-1-10-6-10-14v-7l10-4Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M22 29l3 3 7-8"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

