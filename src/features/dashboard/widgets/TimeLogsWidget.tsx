import WidgetCard from "../../dashboard/components/WidgetCard";

export default function TimeLogsWidget() {
  return (
    <WidgetCard title="Time Logs" subtitle="Auto from Pomodoro later">
      <div className="space-y-2">
        <div className="rounded-xl border bg-zinc-50 p-3">
          <div className="text-xs text-zinc-500">Today</div>
          <div className="mt-1 text-lg font-semibold">0 mins</div>
        </div>
        <div className="space-y-2">
          <Row />
          <Row />
        </div>
      </div>
    </WidgetCard>
  );
}

function Row() {
  return <div className="h-10 rounded-xl border bg-white" />;
}
