import WidgetCard from "../../dashboard/components/WidgetCard";
import { usePreferences } from "../../../features/settings/usePreferences";
import { useGithubActivity } from "../../../features/github/useGithubActivity";

function labelFor(type: string) {
  if (type === "PushEvent") return "Push";
  if (type === "PullRequestEvent") return "PR";
  if (type === "IssuesEvent") return "Issue";
  return "Event";
}

export default function GithubWidget() {
  const { prefs } = usePreferences();
  const activity = useGithubActivity(prefs.githubUsername);

  return (
    <WidgetCard title="GitHub" subtitle={`@${prefs.githubUsername}`}>
      {activity.status === "loading" && (
        <div className="text-sm text-zinc-500">Loading activity…</div>
      )}

      {activity.status === "error" && (
        <div className="text-sm text-red-600">{activity.error}</div>
      )}

      {activity.status === "success" && (
        <div className="space-y-2">
          {activity.data.length === 0 ? (
            <div className="rounded-xl border bg-zinc-50 p-4 text-sm text-zinc-600">
              No recent public activity found.
            </div>
          ) : (
            activity.data.slice(0, 6).map((item) => (
              <a
                key={item.id}
                href={item.url}
                target="_blank"
                rel="noreferrer"
                className="block rounded-xl border bg-white px-3 py-2 hover:bg-zinc-50"
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <div className="truncate text-sm font-medium">{item.repo}</div>
                    <div className="truncate text-xs text-zinc-500">
                      {labelFor(item.type)}
                      {item.message ? ` • ${item.message}` : ""}
                    </div>
                  </div>
                  <span className="shrink-0 rounded-lg border bg-zinc-50 px-2 py-1 text-xs text-zinc-600">
                    {labelFor(item.type)}
                  </span>
                </div>
              </a>
            ))
          )}
        </div>
      )}
    </WidgetCard>
  );
}
