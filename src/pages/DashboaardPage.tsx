// export default function DashboardPage() {
//   return (
//     <div className="space-y-4">
//       <h1 className="text-xl font-semibold">Dashboard</h1>
//       <div className="rounded-2xl border bg-white p-6 shadow-sm">
//         Dashboard shell is live ✅
//       </div>
//     </div>
//   );
// }
import DashboardGrid from "../features/dashboard/components/DashboardGrid";
import SummaryWidget from "../features/dashboard/widgets/SummaryWidget";
import TasksWidget from "../features/dashboard/widgets/TasksWidget";
import PomodoroWidget from "../features/dashboard/widgets/PomodoroWidget";
import TimeLogsWidget from "../features/dashboard/widgets/TimeLogsWidget";
import WeatherWidget from "../features/dashboard/widgets/WeatherWidget";
import CalendarWidget from "../features/dashboard/widgets/CalendarWidget";
import GithubWidget from "../features/dashboard/widgets/GithubWidget";

export default function DashboardPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">Dashboard</h1>

      <DashboardGrid
        summary={<SummaryWidget />}
        tasks={<TasksWidget />}
        pomodoro={<PomodoroWidget />}
        timelogs={<TimeLogsWidget />}
        weather={<WeatherWidget />}
        calendar={<CalendarWidget />}
        github={<GithubWidget />}
      />
    </div>
  );
}
