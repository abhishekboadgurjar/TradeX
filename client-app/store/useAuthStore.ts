// import { create } from "zustand";
// import axios from "axios";
// import * as SecureStore from "expo-secure-store";
// import AsyncStorage from "@react-native-async-storage/async-storage";

// interface Tokens {
//   access_token: string;
//   refresh_token: string;
// }

// interface AuthState {
//   user: any | null;
//   loading: boolean;
//   registerToken: string | null;
//   setRegisterToken: (token: string) => void;

//   checkEmail: (email: string) => Promise<boolean>;
//   sendOtp: (email: string, otpType: "email" | "phone") => Promise<void>;
//   verifyOtp: (
//     email: string,
//     otp: string,
//     otpType: "email" | "phone",
//     data?: string
//   ) => Promise<void>;
//   register: (email: string, password: string) => Promise<void>;
//   login: (email: string, password: string) => Promise<void>;
//   logout: () => Promise<void>;
// }

// const API_URL = process.env.EXPO_PUBLIC_API_URL || "http://localhost:3000";

// const axiosInstance = axios.create({
//   baseURL: API_URL,
//   headers: { "Content-Type": "application/json" },
// });

// export const useAuthStore = create<AuthState>((set, get) => ({
//   user: null,
//   loading: false,
//   registerToken: null,

//   setRegisterToken: (token) => set({ registerToken: token }),

//   // ✅ Check Email
//   checkEmail: async (email) => {
//     try {
//       const res = await axiosInstance.post("/auth/check-email", { email });
//       return res.data.isExist;
//     } catch (err) {
//       console.error("Check email error:", err);
//       throw new Error("Failed to check email");
//     }
//   },

//   // ✅ Send OTP
//   sendOtp: async (email, otpType) => {
//     try {
//       await axiosInstance.post("/auth/send-otp", { email, otp_type: otpType });
//     } catch (err) {
//       console.error("Send OTP error:", err);
//       throw new Error("Failed to send OTP");
//     }
//   },

//   // ✅ Verify OTP
//   verifyOtp: async (email, otp, otpType, data) => {
//     try {
//       const res = await axiosInstance.post("/auth/verify-otp", {
//         email,
//         otp,
//         otp_type: otpType,
//         data,
//       });

//       if (res.data.register_token) {
//         set({ registerToken: res.data.register_token });
//       }
//     } catch (err: any) {
//       console.error("OTP verification error:", err.response?.data || err.message);
//       throw new Error(err.response?.data?.message || "Invalid OTP");
//     }
//   },

//   // ✅ Register
//   register: async (email, password) => {
//     try {
//       const { registerToken } = get();
//       if (!registerToken) throw new Error("Register token missing! Verify OTP first.");

//       const res = await axiosInstance.post("/auth/register", {
//         email,
//         password,
//         register_token: registerToken,
//       });

//       const { user, tokens } = res.data as { user: any; tokens: Tokens };

//       // Securely save tokens
//       await SecureStore.setItemAsync("access_token", tokens.access_token);
//       await SecureStore.setItemAsync("refresh_token", tokens.refresh_token);

//       set({ user, registerToken: null });
//     } catch (err: any) {
//       console.error("Registration error:", err.response?.data || err.message);
//       throw new Error(err.response?.data?.message || "Registration failed");
//     }
//   },

//   // ✅ Login
//   login: async (email, password) => {
//     try {
//       const res = await axiosInstance.post("/auth/login", { email, password });
//       const { user, tokens } = res.data as { user: any; tokens: Tokens };

//       await SecureStore.setItemAsync("access_token", tokens.access_token);
//       await SecureStore.setItemAsync("refresh_token", tokens.refresh_token);

//       set({ user });
//     } catch (err: any) {
//       console.error("Login error:", err.response?.data || err.message);
//       throw new Error(err.response?.data?.message || "Login failed");
//     }
//   },

//   // ✅ Logout
//   logout: async () => {
//     try {
//       await SecureStore.deleteItemAsync("access_token");
//       await SecureStore.deleteItemAsync("refresh_token");
//       await AsyncStorage.clear();

//       // Reset store
//       set({ user: null, registerToken: null });
//     } catch (err) {
//       console.error("Logout error:", err);
//     }
//   },
// }));


import { create } from "zustand";
import axiosInstance from "../lib/axios";
import * as SecureStore from "expo-secure-store";

interface Tokens {
  access_token: string;
  refresh_token: string;
}

interface AuthState {
  user: any | null;
  loading: boolean;
  registerToken: string | null;
  setRegisterToken: (token: string) => void;

  checkEmail: (email: string) => Promise<boolean>;
  sendOtp: (email: string, otpType: "email" | "phone") => Promise<void>;
  verifyOtp: (
    email: string,
    otp: string,
    otpType: "email" | "phone",
    data?: string
  ) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  loadUserFromStorage: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  loading: false,
  registerToken: null,

  setRegisterToken: (token) => set({ registerToken: token }),

  // Check if email exists
  checkEmail: async (email) => {
    try {
      const res = await axiosInstance.post("/auth/check-email", { email });
      return res.data.isExist;
    } catch (err) {
      console.error("Check email error:", err);
      throw new Error("Failed to check email");
    }
  },

  // Send OTP
  sendOtp: async (email, otpType) => {
    try {
      await axiosInstance.post("/auth/send-otp", { email, otp_type: otpType });
    } catch (err) {
      console.error("Send OTP error:", err);
      throw new Error("Failed to send OTP");
    }
  },

  // Verify OTP
  verifyOtp: async (email, otp, otpType, data) => {
    try {
      const res = await axiosInstance.post("/auth/verify-otp", {
        email,
        otp,
        otp_type: otpType,
        data,
      });

      if (res.data.register_token) {
        set({ registerToken: res.data.register_token });
      }
    } catch (err: any) {
      console.error("OTP verification error:", err.response?.data || err.message);
      throw new Error(err.response?.data?.message || "Invalid OTP");
    }
  },

  // Register
  register: async (email, password) => {
    try {
      const { registerToken } = get();
      if (!registerToken) throw new Error("Register token missing! Verify OTP first.");

      const res = await axiosInstance.post("/auth/register", {
        email,
        password,
        register_token: registerToken,
      });

      const { user, tokens } = res.data as { user: any; tokens: Tokens };

      await SecureStore.setItemAsync("access_token", tokens.access_token);
      await SecureStore.setItemAsync("refresh_token", tokens.refresh_token);

      set({ user, registerToken: null });
    } catch (err: any) {
      console.error("Registration error:", err.response?.data || err.message);
      throw new Error(err.response?.data?.message || "Registration failed");
    }
  },

  // Login
  login: async (email, password) => {
    try {
      const res = await axiosInstance.post("/auth/login", { email, password });
      const { user, tokens } = res.data as { user: any; tokens: Tokens };

      await SecureStore.setItemAsync("access_token", tokens.access_token);
      await SecureStore.setItemAsync("refresh_token", tokens.refresh_token);

      set({ user });
    } catch (err: any) {
      console.error("Login error:", err.response?.data || err.message);
      throw new Error(err.response?.data?.message || "Login failed");
    }
  },

  // Logout
  logout: async () => {
    try {
      await SecureStore.deleteItemAsync("access_token");
      await SecureStore.deleteItemAsync("refresh_token");
      set({ user: null, registerToken: null });
    } catch (err) {
      console.error("Logout error:", err);
    }
  },
loadUserFromStorage: async () => {
  try {
    const access = await SecureStore.getItemAsync("access_token");
    const refresh = await SecureStore.getItemAsync("refresh_token");
    const socket = await SecureStore.getItemAsync("socket_access_token");

    // If all required tokens exist, consider user "logged in"
    if (access && refresh && socket) {
      set({ user: { tokenExists: true } }); // you can add minimal user info if needed
    } else {
      set({ user: null });
    }
  } catch (err) {
    console.warn("Load tokens error:", err);
    set({ user: null });
  }
},


}));
