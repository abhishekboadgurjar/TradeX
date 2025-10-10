import { create } from "zustand";
import { io, Socket } from "socket.io-client";
import * as SecureStore from "expo-secure-store";

// ----- Interfaces -----
interface Stock {
  _id: string;
  symbol: string;
  companyName: string;
  iconUrl: string;
  currentPrice: number;
  lastDayTradedPrice: number;
}

interface StockSocketState {
  socket: Socket | null;
  liveStocks: Record<string, Stock>;
  connected: boolean;

  connectSocket: () => Promise<void>;
  disconnectSocket: () => void;
  subscribeStock: (symbol: string) => void;
  subscribeMultipleStocks: (symbols: string[]) => void;
  unsubscribeStock: (symbol: string) => void;
}

// ----- Zustand Store -----
export const useStockSocketStore = create<StockSocketState>((set, get) => ({
  socket: null,
  liveStocks: {},
  connected: false,

  // ✅ Connect to WebSocket
  connectSocket: async () => {
    if (get().socket) return; // Already connected

    const token = await SecureStore.getItemAsync("socket_access_token");
    if (!token) {
      console.error("No socket access token found.");
      return;
    }

    const SOCKET_URL = process.env.EXPO_PUBLIC_SOCKET_URL || "http://192.168.0.9:4000";

    const socket = io(SOCKET_URL, {
      extraHeaders: {
        access_token: token,
      },
      transports: ["websocket"], // important for React Native
    });

    socket.on("connect", () => {
      console.log("📡 WebSocket connected:", socket.id);
      set({ connected: true });
    });

    socket.on("disconnect", (reason) => {
      console.log("❌ WebSocket disconnected:", reason);
      set({ connected: false });
    });

    set({ socket });
  },

  // ✅ Disconnect socket
  disconnectSocket: () => {
    const socket = get().socket;
    if (socket) {
      socket.disconnect();
      set({ socket: null, connected: false, liveStocks: {} });
      console.log("🧹 Socket disconnected and state cleared");
    }
  },

  // ✅ Subscribe single stock
  subscribeStock: (symbol: string) => {
    const socket = get().socket;
    if (!socket) {
      console.warn("Socket not connected. Cannot subscribe:", symbol);
      return;
    }

    socket.emit("subscribeToStocks", symbol);

    socket.on(symbol, (stockData: Stock) => {
      set((state) => ({
        liveStocks: { ...state.liveStocks, [symbol]: stockData },
      }));
    });
  },

  // ✅ Subscribe multiple stocks
  subscribeMultipleStocks: (symbols: string[]) => {
    const socket = get().socket;
    if (!socket) {
      console.warn("Socket not connected. Cannot subscribe multiple stocks.");
      return;
    }

    socket.emit("subscribeToMultipleStocks", symbols);

    symbols.forEach((symbol) => {
      socket.on(symbol, (stockData: Stock) => {
        set((state) => ({
          liveStocks: { ...state.liveStocks, [symbol]: stockData },
        }));
      });
    });
  },

  // ✅ Unsubscribe stock
  unsubscribeStock: (symbol: string) => {
    const socket = get().socket;
    if (!socket) return;

    socket.off(symbol);
    set((state) => {
      const newStocks = { ...state.liveStocks };
      delete newStocks[symbol];
      return { liveStocks: newStocks };
    });
  },
}));
