// stores/useProfileStore.ts
import { create } from "zustand";
import axiosInstance from "../lib/axios";
import Cookies from "js-cookie";

interface Profile {
  userId: string;
  email: string;
  phone_exists: boolean;
  name: string;
  login_pin_exist: boolean;
  balance: string;
}

interface ProfileState {
  profile: Profile | null;
  loading: boolean;
  fetchProfile: () => Promise<void>;
  updateProfile: (data: { name?: string; gender?: string; date_of_birth?: string }) => Promise<void>;
  setLoginPin: (pin: string) => Promise<void>;
  verifyPin: (pin: string) => Promise<void>;
  clearProfile: () => void;
}

export const useProfileStore = create<ProfileState>((set) => ({
  profile: null,
  loading: false,

  // ✅ Get profile
  fetchProfile: async () => {
    try {
      set({ loading: true });
      const token = Cookies.get("access_token");
      const res = await axiosInstance.get("/auth/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });
      set({ profile: res.data, loading: false });
    } catch (err: any) {
      console.error("Fetch profile error:", err.response?.data || err.message);
      set({ loading: false });
      throw new Error("Failed to fetch profile");
    }
  },

  // ✅ Update profile
  updateProfile: async (data) => {
    try {
      set({ loading: true });
      const token = Cookies.get("access_token");
      const res = await axiosInstance.put("/auth/profile", data, {
        headers: { Authorization: `Bearer ${token}` },
      });
      set({ profile: res.data.data, loading: false });
    } catch (err: any) {
      console.error("Update profile error:", err.response?.data || err.message);
      set({ loading: false });
      throw new Error(err.response?.data?.message || "Failed to update profile");
    }
  },

  // ✅ Set login pin first time
  setLoginPin: async (pin) => {
    try {
      const token = Cookies.get("access_token");
      const res = await axiosInstance.post(
        "/auth/set-pin",
        { login_pin: pin },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      // store socket tokens
      Cookies.set("socket_access_token", res.data.socket_tokens.socket_access_token);
      Cookies.set("socket_refresh_token", res.data.socket_tokens.socket_refresh_token);
    } catch (err: any) {
      console.error("Set PIN error:", err.response?.data || err.message);
      throw new Error(err.response?.data?.message || "Failed to set PIN");
    }
  },

  // ✅ Verify pin
  verifyPin: async (pin) => {
    try {
      const token = Cookies.get("access_token");
      const res = await axiosInstance.post(
        "/auth/verify-pin",
        { login_pin: pin },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      // update socket tokens
      Cookies.set("socket_access_token", res.data.socket_tokens.socket_access_token);
      Cookies.set("socket_refresh_token", res.data.socket_tokens.socket_refresh_token);
    } catch (err: any) {
      console.error("Verify PIN error:", err.response?.data || err.message);
      throw new Error(err.response?.data?.message || "Failed to verify PIN");
    }
  },

  // ✅ Clear profile on logout
  clearProfile: () => set({ profile: null }),
}));
