const BATTERY_DOD = 0.8;
const BATTERY_EFFICIENCY = 0.95;

export function calculateBatterySize(
  dailyEnergyWh: number
): number {
  const requiredBatteryWh =
    dailyEnergyWh /
    (BATTERY_DOD * BATTERY_EFFICIENCY);

  return Math.ceil(requiredBatteryWh / 100) * 100;
}