import { AuthButton } from "@/components/auth-button";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { hasEnvVars } from "@/lib/utils";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      {/* Navigation */}
      <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
        <div className="w-full max-w-7xl flex justify-between items-center p-3 px-5 text-sm">
          <div className="flex gap-5 items-center font-semibold">
            <Link href={"/"} className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Social Music
            </Link>
            <Link href="/dashboard" className="text-slate-600 dark:text-slate-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
              Dashboard
            </Link>
          </div>
          {hasEnvVars && <AuthButton />}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="flex-1 flex flex-col items-center justify-center px-4 py-20 bg-gradient-to-br from-purple-50 via-blue-50 to-white dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
        <div className="max-w-4xl text-center space-y-6">
          <h1 className="text-5xl md:text-6xl font-bold text-slate-900 dark:text-white">
            Create. Share. <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Dominate.</span>
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            The all-in-one platform for music producers to generate videos and manage social media posts across multiple platforms.
          </p>
          <div className="flex gap-4 justify-center mt-8">
            <Button asChild size="lg" className="bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700">
              <Link href="/auth/sign-up">Get Started</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/auth/login">Sign In</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-white dark:bg-slate-950">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-slate-900 dark:text-white">
            Everything you need to grow your music
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 rounded-lg border border-slate-200 dark:border-slate-800">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-slate-900 dark:text-white">Video Generation</h3>
              <p className="text-slate-600 dark:text-slate-400">Create engaging videos automatically for your tracks.</p>
            </div>
            <div className="text-center p-6 rounded-lg border border-slate-200 dark:border-slate-800">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-slate-900 dark:text-white">Cross-Platform Posting</h3>
              <p className="text-slate-600 dark:text-slate-400">Manage and schedule posts across Instagram, Twitter, TikTok, and YouTube.</p>
            </div>
            <div className="text-center p-6 rounded-lg border border-slate-200 dark:border-slate-800">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-slate-900 dark:text-white">Lightning Fast</h3>
              <p className="text-slate-600 dark:text-slate-400">Generate content in minutes, not hours.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call-to-Action Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-purple-600 to-blue-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to elevate your music career?
          </h2>
          <p className="text-xl text-purple-100 mb-8">
            Join thousands of producers who are already using Social Music to grow their audience.
          </p>
          <Button asChild size="lg" className="bg-white text-purple-600 hover:bg-purple-50">
            <Link href="/auth/sign-up">Start Free Trial</Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full flex items-center justify-center border-t mx-auto text-center text-xs gap-8 py-16 bg-white dark:bg-slate-950">
        <p className="text-slate-600 dark:text-slate-400">
          © 2025 Social Music. All rights reserved.
        </p>
        <ThemeSwitcher />
      </footer>
    </main>
  );
}
