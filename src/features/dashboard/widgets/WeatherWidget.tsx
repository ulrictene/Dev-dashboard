import WidgetCard from "../../dashboard/components/WidgetCard";
import { useWeather } from "../../../features/weather/useWeather";

export default function WeatherWidget() {
  const weather = useWeather();

  return (
    <WidgetCard title="Weather" subtitle="London">
      {weather.status === "loading" && (
        <div className="text-sm text-zinc-500">Loading weather…</div>
      )}

      {weather.status === "error" && (
        <div className="text-sm text-red-600">Failed to load weather</div>
      )}

      {weather.status === "success" && (
        <div className="flex items-center justify-between">
          <div>
            <div className="text-3xl font-semibold">
              {weather.data.now.tempC}°
            </div>
            <div className="mt-1 text-sm text-zinc-600">
              {weather.data.now.condition}
            </div>
          </div>

          <div className="h-16 w-16 rounded-2xl border bg-zinc-50" />
        </div>
      )}
    </WidgetCard>
  );
}

