"use client";

import { FormEvent, useState } from "react";

type FormState = {
  name: string;
  email: string;
  preferredDate: string;
  partySize: string;
  details: string;
};

type Errors = Partial<Record<keyof FormState, string>>;

const initialState: FormState = {
  name: "",
  email: "",
  preferredDate: "",
  partySize: "",
  details: "",
};

export default function BookingForm() {
  const [form, setForm] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<Errors>({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState<FormState | null>(null);
  const [serverError, setServerError] = useState<string | null>(null);

  const today = new Date().toISOString().split("T")[0];

  function handleChange(field: keyof FormState, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function validateClientSide(): Errors {
    const next: Errors = {};
    if (!form.name.trim()) next.name = "Please enter your name.";
    if (!form.email.trim()) next.email = "Please enter your email.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = "That email doesn't look right.";
    if (!form.preferredDate) next.preferredDate = "Pick a preferred date.";
    else if (form.preferredDate < today) next.preferredDate = "Pick a date from today onward.";
    if (!form.partySize) next.partySize = "Select a party size.";
    if (!form.details.trim() || form.details.trim().length < 8)
      next.details = "Tell us a bit more (route, occasion, etc).";
    return next;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setServerError(null);

    const clientErrors = validateClientSide();
    setErrors(clientErrors);
    if (Object.keys(clientErrors).length > 0) return;

    setLoading(true);
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        if (data.fieldErrors) {
          const mapped: Errors = {};
          Object.entries(data.fieldErrors as Record<string, string[]>).forEach(([key, msgs]) => {
            mapped[key as keyof FormState] = msgs[0];
          });
          setErrors(mapped);
        } else {
          setServerError(data.error ?? "Something went wrong. Please try again.");
        }
        return;
      }

      setSubmitted(form);
    } catch {
      setServerError("Couldn't reach the server. Check your connection and try again.");
    } finally {
      setLoading(false);
    }
  }

  function reset() {
    setForm(initialState);
    setErrors({});
    setServerError(null);
    setSubmitted(null);
  }

  const fieldClass = (hasError: boolean) =>
    `w-full bg-transparent border-0 border-b ${
      hasError ? "border-coral" : "border-line"
    } text-parchment text-[0.98rem] py-2 px-0.5 focus:outline-none focus:border-brass transition-colors placeholder:text-text-dim placeholder:opacity-60`;

  if (submitted) {
    return (
      <div className="text-center py-9 px-5">
        <div className="seal-pop w-14 h-14 mx-auto mb-5 border border-brass rounded-full flex items-center justify-center">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path d="M5 13l4 4L19 7" stroke="#c9974d" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <h3 className="font-display text-[1.3rem] text-parchment mb-2.5">Request logged.</h3>
        <p className="text-text-dim text-[0.92rem] max-w-[36ch] mx-auto mb-6">
          We&apos;ve recorded your charter request. A confirmation will be sent to your email
          within one business day.
        </p>
        <div className="text-left bg-ink-soft border border-line rounded-site px-5 py-[18px] mx-auto mb-6 max-w-[360px] font-mono text-[0.78rem] text-text-dim">
          <div className="flex justify-between py-1">
            <span>Name</span>
            <span className="text-parchment">{submitted.name}</span>
          </div>
          <div className="flex justify-between py-1">
            <span>Email</span>
            <span className="text-parchment">{submitted.email}</span>
          </div>
          <div className="flex justify-between py-1">
            <span>Date</span>
            <span className="text-parchment">
              {new Date(submitted.preferredDate + "T00:00:00").toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "2-digit",
              })}
            </span>
          </div>
          <div className="flex justify-between py-1">
            <span>Party</span>
            <span className="text-parchment">{submitted.partySize}</span>
          </div>
        </div>
        <button
          onClick={reset}
          className="text-[0.85rem] text-brass border-b border-brass-dim pb-0.5"
        >
          Log another request
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-[22px]" noValidate>
      <div className="grid sm:grid-cols-2 gap-[22px]">
        <div>
          <label htmlFor="f-name" className="block font-mono text-[0.7rem] uppercase tracking-wide text-text-dim mb-2">
            Full name <span className="text-brass">*</span>
          </label>
          <input
            id="f-name"
            type="text"
            placeholder="Your name"
            autoComplete="name"
            value={form.name}
            onChange={(e) => handleChange("name", e.target.value)}
            className={fieldClass(!!errors.name)}
          />
          <div className="text-coral text-[0.78rem] mt-1.5 min-h-[1em] font-mono">{errors.name}</div>
        </div>
        <div>
          <label htmlFor="f-email" className="block font-mono text-[0.7rem] uppercase tracking-wide text-text-dim mb-2">
            Email <span className="text-brass">*</span>
          </label>
          <input
            id="f-email"
            type="email"
            placeholder="you@example.com"
            autoComplete="email"
            value={form.email}
            onChange={(e) => handleChange("email", e.target.value)}
            className={fieldClass(!!errors.email)}
          />
          <div className="text-coral text-[0.78rem] mt-1.5 min-h-[1em] font-mono">{errors.email}</div>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-[22px]">
        <div>
          <label htmlFor="f-date" className="block font-mono text-[0.7rem] uppercase tracking-wide text-text-dim mb-2">
            Preferred date <span className="text-brass">*</span>
          </label>
          <input
            id="f-date"
            type="date"
            min={today}
            value={form.preferredDate}
            onChange={(e) => handleChange("preferredDate", e.target.value)}
            className={fieldClass(!!errors.preferredDate)}
          />
          <div className="text-coral text-[0.78rem] mt-1.5 min-h-[1em] font-mono">{errors.preferredDate}</div>
        </div>
        <div>
          <label htmlFor="f-party" className="block font-mono text-[0.7rem] uppercase tracking-wide text-text-dim mb-2">
            Party size <span className="text-brass">*</span>
          </label>
          <select
            id="f-party"
            value={form.partySize}
            onChange={(e) => handleChange("partySize", e.target.value)}
            className={fieldClass(!!errors.partySize)}
          >
            <option value="">Select…</option>
            <option value="1–2 guests">1–2 guests</option>
            <option value="3–6 guests">3–6 guests</option>
            <option value="7–12 guests">7–12 guests</option>
          </select>
          <div className="text-coral text-[0.78rem] mt-1.5 min-h-[1em] font-mono">{errors.partySize}</div>
        </div>
      </div>

      <div>
        <label htmlFor="f-details" className="block font-mono text-[0.7rem] uppercase tracking-wide text-text-dim mb-2">
          Charter details <span className="text-brass">*</span>
        </label>
        <textarea
          id="f-details"
          placeholder="Which route, the occasion, and anything we should know"
          value={form.details}
          onChange={(e) => handleChange("details", e.target.value)}
          className={`${fieldClass(!!errors.details)} min-h-[90px] resize-y`}
        />
        <div className="text-coral text-[0.78rem] mt-1.5 min-h-[1em] font-mono">{errors.details}</div>
      </div>

      {serverError && (
        <div className="text-coral text-[0.85rem] font-mono">{serverError}</div>
      )}

      <div className="flex justify-between items-center mt-2 gap-5 flex-wrap">
        <span className="font-mono text-[0.72rem] uppercase tracking-wide text-text-dim max-w-[30ch]">
          We reply within one business day.
        </span>
        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center gap-2.5 bg-brass text-ink-deep px-7 py-[15px] rounded-site font-semibold text-[0.92rem] border border-brass disabled:opacity-60 disabled:cursor-not-allowed transition-transform hover:not-disabled:-translate-y-0.5 whitespace-nowrap"
        >
          <span className={loading ? "opacity-70" : ""}>{loading ? "Logging…" : "Log this request"}</span>
          {loading && (
            <span className="w-3.5 h-3.5 border-2 border-ink-deep/30 border-t-ink-deep rounded-full animate-spin" />
          )}
        </button>
      </div>
    </form>
  );
}
