const INVERTER_SAFETY_MARGIN = 1.25;

export function calculateInverterSize(
  peakLoadW: number
): number {
  const requiredPower =
    peakLoadW * INVERTER_SAFETY_MARGIN;

  // Round up to the nearest 100W
  return Math.ceil(requiredPower / 100) * 100;
}