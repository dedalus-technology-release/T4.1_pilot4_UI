import { API_SERVICE_D } from "../utils/Constant";
import api from "./axiosConfig";
import { GreenJson, DamJson } from "./models";

const formatDateYYYYMMDD = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}${month}${day}`;
};

export const getGreen = async (
  from: string = formatDateYYYYMMDD(new Date()),
  to: string = formatDateYYYYMMDD(new Date()),
): Promise<GreenJson[]> => {
  try {
    let greenURL = `${API_SERVICE_D}/green?dateFrom=${from}&dateTo=${to}&timeGranularity=60`;

    const response = await api.get(greenURL)
    console.log("Green data response:", response);
    const data: GreenJson[] = response.data;
    return data;
  } catch (error: any) {
    // const errorMessage = error.response?.data?.detail || "Failed to fetch data";
    const errorMessage =  `No green data is available for date range ${from} to ${to}`
    const customError = new Error(errorMessage) as any;
    customError.status = error.response?.status;

    throw customError;
  }
};

export const getDam = async (
  from: string = formatDateYYYYMMDD(new Date()),
  to: string = formatDateYYYYMMDD(new Date()),
): Promise<DamJson[]> => {
  try {
    let damURL = `${API_SERVICE_D}/dam?dateFrom=${from}&dateTo=${to}&timeGranularity=60`;

    const response = await api.get(damURL)

    const data: DamJson[] = response.data;
    return data;
  } catch (error: any) {
    // const errorMessage = error.response?.data?.detail || "Failed to fetch data";
    const errorMessage =  `No dam data is available for date range ${from} to ${to}`
    const customError = new Error(errorMessage) as any;
    customError.status = error.response?.status;

    throw customError;
  }
};