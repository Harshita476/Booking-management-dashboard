"use client";

import { useMemo, useState } from "react";

type Booking = {
  id: string;
  name: string;
  email: string;
  preferredDate: string;
  partySize: string;
  details: string;
  status: string;
  createdAt: string;
};

type SortKey = "createdAt" | "preferredDate";

const statusStyles: Record<string, string> = {
  new: "text-brass border-brass",
  confirmed: "text-teal border-teal",
  declined: "text-coral border-coral",
};

export default function BookingsTable({ initialBookings }: { initialBookings: Booking[] }) {
  const [bookings, setBookings] = useState(initialBookings);
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("createdAt");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();
    let rows = bookings;
    if (term) {
      rows = rows.filter(
        (b) => b.name.toLowerCase().includes(term) || b.email.toLowerCase().includes(term)
      );
    }
    rows = [...rows].sort((a, b) => {
      const aVal = new Date(a[sortKey]).getTime();
      const bVal = new Date(b[sortKey]).getTime();
      return sortDir === "asc" ? aVal - bVal : bVal - aVal;
    });
    return rows;
  }, [bookings, search, sortKey, sortDir]);

  function toggleSort(key: SortKey) {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("desc");
    }
  }

  async function updateStatus(id: string, status: string) {
    setUpdatingId(id);
    try {
      const res = await fetch("/api/admin/bookings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status }),
      });
      if (res.ok) {
        setBookings((prev) => prev.map((b) => (b.id === id ? { ...b, status } : b)));
      }
    } finally {
      setUpdatingId(null);
    }
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by name or email…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="bg-ink-soft border border-line rounded-site px-4 py-2.5 text-parchment text-sm w-full max-w-xs focus:outline-none focus:border-brass"
        />
        <span className="font-mono text-xs text-text-dim uppercase tracking-wide">
          {filtered.length} request{filtered.length === 1 ? "" : "s"}
        </span>
      </div>

      <div className="overflow-x-auto border border-line rounded-site">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-ink-soft text-text-dim font-mono text-xs uppercase tracking-wide">
              <th className="text-left px-4 py-3 font-medium">Name</th>
              <th className="text-left px-4 py-3 font-medium">Email</th>
              <th
                className="text-left px-4 py-3 font-medium cursor-pointer select-none"
                onClick={() => toggleSort("preferredDate")}
              >
                Charter date {sortKey === "preferredDate" && (sortDir === "asc" ? "↑" : "↓")}
              </th>
              <th className="text-left px-4 py-3 font-medium">Party</th>
              <th className="text-left px-4 py-3 font-medium">Details</th>
              <th
                className="text-left px-4 py-3 font-medium cursor-pointer select-none"
                onClick={() => toggleSort("createdAt")}
              >
                Submitted {sortKey === "createdAt" && (sortDir === "asc" ? "↑" : "↓")}
              </th>
              <th className="text-left px-4 py-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 && (
              <tr>
                <td colSpan={7} className="px-4 py-10 text-center text-text-dim font-mono text-sm">
                  No requests yet. Once someone books, it'll show up here.
                </td>
              </tr>
            )}
            {filtered.map((b) => (
              <tr key={b.id} className="border-t border-line">
                <td className="px-4 py-3 text-parchment whitespace-nowrap">{b.name}</td>
                <td className="px-4 py-3 text-text-dim whitespace-nowrap">{b.email}</td>
                <td className="px-4 py-3 text-parchment font-mono text-xs whitespace-nowrap">
                  {new Date(b.preferredDate).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "2-digit",
                  })}
                </td>
                <td className="px-4 py-3 text-text-dim whitespace-nowrap">{b.partySize}</td>
                <td className="px-4 py-3 text-text-dim max-w-xs">
                  <span className="line-clamp-2">{b.details}</span>
                </td>
                <td className="px-4 py-3 text-text-dim font-mono text-xs whitespace-nowrap">
                  {new Date(b.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "2-digit",
                  })}
                </td>
                <td className="px-4 py-3">
                  <select
                    value={b.status}
                    disabled={updatingId === b.id}
                    onChange={(e) => updateStatus(b.id, e.target.value)}
                    className={`bg-ink-soft border rounded-site px-2 py-1.5 text-xs font-mono uppercase ${
                      statusStyles[b.status] ?? "text-text-dim border-line"
                    }`}
                  >
                    <option value="new">New</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="declined">Declined</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
