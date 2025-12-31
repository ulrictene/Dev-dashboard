// import WidgetCard from "../../dashboard/components/WidgetCard";

// export default function PomodoroWidget() {
//   return (
//     <WidgetCard title="Pomodoro" subtitle="Focus timer">
//       <div className="flex items-center justify-between gap-4">
//         <div className="h-20 w-20 rounded-full border bg-zinc-50" />
//         <div className="flex-1">
//           <div className="text-2xl font-semibold tabular-nums">25:00</div>
//           <div className="mt-2 flex gap-2">
//             <div className="h-9 w-20 rounded-xl border bg-white" />
//             <div className="h-9 w-20 rounded-xl border bg-white" />
//             <div className="h-9 w-20 rounded-xl border bg-white" />
//           </div>
//         </div>
//       </div>
//     </WidgetCard>
//   );
// }
import WidgetCard from "../../dashboard/components/WidgetCard";
import { formatMMSS, usePomodoro } from "../../../features/productivity/pomodoro/usePomodoro";

export default function PomodoroWidget() {
  const { state, start, pause, reset } = usePomodoro();

  const time = formatMMSS(state.remainingSeconds);

  return (
    <WidgetCard title="Pomodoro" subtitle="Focus timer">
      <div className="flex items-center gap-4">
        {/* Simple ring placeholder for now */}
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
