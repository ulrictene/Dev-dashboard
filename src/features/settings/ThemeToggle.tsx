import { useTheme } from "../../app/providers/ThemedProvider";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="space-y-2">
      <div className="text-sm font-semibold">Theme</div>

      <div className="flex gap-2">
        {(["light", "dark", "system"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTheme(t)}
            className={[
              "rounded-xl border px-3 py-2 text-sm capitalize",
              theme === t
                ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900"
                : "bg-white hover:bg-zinc-50 dark:bg-zinc-800 dark:hover:bg-zinc-700",
            ].join(" ")}
          >
            {t}
          </button>
        ))}
      </div>
    </div>
  );
}
