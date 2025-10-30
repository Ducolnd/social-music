export default function DashboardPage() {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
          Welcome to Social Music
        </h1>
        <p className="text-slate-600 dark:text-slate-400">
          Your creative hub for music video generation and social media management
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Quick Stats Placeholders */}
        <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-6">
          <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-2">
            Total Posts
          </h3>
          <p className="text-3xl font-bold text-slate-900 dark:text-white">
            --
          </p>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-6">
          <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-2">
            Videos Generated
          </h3>
          <p className="text-3xl font-bold text-slate-900 dark:text-white">
            --
          </p>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-6">
          <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-2">
            This Week
          </h3>
          <p className="text-3xl font-bold text-slate-900 dark:text-white">
            --
          </p>
        </div>
      </div>
    </div>
  );
}

