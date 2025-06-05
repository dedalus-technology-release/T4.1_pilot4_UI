import { API_URL_PROD } from "../utils/Constant";
import api from "./axiosConfig";
import { IFormInput, Token } from "./models";

export const login = async (credentials: IFormInput): Promise<Token> => {
  try {
    const response = await api.post(`${API_URL_PROD}/token`, credentials, {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error: any) {
    const errorMessage = error.response?.data?.detail || "Failed to fetch data";

    throw new Error(errorMessage);
  }
};

export const verifyUser = async () => {
  try {
    const response = await api.get(`${API_URL_PROD}/validate`, {
      withCredentials: true,
    });

    return response.data;
  } catch (error) {}
};

export const logout = async () => {
  try {
    const response = await api.post(`${API_URL_PROD}/logout`, {
      withCredentials: true,
    });

    return response.data;
  } catch (error) {
  }
};
