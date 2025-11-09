import { tool } from "ai";
import { z } from "zod";

const weatherResponseSchema = z
  .object({
    latitude: z.number(),
    longitude: z.number(),
    generationtime_ms: z.number().optional(),
    utc_offset_seconds: z.number(),
    timezone: z.string(),
    timezone_abbreviation: z.string(),
    elevation: z.number(),
    current_units: z.object({
      time: z.string(),
      interval: z.string(),
      temperature_2m: z.string(),
    }),
    current: z.object({
      time: z.string(),
      interval: z.number(),
      temperature_2m: z.number(),
    }),
    hourly_units: z.object({
      time: z.string(),
      temperature_2m: z.string(),
    }),
    hourly: z.object({
      time: z.array(z.string()).min(1),
      temperature_2m: z.array(z.number()).min(1),
    }),
    daily_units: z.object({
      time: z.string(),
      sunrise: z.string(),
      sunset: z.string(),
    }),
    daily: z.object({
      time: z.array(z.string()).min(1),
      sunrise: z.array(z.string()).min(1),
      sunset: z.array(z.string()).min(1),
    }),
  })
  .passthrough();

const geocodeResponseSchema = z.object({
  results: z
    .array(
      z.object({
        latitude: z.number(),
        longitude: z.number(),
      })
    )
    .optional(),
});

export type WeatherToolSuccess = z.infer<typeof weatherResponseSchema> & {
  cityName?: string;
};

export type WeatherToolError = { error: string };

export type WeatherToolOutput = WeatherToolSuccess | WeatherToolError;

async function geocodeCity(
  city: string
): Promise<{ latitude: number; longitude: number } | null> {
  try {
    const response = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=en&format=json`
    );

    if (!response.ok) {
      return null;
    }

    const parsedResponse = geocodeResponseSchema.safeParse(
      (await response.json()) as unknown
    );

    if (!parsedResponse.success) {
      return null;
    }

    const { results } = parsedResponse.data;

    if (!results || results.length === 0) {
      return null;
    }

    const [result] = results;
    return {
      latitude: result.latitude,
      longitude: result.longitude,
    };
  } catch {
    return null;
  }
}

function buildWeatherServiceError(message: string): WeatherToolError {
  return {
    error: message,
  };
}

type CoordinatesInput = {
  latitude: number;
  longitude: number;
};

type CityInput = {
  city: string;
};

type LocationInput = {
  location: string;
};

type WeatherToolInput = CoordinatesInput | CityInput | LocationInput;

export const getWeather = tool({
  description:
    "Get the current weather at a location. You can provide either coordinates or a city name.",
  parameters: z.union([
    z.object({
      latitude: z.number(),
      longitude: z.number(),
    }),
    z.object({
      city: z
        .string()
        .describe("City name (e.g., 'San Francisco', 'New York', 'London')"),
    }),
    z.object({
      location: z
        .string()
        .describe(
          "City or locality name (e.g., 'San Francisco', 'New York', 'London')"
        ),
    }),
  ]),
  execute: async (input: WeatherToolInput) => {
    try {
      let latitude: number;
      let longitude: number;
      let providedCityName: string | undefined;

      if ("city" in input) {
        providedCityName = input.city;
      } else if ("location" in input) {
        providedCityName = input.location;
      }

      if (providedCityName) {
        const coords = await geocodeCity(providedCityName);
        if (!coords) {
          return buildWeatherServiceError(
            `Could not find coordinates for "${providedCityName}". Please check the city name.`
          );
        }
        latitude = coords.latitude;
        longitude = coords.longitude;
      } else if ("latitude" in input && "longitude" in input) {
        latitude = input.latitude;
        longitude = input.longitude;
      } else {
        return buildWeatherServiceError(
          "Please provide either a city/location name or both latitude and longitude."
        );
      }

      if (
        typeof latitude !== "number" ||
        Number.isNaN(latitude) ||
        typeof longitude !== "number" ||
        Number.isNaN(longitude)
      ) {
        return buildWeatherServiceError(
          "The provided coordinates are invalid. Please include both latitude and longitude as numbers."
        );
      }

      const response = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m&hourly=temperature_2m&daily=sunrise,sunset&timezone=auto`
      );

      if (!response.ok) {
        return buildWeatherServiceError(
          `Weather service responded with ${response.status} ${response.statusText}`.trim()
        );
      }

      const rawWeatherData: unknown = await response.json();

      if (
        typeof rawWeatherData === "object" &&
        rawWeatherData !== null &&
        "error" in rawWeatherData
      ) {
        const maybeReason = (rawWeatherData as { reason?: unknown }).reason;
        const reason =
          typeof maybeReason === "string"
            ? maybeReason
            : "The weather service reported an unknown error.";
        return buildWeatherServiceError(reason);
      }

      const parsedWeatherData = weatherResponseSchema.safeParse(rawWeatherData);

      if (!parsedWeatherData.success) {
        return buildWeatherServiceError(
          "Received unexpected data shape from the weather service."
        );
      }

      const weatherData = parsedWeatherData.data;

      if (
        weatherData.hourly.time.length !==
        weatherData.hourly.temperature_2m.length
      ) {
        return buildWeatherServiceError(
          "Hourly weather data is inconsistent for this location."
        );
      }

      const enrichedWeatherData: WeatherToolSuccess = {
        ...weatherData,
        cityName: providedCityName,
      };

      return enrichedWeatherData;
    } catch (error) {
      return buildWeatherServiceError(
        error instanceof Error
          ? `Unable to retrieve weather data right now: ${error.message}`
          : "Unable to retrieve weather data right now."
      );
    }
  },
} as any);
