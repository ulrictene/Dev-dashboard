export type TimeLogSource = "manual" | "pomodoro";

export type TimeLog = {
  id: string;
  date: string; // YYYY-MM-DD (local day key)
  minutes: number;
  label: string;
  source: TimeLogSource;
  createdAt: string; // ISO datetime
};
