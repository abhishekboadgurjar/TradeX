// // lib/axios.ts
// import axios from "axios";
// import AsyncStorage from "@react-native-async-storage/async-storage";

// const axiosInstance = axios.create({
//   baseURL: process.env.EXPO_PUBLIC_API_URL || "http://106.51.47.186:3000",
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// // ✅ Automatically attach access token before each request
// axiosInstance.interceptors.request.use(
//   async (config) => {
//     try {
//       const token = await AsyncStorage.getItem("access_token");
//       if (token) {
//         config.headers = {
//           ...config.headers,
//           Authorization: `Bearer ${token}`,
//         };
//       }
//     } catch (err) {
//       console.warn("⚠️ Failed to read access token from storage:", err);
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// export default axiosInstance;


import axios from "axios";
import * as SecureStore from "expo-secure-store";

const API_URL = process.env.EXPO_PUBLIC_API_URL || "http://192.168.0.9:3000";

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach access token from SecureStore to every request
axiosInstance.interceptors.request.use(
  async (config) => {
    const token = await SecureStore.getItemAsync("access_token");
    if (token) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`,
      };
    }
    return config;
  },
  (error) => Promise.reject(error)
);


export default axiosInstance;
