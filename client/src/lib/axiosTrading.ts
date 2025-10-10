// lib/axiosTrading.ts
import axios from "axios";
import Cookies from "js-cookie";

const axiosTrading = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://192.168.0.9:3000",
  headers: {
    "Content-Type": "application/json",
  },
});

axiosTrading.interceptors.request.use((config) => {
  const token = Cookies.get("socket_access_token"); // Trading API token
  if (token) {
    config.headers!["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

export default axiosTrading;
