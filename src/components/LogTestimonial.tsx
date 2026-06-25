import Reveal from "@/components/Reveal";

export default function LogTestimonial() {
  return (
    <section id="log" className="py-[120px]">
      <div className="max-w-site mx-auto px-8">
        <Reveal className="max-w-[680px] mx-auto text-left pl-7 border-l border-brass-dim">
          <p className="font-display italic font-medium text-[clamp(1.3rem,2.6vw,1.7rem)] text-parchment leading-[1.45]">
            &ldquo;We booked the Day Passage for an anniversary with no real plan, and the captain
            rerouted around weather without us ever feeling it. Best version of a day we
            could&apos;ve designed ourselves.&rdquo;
          </p>
          <div className="mt-6 mono-label text-text-dim">
            <b className="text-brass font-medium not-italic">Logged by R. Castellano</b> &middot;
            September crossing
          </div>
        </Reveal>
      </div>
    </section>
  );
}
