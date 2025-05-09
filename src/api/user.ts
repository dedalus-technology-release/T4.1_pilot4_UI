import { API_URL_PROD } from "../utils/Constant";
import api from "./axiosConfig";
import { IFormInput, SPMV, Token } from "./models";

export const login = async (credentials: IFormInput): Promise<Token> => {
  try {
    const response = await api.post(`${API_URL_PROD}/token`, credentials, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    const data: Token = response.data;
    const token = data.access_token;

    localStorage.setItem("accessToken", token);
    localStorage.setItem("isAuthenticated", "true");
    return data;
  } catch (error: any) {
    const errorMessage = error.response?.data?.detail || "Failed to fetch data";
    
    throw new Error(errorMessage);
  }
};
