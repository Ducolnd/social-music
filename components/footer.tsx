"use client";

import { Instagram, Twitter, Youtube, Music } from "lucide-react";
import Link from "next/link";

export function Footer() {
  const socialLinks = [
    { name: "Instagram", href: "#", icon: Instagram },
    { name: "Twitter", href: "#", icon: Twitter },
    { name: "TikTok", href: "#", icon: Music },
    { name: "YouTube", href: "#", icon: Youtube },
  ];

  return (
    <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 px-6 py-6">
      <div className="flex items-center justify-between">
        <p className="text-sm text-slate-600 dark:text-slate-400">
          © 2025 Social Music. All rights reserved.
        </p>
        <div className="flex items-center gap-4">
          {socialLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-slate-600 dark:text-slate-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
              aria-label={link.name}
            >
              <link.icon className="h-5 w-5" />
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}

