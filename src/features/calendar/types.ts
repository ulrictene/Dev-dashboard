export type CalendarEvent = {
  id: string;
  title: string;
  start: string; // ISO datetime
  end?: string;
  source: "mock" | "google" | "outlook";
};
