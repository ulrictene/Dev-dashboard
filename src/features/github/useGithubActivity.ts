import { useEffect, useState } from "react";
import type { GithubActivityItem } from "./types";
import { fetchGithubActivity } from "./githubService";

type State =
  | { status: "loading" }
  | { status: "error"; error: string }
  | { status: "success"; data: GithubActivityItem[] };

const CACHE_MS = 10 * 60 * 1000; 

function cacheKey(username: string) {
  return `pdd.github.cache.${username.toLowerCase()}`;
}

export function useGithubActivity(username: string) {
  const [state, setState] = useState<State>({ status: "loading" });

  useEffect(() => {
    let cancelled = false;
    const u = username.trim();
    if (!u) {
      setState({ status: "success", data: [] });
      return;
    }

    const cachedRaw = localStorage.getItem(cacheKey(u));
    if (cachedRaw) {
      try {
        const cached = JSON.parse(cachedRaw) as { fetchedAt: string; items: GithubActivityItem[] };
        const age = Date.now() - new Date(cached.fetchedAt).getTime();
        if (age < CACHE_MS) {
          setState({ status: "success", data: cached.items });
          return;
        }
      } catch {
       
      }
    }

    setState({ status: "loading" });

    fetchGithubActivity(u)
      .then((items) => {
        if (cancelled) return;
        localStorage.setItem(
          cacheKey(u),
          JSON.stringify({ fetchedAt: new Date().toISOString(), items })
        );
        setState({ status: "success", data: items });
      })
      .catch((e) => {
        if (cancelled) return;
        setState({ status: "error", error: e.message });
      });

    return () => {
      cancelled = true;
    };
  }, [username]);

  return state;
}
