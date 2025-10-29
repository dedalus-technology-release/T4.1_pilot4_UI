export const normalizeRecommendationData = (raw: any) => {
  console.log("NORMALIZING ITEM:", raw);
  return {
    solution: raw["solution"],
    comfortMin: raw["expectedComfortMin"],
    comfortMax: raw["expectedComfortMax"],
    energyConsumptionMin: raw["expectedEnergyConsumptionMin"],
    energyConsumptionMax: raw["expectedEnergyConsumptionMax"],
    energySavingWhMin: raw["energySavingWhMin"],
    energySavingWhMax: raw["energySavingWhMax"],
    t_r_min: raw["tRMin"],
    t_r_max: raw["tRMax"],
    rh_r_min: raw["rhRMin"],
    rh_r_max: raw["rhRMax"]
  };
};
