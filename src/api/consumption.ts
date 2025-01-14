
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
    console.log("error", error)
    const errorMessage = error.response?.data?.detail || "Failed to fetch data"
    throw new Error(errorMessage)
 }
}