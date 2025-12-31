import type { ReactNode } from "react";

export default function DashboardGrid({
  summary,
  tasks,
  pomodoro,
  timelogs,
  weather,
  calendar,
  github,
}: {
  summary: ReactNode;
  tasks: ReactNode;
  pomodoro: ReactNode;
  timelogs: ReactNode;
  weather: ReactNode;
  calendar: ReactNode;
  github: ReactNode;
}) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-12">
      {/* Summary - full width */}
      <div className="sm:col-span-2 lg:col-span-12">{summary}</div>

      {/* Row 2 */}
      <div className="sm:col-span-2 lg:col-span-7">{tasks}</div>
      <div className="sm:col-span-1 lg:col-span-5">{pomodoro}</div>

      {/* Row 3 */}
      <div className="sm:col-span-1 lg:col-span-7">{timelogs}</div>
      <div className="sm:col-span-1 lg:col-span-5">{weather}</div>

      {/* Row 4 */}
      <div className="sm:col-span-2 lg:col-span-7">{calendar}</div>
      <div className="sm:col-span-2 lg:col-span-5">{github}</div>
    </div>
  );
}
