import WidgetCard from "../../dashboard/components/WidgetCard";
import { formatMMSS, usePomodoro } from "../../../features/productivity/pomodoro/usePomodoro";
import { useTimeLogs } from "../../../features/productivity/timelogs/useTimeLogs";

export default function PomodoroWidget() {
  const { addLog } = useTimeLogs();

  const { state, start, pause, reset } = usePomodoro({
    onComplete: (minutes) => {
      addLog({ minutes, label: "Pomodoro focus", source: "pomodoro" });
    },
  });

  const time = formatMMSS(state.remainingSeconds);

  return (
    <WidgetCard title="Pomodoro" subtitle="Focus timer">
      <div className="flex items-center gap-4">
        <div className="grid h-20 w-20 place-items-center rounded-full border bg-zinc-50">
          <div className="text-xs text-zinc-500">Focus</div>
        </div>

        <div className="flex-1">
          <div className="text-3xl font-semibold tabular-nums">{time}</div>

          <div className="mt-3 flex flex-wrap gap-2">
            {state.runState !== "running" ? (
              <button
                onClick={start}
                className="h-9 rounded-xl bg-zinc-900 px-4 text-sm font-medium text-white hover:bg-zinc-800"
              >
                Start
              </button>
            ) : (
              <button
                onClick={pause}
                className="h-9 rounded-xl border bg-white px-4 text-sm font-medium hover:bg-zinc-50"
              >
                Pause
              </button>
            )}

            <button
              onClick={reset}
              className="h-9 rounded-xl border bg-white px-4 text-sm font-medium hover:bg-zinc-50"
            >
              Reset
            </button>

            <span className="ml-auto self-center text-xs text-zinc-500">
              State: {state.runState}
            </span>
          </div>
        </div>
      </div>
    </WidgetCard>
  );
}

