// stores/useStockStore.ts
import { create } from "zustand";
import axiosInstance from "../lib/axios"; // for auth APIs (access token)
import axiosTrading from "../lib/axiosTrading"; // for trading APIs (socket token)
import AsyncStorage from "@react-native-async-storage/async-storage";

// ----- Interfaces -----
interface Stock {
  _id: string;
  symbol: string;
  companyName: string;
  iconUrl: string;
  currentPrice: number;
  lastDayTradedPrice: number;
}

interface Holding {
  _id: string;
  stock: Stock;
  quantity: number;
  buyPrice: number;
}

interface Order {
  _id: string;
  stock: Stock;
  quantity: number;
  price: number;
  type: "buy" | "sell";
  remainingBalance: number;
  timestamp: string;
}

interface StockState {
  stocks: Stock[];
  holdings: Holding[];
  orders: Order[];
  loading: boolean;
  error: string | null;

  fetchStocks: () => Promise<void>;
  fetchHoldings: () => Promise<void>;
  fetchOrders: () => Promise<void>;
  getStockBySymbol: (symbol: string) => Promise<Stock | null>;

  buyStock: (stock_id: string, quantity: number) => Promise<void>;
  sellStock: (holdingId: string, quantity: number) => Promise<void>;
}

// ----- Zustand Store -----
export const useStockStore = create<StockState>((set, get) => ({
  stocks: [],
  holdings: [],
  orders: [],
  loading: false,
  error: null,

  // ✅ Fetch all stocks (auth API)
  fetchStocks: async () => {
    try {
      set({ loading: true, error: null });
      const res = await axiosInstance.get("/stocks");
      set({ stocks: res.data.data, loading: false });
    } catch (err: any) {
      set({
        error: err.response?.data?.message || "Failed to fetch stocks",
        loading: false,
      });
    }
  },

  // ✅ Fetch holdings (trading API)
  fetchHoldings: async () => {
    try {
      set({ loading: true, error: null });
      const res = await axiosTrading.get("/stocks/holding");
      set({ holdings: res.data.data, loading: false });
    } catch (err: any) {
      set({
        error: err.response?.data?.message || "Failed to fetch holdings",
        loading: false,
      });
    }
  },

  // ✅ Fetch orders (trading API)
  fetchOrders: async () => {
    try {
      set({ loading: true, error: null });
      const res = await axiosTrading.get("/stocks/order");
      set({ orders: res.data.data, loading: false });
    } catch (err: any) {
      set({
        error: err.response?.data?.message || "Failed to fetch orders",
        loading: false,
      });
    }
  },

  // ✅ Get stock by symbol (trading API)
  getStockBySymbol: async (symbol: string) => {
    try {
      set({ loading: true, error: null });
      const res = await axiosTrading.get(`/stocks/stock?stock=${symbol}`);
      set({ loading: false });
      return res.data.data;
    } catch (err: any) {
      set({ error: err.response?.data?.message || "Stock not found", loading: false });
      return null;
    }
  },

  // ✅ Buy stock (trading API)
  buyStock: async (stock_id, quantity) => {
    try {
      set({ loading: true, error: null });
      await axiosTrading.post("/stocks/buy", { stock_id, quantity });
      await get().fetchHoldings();
      await get().fetchOrders();
      set({ loading: false });
    } catch (err: any) {
      set({ error: err.response?.data?.message || "Failed to buy stock", loading: false });
    }
  },

  // ✅ Sell stock (trading API)
  sellStock: async (holdingId, quantity) => {
    try {
      set({ loading: true, error: null });
      await axiosTrading.post("/stocks/sell", { holdingId, quantity });
      await get().fetchHoldings();
      await get().fetchOrders();
      set({ loading: false });
    } catch (err: any) {
      set({ error: err.response?.data?.message || "Failed to sell stock", loading: false });
    }
  },
}));
