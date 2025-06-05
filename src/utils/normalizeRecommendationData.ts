export const normalizeRecommendationData = (raw: any) => {
  return {
    solution: raw["solution"],
    comfort: raw["comfort (%)"],
    energyWh: raw["energy (wh)"],
    avgTempC: raw["avgTemp (c)"],
    avgHumidity: raw["avgRh (%)"],
    energySavings: raw["energySavings (%)"],
  };
};
