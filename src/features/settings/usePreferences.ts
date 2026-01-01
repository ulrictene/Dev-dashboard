import { useLocalStorage } from "../../shared/hooks/useLocalStorage";

export type Preferences = {
  githubUsername: string;
  updatedAt: string;
};

const KEY = "pdd.preferences.v1";

export function usePreferences() {
  const [prefs, setPrefs] = useLocalStorage<Preferences>(KEY, {
    githubUsername: "octocat",
    updatedAt: new Date().toISOString(),
  });

  function setGithubUsername(username: string) {
    const v = username.trim();
    setPrefs({
      ...prefs,
      githubUsername: v,
      updatedAt: new Date().toISOString(),
    });
  }

  return { prefs, setGithubUsername };
}
