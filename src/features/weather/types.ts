export type WeatherCondition =
  | "clear"
  | "cloudy"
  | "rain"
  | "snow"
  | "thunder"
  | "fog"
  | "unknown";

export type WeatherNow = {
  tempC: number;
  windKph?: number;
  condition: WeatherCondition;
  description: string;
};

export type WeatherData = {
  location: string;
  now: WeatherNow;
  fetchedAt: string;
};
