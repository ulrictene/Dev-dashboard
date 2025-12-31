import { STORAGE_KEYS } from "../../../app/config/constants";
import { useLocalStorage } from "../../../shared/hooks/useLocalStorage";
import { toDayKey } from "../../../shared/utils/dates";
import type { TimeLog } from "./types";

function createId() {
  return crypto.randomUUID();
}

export function useTimeLogs() {
  const [logs, setLogs] = useLocalStorage<TimeLog[]>(STORAGE_KEYS.timeLogs, []);

  function addLog(input: { minutes: number; label: string; source: TimeLog["source"] }) {
    const now = new Date();
    const log: TimeLog = {
      id: createId(),
      date: toDayKey(now),
      minutes: input.minutes,
      label: input.label,
      source: input.source,
      createdAt: now.toISOString(),
    };
    setLogs([log, ...logs]);
    return log;
  }

  function totalMinutesForDay(dayKey: string) {
    return logs.filter((l) => l.date === dayKey).reduce((sum, l) => sum + l.minutes, 0);
  }

  return { logs, addLog, totalMinutesForDay };
}
