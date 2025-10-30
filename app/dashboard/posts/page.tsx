export default function PostsPage() {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
          Posts Management
        </h1>
        <p className="text-slate-600 dark:text-slate-400">
          Manage and schedule your social media posts
        </p>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-8">
        <div className="text-center py-12">
          <div className="mb-4">
            <svg
              className="mx-auto h-16 w-16 text-slate-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
            Posts Management Coming Soon
          </h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-md mx-auto">
            This page will allow you to manage and schedule your social media posts.
            Feature coming in a future release.
          </p>
        </div>
      </div>
    </div>
  );
}

