import Link from "next/link";

export default function GlobalNotFound() {
  return (
    <main className="min-h-screen bg-neutral-950 text-white flex items-center">
      <section className="mx-auto w-full max-w-4xl px-4 sm:px-6 py-20">
        <p className="text-sm text-brand-accent font-semibold">404</p>
        <h1 className="mt-3 font-display text-4xl sm:text-5xl font-semibold">Aradığınız sayfa bulunamadı.</h1>
        <p className="mt-4 text-neutral-300 max-w-[60ch]">
          URL değişmiş olabilir veya bağlantı hatalı olabilir. Aşağıdaki hızlı bağlantılarla devam edebilirsiniz.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/" className="min-h-[44px] inline-flex items-center rounded-xl bg-brand-primary px-5 text-sm font-semibold">
            Ana Sayfa
          </Link>
          <Link href="/domain-ara" className="min-h-[44px] inline-flex items-center rounded-xl border border-white/20 px-5 text-sm font-semibold">
            Domain Ara
          </Link>
          <Link href="/knowledgebase" className="min-h-[44px] inline-flex items-center rounded-xl border border-white/20 px-5 text-sm font-semibold">
            Yardım Merkezi
          </Link>
        </div>
      </section>
    </main>
  );
}

