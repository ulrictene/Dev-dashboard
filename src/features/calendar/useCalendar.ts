import type { CalendarEvent } from "./types";

export function useCalendar() {
  const now = new Date();

  const today10 = new Date(now);
  today10.setHours(10, 0, 0, 0);

  const today14 = new Date(now);
  today14.setHours(14, 0, 0, 0);

  const tomorrow18 = new Date(now);
  tomorrow18.setDate(tomorrow18.getDate() + 1);
  tomorrow18.setHours(18, 0, 0, 0);

  const events: CalendarEvent[] = [
    {
      id: "1",
      title: "Standup meeting",
      start: today10.toISOString(),
      source: "mock",
    },
    {
      id: "2",
      title: "Deep work block",
      start: today14.toISOString(),
      source: "mock",
    },
    {
      id: "3",
      title: "Gym",
      start: tomorrow18.toISOString(),
      source: "mock",
    },
  ];

  return { events };
}
