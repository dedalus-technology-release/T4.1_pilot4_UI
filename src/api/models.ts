export interface TSV {
  date: string;
  tsv: number;
}
export interface SPMV {
  time: string;
  forecastedSPmv: number;
  forecastedTemp: number;
}

export interface Recommendation {
  solution: string;
  comfortMin: number;
  comfortMax: number;
  energyConsumptionMin: number;
  energyConsumptionMax: number;
  energySavingWhMin: number;
  energySavingWhMax: number;
  t_r_min: number;
  t_r_max: number;
  rh_r_min: number;
  rh_r_max: number;
}

export interface FlexibilityHeating {
  time: string;
  energyAverage: number;
  baseline: number;
  flexibilityAbove: number;
  flexibilityBelow: number;
  expected_energy_consumption_S1: number;
  expected_energy_consumption_S2: number;
  expected_energy_consumption_S3: number;
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
