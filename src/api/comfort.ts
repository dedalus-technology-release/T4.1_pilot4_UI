import { API_URL, API_URL_PROD } from "../utils/Constant";
import { normalizeRecommendationData } from "../utils/normalizeRecommendationData";
import api from "./axiosConfig";
import { TSV, SPMV, Recommendation } from "./models";

export const getTsv = async (): Promise<TSV[]> => {
  try {
    const response = await api.get(`${API_URL}/tsv`);
    const data: TSV[] = response.data;
    console.log(response);
    return data;
  } catch (error: any) {
    console.log("error", error);
    const errorMessage = error.response?.data?.detail || "Failed to fetch data";
    throw new Error(errorMessage);
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
    console.log("error", error);
    const errorMessage = error.response?.data?.detail || "Failed to fetch data";
    throw new Error(errorMessage);
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
    const cleanedData =
      data?.map((item: any) => normalizeRecommendationData(item)) ?? [];

    return cleanedData;
  } catch (error: any) {
    console.log("error", error);
    const errorMessage = error.response?.data?.detail || "Failed to fetch data";
    throw new Error(errorMessage);
  }
};
