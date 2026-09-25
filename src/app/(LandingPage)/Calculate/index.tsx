
"use client";

import { useEffect, useMemo, useState } from "react";
import { calculateSolarSystem } from "@/lib/solar";

interface  Appliance {
  id: number;
  name: string;
  wattage: number;
  quantity: number;
  hours: number;
}

interface SolarData {
  solarRadiation: number;
}


const applianceOptions = [
  { name: "Refrigerator", wattage: 150 },
  { name: "Freezer", wattage: 150 },
  { name: "TV", wattage: 100 },
  { name: "Standing Fan", wattage: 80 },
  { name: "Ceiling Fan", wattage: 70 },
  { name: "Light Bulb", wattage: 15 },
  { name: "Laptop", wattage: 60 },
  { name: "Phone Charger", wattage: 10 },
  { name: "Washing Machine", wattage: 500 },
  { name: "Water Pump", wattage: 750 },
  { name: "Microwave", wattage: 1200 },
  { name: "Electric Iron", wattage: 1000 },
  { name: "Air Conditioner", wattage: 1200 },
  { name: "Electric Kettle", wattage: 1500 },
  { name: "Custom Appliance", wattage: 100 },
];

export default function Calculate() {
    const [systemResult, setSystemResult] =
  useState<ReturnType<typeof calculateSolarSystem> | null>(null);
const [solarData, setSolarData] =
  useState<SolarData | null>(null);

useEffect(() => {
  const storedData = localStorage.getItem("solarData");

  if (storedData) {
    setSolarData(JSON.parse(storedData));
  }
}, []);

  const [appliances, setAppliances] = useState<Appliance[]>([
    {
      id: 1,
      name: "TV",
      wattage: 100,
      quantity: 1,
      hours: 5,
    },
  ]);



const addAppliance = () => {
    const newAppliance:Appliance = {
        id: Date.now(),
        name: 'Fan',
        wattage: 80,
        quantity: 1,
        hours: 1
    } 

    setAppliances((prev)=> [...prev, newAppliance])
}



const removeAppliance = (id:number) => {
    setAppliances((prev)=> prev.filter((appliance)=> appliance.id !== id))
}

  const updateAppliance = (
    id: number,
    field: keyof Appliance,
    value: string | number
  ) => {
    setAppliances((prev) =>
      prev.map((appliance) =>
        appliance.id === id
          ? {
              ...appliance,
              [field]: value,
            }
          : appliance
      )
    );
  };

  const handleApplianceChange = (id: number, name: string) => {
    const selectedAppliance = applianceOptions.find(
      (appliance) => appliance.name === name
    );

    setAppliances((prev) =>
      prev.map((appliance) =>
        appliance.id === id
          ? {
              ...appliance,
              name,
              wattage: selectedAppliance?.wattage ?? appliance.wattage,
            }
          : appliance
      )
    );
  };

  const totalDailyEnergy = useMemo(() => {
    return appliances.reduce((total, appliance) => {
      return (
        total +
        appliance.wattage *
          appliance.quantity *
          appliance.hours
      );
    }, 0);
  }, [appliances]);

  const maximumLoad = useMemo(() => {
    return appliances.reduce((total, appliance) => {
      return total + appliance.wattage * appliance.quantity;
    }, 0);
  }, [appliances]);

  const totalAppliances = useMemo(() => {
    return appliances.reduce(
      (total, appliance) => total + appliance.quantity,
      0
    );
  }, [appliances]);


  const handleContinueToSizing = () => {
  if (!solarData || !solarData.solarRadiation) {
    alert(
      "Solar information is not available yet. Please check your location first."
    );

    return;
  }

  const todaySolarData =
    solarData;

  const result = calculateSolarSystem(
    appliances,
    todaySolarData.solarRadiation
  );

  setSystemResult(result);
};

  return (
    <main className="min-h-screen pt-20  text-white">
      {/* Header */}
    

      {/* Main */}
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
        {/* Intro */}
        <div className="max-w-3xl">
          <p className="mb-3 text-sm font-medium uppercase tracking-wider text-yellow-400">
            Step 1
          </p>

          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            What do you want to power?
          </h1>

          <p className="mt-4 text-base leading-7 text-slate-400 sm:text-lg">
            Add the appliances you plan to use, how many you have,
            and how long you expect to use them each day.
          </p>
        </div>

        {/* Main Grid */}
        <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_360px]">
          {/* Appliance Section */}
          <div>
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold">
                  Your appliances
                </h2>

                <p className="mt-1 text-sm text-slate-400">
                  Add everything you want your solar system to power.
                </p>
              </div>

              <button
                type="button"
                onClick={addAppliance}
                className="rounded-lg bg-yellow-400 px-4 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-yellow-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 focus:ring-offset-slate-950"
              >
                + Add appliance
              </button>
            </div>

            {/* Appliance Cards */}
            <div className="space-y-4">
              {appliances.map((appliance, index) => (
                <div
                  key={appliance.id}
                  className="rounded-2xl border border-white/10 bg-white/5 p-5 transition hover:border-white/20"
                >
                  {/* Card Header */}
                  <div className="mb-5 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-yellow-400/10">
                        <span className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
                      </div>

                      <div>
                        <p className="text-sm font-semibold">
                          Appliance {index + 1}
                        </p>

                        <p className="text-xs text-slate-500">
                          Enter your expected usage
                        </p>
                      </div>
                    </div>

                    {appliances.length > 1 && (
                      <button
                        type="button"
                        onClick={() =>
                          removeAppliance(appliance.id)
                        }
                        className="text-sm text-slate-500 transition hover:text-red-400 focus:outline-none focus:ring-2 focus:ring-red-400"
                      >
                        Remove
                      </button>
                    )}
                  </div>

                  {/* Fields */}
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {/* Appliance */}
                    <div className="sm:col-span-2 lg:col-span-1">
                      <label className="mb-2 block text-sm font-medium text-slate-300">
                        Appliance
                      </label>

                      <select
                        value={appliance.name}
                        onChange={(e) =>
                          handleApplianceChange(
                            appliance.id,
                            e.target.value
                          )
                        }
                        className="w-full rounded-lg border border-white/10 bg-slate-900 px-3 py-3 text-sm text-white outline-none transition focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20"
                      >
                        {applianceOptions.map((option) => (
                          <option
                            key={option.name}
                            value={option.name}
                          >
                            {option.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Wattage */}
                    <div>
                      <label className="mb-2 block text-sm font-medium text-slate-300">
                        Power
                      </label>

                      <div className="relative">
                        <input
                          type="number"
                          min="1"
                          value={appliance.wattage}
                          onChange={(e) =>
                            updateAppliance(
                              appliance.id,
                              "wattage",
                              Number(e.target.value)
                            )
                          }
                          className="w-full rounded-lg border border-white/10 bg-slate-900 px-3 py-3 pr-12 text-sm text-white outline-none transition focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20"
                        />

                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-500">
                          W
                        </span>
                      </div>
                    </div>

                    {/* Quantity */}
                    <div>
                      <label className="mb-2 block text-sm font-medium text-slate-300">
                        Quantity
                      </label>

                      <input
                        type="number"
                        min="1"
                        value={appliance.quantity}
                        onChange={(e) =>
                          updateAppliance(
                            appliance.id,
                            "quantity",
                            Math.max(1, Number(e.target.value))
                          )
                        }
                        className="w-full rounded-lg border border-white/10 bg-slate-900 px-3 py-3 text-sm text-white outline-none transition focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20"
                      />
                    </div>

                    {/* Hours */}
                    <div>
                      <label className="mb-2 block text-sm font-medium text-slate-300">
                        Hours / day
                      </label>

                      <div className="relative">
                        <input
                          type="number"
                          min="0"
                          max="24"
                          step="0.5"
                          value={appliance.hours}
                          onChange={(e) =>
                            updateAppliance(
                              appliance.id,
                              "hours",
                              Math.min(
                                24,
                                Math.max(
                                  0,
                                  Number(e.target.value)
                                )
                              )
                            )
                          }
                          className="w-full rounded-lg border border-white/10 bg-slate-900 px-3 py-3 pr-12 text-sm text-white outline-none transition focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20"
                        />

                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-500">
                          hrs
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Appliance Calculation */}
                  <div className="mt-5 flex flex-col gap-2 border-t border-white/10 pt-4 text-sm sm:flex-row sm:items-center sm:justify-between">
                    <span className="text-slate-500">
                      Estimated daily energy
                    </span>

                    <span className="font-semibold text-yellow-400">
                      {(
                        (appliance.wattage *
                          appliance.quantity *
                          appliance.hours) /
                        1000
                      ).toFixed(2)}{" "}
                      kWh/day
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Add Button Mobile */}
            <button
              type="button"
              onClick={addAppliance}
              className="mt-4 w-full rounded-xl border border-dashed border-white/20 px-4 py-3 text-sm font-medium text-slate-300 transition hover:border-yellow-400/50 hover:text-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 sm:hidden"
            >
              + Add another appliance
            </button>
          </div>

          {/* Summary */}
          <aside className="lg:sticky lg:top-6 lg:self-start">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <div className="mb-6">
                <p className="text-sm font-medium text-slate-400">
                  Energy estimate
                </p>

                <h2 className="mt-1 text-xl font-semibold">
                  Your current load
                </h2>
              </div>

              {/* Daily Energy */}
              <div className="rounded-xl border border-yellow-400/20 bg-yellow-400/10 p-5">
                <p className="text-sm text-yellow-200">
                  Daily energy consumption
                </p>

                <div className="mt-2 flex items-end gap-2">
                  <span className="text-3xl font-bold text-yellow-400">
                    {(totalDailyEnergy / 1000).toFixed(2)}
                  </span>

                  <span className="mb-1 text-sm text-yellow-200">
                    kWh/day
                  </span>
                </div>
              </div>

              {/* Stats */}
              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="rounded-xl border border-white/10 bg-slate-900 p-4">
                  <p className="text-xs text-slate-500">
                    Maximum load
                  </p>

                  <p className="mt-2 text-xl font-semibold">
                    {maximumLoad}
                    <span className="ml-1 text-xs text-slate-500">
                      W
                    </span>
                  </p>
                </div>

                <div className="rounded-xl border border-white/10 bg-slate-900 p-4">
                  <p className="text-xs text-slate-500">
                    Appliances
                  </p>

                  <p className="mt-2 text-xl font-semibold">
                    {totalAppliances}
                  </p>
                </div>
              </div>

              {/* Explanation */}
              <div className="mt-6 border-t border-white/10 pt-5">
                <p className="text-sm leading-6 text-slate-400">
                  We'll use your energy requirements together with
                  your location's solar conditions to estimate the
                  panel, inverter, and battery capacity you need.
                </p>
              </div>

              {/* Continue */}
              <button 
                onClick={handleContinueToSizing}
                type="button"
                className="mt-6 w-full rounded-xl bg-yellow-400 px-5 py-3.5 text-sm font-semibold text-slate-950 transition hover:bg-yellow-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 focus:ring-offset-slate-950"
              >
                Continue to system sizing
              </button>
            </div>
          </aside>
        </div>

             {systemResult && (
  <section className="mt-8 rounded-3xl border border-white/10 bg-slate-900 p-6 shadow-xl">
    <div className="mb-6">
      <p className="text-sm font-medium text-amber-400">
        SYSTEM SIZING
      </p>

      <h2 className="mt-1 text-2xl font-bold text-white">
        Your recommended solar system
      </h2>

      <p className="mt-2 text-sm text-slate-400">
        Based on your appliances and today's solar
        conditions.
      </p>
    </div>

    {/* Energy requirement */}
    <div className="mb-6 grid gap-4 sm:grid-cols-2">
      <div className="rounded-2xl bg-slate-800 p-5">
        <p className="text-sm text-slate-400">
          Daily Energy
        </p>

        <p className="mt-2 text-3xl font-bold text-white">
          {systemResult.dailyEnergyKWh.toFixed(2)}
          <span className="ml-1 text-base text-slate-400">
            kWh/day
          </span>
        </p>
      </div>

      <div className="rounded-2xl bg-slate-800 p-5">
        <p className="text-sm text-slate-400">
          Maximum Load
        </p>

        <p className="mt-2 text-3xl font-bold text-white">
          {systemResult.peakLoadW}
          <span className="ml-1 text-base text-slate-400">
            W
          </span>
        </p>
      </div>
    </div>

    {/* Recommendations */}
    <div className="grid gap-4 md:grid-cols-3">

      {/* Solar Panels */}
      <div className="rounded-2xl border border-amber-400/20 bg-amber-400/5 p-5">
        <div className="text-3xl">
          ☀️
        </div>

        <p className="mt-4 text-sm text-slate-400">
          Solar Panels
        </p>

        <p className="mt-1 text-3xl font-bold text-white">
          {systemResult.panelW}W
        </p>

        <p className="mt-3 text-sm leading-6 text-slate-400">
          Estimated total solar panel capacity
          needed to generate your daily energy.
        </p>
      </div>

      {/* Battery */}
      <div className="rounded-2xl border border-emerald-400/20 bg-emerald-400/5 p-5">
        <div className="text-3xl">
          🔋
        </div>

        <p className="mt-4 text-sm text-slate-400">
          LiFePO₄ Battery
        </p>

        <p className="mt-1 text-3xl font-bold text-white">
          {systemResult.batteryKWh.toFixed(1)}
          <span className="ml-1 text-base text-slate-400">
            kWh
          </span>
        </p>

        <p className="mt-3 text-sm leading-6 text-slate-400">
          Estimated battery capacity based on
          your daily energy requirement.
        </p>
      </div>

      {/* Inverter */}
      <div className="rounded-2xl border border-blue-400/20 bg-blue-400/5 p-5">
        <div className="text-3xl">
          ⚡
        </div>

        <p className="mt-4 text-sm text-slate-400">
          Inverter
        </p>

        <p className="mt-1 text-3xl font-bold text-white">
          {systemResult.inverterW}W
        </p>

        <p className="mt-3 text-sm leading-6 text-slate-400">
          Estimated inverter capacity based on
          your maximum simultaneous load.
        </p>
      </div>

    </div>
  </section>
)}
      </section>


 
    </main>
  );
}

