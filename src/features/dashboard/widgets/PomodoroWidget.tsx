import WidgetCard from "../../dashboard/components/WidgetCard";

export default function PomodoroWidget() {
  return (
    <WidgetCard title="Pomodoro" subtitle="Focus timer">
      <div className="flex items-center justify-between gap-4">
        <div className="h-20 w-20 rounded-full border bg-zinc-50" />
        <div className="flex-1">
          <div className="text-2xl font-semibold tabular-nums">25:00</div>
          <div className="mt-2 flex gap-2">
            <div className="h-9 w-20 rounded-xl border bg-white" />
            <div className="h-9 w-20 rounded-xl border bg-white" />
            <div className="h-9 w-20 rounded-xl border bg-white" />
          </div>
        </div>
      </div>
    </WidgetCard>
  );
}
