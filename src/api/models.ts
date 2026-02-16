export interface TSV {
  date: string;
  tsv: number;
}
export interface SPMV {
  time: string;
  forecastedSPmv: number;
  forecastedTemp: number;
  internalTemp: number;
}

export interface Co2 {
  time: string;
  value: number;
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
  expectedEnergyConsumptionS1: number;
  expectedEnergyConsumptionS2: number;
  expectedEnergyConsumptionS3: number;
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

export interface Dam {
  time_period: string;
  DAM: number;
}

export interface Green {
  time_period: string;
  tariff: number;
}

export interface DamJson {
  timePeriod: string;
  dam: number;
}

export interface GreenJson {
  timePeriod: string;
  tariff: number;
}
