
import { API_URL } from "../utils/Constant";
import api from "./axiosConfig";
import { Consumption } from "./models";

export const getConsumption =  async (): Promise<Consumption[]> =>{
  try {
    const response = await api.get(`${API_URL}/consumption`);
    const data: Consumption[] = response.data
    console.log(response)
    return data
 } catch (error: any) {
   const errorMessage = error.response?.data?.detail || "Failed to fetch data";
   const customError = new Error(errorMessage) as any;
   customError.status = error.response?.status
   
   throw customError;
 }
}