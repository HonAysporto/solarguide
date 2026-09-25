const SYSTEM_PERFORMANCE_RATIO = 0.75;

export function calculatePanelSize(
  dailyEnergyWh: number,
  solarRadiationMJ: number
): number {
  if (solarRadiationMJ <= 0) {
    return 0;
  }

  // Convert MJ/m²/day to kWh/m²/day
  const peakSunHours =
    solarRadiationMJ / 3.6;

  const requiredPanelWatts =
    dailyEnergyWh /
    (peakSunHours * SYSTEM_PERFORMANCE_RATIO);

  // Round up to the nearest 100W
  return Math.ceil(requiredPanelWatts / 100) * 100;
}