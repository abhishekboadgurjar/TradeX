import { create } from "zustand";
import axiosInstance from "../lib/axios";
import Cookies from "js-cookie";

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
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: false,
  registerToken: null,

  setRegisterToken: (token) => set({ registerToken: token }),

  // Check if email exists
  checkEmail: async (email) => {
    try {
      const res = await axiosInstance.post("/auth/check-email", { email });
      return res.data.isExist; // ✅ fixed
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

  // Register with register_token
  register: async (email, password) => {
    try {
      const { registerToken } = useAuthStore.getState();
      if (!registerToken) throw new Error("Register token missing! Verify OTP first");

      const res = await axiosInstance.post("/auth/register", {
        email,
        password,
        register_token: registerToken,
      });

      const { user, tokens } = res.data;

      // ✅ save tokens properly
      Cookies.set("access_token", tokens.access_token);
      Cookies.set("refresh_token", tokens.refresh_token);

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
      const { user, tokens } = res.data;

      // ✅ save tokens properly
      Cookies.set("access_token", tokens.access_token);
      Cookies.set("refresh_token", tokens.refresh_token);

      set({ user });
    } catch (err: any) {
      console.error("Login error:", err.response?.data || err.message);
      throw new Error(err.response?.data?.message || "Login failed");
    }
  },

logout: () => {
  // Remove all relevant cookies
  Cookies.remove("access_token");
  Cookies.remove("refresh_token");
  Cookies.remove("socket_access_token");
  Cookies.remove("socket_refresh_token");
  Cookies.remove("is_pin_set"); // if used

  // Clear local/session storage
  localStorage.clear();
  sessionStorage.clear();

  // Reset store state
  set({ user: null, registerToken: null, socketToken: null });

  // Disconnect socket if connected
  if (window.socket) {
    window.socket.disconnect();
  }
},


}));
