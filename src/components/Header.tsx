"use client";

import { useState } from "react";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-[100] bg-ink/85 backdrop-blur-md border-b border-line">
      <div className="max-w-site mx-auto px-8 py-[18px] flex items-center justify-between">
        <a href="#top" className="font-display font-bold text-[1.15rem] flex items-center gap-2.5">
          <svg viewBox="0 0 24 24" fill="none" className="w-[22px] h-[22px]">
            <circle cx="12" cy="12" r="10" stroke="#c9974d" strokeWidth="1.2" />
            <path d="M12 4v16M4 12h16M7 7l10 10M17 7L7 17" stroke="#c9974d" strokeWidth="0.7" opacity="0.6" />
            <path d="M12 6l2.2 6L12 18l-2.2-6L12 6z" fill="#c9974d" />
          </svg>
          Saltline
        </a>

        <button
          className="md:hidden text-parchment text-2xl bg-transparent border-none cursor-pointer"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          &#9776;
        </button>

        <nav
             className={`
               flex gap-8 items-center
               md:relative md:translate-y-0 md:bg-transparent md:flex-row md:px-0 md:py-0 md:border-none
               fixed top-[62px] left-0 right-0 bg-ink-deep flex-col items-start px-8 py-6 gap-5 border-b border-line
               transition-all duration-300
               ${open ? "translate-y-0 opacity-100 visible" : "-translate-y-[110%] opacity-0 invisible"}
               md:!translate-y-0 md:!opacity-100 md:!visible
    `}
>
          <a href="#routes" className="text-[0.85rem] text-text-dim hover:text-parchment transition-colors" onClick={() => setOpen(false)}>
            Routes
          </a>
          <a href="#vessel" className="text-[0.85rem] text-text-dim hover:text-parchment transition-colors" onClick={() => setOpen(false)}>
            The Vessel
          </a>
          <a href="#log" className="text-[0.85rem] text-text-dim hover:text-parchment transition-colors" onClick={() => setOpen(false)}>
            Log
          </a>
          <a
            href="#booking"
            onClick={() => setOpen(false)}
            className="text-[0.8rem] border border-brass text-brass px-[18px] py-[9px] rounded-site transition-all hover:bg-brass hover:text-ink"
          >
            Plan a charter
          </a>
        </nav>
      </div>
    </header>
  );
}
