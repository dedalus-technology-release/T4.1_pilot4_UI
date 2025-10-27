export const normalizeRecommendationData = (raw: any) => {
  return {
    solution: raw["solution"],
    comfortMin: raw["expected_comfort_min"],
    comfortMax: raw["expected_comfort_max"],
    energyConsumptionMin: raw["expected_energy_consumption_min"],
    energyConsumptionMax: raw["expected_energy_consumption_max"],
    energySavingWhMin: raw["energy_saving_Wh_min"],
    energySavingWhMax: raw["energy_saving_Wh_max"],
    t_r_min: raw["t_r_min"],
    t_r_max: raw["t_r_max"],
    rh_r_min: raw["rh_r_min"],
    rh_r_max: raw["rh_r_max"]
  };
};
