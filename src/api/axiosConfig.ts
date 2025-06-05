import axios from "axios";
import camelcaseKeys from "camelcase-keys";

const api = axios.create({
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.response.use((response) => {
  if (response.data && typeof response.data == "object") {
    response.data = camelcaseKeys(response.data, { deep: true });
  }
  return response;
});

export default api;
