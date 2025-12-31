export type PomodoroRunState = "idle" | "running" | "paused";

export type PomodoroState = {
  runState: PomodoroRunState;

  // countdown
  remainingSeconds: number; // e.g. 1500 for 25min

  // used to keep accurate time while running
  runningStartedAt?: string | null; // ISO datetime when last started
  remainingAtStart?: number | null; // seconds remaining when last started

  // settings (keep minimal for now)
  focusMinutes: number; // default 25
  completionToken?: string | null;
};

