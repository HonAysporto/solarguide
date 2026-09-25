import {
  calculateDailyEnergy,
  calculatePeakLoad,
  type ApplianceInput,
} from "./energy";

import { calculateBatterySize } from "./battery";

import { calculateInverterSize } from "./inverter";

import { calculatePanelSize } from "./panel";

export interface SolarSystemResult {
  dailyEnergyWh: number;
  dailyEnergyKWh: number;
  peakLoadW: number;
  batteryWh: number;
  batteryKWh: number;
  inverterW: number;
  panelW: number;
}

export function calculateSolarSystem(
  appliances: ApplianceInput[],
  solarRadiationMJ: number
): SolarSystemResult {
  const dailyEnergyWh =
    calculateDailyEnergy(appliances);

  const peakLoadW =
    calculatePeakLoad(appliances);

  const batteryWh =
    calculateBatterySize(dailyEnergyWh);

  const inverterW =
    calculateInverterSize(peakLoadW);

  const panelW =
    calculatePanelSize(
      dailyEnergyWh,
      solarRadiationMJ
    );

  return {
    dailyEnergyWh,
    dailyEnergyKWh: dailyEnergyWh / 1000,

    peakLoadW,

    batteryWh,
    batteryKWh: batteryWh / 1000,

    inverterW,

    panelW,
  };
}