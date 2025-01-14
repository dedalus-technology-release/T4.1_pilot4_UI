import { API_URL } from "../utils/Constant";
import api from "./axiosConfig";
import { TSV, SPMV } from "./models";

export const getTsv =  async (): Promise<TSV[]> =>{
  try {
    const response = await api.get(`${API_URL}/tsv`);
    const data: TSV[] = response.data
    console.log(response)
    return data
 } catch (error: any) {
    console.log("error", error)
    const errorMessage = error.response?.data?.detail || "Failed to fetch data"
    throw new Error(errorMessage)
 }
}

export const getSPMV =  async (): Promise<SPMV[]> =>{
  try {
    const response = await api.get(`${API_URL}/spmv`);
    const data: SPMV[] = response.data
    console.log(response)
    return data
 } catch (error: any) {
    console.log("error", error)
    const errorMessage = error.response?.data?.detail || "Failed to fetch data"
    throw new Error(errorMessage)
 }
}



