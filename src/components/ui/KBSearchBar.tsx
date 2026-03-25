"use client";

import { Search } from "lucide-react";

export default function KBSearchBar({
  placeholder = "Makale ara (yakında)",
}: Readonly<{
  placeholder?: string;
}>) {
  return (
    <div className="max-w-xl">
      <label className="sr-only" htmlFor="kb-search">
        Bilgi bankasında ara
      </label>
      <div className="flex items-center gap-3 rounded-2xl border border-white/15 bg-white/10 backdrop-blur px-4 py-3">
        <Search size={18} className="text-white/80" aria-hidden="true" />
        <input
          id="kb-search"
          type="search"
          placeholder={placeholder}
          className="w-full bg-transparent text-white placeholder:text-white/50 outline-none"
        />
      </div>
      <div className="mt-2 text-xs text-white/60">Frontend placeholder — filtreleme yakında.</div>
    </div>
  );
}

