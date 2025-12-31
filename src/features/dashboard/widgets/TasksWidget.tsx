import { useMemo, useState } from "react";
import WidgetCard from "../../dashboard/components/WidgetCard";
import { useTasks } from "../../productivity/useTasks";

export default function TasksWidget() {
  const { tasks, addTask, toggleTask, deleteTask } = useTasks();
  const [title, setTitle] = useState("");

  const completedCount = useMemo(
    () => tasks.filter((t) => t.status === "completed").length,
    [tasks]
  );

  return (
    <WidgetCard
      title="Tasks"
      subtitle={`${completedCount} completed`}
      right={
        <button
          className="rounded-xl border bg-white px-3 py-1.5 text-xs font-medium hover:bg-zinc-50"
          onClick={() => {
            setTitle("");
            const el = document.getElementById("task-input");
            (el as HTMLInputElement | null)?.focus();
          }}
        >
          New
        </button>
      }
    >
      <form
        className="flex gap-2"
        onSubmit={(e) => {
          e.preventDefault();
          addTask(title);
          setTitle("");
        }}
      >
        <input
          id="task-input"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Add a task…"
          className="h-10 w-full rounded-xl border bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-zinc-200"
        />
        <button
          type="submit"
          className="h-10 rounded-xl bg-zinc-900 px-4 text-sm font-medium text-white hover:bg-zinc-800"
        >
          Add
        </button>
      </form>

      <div className="mt-4 space-y-2">
        {tasks.length === 0 ? (
          <div className="rounded-xl border bg-zinc-50 p-4 text-sm text-zinc-600">
            No tasks yet. Add your first one 👆
          </div>
        ) : (
          tasks.slice(0, 6).map((t) => (
            <div
              key={t.id}
              className="flex items-center justify-between gap-3 rounded-xl border bg-white px-3 py-2"
            >
              <button
                className="flex flex-1 items-center gap-3 text-left"
                onClick={() => toggleTask(t.id)}
                type="button"
              >
                <span
                  className={[
                    "h-5 w-5 rounded-md border",
                    t.status === "completed" ? "bg-zinc-900" : "bg-white",
                  ].join(" ")}
                />
                <span
                  className={[
                    "text-sm",
                    t.status === "completed"
                      ? "text-zinc-500 line-through"
                      : "text-zinc-900",
                  ].join(" ")}
                >
                  {t.title}
                </span>
              </button>

              <button
                className="rounded-lg border bg-white px-2 py-1 text-xs text-zinc-600 hover:bg-zinc-50"
                onClick={() => deleteTask(t.id)}
                type="button"
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </WidgetCard>
  );
}

