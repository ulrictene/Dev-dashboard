import WidgetCard from "../../dashboard/components/WidgetCard";

export default function GithubWidget() {
  return (
    <WidgetCard title="GitHub" subtitle="Recent commits (placeholder)">
      <div className="space-y-2">
        <Row />
        <Row />
        <Row />
        <Row />
      </div>
    </WidgetCard>
  );
}

function Row() {
  return <div className="h-10 rounded-xl border bg-zinc-50" />;
}
