export interface TSV {
  date: string;
  tsv: number;
}
export interface SPMV {
  time: string;
  forecastedSPmv: number;
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
  energyAverage: number;
  baseline: number;
  flexibilityAbove: number;
  flexibilityBelow: number;
}
export interface Energy {
  energyA: EnergyEntry[];
  powerA: EnergyEntry[];
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
