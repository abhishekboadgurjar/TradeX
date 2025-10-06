import { create } from "zustand";
import { io, Socket } from "socket.io-client";
import Cookies from "js-cookie";

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
  liveStocks: Record<string, Stock>; // { symbol: Stock }
  connected: boolean;

  connectSocket: () => void;
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

  connectSocket: () => {
    if (get().socket) return; // already connected

    const token = Cookies.get("socket_access_token");
    if (!token) {
      console.error("No socket access token found.");
      return;
    }

    const socket = io("http://localhost:4000", {
      extraHeaders: {
        access_token: token,
      },
    });

    socket.on("connect", () => {
      console.log("WebSocket connected", socket.id);
      set({ connected: true });
    });

    socket.on("disconnect", () => {
      console.log("WebSocket disconnected");
      set({ connected: false });
    });

    set({ socket });
  },

  disconnectSocket: () => {
    const socket = get().socket;
    if (socket) {
      socket.disconnect();
      set({ socket: null, connected: false, liveStocks: {} });
    }
  },

  subscribeStock: (symbol: string) => {
    const socket = get().socket;
    if (!socket) return;

    socket.emit("SubscibeToStocks", symbol);

    socket.on(symbol, (stockData: Stock) => {
      set((state) => ({
        liveStocks: { ...state.liveStocks, [symbol]: stockData },
      }));
    });
  },

  subscribeMultipleStocks: (symbols: string[]) => {
    const socket = get().socket;
    if (!socket) return;

    socket.emit("subscribeToMultipleStocks", symbols);

    symbols.forEach((symbol) => {
      socket.on(symbol, (stockData: Stock) => {
        set((state) => ({
          liveStocks: { ...state.liveStocks, [symbol]: stockData },
        }));
      });
    });
  },

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
