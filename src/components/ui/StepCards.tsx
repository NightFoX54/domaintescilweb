import type { ReactNode } from "react";

export type StepCard = {
  icon: ReactNode;
  title: string;
  description: string;
};

export default function StepCards({
  cards,
}: Readonly<{
  cards: StepCard[];
}>) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {cards.map((c) => (
        <div
          key={c.title}
          className="bg-white border border-neutral-200 rounded-2xl shadow-sm p-6"
        >
          <div className="flex items-start gap-3">
            <div className="min-h-[44px] min-w-[44px] rounded-xl bg-brand-primary-light text-brand-primary inline-flex items-center justify-center">
              {c.icon}
            </div>
            <div>
              <h3 className="font-semibold text-neutral-950">{c.title}</h3>
              <p className="mt-1 text-neutral-600 text-sm leading-relaxed">
                {c.description}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

