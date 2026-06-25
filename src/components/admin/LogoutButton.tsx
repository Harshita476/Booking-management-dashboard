"use client";

import { signOut } from "next-auth/react";

export default function LogoutButton() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: "/admin/login" })}
      className="text-[0.85rem] text-text-dim border border-line px-4 py-2 rounded-site hover:text-parchment hover:border-brass transition-colors"
    >
      Log out
    </button>
  );
}
