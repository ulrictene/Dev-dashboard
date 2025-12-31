import WidgetCard from "../../dashboard/components/WidgetCard";

export default function TasksWidget() {
  return (
    <WidgetCard title="Tasks" subtitle="Add and complete tasks">
      <div className="space-y-3">
        <div className="h-10 w-full rounded-xl border bg-white" />
        <div className="space-y-2">
          <Row />
          <Row />
          <Row />
        </div>
      </div>
    </WidgetCard>
  );
}

function Row() {
  return <div className="h-10 rounded-xl border bg-zinc-50" />;
}
