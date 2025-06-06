import { API_URL_PROD } from "../utils/Constant";
import { normalizeRecommendationData } from "../utils/normalizeRecommendationData";
import api from "./axiosConfig";
import { SPMV, Recommendation } from "./models";

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
    // const errorMessage = error.response?.data?.detail || "Failed to fetch data";
    const errorMessage =  `No sPMV data is available for apartment ${apartment} in ${building}`
    const customError = new Error(errorMessage) as any;
    customError.status = error.response?.status;

    throw customError;
  }
};

export const getRecommendation = async (
  building: string,
  apartment: string
): Promise<Recommendation> => {
  try {
    const response = await api.get(
      `${API_URL_PROD}/optimization/${building}/${apartment}`
    );

    const data = response.data;

    if (!data) {
      throw new Error(
        `No recommendation is available for apartment ${apartment} in ${building}`
      );
    }
    //change model format
    const cleanedData =
      data?.map((item: any) => normalizeRecommendationData(item)) ?? [];
    return cleanedData;
  } catch (error: any) {
    const errorMessage =
      // error.response?.data?.detail ||
      `No recommendation is available for apartment ${apartment} in ${building}`;
    const customError = new Error(errorMessage) as any;
    customError.status = error.response?.status;

    throw customError;
  }
};

// export const getTsv = async (): Promise<TSV[]> => {
//   try {
//     const response = await api.get(`${API_URL_PROD}/tsv`);
//     const data: TSV[] = response.data;
//     return data;
//   } catch (error: any) {
//     const errorMessage = error.response?.data?.detail || "Failed to fetch data";
//     const customError = new Error(errorMessage) as any;
//     customError.status = error.response?.status;

//     throw customError;
//   }
// };