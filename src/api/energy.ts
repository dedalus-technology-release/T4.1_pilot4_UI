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
        `No flexibility heating data is available for apartment ${apartment} in ${building}`
      );
    }
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
    const response = await api.get(
      `${API_URL_PROD}/energy/${building}/${apartment}`
    );

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
