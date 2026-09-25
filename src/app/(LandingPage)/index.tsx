"use client";

import { useState } from "react";

interface Location {
  latitude: number;
  longitude: number;
}

interface SolarDay {
  date: string;
  sunrise: string;
  sunset: string;
  daylight: string;
  sunshine: string;
  solarRadiation: number;
}

interface SolarData {
  message?: string;
  latitude: number;
  longitude: number;
  location: string;
  solar: SolarDay[];
}

const LandingPage = () => {
  const [location, setLocation] = useState<Location | null>(null);
  const [solarData, setSolarData] = useState<SolarData | null>(null);
  const [selectedDay, setSelectedDay] = useState(0);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const getLocation = () => {
    setLoading(true);
    setError("");

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        setLocation({
          latitude,
          longitude,
        });

        try {
          const response = await fetch(
            `/api/solar?latitude=${latitude}&longitude=${longitude}`
          );

          if (!response.ok) {
            throw new Error("Failed to fetch solar data");
          }

          const data: SolarData = await response.json();

          console.log("Backend response:", data.solar[0]);
          localStorage.setItem("solarData", JSON.stringify(data.solar[0]));

          setSolarData(data);
          setSelectedDay(0);
        } catch (error) {
          console.error("Error connecting to backend:", error);
          setError("Could not get your solar information.");
        } finally {
          setLoading(false);
        }
      },
      (error) => {
        console.error(error);
        setError("Unable to get your location.");
        setLoading(false);
      }
    );
  };

  const formatDate = (date: string) => {
    return new Date(`${date}T00:00:00`).toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  };

  const goToPreviousDay = () => {
    setSelectedDay((prev) => Math.max(prev - 1, 0));
  };

  const goToNextDay = () => {
    if (!solarData) return;

    setSelectedDay((prev) =>
      Math.min(prev + 1, solarData.solar.length - 1)
    );
  };

  const goToDay = (index: number) => {
    setSelectedDay(index);
  };

  const selectedSolarDay = solarData?.solar?.[selectedDay] ?? null;

  return (
    <main className="relative pt-15 min-h-screen overflow-hidden  text-white">
      {/* Background decoration */}
     

      <div className="relative mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8 lg:py-14">
        {/* ================= HEADER ================= */}
        <header className="mb-10 flex flex-col gap-8 lg:mb-12 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            {/* Brand */}
          

            {/* Heading */}
            <h1 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              Know your{" "}
              <span className="text-yellow-400">solar potential.</span>
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-7 text-slate-400 sm:text-lg">
              Get solar conditions for your location, including sunlight
              duration, sunrise, sunset and solar radiation.
            </p>
          </div>

          {/* Location Button */}
          <button
            onClick={getLocation}
            disabled={loading}
            className="inline-flex min-h-12 items-center justify-center gap-3 rounded-xl bg-yellow-400 px-6 py-3.5 text-sm font-bold text-slate-950 shadow-lg shadow-yellow-400/10 transition duration-200 hover:bg-yellow-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 focus:ring-offset-slate-950 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? (
              <>
                <span
                  aria-hidden="true"
                  className="h-5 w-5 animate-spin rounded-full border-2 border-slate-950 border-t-transparent"
                />
                Getting data...
              </>
            ) : (
              <>
                <span
                  aria-hidden="true"
                  className="h-2.5 w-2.5 rounded-full bg-slate-950"
                />
                Check My Solar
              </>
            )}
          </button>
        </header>

        {/* ================= ERROR ================= */}
        {error && (
          <div
            role="alert"
            className="mb-8 rounded-2xl border border-red-400/20 bg-red-400/10 p-5"
          >
            <div className="flex items-start gap-4">
              <div
                aria-hidden="true"
                className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-red-400"
              />

              <div>
                <p className="font-semibold text-red-300">
                  Something went wrong
                </p>

                <p className="mt-1 text-sm leading-6 text-red-300/70">
                  {error}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* ================= EMPTY STATE ================= */}
        {!solarData && !loading && (
          <section className="grid gap-5 lg:grid-cols-2">
            {/* Main Empty Card */}
            <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur sm:p-8">
              <div className="mb-8">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-yellow-400/20 bg-yellow-400/10">
                  <span
                    aria-hidden="true"
                    className="h-4 w-4 rounded-full bg-yellow-400"
                  />
                </div>

                <h2 className="mt-6 text-2xl font-bold tracking-tight sm:text-3xl">
                  Start with your location
                </h2>

                <p className="mt-3 max-w-xl leading-7 text-slate-400">
                  Allow Solar Guide to access your location and we&apos;ll
                  calculate the available solar conditions for your area.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {[
                  {
                    title: "Sunrise",
                    description: "Daily start",
                  },
                  {
                    title: "Sunset",
                    description: "Daily end",
                  },
                  {
                    title: "Sunshine",
                    description: "Useful duration",
                  },
                  {
                    title: "Radiation",
                    description: "Solar energy",
                  },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="rounded-2xl border border-white/5 bg-white/[0.03] p-4 transition duration-200 hover:border-white/10 hover:bg-white/[0.05]"
                  >
                    <div
                      aria-hidden="true"
                      className="mb-4 h-2.5 w-2.5 rounded-full bg-yellow-400/70"
                    />

                    <p className="text-sm font-medium text-slate-200">
                      {item.title}
                    </p>

                    <p className="mt-1 text-xs text-slate-500">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Secondary Card */}
            <div className="hidden rounded-3xl border border-yellow-400/10 bg-gradient-to-br from-yellow-400/10 via-orange-500/5 to-transparent p-8 lg:block">
              <div className="flex h-full flex-col justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-yellow-400">
                    Your solar assistant
                  </p>

                  <h2 className="mt-5 max-w-md text-3xl font-bold leading-tight tracking-tight">
                    Understand the solar conditions around you.
                  </h2>

                  <p className="mt-4 max-w-md leading-7 text-slate-400">
                    Solar Guide turns location and weather data into useful
                    information for planning your solar energy needs.
                  </p>
                </div>

                <div className="mt-10">
                  <div className="h-1.5 w-24 rounded-full bg-yellow-400" />

                  <div className="mt-3 h-1.5 w-16 rounded-full bg-yellow-400/30" />

                  <div className="mt-3 h-1.5 w-10 rounded-full bg-yellow-400/10" />
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ================= SOLAR DASHBOARD ================= */}
        {solarData && selectedSolarDay && (
          <section className="space-y-5">
            {/* ================= LOCATION CARD ================= */}
            <div className="flex flex-col justify-between gap-5 rounded-3xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur sm:p-6 md:flex-row md:items-center">
              <div>
                <div className="flex items-center gap-2">
                  <span
                    aria-hidden="true"
                    className="h-2 w-2 rounded-full bg-emerald-400"
                  />

                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
                    Current location
                  </p>
                </div>

                <h2 className="mt-2 text-2xl font-bold tracking-tight">
                  {solarData.location}
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  {solarData.latitude}° ,{" "}
                  {solarData.longitude}°
                </p>
              </div>

              <button
                onClick={getLocation}
                disabled={loading}
                className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] px-5 py-3 text-sm font-semibold text-slate-200 transition duration-200 hover:bg-white/[0.08] focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 focus:ring-offset-slate-950 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading ? "Updating..." : "Update location"}
              </button>
            </div>

            {/* ================= DAY NAVIGATION ================= */}
            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-4 sm:p-5">
              <div className="flex items-center justify-between gap-3">
                {/* Previous */}
                <button
                  onClick={goToPreviousDay}
                  disabled={selectedDay === 0}
                  aria-label="Previous day"
                  className="inline-flex h-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] px-3 text-sm font-semibold transition duration-200 hover:bg-white/[0.08] focus:outline-none focus:ring-2 focus:ring-yellow-400 disabled:cursor-not-allowed disabled:opacity-30 sm:px-4"
                >
                  <span aria-hidden="true" className="text-lg">
                    ←
                  </span>

                  <span className="ml-2 hidden sm:inline">
                    Previous
                  </span>
                </button>

                {/* Current Day */}
                <div className="text-center">
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-yellow-400">
                    Day {selectedDay + 1} of {solarData.solar.length}
                  </p>

                  <p className="mt-1.5 text-sm font-semibold text-slate-200 sm:text-base">
                    {selectedDay === 0
                      ? "Today"
                      : formatDate(selectedSolarDay.date)}
                  </p>
                </div>

                {/* Next */}
                <button
                  onClick={goToNextDay}
                  disabled={
                    selectedDay === solarData.solar.length - 1
                  }
                  aria-label="Next day"
                  className="inline-flex h-11 items-center justify-center rounded-xl bg-yellow-400 px-3 text-sm font-bold text-slate-950 transition duration-200 hover:bg-yellow-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 disabled:cursor-not-allowed disabled:opacity-30 sm:px-4"
                >
                  <span className="mr-2 hidden sm:inline">
                    Next
                  </span>

                  <span aria-hidden="true" className="text-lg">
                    →
                  </span>
                </button>
              </div>

              {/* Day Indicators */}
              <div className="mt-5 flex justify-center gap-2">
                {solarData.solar.map((day, index) => (
                  <button
                    key={day.date}
                    onClick={() => goToDay(index)}
                    aria-label={`Go to day ${index + 1}`}
                    aria-current={
                      selectedDay === index ? "true" : undefined
                    }
                    className={`h-2 rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 focus:ring-offset-slate-950 ${
                      selectedDay === index
                        ? "w-8 bg-yellow-400"
                        : "w-2 bg-white/20 hover:bg-white/40"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* ================= SELECTED DAY MAIN CARD ================= */}
            <div className="overflow-hidden rounded-3xl border border-yellow-400/20 bg-gradient-to-br from-yellow-400/[0.12] via-orange-400/[0.05] to-transparent">
              <div className="grid md:grid-cols-[1.2fr_0.8fr]">
                {/* Main Information */}
                <div className="p-6 sm:p-8 lg:p-10">
                  <div className="flex items-start justify-between gap-6">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.18em] text-yellow-400">
                        {selectedDay === 0 ? "Today" : "Forecast"}
                      </p>

                      <p className="mt-2 text-base font-medium text-slate-300 sm:text-lg">
                        {formatDate(selectedSolarDay.date)}
                      </p>
                    </div>

                    <div
                      aria-hidden="true"
                      className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-yellow-400/20 bg-yellow-400/10"
                    >
                      <span className="h-4 w-4 rounded-full bg-yellow-400 shadow-[0_0_20px_rgba(250,204,21,0.5)]" />
                    </div>
                  </div>

                  {/* Sunshine */}
                  <div className="mt-10 sm:mt-14">
                    <p className="text-sm text-slate-400">
                      Expected sunshine
                    </p>

                    <h3 className="mt-2 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                      {selectedSolarDay.sunshine}
                    </h3>

                    <p className="mt-3 text-sm text-slate-400 sm:text-base">
                      of {selectedSolarDay.daylight} available daylight
                    </p>
                  </div>
                </div>

                {/* Sunrise / Sunset */}
                <div className="border-t border-white/10 bg-black/10 p-6 sm:p-8 md:border-l md:border-t-0 lg:p-10">
                  <div className="space-y-6">
                    {/* Sunrise */}
                    <div className="flex items-center gap-4">
                      <div
                        aria-hidden="true"
                        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-yellow-400/10 bg-yellow-400/10"
                      >
                        <span className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
                      </div>

                      <div>
                        <p className="text-sm text-slate-400">
                          Sunrise
                        </p>

                        <p className="mt-1 text-xl font-bold sm:text-2xl">
                          {selectedSolarDay.sunrise}
                        </p>
                      </div>
                    </div>

                    <div className="h-px bg-white/10" />

                    {/* Sunset */}
                    <div className="flex items-center gap-4">
                      <div
                        aria-hidden="true"
                        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-orange-400/10 bg-orange-400/10"
                      >
                        <span className="h-2.5 w-2.5 rounded-full bg-orange-400" />
                      </div>

                      <div>
                        <p className="text-sm text-slate-400">
                          Sunset
                        </p>

                        <p className="mt-1 text-xl font-bold sm:text-2xl">
                          {selectedSolarDay.sunset}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ================= STATS ================= */}
            <div className="grid gap-4 sm:grid-cols-3">
              {/* Daylight */}
              <div className="group rounded-3xl border border-white/10 bg-white/[0.04] p-5 transition duration-200 hover:-translate-y-0.5 hover:border-white/15 hover:bg-white/[0.06] sm:p-6">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-slate-400">
                    Daylight
                  </p>

                  <div
                    aria-hidden="true"
                    className="h-2.5 w-2.5 rounded-full bg-sky-400/80"
                  />
                </div>

                <p className="mt-5 text-2xl font-bold tracking-tight sm:text-3xl">
                  {selectedSolarDay.daylight}
                </p>

                <p className="mt-1 text-xs text-slate-500 sm:text-sm">
                  Total daylight
                </p>
              </div>

              {/* Sunshine */}
              <div className="group rounded-3xl border border-white/10 bg-white/[0.04] p-5 transition duration-200 hover:-translate-y-0.5 hover:border-white/15 hover:bg-white/[0.06] sm:p-6">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-slate-400">
                    Sunshine
                  </p>

                  <div
                    aria-hidden="true"
                    className="h-2.5 w-2.5 rounded-full bg-yellow-400"
                  />
                </div>

                <p className="mt-5 text-2xl font-bold tracking-tight sm:text-3xl">
                  {selectedSolarDay.sunshine}
                </p>

                <p className="mt-1 text-xs text-slate-500 sm:text-sm">
                  Useful sunshine duration
                </p>
              </div>

              {/* Solar Radiation */}
              <div className="group rounded-3xl border border-white/10 bg-white/[0.04] p-5 transition duration-200 hover:-translate-y-0.5 hover:border-white/15 hover:bg-white/[0.06] sm:p-6">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-slate-400">
                    Solar radiation
                  </p>

                  <div
                    aria-hidden="true"
                    className="h-2.5 w-2.5 rounded-full bg-orange-400"
                  />
                </div>

                <p className="mt-5 text-2xl font-bold tracking-tight sm:text-3xl">
                  {selectedSolarDay.solarRadiation}
                </p>

                <p className="mt-1 text-xs text-slate-500 sm:text-sm">
                  MJ/m²/day
                </p>
              </div>
            </div>

            {/* ================= SOLAR SUMMARY ================= */}
            <div className="rounded-3xl border border-yellow-400/10 bg-yellow-400/[0.04] p-5 sm:p-6 md:p-8">
              <div className="flex items-start gap-4">
                <div
                  aria-hidden="true"
                  className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-yellow-400/10 bg-yellow-400/10"
                >
                  <span className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
                </div>

                <div>
                  <h3 className="font-bold text-slate-100">
                    Solar conditions
                  </h3>

                  <p className="mt-2 text-sm leading-7 text-slate-400 sm:text-base">
                    {selectedDay === 0
                      ? "These are the solar conditions expected for your location today."
                      : `These are the forecasted solar conditions for ${formatDate(
                          selectedSolarDay.date
                        )}.`}
                  </p>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ================= FOOTER ================= */}
        <footer className="mt-12 border-t border-white/5 pt-6 text-center text-xs text-slate-600">
          Solar Guide · Solar information based on your location
        </footer>
      </div>
    </main>
  );
};

export default LandingPage;