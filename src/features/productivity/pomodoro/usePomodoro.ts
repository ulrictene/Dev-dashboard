import { useEffect, useMemo } from "react";
import { STORAGE_KEYS } from "../../../app/config/constants";
import { useLocalStorage } from "../../../shared/hooks/useLocalStorage";
import type { PomodoroState } from "./types";

const DEFAULT_FOCUS_MINUTES = 25;

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

export function usePomodoro() {
  const [state, setState] = useLocalStorage<PomodoroState>(
    STORAGE_KEYS.pomodoro,
    {
      runState: "idle",
      remainingSeconds: DEFAULT_FOCUS_MINUTES * 60,
      runningStartedAt: null,
      remainingAtStart: null,
      focusMinutes: DEFAULT_FOCUS_MINUTES,
    }
  );

  // Derived remaining time while running (based on real clock, not setInterval drift)
  const computedRemaining = useMemo(() => {
    if (state.runState !== "running") return state.remainingSeconds;

    const startedAtMs = state.runningStartedAt
      ? new Date(state.runningStartedAt).getTime()
      : Date.now();

    const base = state.remainingAtStart ?? state.remainingSeconds;
    const elapsedSeconds = Math.floor((Date.now() - startedAtMs) / 1000);

    return clamp(base - elapsedSeconds, 0, base);
  }, [
    state.runState,
    state.remainingSeconds,
    state.runningStartedAt,
    state.remainingAtStart,
  ]);

  // Tick: update stored remainingSeconds occasionally (keeps UI responsive & persistence accurate)
  useEffect(() => {
    if (state.runState !== "running") return;

    const id = window.setInterval(() => {
      setState((prev) => {
        if (prev.runState !== "running") return prev;

        const startedAtMs = prev.runningStartedAt
          ? new Date(prev.runningStartedAt).getTime()
          : Date.now();

        const base = prev.remainingAtStart ?? prev.remainingSeconds;
        const elapsedSeconds = Math.floor((Date.now() - startedAtMs) / 1000);
        const nextRemaining = clamp(base - elapsedSeconds, 0, base);

        // When hits 0, stop
        if (nextRemaining === 0) {
          return {
            ...prev,
            runState: "idle",
            remainingSeconds: 0,
            runningStartedAt: null,
            remainingAtStart: null,
          };
        }

        return { ...prev, remainingSeconds: nextRemaining };
      });
    }, 250);

    return () => window.clearInterval(id);
  }, [state.runState, setState]);

  function start() {
    setState((prev) => {
      if (prev.runState === "running") return prev;
      return {
        ...prev,
        runState: "running",
        runningStartedAt: new Date().toISOString(),
        remainingAtStart: prev.remainingSeconds,
      };
    });
  }

  function pause() {
    setState((prev) => {
      if (prev.runState !== "running") return prev;

      const startedAtMs = prev.runningStartedAt
        ? new Date(prev.runningStartedAt).getTime()
        : Date.now();
      const base = prev.remainingAtStart ?? prev.remainingSeconds;
      const elapsedSeconds = Math.floor((Date.now() - startedAtMs) / 1000);
      const nextRemaining = clamp(base - elapsedSeconds, 0, base);

      return {
        ...prev,
        runState: "paused",
        remainingSeconds: nextRemaining,
        runningStartedAt: null,
        remainingAtStart: null,
      };
    });
  }

  function reset() {
    setState((prev) => ({
      ...prev,
      runState: "idle",
      remainingSeconds: prev.focusMinutes * 60,
      runningStartedAt: null,
      remainingAtStart: null,
    }));
  }

  function setFocusMinutes(minutes: number) {
    const m = clamp(Math.round(minutes), 1, 120);
    setState((prev) => ({
      ...prev,
      focusMinutes: m,
      ...(prev.runState === "idle"
        ? { remainingSeconds: m * 60 }
        : null),
    }));
  }

  return {
    state: { ...state, remainingSeconds: computedRemaining },
    start,
    pause,
    reset,
    setFocusMinutes,
  };
}

export function formatMMSS(totalSeconds: number) {
  const m = Math.floor(totalSeconds / 60);
  const s = totalSeconds % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}
