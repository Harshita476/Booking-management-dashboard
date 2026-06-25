import Reveal from "@/components/Reveal";

const routes = [
  {
    n: "01 · Evening",
    name: "Sunset Sail",
    copy: "A short, easy run timed to the light — out past the breakwater and back before dark.",
    duration: "3 hrs",
    guests: "up to 8",
    path: "M6,40 Q70,10 140,28 T274,14",
  },
  {
    n: "02 · Full Day",
    name: "Day Passage",
    copy: "Up the coast and back, with a stop to swim or anchor for lunch. The most popular charter.",
    duration: "6 hrs",
    guests: "up to 12",
    path: "M6,44 Q50,8 110,30 Q160,48 200,18 T274,10",
  },
  {
    n: "03 · Bespoke",
    name: "Custom Voyage",
    copy: "Multi-day or overnight, plotted with you — for a milestone, a crossing, or no particular reason at all.",
    duration: "By plan",
    guests: "up to 12",
    path: "M6,20 Q60,46 120,20 Q170,2 210,26 T274,40",
  },
];

export default function Routes() {
  return (
    <section id="routes" className="py-[120px]">
      <div className="max-w-site mx-auto px-8">
        <Reveal className="max-w-[560px] mb-16">
          <span className="mono-label text-teal block mb-4">The Routes</span>
          <h2 className="font-display text-[clamp(1.9rem,3.6vw,2.8rem)] text-parchment leading-[1.12]">
            Three ways to be on the water.
          </h2>
          <p className="mt-[18px] text-text-dim text-[1.02rem] max-w-[46ch]">
            Every charter is private — just your group aboard. Routes below are starting points;
            the captain adjusts for wind, tide, and what you&apos;re after.
          </p>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-7">
          {routes.map((r) => (
            <Reveal key={r.name}>
              <div className="relative bg-ink-soft border border-line rounded-site p-7 pt-8 pb-7 transition-all hover:border-brass hover:-translate-y-1">
                <span className="mono-label text-brass block mb-[18px]">{r.n}</span>
                <svg className="w-full h-[54px] mb-[18px]" viewBox="0 0 280 54" fill="none">
                  <path d={r.path} stroke="#8c6a33" strokeWidth="1.2" strokeDasharray="4 5" />
                  <circle cx="6" cy={r.path.includes("M6,40") ? 40 : r.path.includes("M6,44") ? 44 : 20} r="3" fill="#c9974d" />
                </svg>
                <h3 className="font-display text-[1.4rem] text-parchment mb-2.5">{r.name}</h3>
                <p className="text-text-dim text-[0.95rem] mb-[22px]">{r.copy}</p>
                <div className="flex justify-between border-t border-line pt-4 text-[0.8rem] text-text-dim">
                  <span>
                    Duration <b className="font-mono font-medium text-parchment">{r.duration}</b>
                  </span>
                  <span>
                    Guests <b className="font-mono font-medium text-parchment">{r.guests}</b>
                  </span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
