import { usePreferences } from "../features/settings/usePreferences";
import ThemeToggle from "../features/settings/ThemeToggle";

export default function SettingsPage() {
  const { prefs, setGithubUsername } = usePreferences();

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold">Settings</h1>
           <div className="grid gap-6 sm:grid-cols-2">
        <div className="rounded-2xl border bg-white p-6 shadow-sm dark:bg-zinc-900 dark:border-zinc-800">
          <ThemeToggle />
          </div>
      <div className="rounded-2xl border bg-white p-6 shadow-sm dark:bg-zinc-900 dark:border-zinc-800">
        <div className="text-sm font-semibold">Integrations</div>
        <div className="mt-4 space-y-2">
          <label className="block text-sm text-zinc-600">GitHub username</label>
          <input
            value={prefs.githubUsername}
            onChange={(e) => setGithubUsername(e.target.value)}
            placeholder="e.g. octocat"
            className="h-10 w-full rounded-xl border bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-zinc-200"
          />
          <p className="text-xs text-zinc-500">
            Used to show your recent public GitHub activity.
          </p>
        </div>
      </div>
    </div>
    </div>
  );
}

