import { API_URL_PROD } from "../utils/Constant";
import api from "./axiosConfig";
import { Energy, FlexibilityHeating } from "./models";

export const getFlexibilityHeating = async (
  building: string,
  apartment: string
): Promise<FlexibilityHeating[]> => {
  try {
    let flexibilityHeatingURL = `${API_URL_PROD}/flexibility_heating/${building}/${apartment}`;
    if (apartment === "summary") {
      flexibilityHeatingURL = `${API_URL_PROD}/flexibility_heating-summary/${building}`;
    } 
    const response = await api.get(flexibilityHeatingURL);

    const data = response.data;

    if (!data) {
      throw new Error(
        `No flexibility heating data is available for apartment ${apartment} in ${building}`
      );
    }

    console.log("Flexibility Heating Data:", data);

    return data;
  } catch (error: any) {
    // const errorMessage = error.response?.data?.detail || "Failed to fetch data";
    const errorMessage = `No flexibility heating data is available for apartment ${apartment} in ${building}`;
    const customError = new Error(errorMessage) as any;
    customError.status = error.response?.status;

    throw customError;
  }
};

export const getTodaysEnergy = async (
  building: string,
  apartment: string
): Promise<Energy> => {
  try {
    let energyURL = `${API_URL_PROD}/energy/${building}/${apartment}`;
    if (apartment === "summary") {
      energyURL = `${API_URL_PROD}/energy-summary/${building}`;
    } 
    const response = await api.get(energyURL);

    const data = response.data;

    if (!data) {
      throw new Error(
        `No energy data is available for apartment ${apartment} in ${building}`
      );
    }
    return data;
  } catch (error: any) {
    // const errorMessage = error.response?.data?.detail || "Failed to fetch data";
    const errorMessage = `No energy data is available for apartment ${apartment} in ${building}`;
    const customError = new Error(errorMessage) as any;
    customError.status = error.response?.status;

    throw customError;
  }
};
