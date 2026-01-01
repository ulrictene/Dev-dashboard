import type { GithubActivityItem, GithubEventType } from "./types";

function mapType(t: string): GithubEventType {
  if (t === "PushEvent") return "PushEvent";
  if (t === "PullRequestEvent") return "PullRequestEvent";
  if (t === "IssuesEvent") return "IssuesEvent";
  return "Other";
}

export async function fetchGithubActivity(username: string): Promise<GithubActivityItem[]> {
  const u = username.trim();
  if (!u) return [];

  const res = await fetch(`https://api.github.com/users/${encodeURIComponent(u)}/events/public`);

  if (!res.ok) {
    if (res.status === 404) throw new Error("User not found");
    throw new Error("Failed to fetch GitHub activity");
  }

  const events = (await res.json()) as any[];

  return events.slice(0, 10).map((e) => {
    const type = mapType(e.type);
    const repo = e.repo?.name ?? "unknown";

    const message =
      e.type === "PushEvent" && e.payload?.commits?.length
        ? e.payload.commits[0].message
        : undefined;

    const url = repo && repo !== "unknown" ? `https://github.com/${repo}` : undefined;

    return {
      id: e.id,
      type,
      repo,
      message,
      createdAt: e.created_at,
      url,
    };
  });
}
