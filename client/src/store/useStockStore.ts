// // store/useStockStore.ts
// import { create } from "zustand";
// import axiosInstance from "../lib/axios";
// import axiosTrading from "../lib/axiosTrading";
// import Cookies from "js-cookie";

// interface Stock {
//   _id: string;
//   symbol: string;
//   companyName: string;
//   iconUrl: string;
//   currentPrice: number;
//   lastDayTradedPrice: number;
// }

// interface Holding {
//   _id: string;
//   stock: Stock;
//   quantity: number;
//   buyPrice: number;
// }

// interface Order {
//   _id: string;
//   stock: Stock;
//   quantity: number;
//   price: number;
//   type: "buy" | "sell";
//   remainingBalance: number;
//   timestamp: string;
// }

// interface StockState {
//   stocks: Stock[];
//   holdings: Holding[];
//   orders: Order[];
//   loading: boolean;
//   error: string | null;

//   fetchStocks: () => Promise<void>;
//   fetchHoldings: () => Promise<void>;
//   fetchOrders: () => Promise<void>;
//   getStockBySymbol: (symbol: string) => Promise<Stock | null>;

//   buyStock: (stock_id: string, quantity: number) => Promise<void>;
//   sellStock: (holdingId: string, quantity: number) => Promise<void>;
// }

// export const useStockStore = create<StockState>((set, get) => ({
//   stocks: [],
//   holdings: [],
//   orders: [],
//   loading: false,
//   error: null,

//   // helper to get socket token
//   getSocketToken: () => {
//     const socketToken = Cookies.get("socket_access_token");
//     if (!socketToken) {
//         console.log("socket_access_token")
//       throw new Error("No socket access token found. Please set/verify PIN first.");
//     }
//     return socketToken;
//   },

//   // ✅ Get all stocks
//   fetchStocks: async () => {
//     try {
//       set({ loading: true, error: null });
//       const token = get().getSocketToken();
//       const res = await axiosInstance.get("/stocks", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       set({ stocks: res.data.data, loading: false });
//     } catch (err: any) {
//       set({ error: err.response?.data?.message || "Failed to fetch stocks", loading: false });
//     }
//   },

//   // ✅ Get holdings
//   fetchHoldings: async () => {
//     try {
//       set({ loading: true, error: null });
//       const token = get().getSocketToken();
//       const res = await axiosInstance.get("/stocks/holding", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       set({ holdings: res.data.data, loading: false });
//     } catch (err: any) {
//       set({ error: err.response?.data?.message || "Failed to fetch holdings", loading: false });
//     }
//   },

//   // ✅ Get orders
//   fetchOrders: async () => {
//     try {
//       set({ loading: true, error: null });
//       const token = get().getSocketToken();
//       const res = await axiosInstance.get("/stocks/order", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       set({ orders: res.data.data, loading: false });
//     } catch (err: any) {
//       set({ error: err.response?.data?.message || "Failed to fetch orders", loading: false });
//     }
//   },

//   // ✅ Get stock by symbol
//   getStockBySymbol: async (symbol: string) => {
//     try {
//       set({ loading: true, error: null });
//       const token = get().getSocketToken();
//       const res = await axiosInstance.get(`/stocks/stock?stock=${symbol}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       set({ loading: false });
//       return res.data.data;
//     } catch (err: any) {
//       set({ error: err.response?.data?.message || "Stock not found", loading: false });
//       return null;
//     }
//   },

//   // ✅ Buy stock
//   buyStock: async (stock_id, quantity) => {
//     try {
//       set({ loading: true, error: null });
//       const token = get().getSocketToken();
//       await axiosInstance.post(
//         "/stocks/buy",
//         { stock_id, quantity },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       await get().fetchHoldings();
//       await get().fetchOrders();
//       set({ loading: false });
//     } catch (err: any) {
//       set({ error: err.response?.data?.message || "Failed to buy stock", loading: false });
//     }
//   },

//   // ✅ Sell stock
//   sellStock: async (holdingId, quantity) => {
//     try {
//       set({ loading: true, error: null });
//       const token = get().getSocketToken();
//       await axiosInstance.post(
//         "/stocks/sell",
//         { holdingId, quantity },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       await get().fetchHoldings();
//       await get().fetchOrders();
//       set({ loading: false });
//     } catch (err: any) {
//       set({ error: err.response?.data?.message || "Failed to sell stock", loading: false });
//     }
//   },
// }));


// store/useStockStore.ts
import { create } from "zustand";
import axiosInstance from "../lib/axios"; // for auth APIs (access token)
import axiosTrading from "../lib/axiosTrading"; // for trading APIs (socket token)
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
      const res = await axiosInstance.get("/stocks"); // uses access token
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
      const res = await axiosTrading.get("/stocks/holding"); // uses socket token
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
      const res = await axiosTrading.get("/stocks/order"); // uses socket token
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
      const res = await axiosTrading.get(`/stocks/stock?stock=${symbol}`); // socket token
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
      await axiosTrading.post("/stocks/buy", { stock_id, quantity }); // socket token
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
      await axiosTrading.post("/stocks/sell", { holdingId, quantity }); // socket token
      await get().fetchHoldings();
      await get().fetchOrders();
      set({ loading: false });
    } catch (err: any) {
      set({ error: err.response?.data?.message || "Failed to sell stock", loading: false });
    }
  },
}));
