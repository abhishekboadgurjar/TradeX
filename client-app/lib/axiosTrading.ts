// lib/axiosTrading.ts
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const axiosTrading = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL || "http://192.168.0.9:3000",
  headers: {
    "Content-Type": "application/json",
  },
});

// ✅ Automatically attach socket token before each request
axiosTrading.interceptors.request.use(
  async (config) => {
    try {
      const token = await AsyncStorage.getItem("socket_access_token");
      if (token) {
        config.headers = {
          ...config.headers,
          Authorization: `Bearer ${token}`,
        };
      }
    } catch (err) {
      console.warn("⚠️ Failed to read socket token from storage:", err);
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosTrading;
