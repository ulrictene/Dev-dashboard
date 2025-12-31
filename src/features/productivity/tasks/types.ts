export type TaskStatus = "active" | "completed";

export type Task = {
  id: string;
  title: string;
  status: TaskStatus;
  createdAt: string;   // ISO datetime
  completedAt?: string | null;
};
