const items = [
  { label: "Departure", value: "Wickford Cove, RI" },
  { label: "Fleet", value: "3 vessels, 28–42ft" },
  { label: "Capacity", value: "2–12 guests" },
  { label: "Crew", value: "Captained & provisioned" },
];

export default function ManifestStrip() {
  return (
    <section className="border-t border-b border-line bg-ink-deep relative z-[2]">
      <div className="max-w-site mx-auto grid grid-cols-2 md:grid-cols-4">
        {items.map((item, i) => (
          <div
            key={item.label}
            className={`px-6 py-7 border-line ${i % 2 === 0 ? "border-r" : "md:border-r"} ${
              i < items.length - 1 ? "md:border-r" : "md:border-r-0"
            } border-b md:border-b-0`}
          >
            <span className="mono-label text-brass block mb-2">{item.label}</span>
            <div className="font-display text-[1.15rem] text-parchment">{item.value}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
