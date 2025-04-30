
export const normalizeRecommendationData = (raw: any) => {
   return {
    solution: raw["Solution"],
    comfort: raw["Comfort (%)"],
    energyWh: raw["Energy (Wh)"],
    avgTempC: raw["Avg Temp (°C)"],
    avgHumidity: raw["Avg RH (%)"],
    energySavings: raw["Energy Savings (%)"]

   }
}
