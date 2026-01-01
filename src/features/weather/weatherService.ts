import type { WeatherData, WeatherCondition } from "./types";

function mapCondition(code: number): WeatherCondition {
  if (code === 0) return "clear";
  if ([1, 2, 3].includes(code)) return "cloudy";
  if ([45, 48].includes(code)) return "fog";
  if ([51, 53, 55, 61, 63, 65].includes(code)) return "rain";
  if ([71, 73, 75, 77].includes(code)) return "snow";
  if ([95, 96, 99].includes(code)) return "thunder";
  return "unknown";
}

export async function fetchWeather(): Promise<WeatherData> {
  // London coordinates 
  const lat = 51.5072;
  const lon = -0.1276;

  const res = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch weather");
  }

  const json = await res.json();

  return {
    location: "London",
    fetchedAt: new Date().toISOString(),
    now: {
      tempC: json.current_weather.temperature,
      windKph: json.current_weather.windspeed,
      condition: mapCondition(json.current_weather.weathercode),
      description: "Current conditions",
    },
  };
}
