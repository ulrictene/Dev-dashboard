import WidgetCard from "../../dashboard/components/WidgetCard";

export default function WeatherWidget() {
  return (
    <WidgetCard title="Weather" subtitle="London (placeholder)">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-3xl font-semibold">—°</div>
          <div className="mt-1 text-sm text-zinc-600">Loading later</div>
        </div>
        <div className="h-16 w-16 rounded-2xl border bg-zinc-50" />
      </div>
      <div className="mt-4 grid grid-cols-3 gap-2 text-xs">
        <Chip />
        <Chip />
        <Chip />
      </div>
    </WidgetCard>
  );
}

function Chip() {
  return <div className="h-10 rounded-xl border bg-white" />;
}
