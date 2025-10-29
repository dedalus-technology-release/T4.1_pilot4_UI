import { API_URL_PROD } from "../utils/Constant";
import api from "./axiosConfig";
import { Co2 } from "./models";

export const getCo2 = async (
  building: string,
  apartment: string
): Promise<Co2[]> => {
  try {
    let co2URL = `${API_URL_PROD}/co2/${building}/${apartment}`;
    if (apartment === "summary") {
      co2URL = `${API_URL_PROD}/co2-summary/${building}`;
    } 

    const response = await api.get(co2URL)

    const data: Co2[] = response.data;
    return data;
  } catch (error: any) {
    // const errorMessage = error.response?.data?.detail || "Failed to fetch data";
    const errorMessage =  `No co2 data is available for apartment ${apartment} in ${building}`
    const customError = new Error(errorMessage) as any;
    customError.status = error.response?.status;

    throw customError;
  }
};