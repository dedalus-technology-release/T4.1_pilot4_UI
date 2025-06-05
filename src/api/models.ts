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

export interface FlexibilityHeating {
  time: string;
  energy_average: number;
  baseline: number;
  flexibility_above: number;
  flexibility_below: number;
}
export interface Energy {
  energy_a: EnergyEntry[];
  power_a: EnergyEntry[];
}
export interface EnergyEntry {
  time: string;
  value: string;
}
export interface Option {
  label: string;
  value: string;
}

export interface Token {
  access_token: string;
  tokenType: string;
}

export interface IFormInput {
  username: string;
  password: string;
}
