"use client";

import { FormEvent, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    setLoading(false);

    if (res?.error) {
      setError("Incorrect email or password.");
      return;
    }

    router.push("/admin");
    router.refresh();
  }

  return (
    <div className="min-h-screen bg-ink flex items-center justify-center px-6">
      <div className="w-full max-w-sm bg-ink-soft border border-line rounded-site p-8">
        <div className="font-display font-bold text-[1.2rem] text-parchment flex items-center gap-2.5 mb-6">
          <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
            <circle cx="12" cy="12" r="10" stroke="#c9974d" strokeWidth="1.2" />
            <path d="M12 6l2.2 6L12 18l-2.2-6L12 6z" fill="#c9974d" />
          </svg>
          Saltline Admin
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div>
            <label className="block font-mono text-[0.7rem] uppercase tracking-wide text-text-dim mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
              className="w-full bg-transparent border-0 border-b border-line text-parchment py-2 focus:outline-none focus:border-brass"
            />
          </div>
          <div>
            <label className="block font-mono text-[0.7rem] uppercase tracking-wide text-text-dim mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
              className="w-full bg-transparent border-0 border-b border-line text-parchment py-2 focus:outline-none focus:border-brass"
            />
          </div>

          {error && <div className="text-coral text-[0.85rem] font-mono">{error}</div>}

          <button
            type="submit"
            disabled={loading}
            className="bg-brass text-ink-deep font-semibold py-3 rounded-site disabled:opacity-60 mt-2"
          >
            {loading ? "Signing in…" : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
}
