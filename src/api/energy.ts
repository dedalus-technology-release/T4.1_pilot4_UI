import { API_URL_PROD } from "../utils/Constant";
import api from "./axiosConfig";
import { Energy, FlexibilityHeating } from "./models";

export const getFlexibilityHeating = async (
  building: string,
  apartment: string
): Promise<FlexibilityHeating[]> => {
  try {
    const response = await api.get(
      `${API_URL_PROD}/flexibility_heating/${building}/${apartment}`
    );

    const data = response.data;

    if (!data) {
      throw new Error(
        `Could not fetch flexility for ${building} - ${apartment}`
      );
    }
    return data;
  } catch (error: any) {
    const errorMessage = error.response?.data?.detail || "Failed to fetch data";
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
    const response = await api.get(
      `${API_URL_PROD}/energy/${building}/${apartment}`
    );

    const data = response.data;

    if (!data) {
      throw new Error(
        `Could not fetch energy for ${building} - ${apartment}`
      );
    }
    return data;
  } catch (error: any) {
    const errorMessage = error.response?.data?.detail || "Failed to fetch data";
    const customError = new Error(errorMessage) as any;
    customError.status = error.response?.status;

    throw customError;
  }
};
