export default function SkipToContent() {
  return (
    <a
      href="#main-content"
      className="fixed left-4 top-4 z-[100] inline-flex min-h-[44px] items-center rounded-lg bg-brand-primary px-4 py-2 text-sm font-semibold text-white shadow-lg -translate-y-[120%] opacity-0 transition-[transform,opacity] duration-200 focus:translate-y-0 focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-primary"
    >
      İçeriğe Geç
    </a>
  );
}
