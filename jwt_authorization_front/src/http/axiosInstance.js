import axios from "axios";
import writeDownTokens from "../storageActions/writeDownTokens";

const api = axios.create({
  baseURL: "http://142.93.134.108:1111",
});

api.interceptors.request.use((config) => {
  if (config.url.includes("me")) {
    const accessToken = localStorage.getItem("accessToken");
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  if (config.url.includes("refresh")) {
    const refreshToken = localStorage.getItem("refreshToken");
    config.headers.Authorization = `Bearer ${refreshToken}`;
  }
  return config;
});

api.interceptors.response.use(async (response) => {
  const access_token = response.data?.body?.access_token;
  const refresh_token = response.data?.body?.refresh_token;
  if (access_token && refresh_token) {
    writeDownTokens(access_token, refresh_token);
  }
  if (response.data?.statusCode === 401) {
    const refreshResp = await api.post("/refresh");
    const access_token = refreshResp.data?.body?.access_token;
    const refresh_token = refreshResp.data?.body?.refresh_token;
    writeDownTokens(access_token, refresh_token);
    return api.request("/me");
  }
  return response;
});

export default api;
