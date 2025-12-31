import WidgetCard from "../components/WidgetCard";

export default function CalendarWidget() {
  return (
    <WidgetCard title="Calendar" subtitle="Upcoming (mock later)">
      <div className="space-y-2">
        <Row />
        <Row />
        <Row />
      </div>
    </WidgetCard>
  );
}

function Row() {
  return (
    <div className="flex items-center justify-between rounded-xl border bg-white px-3 py-3">
      <div className="h-4 w-40 rounded bg-zinc-100" />
      <div className="h-4 w-16 rounded bg-zinc-100" />
    </div>
  );
}
