export interface TSV {
  date: string;
  tsv: number;
}
export interface SPMV {
  time: string;
  forecasted_sPMV: number;
}
export interface Consumption {
  date: string;
  consumption: number;
}

export interface Recommendation {
  solution: string;
  comfort: number;
  energyWh: number;
  avgTempC: number;
  avgHumidity: number;
  energySavings: number;
}
export interface Option {
  label: string;
  value: string;
}
