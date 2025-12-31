import WidgetCard from "../../dashboard/components/WidgetCard";
import { useTasks } from "../../productivity/useTasks";
import { useTimeLogs } from "../../../features/productivity/timelogs/useTimeLogs";
import { toDayKey } from "../../../shared/utils/dates";

export default function SummaryWidget() {
  const { tasks } = useTasks();
  const { totalMinutesForDay } = useTimeLogs();

  const tasksDone = tasks.filter((t) => t.status === "completed").length;

  const todayKey = toDayKey(new Date());
  const loggedMins = totalMinutesForDay(todayKey);

  return (
    <WidgetCard title="Today" subtitle="At-a-glance">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Stat label="Tasks done" value={String(tasksDone)} />
        <Stat label="Focus mins" value={String(loggedMins)} />
        <Stat label="Logged mins" value={String(loggedMins)} />
        <Stat label="Weather" value="—" />
      </div>
    </WidgetCard>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border bg-zinc-50 px-3 py-3">
      <div className="text-xs text-zinc-500">{label}</div>
      <div className="mt-1 text-lg font-semibold text-zinc-900">{value}</div>
    </div>
  );
}


