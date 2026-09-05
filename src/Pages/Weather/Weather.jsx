import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  AlertCircle,
  CalendarDays,
  Cloud,
  CloudFog,
  CloudRain,
  CloudSun,
  Droplets,
  Gauge,
  LocateFixed,
  MapPin,
  RefreshCw,
  Search,
  Sun,
  Sunrise,
  Sunset,
  Thermometer,
  Umbrella,
  Wind,
  X,
  Zap,
} from "lucide-react";
import { useLanguage } from "../../Context/LanguageContext";

/* =========================================================
   OPEN-METEO
   No API key required for this implementation.
   ========================================================= */

const WEATHER_API = "https://api.open-meteo.com/v1/forecast";
const GEOCODING_API = "https://geocoding-api.open-meteo.com/v1/search";

/* =========================================================
   WEATHER CODE HELPERS
   WMO WEATHER CODES
   ========================================================= */

const getWeatherInfo = (code, isDay = 1) => {
  if (code === 0) {
    return {
      label: "Clear Sky",
      icon: isDay ? Sun : CloudSun,
    };
  }

  if ([1, 2].includes(code)) {
    return {
      label: "Partly Cloudy",
      icon: CloudSun,
    };
  }

  if (code === 3) {
    return {
      label: "Overcast",
      icon: Cloud,
    };
  }

  if ([45, 48].includes(code)) {
    return {
      label: "Foggy",
      icon: CloudFog,
    };
  }

  if ([51, 53, 55, 56, 57].includes(code)) {
    return {
      label: "Drizzle",
      icon: CloudRain,
    };
  }

  if ([61, 63, 65, 66, 67, 80, 81, 82].includes(code)) {
    return {
      label: "Rainy",
      icon: CloudRain,
    };
  }

  if ([71, 73, 75, 77, 85, 86].includes(code)) {
    return {
      label: "Snow",
      icon: Cloud,
    };
  }

  if ([95, 96, 99].includes(code)) {
    return {
      label: "Thunderstorm",
      icon: Zap,
    };
  }

  return {
    label: "Unknown",
    icon: Cloud,
  };
};

/* =========================================================
   FORMAT HELPERS
   ========================================================= */

const formatHour = (dateString) => {
  if (!dateString) return "--";

  const date = new Date(dateString);

  return date.toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit",
  });
};

const formatDay = (dateString, index = 0) => {
  if (!dateString) return "--";

  if (index === 0) return "Today";

  if (index === 1) return "Tomorrow";

  const date = new Date(`${dateString}T12:00:00`);

  return date.toLocaleDateString([], {
    weekday: "short",
  });
};

const formatDate = (dateString) => {
  if (!dateString) return "";

  const date = new Date(`${dateString}T12:00:00`);

  return date.toLocaleDateString([], {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

const getWindDirection = (degrees) => {
  if (degrees === null || degrees === undefined) return "--";

  const directions = [
    "N",
    "NNE",
    "NE",
    "ENE",
    "E",
    "ESE",
    "SE",
    "SSE",
    "S",
    "SSW",
    "SW",
    "WSW",
    "W",
    "WNW",
    "NW",
    "NNW",
  ];

  const index = Math.round(degrees / 22.5) % 16;

  return directions[index];
};

const getFarmerTip = (weather) => {
  if (!weather) {
    return {
      title: "Weather Tip",
      text: "Weather information will appear here once your location is loaded.",
    };
  }

  const rainProbability =
    weather.daily?.precipitation_probability_max?.[0] ?? 0;

  const maxTemp = weather.daily?.temperature_2m_max?.[0] ?? 0;

  const weatherCode = weather.daily?.weather_code?.[0];

  if ([95, 96, 99].includes(weatherCode)) {
    return {
      title: "⚡ Storm Alert",
      text: "Thunderstorm conditions may occur. Avoid field work during lightning and secure loose agricultural equipment.",
    };
  }

  if (rainProbability >= 70) {
    return {
      title: "🌧️ Rain Alert",
      text: "High chance of rain today. Consider postponing irrigation and avoid spraying pesticides or fertilizers before rainfall.",
    };
  }

  if (maxTemp >= 38) {
    return {
      title: "☀️ Heat Alert",
      text: "High temperatures are expected. Keep crops adequately irrigated and avoid unnecessary field work during peak afternoon heat.",
    };
  }

  if (rainProbability >= 40) {
    return {
      title: "🌦️ Rain Possible",
      text: "There is a moderate chance of rainfall. Check soil moisture before irrigation and plan field activities accordingly.",
    };
  }

  return {
    title: "🌱 Good Farming Conditions",
    text: "Weather conditions look relatively stable. It is a good time to plan routine farm activities while monitoring local conditions.",
  };
};

/* =========================================================
   MAIN COMPONENT
   ========================================================= */

const Weather = () => {
  const { t } = useLanguage();

  const [weather, setWeather] = useState(null);
  const [location, setLocation] = useState(null);

  const [loading, setLoading] = useState(true);
  const [locationLoading, setLocationLoading] = useState(false);

  const [error, setError] = useState("");

  const [searchText, setSearchText] = useState("");
  const [searchLoading, setSearchLoading] = useState(false);

  const [searchResults, setSearchResults] = useState([]);

  const [lastUpdated, setLastUpdated] = useState(null);

  /* =======================================================
     FETCH WEATHER
     ======================================================= */

  const fetchWeather = useCallback(async (latitude, longitude) => {
    try {
      setLoading(true);
      setError("");

      const url =
        `${WEATHER_API}?` +
        new URLSearchParams({
          latitude: latitude.toString(),
          longitude: longitude.toString(),

          current: [
            "temperature_2m",
            "relative_humidity_2m",
            "apparent_temperature",
            "is_day",
            "precipitation",
            "rain",
            "weather_code",
            "cloud_cover",
            "surface_pressure",
            "wind_speed_10m",
            "wind_direction_10m",
          ].join(","),

          hourly: [
            "temperature_2m",
            "precipitation_probability",
            "weather_code",
            "relative_humidity_2m",
            "wind_speed_10m",
          ].join(","),

          daily: [
            "weather_code",
            "temperature_2m_max",
            "temperature_2m_min",
            "precipitation_probability_max",
            "sunrise",
            "sunset",
          ].join(","),

          timezone: "auto",
          forecast_days: "7",
        });

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("Unable to fetch weather information.");
      }

      const data = await response.json();

      setWeather(data);
      setLastUpdated(new Date());
    } catch (err) {
      console.error("Weather API error:", err);

      setError(
        "Weather information could not be loaded right now. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  /* =======================================================
     REVERSE GEOCODING
     ======================================================= */

  const reverseGeocode = useCallback(async (latitude, longitude) => {
    try {
      const url =
        `${GEOCODING_API}?` +
        new URLSearchParams({
          latitude: latitude.toString(),
          longitude: longitude.toString(),
        });

      /*
        Open-Meteo geocoding API is primarily city-name based.
        Therefore we use a small fallback location object when
        reverse lookup is unavailable.
      */

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("Location lookup failed");
      }

      const data = await response.json();

      if (data?.results?.length > 0) {
        const result = data.results[0];

        return {
          name: result.name,
          country: result.country || "",
          admin1: result.admin1 || "",
          latitude,
          longitude,
        };
      }
    } catch (err) {
      console.warn("Reverse geocoding unavailable:", err);
    }

    return {
      name: "Current Location",
      country: "",
      admin1: "",
      latitude,
      longitude,
    };
  }, []);

  /* =======================================================
     GET USER LOCATION
     ======================================================= */

  const getCurrentLocation = useCallback(async () => {
    if (!navigator.geolocation) {
      setError(
        "Your browser does not support location services. Please search for your city."
      );

      setLoading(false);
      return;
    }

    setLocationLoading(true);
    setError("");

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;

          const locationData = await reverseGeocode(
            latitude,
            longitude
          );

          setLocation(locationData);

          await fetchWeather(latitude, longitude);
        } finally {
          setLocationLoading(false);
        }
      },

(geoError) => {
  // Location denied / unavailable is an expected browser case,
  // so don't use console.error() here.
  console.log("Location access:", geoError.message);

  setLocationLoading(false);
  setLoading(false);

  if (geoError.code === 1) {
    setError(
      "Location permission was denied. Please search your city to view weather."
    );
  } else if (geoError.code === 2) {
    setError(
      "Your location could not be detected. Please search for your city."
    );
  } else if (geoError.code === 3) {
    setError(
      "Location request timed out. Please try again or search your city."
    );
  } else {
    setError(
      "Unable to get your current location. Please search for your city."
    );
  }
},

      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 300000,
      }
    );
  }, [fetchWeather, reverseGeocode]);

  /* =======================================================
     INITIAL LOAD
     ======================================================= */

  useEffect(() => {
    getCurrentLocation();
  }, [getCurrentLocation]);

  /* =======================================================
     CITY SEARCH
     ======================================================= */

  const searchCity = async () => {
    const query = searchText.trim();

    if (!query) {
      setSearchResults([]);
      return;
    }

    try {
      setSearchLoading(true);
      setError("");

      const url =
        `${GEOCODING_API}?` +
        new URLSearchParams({
          name: query,
          count: "5",
          language: "en",
          format: "json",
        });

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("City search failed");
      }

      const data = await response.json();

      if (!data?.results?.length) {
        setSearchResults([]);
        setError("No matching location found. Try another city.");
        return;
      }

      setSearchResults(data.results);
    } catch (err) {
      console.error("City search error:", err);

      setError(
        "Unable to search for this location. Please try again."
      );
    } finally {
      setSearchLoading(false);
    }
  };

  /* =======================================================
     SELECT SEARCH RESULT
     ======================================================= */

  const selectCity = async (city) => {
    const latitude = city.latitude;
    const longitude = city.longitude;

    const locationData = {
      name: city.name,
      country: city.country || "",
      admin1: city.admin1 || "",
      latitude,
      longitude,
    };

    setLocation(locationData);
    setSearchResults([]);
    setSearchText("");

    await fetchWeather(latitude, longitude);
  };

  /* =======================================================
     SEARCH ENTER
     ======================================================= */

  const handleSearchKeyDown = (event) => {
    if (event.key === "Enter") {
      searchCity();
    }
  };

  /* =======================================================
     CURRENT WEATHER DATA
     ======================================================= */

  const current = weather?.current;

  const currentWeatherInfo = useMemo(() => {
    if (!current) return null;

    return getWeatherInfo(
      current.weather_code,
      current.is_day
    );
  }, [current]);

  const CurrentWeatherIcon = currentWeatherInfo?.icon || Cloud;

  /* =======================================================
     HOURLY FORECAST
     ======================================================= */

  const hourlyForecast = useMemo(() => {
    if (!weather?.hourly) return [];

    const hourly = weather.hourly;

    const now = new Date();

    let startIndex = hourly.time.findIndex(
      (time) => new Date(time) >= now
    );

    if (startIndex === -1) {
      startIndex = 0;
    }

    return hourly.time
      .slice(startIndex, startIndex + 12)
      .map((time, index) => {
        const realIndex = startIndex + index;

        const info = getWeatherInfo(
          hourly.weather_code[realIndex],
          1
        );

        return {
          time,
          temperature: hourly.temperature_2m[realIndex],
          rainProbability:
            hourly.precipitation_probability?.[realIndex] ?? 0,
          humidity:
            hourly.relative_humidity_2m?.[realIndex] ?? 0,
          windSpeed:
            hourly.wind_speed_10m?.[realIndex] ?? 0,
          icon: info.icon,
          label: info.label,
        };
      });
  }, [weather]);

  /* =======================================================
     DAILY FORECAST
     ======================================================= */

  const dailyForecast = useMemo(() => {
    if (!weather?.daily) return [];

    const daily = weather.daily;

    return daily.time.map((date, index) => {
      const info = getWeatherInfo(
        daily.weather_code[index],
        1
      );

      return {
        date,
        maxTemp: daily.temperature_2m_max[index],
        minTemp: daily.temperature_2m_min[index],
        rainProbability:
          daily.precipitation_probability_max?.[index] ?? 0,
        sunrise: daily.sunrise?.[index],
        sunset: daily.sunset?.[index],
        icon: info.icon,
        label: info.label,
      };
    });
  }, [weather]);

  /* =======================================================
     FARMER TIP
     ======================================================= */

  const farmerTip = useMemo(() => {
    return getFarmerTip(weather);
  }, [weather]);

  /* =======================================================
     LOADING SCREEN
     ======================================================= */

  if (loading && !weather) {
    return (
      <div className="min-h-screen bg-slate-50 px-4 py-12 dark:bg-slate-950">
        <div className="mx-auto flex min-h-[70vh] max-w-5xl items-center justify-center">
          <div className="text-center">
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-950">
              <RefreshCw
                size={28}
                className="animate-spin text-green-600"
              />
            </div>

            <h2 className="text-xl font-bold text-slate-800 dark:text-white">
              Getting your weather...
            </h2>

            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              Please allow location access for accurate local weather.
            </p>
          </div>
        </div>
      </div>
    );
  }

  /* =======================================================
     MAIN UI
     ======================================================= */

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 dark:bg-slate-950 dark:text-white">

      {/* =====================================================
          PAGE HEADER
          ===================================================== */}

      <section className="border-b border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">

          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

            <div>
              <div className="mb-2 flex items-center gap-2 text-green-600">
                <CloudSun size={24} />

                <span className="text-sm font-semibold uppercase tracking-wider">
                  KisanSetu Weather
                </span>
              </div>

              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Weather for Farmers
              </h1>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500 dark:text-slate-400 sm:text-base">
                Get live weather conditions, rainfall probability,
                temperature, wind and forecasts for your location.
              </p>
            </div>

            <button
              type="button"
              onClick={getCurrentLocation}
              disabled={locationLoading}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-green-600 px-5 py-3 font-semibold text-white shadow-sm transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <LocateFixed
                size={18}
                className={locationLoading ? "animate-pulse" : ""}
              />

              {locationLoading
                ? "Detecting Location..."
                : "Use My Location"}
            </button>
          </div>

          {/* =================================================
              SEARCH
              ================================================= */}

          <div className="relative mt-7 max-w-2xl">

            <div className="flex overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 shadow-sm focus-within:border-green-500 focus-within:ring-2 focus-within:ring-green-100 dark:border-slate-700 dark:bg-slate-800 dark:focus-within:ring-green-950">

              <div className="flex flex-1 items-center gap-3 px-4">
                <Search
                  size={20}
                  className="shrink-0 text-slate-400"
                />

                <input
                  type="text"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  onKeyDown={handleSearchKeyDown}
                  placeholder="Search city, district or location..."
                  className="w-full bg-transparent py-4 text-sm outline-none placeholder:text-slate-400 dark:text-white"
                />

                {searchText && (
                  <button
                    type="button"
                    onClick={() => {
                      setSearchText("");
                      setSearchResults([]);
                    }}
                    className="text-slate-400 hover:text-slate-600 dark:hover:text-white"
                  >
                    <X size={18} />
                  </button>
                )}
              </div>

              <button
                type="button"
                onClick={searchCity}
                disabled={searchLoading}
                className="m-1 rounded-xl bg-green-600 px-5 font-semibold text-white transition hover:bg-green-700 disabled:opacity-60"
              >
                {searchLoading ? "Searching..." : "Search"}
              </button>
            </div>

            {/* Search Results */}

            {searchResults.length > 0 && (
              <div className="absolute left-0 right-0 top-full z-30 mt-2 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl dark:border-slate-700 dark:bg-slate-900">

                {searchResults.map((city, index) => (
                  <button
                    key={`${city.id || city.name}-${index}`}
                    type="button"
                    onClick={() => selectCity(city)}
                    className="flex w-full items-center gap-4 border-b border-slate-100 px-4 py-4 text-left transition last:border-b-0 hover:bg-green-50 dark:border-slate-800 dark:hover:bg-slate-800"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green-100 text-green-600 dark:bg-green-950">
                      <MapPin size={19} />
                    </div>

                    <div>
                      <p className="font-semibold">
                        {city.name}
                      </p>

                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        {[
                          city.admin1,
                          city.country,
                        ]
                          .filter(Boolean)
                          .join(", ")}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Error */}

          {error && (
            <div className="mt-5 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-900 dark:bg-red-950/40 dark:text-red-300">
              <AlertCircle
                size={19}
                className="mt-0.5 shrink-0"
              />

              <span>{error}</span>
            </div>
          )}
        </div>
      </section>

      {/* =====================================================
          CONTENT
          ===================================================== */}

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">

        {/* ===================================================
            LOCATION + UPDATED
            =================================================== */}

        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

          <div className="flex items-center gap-3">

            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-green-100 text-green-600 dark:bg-green-950">
              <MapPin size={21} />
            </div>

            <div>
              <h2 className="text-xl font-bold">
                {location?.name || "Current Location"}
              </h2>

              <p className="text-sm text-slate-500 dark:text-slate-400">
                {[
                  location?.admin1,
                  location?.country,
                ]
                  .filter(Boolean)
                  .join(", ")}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400">

            {lastUpdated && (
              <span>
                Updated{" "}
                {lastUpdated.toLocaleTimeString([], {
                  hour: "numeric",
                  minute: "2-digit",
                })}
              </span>
            )}

            <button
              type="button"
              onClick={() => {
                if (location?.latitude && location?.longitude) {
                  fetchWeather(
                    location.latitude,
                    location.longitude
                  );
                } else {
                  getCurrentLocation();
                }
              }}
              className="flex items-center gap-1 rounded-lg border border-slate-200 px-3 py-2 font-medium transition hover:bg-white dark:border-slate-700 dark:hover:bg-slate-900"
            >
              <RefreshCw
                size={14}
                className={loading ? "animate-spin" : ""}
              />
              Refresh
            </button>
          </div>
        </div>

        {/* ===================================================
            CURRENT WEATHER
            =================================================== */}

        {weather && current && (
          <>
            <section className="overflow-hidden rounded-3xl bg-gradient-to-br from-green-600 via-emerald-600 to-teal-700 p-6 text-white shadow-lg sm:p-8">

              <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">

                {/* Current temperature */}

                <div>

                  <div className="mb-4 flex items-center gap-2 text-sm font-medium text-white/80">
                    <CalendarDays size={17} />

                    {formatDate(
                      weather.daily?.time?.[0]
                    )}
                  </div>

                  <div className="flex flex-wrap items-center gap-6">

                    <div className="flex h-28 w-28 items-center justify-center rounded-3xl bg-white/15 backdrop-blur">
                      <CurrentWeatherIcon
                        size={64}
                        strokeWidth={1.5}
                      />
                    </div>

                    <div>
                      <div className="flex items-start">
                        <span className="text-6xl font-bold tracking-tight sm:text-7xl">
                          {Math.round(
                            current.temperature_2m
                          )}
                        </span>

                        <span className="mt-2 text-3xl">
                          °C
                        </span>
                      </div>

                      <p className="mt-1 text-lg font-medium">
                        {currentWeatherInfo?.label}
                      </p>

                      <p className="mt-1 text-sm text-white/75">
                        Feels like{" "}
                        {Math.round(
                          current.apparent_temperature
                        )}
                        °C
                      </p>
                    </div>
                  </div>

                  <div className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-4">

                    <WeatherMiniStat
                      icon={Droplets}
                      label="Humidity"
                      value={`${Math.round(
                        current.relative_humidity_2m
                      )}%`}
                    />

                    <WeatherMiniStat
                      icon={Wind}
                      label="Wind"
                      value={`${Math.round(
                        current.wind_speed_10m
                      )} km/h`}
                    />

                    <WeatherMiniStat
                      icon={Umbrella}
                      label="Rain"
                      value={`${Math.round(
                        current.rain || 0
                      )} mm`}
                    />

                    <WeatherMiniStat
                      icon={Cloud}
                      label="Cloud Cover"
                      value={`${Math.round(
                        current.cloud_cover
                      )}%`}
                    />
                  </div>
                </div>

                {/* Right side */}

                <div className="rounded-3xl border border-white/15 bg-white/10 p-5 backdrop-blur">

                  <h3 className="mb-5 text-lg font-semibold">
                    Today's Overview
                  </h3>

                  <div className="space-y-4">

                    <WeatherDetail
                      icon={Thermometer}
                      label="Feels Like"
                      value={`${Math.round(
                        current.apparent_temperature
                      )}°C`}
                    />

                    <WeatherDetail
                      icon={Droplets}
                      label="Humidity"
                      value={`${Math.round(
                        current.relative_humidity_2m
                      )}%`}
                    />

                    <WeatherDetail
                      icon={Wind}
                      label="Wind"
                      value={`${Math.round(
                        current.wind_speed_10m
                      )} km/h ${getWindDirection(
                        current.wind_direction_10m
                      )}`}
                    />

                    <WeatherDetail
                      icon={Gauge}
                      label="Pressure"
                      value={`${Math.round(
                        current.surface_pressure
                      )} hPa`}
                    />

                    <WeatherDetail
                      icon={Cloud}
                      label="Cloud Cover"
                      value={`${Math.round(
                        current.cloud_cover
                      )}%`}
                    />

                    <WeatherDetail
                      icon={Umbrella}
                      label="Precipitation"
                      value={`${Number(
                        current.precipitation || 0
                      ).toFixed(1)} mm`}
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* =================================================
                HOURLY FORECAST
                ================================================= */}

            <section className="mt-8">

              <SectionTitle
                icon={CloudSun}
                title="Hourly Forecast"
                subtitle="Weather conditions for the next few hours"
              />

              <div className="mt-5 overflow-x-auto pb-3">
                <div className="flex min-w-max gap-3">

                  {hourlyForecast.map((item, index) => {
                    const Icon = item.icon;

                    return (
                      <div
                        key={`${item.time}-${index}`}
                        className="w-[125px] rounded-2xl border border-slate-200 bg-white p-4 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900"
                      >
                        <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                          {index === 0
                            ? "Now"
                            : formatHour(item.time)}
                        </p>

                        <Icon
                          size={30}
                          className="mx-auto my-4 text-green-600"
                          strokeWidth={1.6}
                        />

                        <p className="text-xl font-bold">
                          {Math.round(item.temperature)}°
                        </p>

                        <div className="mt-3 flex items-center justify-center gap-1 text-xs text-blue-600">
                          <Umbrella size={13} />
                          {item.rainProbability}%
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </section>

            {/* =================================================
                7 DAY FORECAST
                ================================================= */}

            <section className="mt-8">

              <SectionTitle
                icon={CalendarDays}
                title="7-Day Forecast"
                subtitle="Plan your farm activities with the weekly forecast"
              />

              <div className="mt-5 overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">

                {dailyForecast.map((day, index) => {
                  const Icon = day.icon;

                  return (
                    <div
                      key={day.date}
                      className="grid grid-cols-[1fr_auto] gap-4 border-b border-slate-100 p-4 last:border-b-0 dark:border-slate-800 sm:grid-cols-[1fr_1fr_1fr_auto] sm:items-center"
                    >

                      <div className="flex items-center gap-3">
                        <div className="w-20 shrink-0">
                          <p className="font-semibold">
                            {formatDay(
                              day.date,
                              index
                            )}
                          </p>

                          <p className="text-xs text-slate-500 dark:text-slate-400">
                            {day.date}
                          </p>
                        </div>

                        <Icon
                          size={28}
                          className="text-green-600"
                          strokeWidth={1.6}
                        />

                        <span className="hidden text-sm text-slate-500 dark:text-slate-400 sm:block">
                          {day.label}
                        </span>
                      </div>

                      <div className="hidden sm:block">
                        <div className="h-2 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                          <div
                            className="h-full rounded-full bg-green-500"
                            style={{
                              width: `${Math.min(
                                100,
                                Math.max(
                                  0,
                                  day.rainProbability
                                )
                              )}%`,
                            }}
                          />
                        </div>

                        <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                          Rain chance{" "}
                          {day.rainProbability}%
                        </p>
                      </div>

                      <div className="text-right">
                        <p className="font-bold">
                          {Math.round(day.maxTemp)}°
                        </p>

                        <p className="text-sm text-slate-400">
                          {Math.round(day.minTemp)}°
                        </p>
                      </div>

                      <div className="hidden items-center gap-4 text-sm text-slate-500 dark:text-slate-400 lg:flex">
                        <span className="flex items-center gap-1">
                          <Sunrise size={16} />
                          {formatHour(day.sunrise)}
                        </span>

                        <span className="flex items-center gap-1">
                          <Sunset size={16} />
                          {formatHour(day.sunset)}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* =================================================
                WEATHER DETAILS
                ================================================= */}

            <section className="mt-8">

              <SectionTitle
                icon={Gauge}
                title="Weather Details"
                subtitle="Detailed atmospheric conditions"
              />

              <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">

                <DetailCard
                  icon={Thermometer}
                  title="Temperature"
                  value={`${Math.round(
                    current.temperature_2m
                  )}°C`}
                />

                <DetailCard
                  icon={Droplets}
                  title="Humidity"
                  value={`${Math.round(
                    current.relative_humidity_2m
                  )}%`}
                />

                <DetailCard
                  icon={Wind}
                  title="Wind Speed"
                  value={`${Math.round(
                    current.wind_speed_10m
                  )} km/h`}
                />

                <DetailCard
                  icon={Gauge}
                  title="Pressure"
                  value={`${Math.round(
                    current.surface_pressure
                  )} hPa`}
                />

                <DetailCard
                  icon={Cloud}
                  title="Cloud Cover"
                  value={`${Math.round(
                    current.cloud_cover
                  )}%`}
                />

                <DetailCard
                  icon={Umbrella}
                  title="Rainfall"
                  value={`${Number(
                    current.rain || 0
                  ).toFixed(1)} mm`}
                />
              </div>
            </section>

            {/* =================================================
                SUNRISE / SUNSET
                ================================================= */}

            <section className="mt-8 grid gap-4 sm:grid-cols-2">

              <div className="rounded-2xl border border-orange-100 bg-orange-50 p-5 dark:border-orange-950 dark:bg-orange-950/30">

                <div className="flex items-center gap-4">

                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-100 text-orange-500 dark:bg-orange-950">
                    <Sunrise size={24} />
                  </div>

                  <div>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      Sunrise
                    </p>

                    <p className="text-xl font-bold">
                      {formatHour(
                        weather.daily?.sunrise?.[0]
                      )}
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-indigo-100 bg-indigo-50 p-5 dark:border-indigo-950 dark:bg-indigo-950/30">

                <div className="flex items-center gap-4">

                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-100 text-indigo-500 dark:bg-indigo-950">
                    <Sunset size={24} />
                  </div>

                  <div>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      Sunset
                    </p>

                    <p className="text-xl font-bold">
                      {formatHour(
                        weather.daily?.sunset?.[0]
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* =================================================
                FARMER TIP
                ================================================= */}

            <section className="mt-8 overflow-hidden rounded-2xl border border-green-200 bg-green-50 dark:border-green-900 dark:bg-green-950/30">

              <div className="flex flex-col gap-5 p-6 sm:flex-row sm:items-center">

                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-green-100 text-2xl dark:bg-green-950">
                  🌱
                </div>

                <div>
                  <p className="text-sm font-semibold uppercase tracking-wide text-green-700 dark:text-green-400">
                    KisanSetu Farmer Advice
                  </p>

                  <h3 className="mt-1 text-xl font-bold">
                    {farmerTip.title}
                  </h3>

                  <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600 dark:text-slate-300">
                    {farmerTip.text}
                  </p>
                </div>
              </div>
            </section>

            {/* =================================================
                API INFORMATION
                ================================================= */}

            <p className="mt-8 text-center text-xs text-slate-400 dark:text-slate-500">
              Weather data powered by Open-Meteo • Location-based
              forecast • Times shown in local timezone
            </p>
          </>
        )}

        {/* ===================================================
            NO WEATHER FALLBACK
            =================================================== */}

        {!weather && !loading && (
          <div className="rounded-3xl border border-slate-200 bg-white p-10 text-center dark:border-slate-800 dark:bg-slate-900">

            <Cloud
              size={50}
              className="mx-auto text-slate-400"
              strokeWidth={1.5}
            />

            <h2 className="mt-5 text-xl font-bold">
              Weather data unavailable
            </h2>

            <p className="mx-auto mt-2 max-w-md text-sm text-slate-500 dark:text-slate-400">
              Search for your city or allow location access to
              view live weather information.
            </p>

            <button
              type="button"
              onClick={getCurrentLocation}
              className="mt-6 rounded-xl bg-green-600 px-5 py-3 font-semibold text-white hover:bg-green-700"
            >
              Try My Location Again
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

/* =========================================================
   SMALL COMPONENTS
   ========================================================= */

const WeatherMiniStat = ({
  icon: Icon,
  label,
  value,
}) => {
  return (
    <div className="rounded-2xl bg-white/10 p-3 backdrop-blur">
      <div className="flex items-center gap-2 text-white/70">
        <Icon size={15} />
        <span className="text-xs">{label}</span>
      </div>

      <p className="mt-1 text-sm font-bold">
        {value}
      </p>
    </div>
  );
};

const WeatherDetail = ({
  icon: Icon,
  label,
  value,
}) => {
  return (
    <div className="flex items-center justify-between border-b border-white/10 pb-3 last:border-0 last:pb-0">
      <div className="flex items-center gap-3">
        <Icon
          size={18}
          className="text-white/70"
        />

        <span className="text-sm text-white/75">
          {label}
        </span>
      </div>

      <span className="text-sm font-semibold">
        {value}
      </span>
    </div>
  );
};

const SectionTitle = ({
  icon: Icon,
  title,
  subtitle,
}) => {
  return (
    <div className="flex items-center gap-3">

      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-100 text-green-600 dark:bg-green-950">
        <Icon size={21} />
      </div>

      <div>
        <h2 className="text-xl font-bold sm:text-2xl">
          {title}
        </h2>

        <p className="text-sm text-slate-500 dark:text-slate-400">
          {subtitle}
        </p>
      </div>
    </div>
  );
};

const DetailCard = ({
  icon: Icon,
  title,
  value,
}) => {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">

      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-50 text-green-600 dark:bg-green-950">
        <Icon size={19} />
      </div>

      <p className="mt-4 text-xs text-slate-500 dark:text-slate-400">
        {title}
      </p>

      <p className="mt-1 text-lg font-bold">
        {value}
      </p>
    </div>
  );
};

export default Weather;