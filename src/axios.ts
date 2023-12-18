import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import Cookies from "js-cookie";

const API_BASE_URL = `${process.env.REACT_APP_SERVER_URL}`;

axios.interceptors.request.use(
  (config) => {
    const token = Cookies.get("accessToken");
    if (token) {
      config.headers["authorization"] = `Bearer ${token}`;
    }
    config.withCredentials = true;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  async (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = Cookies.get("refreshToken");
      if (refreshToken) {
        try {
          const axiosInstance = axios.create();
          const tokenResponse = await axiosInstance.post(
            API_BASE_URL + "/auth/token",
            {},
            {
              headers: {
                Authorization: `Bearer ${refreshToken}`,
              },
            }
          );
          console.log("tokenResponse", tokenResponse);
          const newAccessToken = tokenResponse.data.accessToken;
          Cookies.set("accessToken", newAccessToken);
          originalRequest.headers["authorization"] = `Bearer ${newAccessToken}`;

          return axios(originalRequest);
        } catch (tokenError) {
          console.log("tokenError", tokenError);
          return Promise.reject(tokenError);
        }
      }
    }
    return Promise.reject(error);
  }
);

export const postAPI = <T = any, R = any>(
  url: string,
  data: T
): Promise<AxiosResponse<R>> => {
  return axios.post<R>(API_BASE_URL + url, data);
};

export const putAPI = <T = any, R = any>(
  url: string,
  data: T
): Promise<AxiosResponse<R>> => {
  return axios.put<R>(API_BASE_URL + url, data);
};

export const getAPI = <R = any>(
  url: string,
  config?: AxiosRequestConfig
): Promise<AxiosResponse<R>> => {
  return axios.get<R>(API_BASE_URL + url, config);
};

export const deleteAPI = <R = any>(url: string): Promise<AxiosResponse<R>> => {
  return axios.delete<R>(API_BASE_URL + url);
};

export const patchAPI = <T = any, R = any>(
  url: string,
  data: T
): Promise<AxiosResponse<R>> => {
  return axios.patch<R>(API_BASE_URL + url, data);
};
