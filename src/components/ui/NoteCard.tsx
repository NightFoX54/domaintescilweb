import type { ReactNode } from "react";

export default function NoteCard({
  icon,
  title,
  body,
}: Readonly<{
  icon: ReactNode;
  title: string;
  body: string;
}>) {
  return (
    <div className="bg-white border border-neutral-200 rounded-2xl shadow-sm p-6">
      <div className="flex items-start gap-3">
        <div className="min-h-[44px] min-w-[44px] rounded-xl bg-brand-primary-light text-brand-primary inline-flex items-center justify-center">
          {icon}
        </div>
        <div>
          <h3 className="font-semibold text-neutral-950">{title}</h3>
          <p className="mt-2 text-neutral-600 text-sm leading-relaxed">{body}</p>
        </div>
      </div>
    </div>
  );
}

