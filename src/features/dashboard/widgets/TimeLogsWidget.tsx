import WidgetCard from "../../dashboard/components/WidgetCard";import { useTimeLogs } from "../../../features/productivity/timelogs/useTimeLogs";
import { toDayKey } from "../../../shared/utils/dates";

export default function TimeLogsWidget() {
  const { logs, totalMinutesForDay } = useTimeLogs();
  const todayKey = toDayKey(new Date());
  const todayTotal = totalMinutesForDay(todayKey);

  const recent = logs.slice(0, 5);

  return (
    <WidgetCard title="Time Logs" subtitle="Auto from Pomodoro">
      <div className="rounded-xl border bg-zinc-50 p-4">
        <div className="text-xs text-zinc-500">Today</div>
        <div className="mt-1 text-2xl font-semibold">{todayTotal} mins</div>
      </div>

      <div className="mt-4 space-y-2">
        {recent.length === 0 ? (
          <div className="rounded-xl border bg-white p-4 text-sm text-zinc-600">
            No logs yet. Complete a Pomodoro session to create one.
          </div>
        ) : (
          recent.map((l) => (
            <div
              key={l.id}
              className="flex items-center justify-between rounded-xl border bg-white px-3 py-2"
            >
              <div className="min-w-0">
                <div className="truncate text-sm font-medium">{l.label}</div>
                <div className="text-xs text-zinc-500">{l.date} • {l.source}</div>
              </div>
              <div className="shrink-0 text-sm font-semibold tabular-nums">
                {l.minutes}m
              </div>
            </div>
          ))
        )}
      </div>
    </WidgetCard>
  );
}

