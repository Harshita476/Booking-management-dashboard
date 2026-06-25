"use client";

import { useEffect, useRef, useState } from "react";

const specs = [
  { label: "Lead Vessel", value: "Wren, 38ft sloop" },
  { label: "Built", value: "1994, refit 2021" },
  { label: "Home Waters", value: "Narragansett Bay" },
  { label: "Season", value: "May – October" },
];

export default function Vessel() {
  const compassRef = useRef<SVGSVGElement>(null);
  const [rotated, setRotated] = useState(false);

  useEffect(() => {
    const el = compassRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setRotated(true);
        });
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="vessel" className="bg-ink-deep py-[120px]">
      <div className="max-w-site mx-auto px-8 grid md:grid-cols-2 gap-16 items-center">
        <div>
          <span className="mono-label text-teal block mb-4">The Vessel</span>
          <h2 className="font-display text-[clamp(1.9rem,3.4vw,2.6rem)] text-parchment mb-5 leading-[1.15]">
            Built for the coast, not the brochure.
          </h2>
          <p className="text-text-dim mb-4 max-w-[48ch]">
            Our boats are working sailboats first — well-kept, well-rigged, and sailed by captains
            who know this water in every season. No two charters look the same because no two days
            on the water do either.
          </p>
          <p className="text-text-dim mb-4 max-w-[48ch]">
            Life jackets, charts, and provisioning are handled before you arrive. You bring the
            people and the occasion.
          </p>
          <div className="grid grid-cols-2 gap-x-8 gap-y-[18px] mt-8">
            {specs.map((s) => (
              <div key={s.label}>
                <span className="mono-label text-teal block mb-1">{s.label}</span>
                <div className="font-display text-[1.05rem] text-parchment">{s.value}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center">
          <svg
            ref={compassRef}
            className={`compass-rotate w-[min(360px,90%)] ${rotated ? "is-visible" : ""}`}
            viewBox="0 0 300 300"
            fill="none"
          >
            <circle cx="150" cy="150" r="120" stroke="#c9974d" strokeWidth="1" />
            <circle cx="150" cy="150" r="92" stroke="#3e6e68" strokeWidth="0.6" opacity="0.6" />
            <g stroke="#8c6a33" strokeWidth="1">
              <line x1="150" y1="30" x2="150" y2="50" />
              <line x1="150" y1="250" x2="150" y2="270" />
              <line x1="30" y1="150" x2="50" y2="150" />
              <line x1="250" y1="150" x2="270" y2="150" />
            </g>
            <path d="M150 60 L168 150 L150 240 L132 150 Z" fill="none" stroke="#c9974d" strokeWidth="1.1" />
            <path d="M150 60 L168 150 L150 150 Z" fill="#c9974d" />
            <path d="M150 240 L132 150 L150 150 Z" fill="#c9974d" opacity="0.5" />
            <circle cx="150" cy="150" r="4" fill="#f2ebda" />
            <text x="150" y="24" fill="#e9e2d2" fontFamily="monospace" fontSize="11" textAnchor="middle">N</text>
            <text x="150" y="284" fill="#9fb3c2" fontFamily="monospace" fontSize="11" textAnchor="middle">S</text>
            <text x="20" y="154" fill="#9fb3c2" fontFamily="monospace" fontSize="11" textAnchor="middle">W</text>
            <text x="280" y="154" fill="#9fb3c2" fontFamily="monospace" fontSize="11" textAnchor="middle">E</text>
          </svg>
        </div>
      </div>
    </section>
  );
}
