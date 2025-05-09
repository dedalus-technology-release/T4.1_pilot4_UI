import { API_URL, API_URL_PROD } from "../utils/Constant";
import { normalizeRecommendationData } from "../utils/normalizeRecommendationData";
import api from "./axiosConfig";
import { TSV, SPMV, Recommendation } from "./models";

export const getTsv = async (): Promise<TSV[]> => {
  try {
    const response = await api.get(`${API_URL}/tsv`);
    const data: TSV[] = response.data;
    return data;
  } catch (error: any) {
    const errorMessage = error.response?.data?.detail || "Failed to fetch data";
    const customError = new Error(errorMessage) as any;
    customError.status = error.response?.status
    
    throw customError;
  }
};

export const getSPMV = async (
  building: string,
  apartment: string
): Promise<SPMV[]> => {
  try {
    const response = await api.get(
      `${API_URL_PROD}/sPMV/${building}/${apartment}`
    );

    const data: SPMV[] = response.data;
    return data;
  } catch (error: any) {
   
    const errorMessage = error.response?.data?.detail || "Failed to fetch data";
    const customError = new Error(errorMessage) as any;
    customError.status = error.response?.status
    
    throw customError;
  }
};

export const getRecommendation = async (
  building: string,
  apartment: string
): Promise<any> => {
  try {
    const buildingStr: string = building.split(" ").join("_");
    const response = await api.get(`${API_URL}/recommendation_${buildingStr}`);

    const data = response.data[apartment];
    if (!data) {
      throw new Error(`Could not fetch recommendation for ${building} - ${apartment}`);
    }
    //change model format
    const cleanedData =
      data?.map((item: any) => normalizeRecommendationData(item)) ?? [];

    return cleanedData;
  } catch (error: any) {
    const errorMessage = error.response?.data?.detail || "Failed to fetch data";
    const customError = new Error(errorMessage) as any;
    customError.status = error.response?.status
    
    throw customError;
  }
};
