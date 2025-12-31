import { STORAGE_KEYS } from "../../app/config/constants";
import { useLocalStorage } from "../../app/../shared/hooks/useLocalStorage" ;
import type { Task } from "../productivity/tasks/types";

function createId() {
  return crypto.randomUUID();
}

export function useTasks() {
  const [tasks, setTasks] = useLocalStorage<Task[]>(STORAGE_KEYS.tasks, []);

  function addTask(title: string) {
    const trimmed = title.trim();
    if (!trimmed) return;

    const now = new Date().toISOString();
    const task: Task = {
      id: createId(),
      title: trimmed,
      status: "active",
      createdAt: now,
      completedAt: null,
    };

    setTasks([task, ...tasks]);
  }

  function toggleTask(id: string) {
    const now = new Date().toISOString();
    setTasks(
      tasks.map((t) =>
        t.id === id
          ? {
              ...t,
              status: t.status === "active" ? "completed" : "active",
              completedAt: t.status === "active" ? now : null,
            }
          : t
      )
    );
  }

  function deleteTask(id: string) {
    setTasks(tasks.filter((t) => t.id !== id));
  }

  return { tasks, addTask, toggleTask, deleteTask };
}
