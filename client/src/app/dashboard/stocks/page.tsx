// "use client";

// import { useEffect } from "react";
// import { useStockStore } from "../../../store/useStockStore";

// export default function StocksPage() {
//   const { stocks, fetchStocks, buyStock, loading, error } = useStockStore();

//   useEffect(() => {
//     fetchStocks();
//   }, [fetchStocks]);

//   const handleBuy = async (stockId: string) => {

//     await buyStock(stockId, 1);
//   };

//   if (loading) return <p className="text-center p-6">Loading stocks...</p>;
//   if (error) return <p className="text-center text-red-500 p-6">{error}</p>;

//   return (
//     <div className="max-w-4xl mx-auto mt-10 space-y-4">
//       <h1 className="text-2xl font-semibold mb-4">All Stocks</h1>
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         {stocks.map((stock) => (
//           <div
//             key={stock._id}
//             className="flex justify-between items-center border p-4 rounded-lg"
//           >
//             <div>
//               <p className="font-medium">
//                 {stock.companyName} ({stock.symbol})
//               </p>
//               <p>Current Price: ₹{stock.currentPrice.toFixed(2)}</p>
//               <p>Last Day Price: ₹{stock.lastDayTradedPrice.toFixed(2)}</p>
//             </div>

//             <button
//               onClick={() => handleBuy(stock._id)}
//               className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
//             >
//               Buy 1
//             </button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import { useStockStore } from "../../../store/useStockStore";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  TrendingUp,
  TrendingDown,
  LineChart,
  ShoppingCart,
  ArrowUpRight,
  ArrowDownRight,
  AlertCircle,
  Zap,
  Star,
  Grid3x3,
  List,
  Activity,
  DollarSign,
  Calendar,
  BarChart3,
} from "lucide-react";

export default function StocksPage() {
  const { stocks, fetchStocks, buyStock, loading, error } = useStockStore();
  const [buyQuantity, setBuyQuantity] = useState<{ [key: string]: number }>({});
  const [view, setView] = useState<"detailed" | "grid">("detailed");
  const [selectedStockIndex, setSelectedStockIndex] = useState(0);

  useEffect(() => {
    fetchStocks();
  }, [fetchStocks]);

  const handleBuy = async (stockId: string, quantity: number) => {
    if (quantity <= 0) return;
    await buyStock(stockId, quantity);
    setBuyQuantity({ ...buyQuantity, [stockId]: 0 });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-emerald-500/30 border-t-emerald-500 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-400">Loading market data...</p>
        </div>
      </div>
    );
  }

  const displayedStocks = view === "detailed" ? stocks.slice(0, 2) : stocks;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-1/3 left-1/3 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1.5s" }}
        ></div>
      </div>

      {/* Stock ticker */}
      <div className="sticky top-0 left-0 right-0 bg-slate-950/80 backdrop-blur-sm border-b border-slate-800 py-2 overflow-hidden z-50">
        <div className="flex gap-8 animate-marquee whitespace-nowrap text-xs text-slate-400">
          <span className="text-emerald-400">AAPL +2.45%</span>
          <span className="text-emerald-400">MSFT +1.82%</span>
          <span className="text-red-400">GOOGL -0.67%</span>
          <span className="text-emerald-400">TSLA +3.21%</span>
          <span className="text-emerald-400">AMZN +1.56%</span>
          <span className="text-red-400">META -0.34%</span>
          <span className="text-emerald-400">NVDA +4.12%</span>
          <span className="text-emerald-400">AAPL +2.45%</span>
          <span className="text-emerald-400">MSFT +1.82%</span>
          <span className="text-red-400">GOOGL -0.67%</span>
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto p-4 md:p-8 py-8">
        {/* Header */}
        <div className="mb-8 animate-in fade-in slide-in-from-top duration-700">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2 flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-blue-600 rounded-xl flex items-center justify-center">
                  <LineChart className="w-6 h-6 text-white" />
                </div>
                Market Stocks
              </h1>
              <p className="text-slate-400">
                Discover and invest in top-performing stocks
              </p>
            </div>

            {/* View Toggle */}
            <div className="flex gap-2 bg-slate-900/50 p-1 rounded-lg border border-slate-800">
              <Button
                onClick={() => setView("detailed")}
                className={`${
                  view === "detailed"
                    ? "bg-emerald-500 text-white"
                    : "bg-transparent text-slate-400 hover:text-white"
                } transition-all`}
                size="sm"
              >
                <List className="w-4 h-4 mr-2" />
                Detailed
              </Button>
              <Button
                onClick={() => setView("grid")}
                className={`${
                  view === "grid"
                    ? "bg-emerald-500 text-white"
                    : "bg-transparent text-slate-400 hover:text-white"
                } transition-all`}
                size="sm"
              >
                <Grid3x3 className="w-4 h-4 mr-2" />
                All Stocks
              </Button>
            </div>
          </div>
        </div>

        {/* Error Alert */}
        {error && (
          <Alert className="mb-6 bg-red-500/10 border-red-500/20 animate-in fade-in">
            <AlertCircle className="w-4 h-4 text-red-400" />
            <AlertDescription className="text-red-300">
              {error}
            </AlertDescription>
          </Alert>
        )}

        {/* Detailed View - Trading View with Chart */}
        {view === "detailed" && displayedStocks.length > 0 && (
          <div className="space-y-6">
            {displayedStocks.map((stock, index) => {
              const priceChange = stock.currentPrice - stock.lastDayTradedPrice;
              const percentChange =
                (priceChange / stock.lastDayTradedPrice) * 100;
              const isPositive = priceChange >= 0;

              return (
                <Card
                  key={stock._id}
                  className="bg-slate-900/50 backdrop-blur-xl border-slate-800 shadow-2xl animate-in fade-in slide-in-from-bottom"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CardContent className="p-6">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                      {/* Left Section - Stock Info & Stats */}
                      <div className="lg:col-span-1 space-y-4">
                        <div>
                          <div className="flex items-center justify-between mb-3">
                            <div>
                              <h2 className="text-2xl font-bold text-white mb-1">
                                {stock.companyName}
                              </h2>
                              <span className="px-3 py-1 bg-slate-800 rounded-full text-sm font-mono text-slate-300 inline-block">
                                {stock.symbol}
                              </span>
                            </div>
                            <button className="text-slate-400 hover:text-yellow-400 transition-colors">
                              <Star className="w-6 h-6" />
                            </button>
                          </div>

                          <div className="bg-slate-950/50 rounded-xl p-4 border border-slate-800 mb-4">
                            <div className="text-3xl font-bold text-white mb-2">
                              ₹{stock.currentPrice.toFixed(2)}
                            </div>
                            <div
                              className={`flex items-center gap-2 text-lg font-semibold ${
                                isPositive ? "text-emerald-400" : "text-red-400"
                              }`}
                            >
                              {isPositive ? (
                                <TrendingUp className="w-5 h-5" />
                              ) : (
                                <TrendingDown className="w-5 h-5" />
                              )}
                              {isPositive ? "+" : ""}
                              {priceChange.toFixed(2)} (
                              {percentChange.toFixed(2)}%)
                            </div>
                          </div>
                        </div>

                        {/* Key Stats */}
                        <div className="space-y-3">
                          <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">
                            Key Statistics
                          </h3>

                          <div className="bg-slate-950/50 rounded-lg p-4 border border-slate-800">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-slate-400 text-sm">
                                Previous Close
                              </span>
                              <span className="text-white font-semibold">
                                ₹{stock.lastDayTradedPrice.toFixed(2)}
                              </span>
                            </div>
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-slate-400 text-sm">
                                Day's Range
                              </span>
                              <span className="text-white font-semibold">
                                ₹{(stock.currentPrice * 0.98).toFixed(2)} - ₹
                                {(stock.currentPrice * 1.02).toFixed(2)}
                              </span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-slate-400 text-sm">
                                Market Cap
                              </span>
                              <span className="text-white font-semibold">
                                ₹
                                {(stock.currentPrice * 1000000).toLocaleString(
                                  "en-IN"
                                )}
                              </span>
                            </div>
                          </div>

                          <div
                            className={`rounded-lg p-4 border ${
                              isPositive
                                ? "bg-emerald-500/10 border-emerald-500/20"
                                : "bg-red-500/10 border-red-500/20"
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <span className="text-slate-400 text-sm">
                                Today's Change
                              </span>
                              <span
                                className={`font-bold ${
                                  isPositive
                                    ? "text-emerald-400"
                                    : "text-red-400"
                                }`}
                              >
                                {isPositive ? "+" : ""}₹{priceChange.toFixed(2)}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Buy Section */}
                        <div className="bg-slate-950/50 rounded-xl p-5 border border-slate-800">
                          <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">
                            Place Order
                          </h3>

                          <label className="text-xs text-slate-400 mb-2 block">
                            Quantity
                          </label>
                          <Input
                            type="number"
                            min={1}
                            placeholder="Enter quantity"
                            value={buyQuantity[stock._id] || ""}
                            onChange={(e) =>
                              setBuyQuantity({
                                ...buyQuantity,
                                [stock._id]: Number(e.target.value),
                              })
                            }
                            className="mb-3 bg-slate-900 border-slate-700 text-white text-center text-xl font-bold focus:border-emerald-500 focus:ring-emerald-500/20"
                          />

                          {buyQuantity[stock._id] > 0 && (
                            <div className="bg-slate-900 rounded-lg p-3 mb-3 border border-slate-800">
                              <div className="flex justify-between text-sm mb-1">
                                <span className="text-slate-400">Shares</span>
                                <span className="text-white font-semibold">
                                  {buyQuantity[stock._id]}
                                </span>
                              </div>
                              <div className="flex justify-between text-sm mb-1">
                                <span className="text-slate-400">
                                  Price per share
                                </span>
                                <span className="text-white font-semibold">
                                  ₹{stock.currentPrice.toFixed(2)}
                                </span>
                              </div>
                              <div className="border-t border-slate-800 my-2"></div>
                              <div className="flex justify-between">
                                <span className="text-slate-300 font-semibold">
                                  Total
                                </span>
                                <span className="text-emerald-400 font-bold text-lg">
                                  ₹
                                  {(
                                    stock.currentPrice * buyQuantity[stock._id]
                                  ).toFixed(2)}
                                </span>
                              </div>
                            </div>
                          )}

                          <Button
                            onClick={() =>
                              handleBuy(stock._id, buyQuantity[stock._id] || 1)
                            }
                            className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white py-6 text-lg font-semibold"
                          >
                            <ShoppingCart className="w-5 h-5 mr-2" />
                            Buy{" "}
                            {buyQuantity[stock._id] > 0
                              ? `${buyQuantity[stock._id]} Shares`
                              : "Stock"}
                          </Button>

                          <div className="grid grid-cols-3 gap-2 mt-3">
                            <Button
                              onClick={() =>
                                setBuyQuantity({
                                  ...buyQuantity,
                                  [stock._id]: 1,
                                })
                              }
                              className="bg-slate-800 hover:bg-slate-700 text-white text-xs"
                              size="sm"
                            >
                              1
                            </Button>
                            <Button
                              onClick={() =>
                                setBuyQuantity({
                                  ...buyQuantity,
                                  [stock._id]: 5,
                                })
                              }
                              className="bg-slate-800 hover:bg-slate-700 text-white text-xs"
                              size="sm"
                            >
                              5
                            </Button>
                            <Button
                              onClick={() =>
                                setBuyQuantity({
                                  ...buyQuantity,
                                  [stock._id]: 10,
                                })
                              }
                              className="bg-slate-800 hover:bg-slate-700 text-white text-xs"
                              size="sm"
                            >
                              10
                            </Button>
                          </div>
                        </div>
                      </div>

                      {/* Right Section - Trading Chart */}
                      <div className="lg:col-span-2">
                        <div className="bg-slate-950/50 rounded-xl p-4 border border-slate-800 h-full">
                          <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                              <Activity className="w-5 h-5 text-emerald-400" />
                              Price Chart
                            </h3>
                            <div className="flex gap-2">
                              {["1D", "1W", "1M", "3M", "1Y"].map((period) => (
                                <button
                                  key={period}
                                  className="px-3 py-1 bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white rounded text-xs font-semibold transition-all"
                                >
                                  {period}
                                </button>
                              ))}
                            </div>
                          </div>

                          {/* Chart Canvas */}
                          <div className="relative h-96 bg-slate-900/50 rounded-lg border border-slate-800 overflow-hidden">
                            {/* Simulated Chart */}
                            <svg
                              className="w-full h-full"
                              viewBox="0 0 800 400"
                              preserveAspectRatio="none"
                            >
                              {/* Grid lines */}
                              <defs>
                                <linearGradient
                                  id={`gradient-${index}`}
                                  x1="0%"
                                  y1="0%"
                                  x2="0%"
                                  y2="100%"
                                >
                                  <stop
                                    offset="0%"
                                    style={{
                                      stopColor: isPositive
                                        ? "#10b981"
                                        : "#ef4444",
                                      stopOpacity: 0.3,
                                    }}
                                  />
                                  <stop
                                    offset="100%"
                                    style={{
                                      stopColor: isPositive
                                        ? "#10b981"
                                        : "#ef4444",
                                      stopOpacity: 0,
                                    }}
                                  />
                                </linearGradient>
                              </defs>

                              {/* Horizontal grid */}
                              {[0, 1, 2, 3, 4].map((i) => (
                                <line
                                  key={i}
                                  x1="0"
                                  y1={i * 100}
                                  x2="800"
                                  y2={i * 100}
                                  stroke="#1e293b"
                                  strokeWidth="1"
                                />
                              ))}

                              {/* Vertical grid */}
                              {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
                                <line
                                  key={i}
                                  x1={i * 100}
                                  y1="0"
                                  x2={i * 100}
                                  y2="400"
                                  stroke="#1e293b"
                                  strokeWidth="1"
                                />
                              ))}

                              {/* Price line path */}
                              <path
                                d={`M 0,${250 + Math.sin(0) * 50} 
                                   ${Array.from({ length: 80 }, (_, i) => {
                                     const x = (i + 1) * 10;
                                     const baseY = 250;
                                     const variation =
                                       Math.sin(i * 0.3) * 30 +
                                       Math.cos(i * 0.2) * 20;
                                     const trend = isPositive
                                       ? -i * 0.5
                                       : i * 0.5;
                                     const y = baseY + variation + trend;
                                     return `L ${x},${y}`;
                                   }).join(" ")}`}
                                fill="none"
                                stroke={isPositive ? "#10b981" : "#ef4444"}
                                strokeWidth="3"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />

                              {/* Gradient fill under line */}
                              <path
                                d={`M 0,${250 + Math.sin(0) * 50} 
                                   ${Array.from({ length: 80 }, (_, i) => {
                                     const x = (i + 1) * 10;
                                     const baseY = 250;
                                     const variation =
                                       Math.sin(i * 0.3) * 30 +
                                       Math.cos(i * 0.2) * 20;
                                     const trend = isPositive
                                       ? -i * 0.5
                                       : i * 0.5;
                                     const y = baseY + variation + trend;
                                     return `L ${x},${y}`;
                                   }).join(" ")}
                                   L 800,400 L 0,400 Z`}
                                fill={`url(#gradient-${index})`}
                              />
                            </svg>

                            {/* Chart overlay info */}
                            <div className="absolute top-4 left-4 bg-slate-900/80 backdrop-blur-sm rounded-lg p-3 border border-slate-800">
                              <div className="text-xs text-slate-400 mb-1">
                                Live Price
                              </div>
                              <div className="text-xl font-bold text-white">
                                ₹{stock.currentPrice.toFixed(2)}
                              </div>
                              <div
                                className={`text-sm ${
                                  isPositive
                                    ? "text-emerald-400"
                                    : "text-red-400"
                                }`}
                              >
                                {isPositive ? "+" : ""}
                                {percentChange.toFixed(2)}%
                              </div>
                            </div>
                          </div>

                          {/* Chart Footer Stats */}
                          <div className="grid grid-cols-4 gap-3 mt-4">
                            <div className="bg-slate-900/50 rounded-lg p-3 border border-slate-800 text-center">
                              <div className="text-xs text-slate-400 mb-1">
                                Open
                              </div>
                              <div className="text-sm font-semibold text-white">
                                ₹{stock.lastDayTradedPrice.toFixed(2)}
                              </div>
                            </div>
                            <div className="bg-slate-900/50 rounded-lg p-3 border border-slate-800 text-center">
                              <div className="text-xs text-slate-400 mb-1">
                                High
                              </div>
                              <div className="text-sm font-semibold text-emerald-400">
                                ₹{(stock.currentPrice * 1.02).toFixed(2)}
                              </div>
                            </div>
                            <div className="bg-slate-900/50 rounded-lg p-3 border border-slate-800 text-center">
                              <div className="text-xs text-slate-400 mb-1">
                                Low
                              </div>
                              <div className="text-sm font-semibold text-red-400">
                                ₹{(stock.currentPrice * 0.98).toFixed(2)}
                              </div>
                            </div>
                            <div className="bg-slate-900/50 rounded-lg p-3 border border-slate-800 text-center">
                              <div className="text-xs text-slate-400 mb-1">
                                Volume
                              </div>
                              <div className="text-sm font-semibold text-white">
                                2.4M
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}

        {/* Grid View - All Stocks Compact */}
        {view === "grid" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {stocks.map((stock, index) => {
              const priceChange = stock.currentPrice - stock.lastDayTradedPrice;
              const percentChange =
                (priceChange / stock.lastDayTradedPrice) * 100;
              const isPositive = priceChange >= 0;

              return (
                <Card
                  key={stock._id}
                  className="bg-slate-900/50 backdrop-blur-xl border-slate-800 shadow-lg hover:shadow-xl hover:border-slate-700 transition-all duration-300 animate-in fade-in slide-in-from-bottom"
                  style={{ animationDelay: `${index * 30}ms` }}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-xl font-bold text-white">
                            {stock.companyName}
                          </h3>
                          <button className="text-slate-400 hover:text-yellow-400 transition-colors">
                            <Star className="w-4 h-4" />
                          </button>
                        </div>
                        <span className="px-3 py-1 bg-slate-800 rounded-full text-xs font-mono text-slate-300 inline-block">
                          {stock.symbol}
                        </span>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-white mb-1">
                          ₹{stock.currentPrice.toFixed(2)}
                        </div>
                        <div
                          className={`flex items-center gap-1 justify-end text-sm font-semibold ${
                            isPositive ? "text-emerald-400" : "text-red-400"
                          }`}
                        >
                          {isPositive ? (
                            <ArrowUpRight className="w-4 h-4" />
                          ) : (
                            <ArrowDownRight className="w-4 h-4" />
                          )}
                          {isPositive ? "+" : ""}
                          {percentChange.toFixed(2)}%
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 mb-4">
                      <div className="bg-slate-950/50 rounded-lg p-3 border border-slate-800">
                        <p className="text-xs text-slate-500 mb-1">
                          Previous Close
                        </p>
                        <p className="text-base font-semibold text-white">
                          ₹{stock.lastDayTradedPrice.toFixed(2)}
                        </p>
                      </div>
                      <div
                        className={`rounded-lg p-3 border ${
                          isPositive
                            ? "bg-emerald-500/10 border-emerald-500/20"
                            : "bg-red-500/10 border-red-500/20"
                        }`}
                      >
                        <p className="text-xs text-slate-500 mb-1">
                          Day Change
                        </p>
                        <p
                          className={`text-base font-semibold ${
                            isPositive ? "text-emerald-400" : "text-red-400"
                          }`}
                        >
                          {isPositive ? "+" : ""}₹{priceChange.toFixed(2)}
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Input
                        type="number"
                        min={1}
                        placeholder="Qty"
                        value={buyQuantity[stock._id] || ""}
                        onChange={(e) =>
                          setBuyQuantity({
                            ...buyQuantity,
                            [stock._id]: Number(e.target.value),
                          })
                        }
                        className="flex-1 bg-slate-900 border-slate-700 text-white text-center font-semibold focus:border-emerald-500 focus:ring-emerald-500/20"
                      />
                      <Button
                        onClick={() =>
                          handleBuy(stock._id, buyQuantity[stock._id] || 1)
                        }
                        className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white px-6"
                      >
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        Buy
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-marquee {
          animation: marquee 20s linear infinite;
          display: inline-block;
        }
      `}</style>
    </div>
  );
}
