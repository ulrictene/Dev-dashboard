import { useEffect, useState } from "react";
import type { WeatherData } from "./types";
import { fetchWeather } from "./weatherService";

type WeatherState =
  | { status: "loading" }
  | { status: "error"; error: string }
  | { status: "success"; data: WeatherData };

const CACHE_MS = 10 * 60 * 1000;

export function useWeather() {
  const [state, setState] = useState<WeatherState>({ status: "loading" });

  useEffect(() => {
    let cancelled = false;

    const cached = localStorage.getItem("pdd.weather.cache");
    if (cached) {
      const parsed: WeatherData = JSON.parse(cached);
      const age = Date.now() - new Date(parsed.fetchedAt).getTime();

      if (age < CACHE_MS) {
        setState({ status: "success", data: parsed });
        return;
      }
    }

    fetchWeather()
      .then((data) => {
        if (cancelled) return;
        localStorage.setItem("pdd.weather.cache", JSON.stringify(data));
        setState({ status: "success", data });
      })
      .catch((e) => {
        if (cancelled) return;
        setState({ status: "error", error: e.message });
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return state;
}
