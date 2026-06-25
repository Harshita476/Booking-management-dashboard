import Reveal from "@/components/Reveal";
import BookingForm from "@/components/BookingForm";

export default function BookingSection() {
  return (
    <section id="booking" className="bg-ink-soft border-t border-b border-line py-[120px]">
      <div className="max-w-site mx-auto px-8">
        <div className="grid md:grid-cols-[0.85fr_1.15fr] gap-14">
          <Reveal>
            <span className="mono-label text-teal block mb-4">Request a Charter</span>
            <h2 className="font-display text-[clamp(1.9rem,3.4vw,2.5rem)] text-parchment mb-[18px] leading-[1.14]">
              Tell us the day you&apos;re after.
            </h2>
            <p className="text-text-dim mb-7 max-w-[40ch]">
              Send your preferred date and a little context. We&apos;ll confirm availability and
              the right vessel within a day, by email.
            </p>

            <div className="flex gap-3 items-start mb-4 text-text-dim text-[0.92rem]">
              <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4 mt-0.5 text-brass flex-shrink-0">
                <path d="M3 8l9 6 9-6M3 8v10a2 2 0 002 2h14a2 2 0 002-2V8M3 8a2 2 0 012-2h14a2 2 0 012 2" stroke="currentColor" strokeWidth="1.4" />
              </svg>
              <span>bookings@saltlinecharters.example</span>
            </div>
            <div className="flex gap-3 items-start mb-4 text-text-dim text-[0.92rem]">
              <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4 mt-0.5 text-brass flex-shrink-0">
                <path d="M5 4h3l2 5-2.5 1.5a11 11 0 005 5L14 13l5 2v3a2 2 0 01-2 2A16 16 0 015 6a2 2 0 012-2z" stroke="currentColor" strokeWidth="1.4" />
              </svg>
              <span>(401) 555-0148</span>
            </div>
            <div className="flex gap-3 items-start mb-4 text-text-dim text-[0.92rem]">
              <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4 mt-0.5 text-brass flex-shrink-0">
                <path d="M12 21s7-7.2 7-12a7 7 0 10-14 0c0 4.8 7 12 7 12z" stroke="currentColor" strokeWidth="1.4" />
                <circle cx="12" cy="9" r="2.4" stroke="currentColor" strokeWidth="1.4" />
              </svg>
              <span>41.5818° N, 71.4467° W — Wickford Cove</span>
            </div>
          </Reveal>

          <Reveal>
            <div className="relative bg-ink-deep border border-line rounded-site p-10">
              <div
                className="absolute top-0 left-0 right-0 h-[3px] opacity-50"
                style={{
                  background:
                    "repeating-linear-gradient(90deg, #c9974d 0 10px, transparent 10px 18px)",
                }}
              />
              <div className="flex justify-between items-baseline mb-7 pb-[18px] border-b border-dashed border-line">
                <span className="mono-label text-brass">Charter Request · No. 0142</span>
                <span className="mono-label text-text-dim">
                  {new Date().toLocaleDateString("en-US", { year: "numeric", month: "short", day: "2-digit" })}
                </span>
              </div>
              <BookingForm />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
