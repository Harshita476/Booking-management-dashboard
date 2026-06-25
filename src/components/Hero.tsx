export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-20">
      <div
        className="absolute inset-0 z-0"
        style={{
          background:
            "linear-gradient(180deg,#0a1c2b 0%,#0e2738 45%,#163c4f 75%,#1f4a5c 100%)",
        }}
      />
      <div
        className="absolute inset-0 z-[1] opacity-[0.18]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(201,151,77,0.25) 1px, transparent 1px), linear-gradient(90deg, rgba(201,151,77,0.25) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />
      <div
        className="hero-sun absolute w-60 h-60 rounded-full right-[12%] top-[18%] opacity-90"
        style={{
          background:
            "radial-gradient(circle at 40% 35%, rgba(255,224,168,0.95), #c9974d 60%, transparent 100%)",
        }}
      />
      <div
        className="absolute left-0 right-0 bottom-[32%] h-px opacity-60"
        style={{
          background:
            "linear-gradient(90deg, transparent, #8c6a33 20%, #c9974d 50%, #8c6a33 80%, transparent)",
        }}
      />
      <div className="absolute bottom-0 left-0 w-[220%] h-[34%] z-[1]">
        <svg
          className="wave-anim w-full h-full block"
          viewBox="0 0 1600 200"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0,80 C100,40 200,120 300,80 C400,40 500,120 600,80 C700,40 800,120 900,80 C1000,40 1100,120 1200,80 C1300,40 1400,120 1500,80 C1550,70 1580,75 1600,80 L1600,200 L0,200 Z"
            fill="#0e2738"
          />
          <path
            d="M0,110 C100,80 200,140 300,110 C400,80 500,140 600,110 C700,80 800,140 900,110 C1000,80 1100,140 1200,110 C1300,80 1400,140 1500,110 C1550,100 1580,105 1600,110 L1600,200 L0,200 Z"
            fill="#06121c"
          />
        </svg>
      </div>

      <div className="relative z-[2] w-full max-w-site mx-auto px-8">
        <div className="flex items-center gap-2.5 mono-label text-brass mb-[18px]">
          <span className="w-7 h-px bg-brass" /> Private charters &middot; Coastal New England
        </div>
        <h1 className="font-display font-semibold leading-[1.04] text-parchment max-w-[14ch] text-[clamp(2.6rem,6.4vw,5.2rem)]">
          Chart your <em className="italic font-medium text-brass">own</em>
          <br />
          course.
        </h1>
        <p className="mt-[26px] max-w-[480px] text-text-dim text-[1.05rem]">
          Private sailing charters, captained and provisioned, built around your day &mdash; from a
          sunset run to a full passage along the coast.
        </p>
        <div className="mt-10 flex gap-[18px] items-center flex-wrap">
          <a
            href="#booking"
            className="inline-flex items-center gap-2.5 bg-brass text-ink-deep px-[30px] py-[15px] rounded-site font-semibold text-[0.95rem] border border-brass transition-transform hover:-translate-y-0.5 hover:shadow-[0_10px_28px_-8px_rgba(201,151,77,0.55)]"
          >
            Plan a charter
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path
                d="M5 12h14M13 6l6 6-6 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
          <a
            href="#routes"
            className="text-[0.9rem] text-parchment-dim border-b border-line pb-[3px] transition-colors hover:text-parchment hover:border-brass"
          >
            See the routes
          </a>
        </div>
      </div>

      <div className="absolute bottom-9 left-8 z-[2] flex items-center gap-2.5 text-text-dim">
        <span className="scroll-line w-px h-[34px]" style={{ background: "linear-gradient(180deg,#c9974d,transparent)" }} />
        <span className="mono-label">Scroll</span>
      </div>
    </section>
  );
}
