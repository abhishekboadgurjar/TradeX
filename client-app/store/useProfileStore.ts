// stores/useProfileStore.ts
import { create } from "zustand";
import axiosInstance from "../lib/axios";
import * as SecureStore from "expo-secure-store";
import AsyncStorage from "@react-native-async-storage/async-storage";



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

  // ✅ Fetch Profile
  fetchProfile: async () => {
    try {
      set({ loading: true });
      const token = await SecureStore.getItemAsync("access_token");
      if (!token) throw new Error("Access token not found");

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

  // ✅ Update Profile
  updateProfile: async (data) => {
    try {
      set({ loading: true });
      const token = await SecureStore.getItemAsync("access_token");
      if (!token) throw new Error("Access token not found");

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

  // ✅ Set Login PIN (First Time)
//   setLoginPin: async (pin) => {
//     try {
//       const token = await SecureStore.getItemAsync("access_token");
//       if (!token) throw new Error("Access token not found");

//       const res = await axiosInstance.post(
//         "/auth/set-pin",
//         { login_pin: pin },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       // Store socket tokens securely
//       const { socket_tokens } = res.data;
//       await SecureStore.setItemAsync("socket_access_token", socket_tokens.socket_access_token);
//       await SecureStore.setItemAsync("socket_refresh_token", socket_tokens.socket_refresh_token);
//       await AsyncStorage.setItem("is_pin_set", "true");
//     } catch (err: any) {
//       console.error("Set PIN error:", err.response?.data || err.message);
//       throw new Error(err.response?.data?.message || "Failed to set PIN");
//     }
//   },
setLoginPin: async (pin) => {
 try {
    // Get access token from SecureStore
    const token = await SecureStore.getItemAsync("access_token");
    if (!token) throw new Error("Access token not found");

    // Make request
    const res = await axiosInstance.post(
      "/auth/set-pin",
      { login_pin: pin },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    // Validate response
    if (!res.data?.socket_tokens) {
      throw new Error("Socket tokens not returned by server");
    }

    // Save socket tokens
    const { socket_access_token, socket_refresh_token } = res.data.socket_tokens;
    await SecureStore.setItemAsync("socket_access_token", socket_access_token);
    await SecureStore.setItemAsync("socket_refresh_token", socket_refresh_token);

    // Mark PIN as set
    await AsyncStorage.setItem("is_pin_set", "true");
  } catch (err: any) {
    console.error("Set PIN error:", err.response?.data || err.message);
    throw new Error(err.response?.data?.message || err.message || "Failed to set PIN");
  }
}
,

  // ✅ Verify PIN (Login Flow)
  verifyPin: async (pin) => {
    try {
      const token = await SecureStore.getItemAsync("access_token");
      if (!token) throw new Error("Access token not found");

      const res = await axiosInstance.post(
        "/auth/verify-pin",
        { login_pin: pin },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Update socket tokens
      const { socket_tokens } = res.data;
      await SecureStore.setItemAsync("socket_access_token", socket_tokens.socket_access_token);
      await SecureStore.setItemAsync("socket_refresh_token", socket_tokens.socket_refresh_token);
    } catch (err: any) {
      console.error("Verify PIN error:", err.response?.data || err.message);
      throw new Error(err.response?.data?.message || "Failed to verify PIN");
    }
  },

  // ✅ Clear profile on logout
  clearProfile: () => set({ profile: null }),
}));
