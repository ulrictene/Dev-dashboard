import WidgetCard from "../components/WidgetCard";
import { useCalendar } from "../../../features/calendar/useCalendar";

function formatTime(d: string) {
  return new Date(d).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

function formatDay(d: string) {
  const date = new Date(d);
  const today = new Date();
  const isToday = date.toDateString() === today.toDateString();
  return isToday ? "Today" : date.toLocaleDateString([], { weekday: "short" });
}

export default function CalendarWidget() {
  const { events } = useCalendar();

  return (
    <WidgetCard title="Calendar" subtitle="Upcoming">
      {events.length === 0 ? (
        <div className="rounded-xl border bg-zinc-50 p-4 text-sm text-zinc-600 dark:bg-zinc-800 dark:border-zinc-700">
          No upcoming events.
        </div>
      ) : (
        <div className="space-y-2">
          {events.slice(0, 5).map((e) => (
            <div
              key={e.id}
              className="flex items-center justify-between rounded-xl border bg-white px-3 py-3
                dark:bg-zinc-800 dark:border-zinc-700"
            >
              <div className="min-w-0">
                <div className="truncate text-sm font-medium">{e.title}</div>
                <div className="text-xs text-zinc-500">
                  {formatDay(e.start)} · {formatTime(e.start)}
                </div>
              </div>

              <span className="shrink-0 rounded-lg border bg-zinc-50 px-2 py-1 text-xs text-zinc-600
                dark:bg-zinc-700 dark:border-zinc-600 dark:text-zinc-200">
                {e.source}
              </span>
            </div>
          ))}
        </div>
      )}
    </WidgetCard>
  );
}

