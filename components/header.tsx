"use client";

import Link from "next/link";
import { LogoutButton } from "./logout-button";

export function Header() {
  return (
    <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-8">
        <Link href="/dashboard" className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
          Social Music
        </Link>
      </div>
      <div className="flex items-center gap-4">
        <LogoutButton />
      </div>
    </header>
  );
}

