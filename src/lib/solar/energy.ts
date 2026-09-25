export interface ApplianceInput {
  wattage: number;
  quantity: number;
  hours: number;
}


export function calculateDailyEnergy(
  appliances: ApplianceInput[]
): number {
  return appliances.reduce((total, appliance) => {
    return (
      total +
      appliance.wattage *
        appliance.quantity *
        appliance.hours
    );
  }, 0);
}


export function calculatePeakLoad(
  appliances: ApplianceInput[]
): number {
  return appliances.reduce((total, appliance) => {
    return (
      total +
      appliance.wattage *
        appliance.quantity
    );
  }, 0);
}