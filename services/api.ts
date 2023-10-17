import axios from "axios";

import Cookies from "js-cookie";

export const publicApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACK_URL
});

export const privateApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACK_URL
});

privateApi.interceptors.request.use((config) => {
  config.headers!.Authorization = `${Cookies.get("token")}`;

  return config;
});
