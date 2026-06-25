export default function Footer() {
  return (
    <footer className="bg-ink-deep py-16 pb-8">
      <div className="max-w-site mx-auto px-8">
        <div className="flex flex-wrap justify-between gap-10 pb-10 border-b border-line">
          <div className="max-w-[260px]">
            <div className="font-display font-bold text-[1.3rem] text-parchment flex items-center gap-2.5 mb-3.5">
              <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
                <circle cx="12" cy="12" r="10" stroke="#c9974d" strokeWidth="1.2" />
                <path d="M12 6l2.2 6L12 18l-2.2-6L12 6z" fill="#c9974d" />
              </svg>
              Saltline
            </div>
            <p className="text-text-dim text-[0.88rem] max-w-[30ch]">
              Private sailing charters out of Wickford Cove, Rhode Island. Captained, provisioned,
              plotted to your day.
            </p>
          </div>
          <div>
            <h4 className="mono-label text-brass mb-3.5">Charters</h4>
            <a href="#routes" className="block text-text-dim text-[0.88rem] mb-2.5 hover:text-parchment transition-colors">Sunset Sail</a>
            <a href="#routes" className="block text-text-dim text-[0.88rem] mb-2.5 hover:text-parchment transition-colors">Day Passage</a>
            <a href="#routes" className="block text-text-dim text-[0.88rem] mb-2.5 hover:text-parchment transition-colors">Custom Voyage</a>
          </div>
          <div>
            <h4 className="mono-label text-brass mb-3.5">Saltline</h4>
            <a href="#vessel" className="block text-text-dim text-[0.88rem] mb-2.5 hover:text-parchment transition-colors">The Vessel</a>
            <a href="#log" className="block text-text-dim text-[0.88rem] mb-2.5 hover:text-parchment transition-colors">The Log</a>
            <a href="#booking" className="block text-text-dim text-[0.88rem] mb-2.5 hover:text-parchment transition-colors">Plan a Charter</a>
          </div>
        </div>
        <div className="flex flex-wrap justify-between gap-3 pt-6 text-text-dim text-[0.78rem] font-mono">
          <span>&copy; {new Date().getFullYear()} Saltline Charters. Swap in your real contact details.</span>
          <span>Wickford Cove, RI</span>
        </div>
      </div>
    </footer>
  );
}
