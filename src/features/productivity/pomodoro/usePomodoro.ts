import { useEffect, useMemo, useRef } from "react";
import { STORAGE_KEYS } from "../../../app/config/constants";
import { useLocalStorage } from "../../../shared/hooks/useLocalStorage";
import type { PomodoroState } from "./types";

const DEFAULT_FOCUS_MINUTES = 25;

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

export function usePomodoro(options?: { onComplete?: (minutes: number) => void }) {
  const [state, setState] = useLocalStorage<PomodoroState>(STORAGE_KEYS.pomodoro, {
    runState: "idle",
    remainingSeconds: DEFAULT_FOCUS_MINUTES * 60,
    runningStartedAt: null,
    remainingAtStart: null,
    focusMinutes: DEFAULT_FOCUS_MINUTES,
    completionToken: null,
  });

  const onCompleteRef = useRef(options?.onComplete);

  useEffect(() => {
    onCompleteRef.current = options?.onComplete;
  }, [options?.onComplete]);

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

        if (nextRemaining === 0) {
          if (!prev.completionToken) {
            onCompleteRef.current?.(prev.focusMinutes);
          }

          return {
            ...prev,
            runState: "idle",
            remainingSeconds: 0,
            runningStartedAt: null,
            remainingAtStart: null,
            completionToken: prev.completionToken ?? new Date().toISOString(),
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
        completionToken: null, 
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
      completionToken: null, 
    }));
  }

  function setFocusMinutes(minutes: number) {
    const m = clamp(Math.round(minutes), 1, 120);
    setState((prev) => ({
      ...prev,
      focusMinutes: m,
      ...(prev.runState === "idle" ? { remainingSeconds: m * 60 } : null),
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
