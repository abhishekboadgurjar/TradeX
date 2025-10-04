// "use client";

// import { useEffect, useState } from "react";
// import { useStockStore } from "../../../store/useStockStore";

// export default function HoldingsPage() {
//   const { holdings, fetchHoldings, sellStock, loading, error } =
//     useStockStore();
//   const [sellQuantity, setSellQuantity] = useState<{ [key: string]: number }>(
//     {}
//   );

//   useEffect(() => {
//     fetchHoldings();
//   }, [fetchHoldings]);

//   const handleSell = async (holdingId: string, quantity: number) => {
//     if (quantity <= 0) return;
//     await sellStock(holdingId, quantity);
//     setSellQuantity({ ...sellQuantity, [holdingId]: 0 });
//   };

//   if (loading) return <p className="text-center p-6">Loading holdings...</p>;
//   if (error) return <p className="text-center text-red-500 p-6">{error}</p>;

//   return (
//     <div className="max-w-4xl mx-auto mt-10 space-y-4">
//       <h1 className="text-2xl font-semibold mb-4">My Holdings</h1>
//       {holdings.length === 0 ? (
//         <p>No holdings yet.</p>
//       ) : (
//         <div className="space-y-4">
//           {holdings.map((holding) => (
//             <div
//               key={holding._id}
//               className="flex justify-between items-center border p-4 rounded-lg"
//             >
//               <div>
//                 <p className="font-medium">
//                   {holding.stock.companyName} ({holding.stock.symbol})
//                 </p>
//                 <p>Quantity: {holding.quantity}</p>
//                 <p>Buy Price: ₹{holding.buyPrice.toFixed(2)}</p>
//                 <p>Current Price: ₹{holding.stock.currentPrice.toFixed(2)}</p>
//               </div>
//               <div className="flex gap-2 items-center">
//                 <input
//                   type="number"
//                   min={1}
//                   max={holding.quantity}
//                   placeholder="Qty"
//                   value={sellQuantity[holding._id] || ""}
//                   onChange={(e) =>
//                     setSellQuantity({
//                       ...sellQuantity,
//                       [holding._id]: Number(e.target.value),
//                     })
//                   }
//                   className="w-20 border rounded px-2 py-1"
//                 />
//                 <button
//                   onClick={() =>
//                     handleSell(holding._id, sellQuantity[holding._id] || 0)
//                   }
//                   className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
//                 >
//                   Sell
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import { useStockStore } from "../../../store/useStockStore";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  TrendingUp,
  TrendingDown,
  Briefcase,
  DollarSign,
  ShoppingCart,
  ArrowUpRight,
  ArrowDownRight,
  Activity,
  AlertCircle,
  Package,
  BarChart3,
  PieChart,
  Target,
  Wallet,
} from "lucide-react";

export default function HoldingsPage() {
  const { holdings, fetchHoldings, sellStock, loading, error } =
    useStockStore();
  const [sellQuantity, setSellQuantity] = useState<{ [key: string]: number }>(
    {}
  );

  useEffect(() => {
    fetchHoldings();
  }, [fetchHoldings]);

  const handleSell = async (holdingId: string, quantity: number) => {
    if (quantity <= 0) return;
    await sellStock(holdingId, quantity);
    setSellQuantity({ ...sellQuantity, [holdingId]: 0 });
  };

  // Calculate portfolio metrics
  const totalInvestment = holdings.reduce(
    (sum, h) => sum + h.buyPrice * h.quantity,
    0
  );
  const currentValue = holdings.reduce(
    (sum, h) => sum + h.stock.currentPrice * h.quantity,
    0
  );
  const totalPnL = currentValue - totalInvestment;
  const totalPnLPercentage =
    totalInvestment > 0 ? (totalPnL / totalInvestment) * 100 : 0;

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-emerald-500/30 border-t-emerald-500 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-400">Loading your portfolio...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
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
                  <Briefcase className="w-6 h-6 text-white" />
                </div>
                My Holdings
              </h1>
              <p className="text-slate-400">
                Track and manage your investment portfolio
              </p>
            </div>
          </div>

          {/* Portfolio Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="bg-gradient-to-br from-blue-500/10 to-blue-600/5 border-blue-500/20 hover:border-blue-500/40 transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm text-slate-400">Total Investment</p>
                  <Wallet className="w-5 h-5 text-blue-400" />
                </div>
                <p className="text-2xl font-bold text-white">
                  ₹
                  {totalInvestment.toLocaleString("en-IN", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </p>
                <p className="text-xs text-slate-500 mt-1">Initial capital</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-500/10 to-purple-600/5 border-purple-500/20 hover:border-purple-500/40 transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm text-slate-400">Current Value</p>
                  <DollarSign className="w-5 h-5 text-purple-400" />
                </div>
                <p className="text-2xl font-bold text-white">
                  ₹
                  {currentValue.toLocaleString("en-IN", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </p>
                <p className="text-xs text-slate-500 mt-1">Market value</p>
              </CardContent>
            </Card>

            <Card
              className={`bg-gradient-to-br ${
                totalPnL >= 0
                  ? "from-emerald-500/10 to-emerald-600/5 border-emerald-500/20 hover:border-emerald-500/40"
                  : "from-red-500/10 to-red-600/5 border-red-500/20 hover:border-red-500/40"
              } transition-all duration-300`}
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm text-slate-400">Total P&L</p>
                  {totalPnL >= 0 ? (
                    <TrendingUp className="w-5 h-5 text-emerald-400" />
                  ) : (
                    <TrendingDown className="w-5 h-5 text-red-400" />
                  )}
                </div>
                <p
                  className={`text-2xl font-bold ${
                    totalPnL >= 0 ? "text-emerald-400" : "text-red-400"
                  }`}
                >
                  {totalPnL >= 0 ? "+" : ""}₹
                  {totalPnL.toLocaleString("en-IN", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </p>
                <p
                  className={`text-xs mt-1 flex items-center gap-1 ${
                    totalPnL >= 0 ? "text-emerald-400" : "text-red-400"
                  }`}
                >
                  {totalPnL >= 0 ? (
                    <ArrowUpRight className="w-3 h-3" />
                  ) : (
                    <ArrowDownRight className="w-3 h-3" />
                  )}
                  {totalPnLPercentage.toFixed(2)}%
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-amber-500/10 to-amber-600/5 border-amber-500/20 hover:border-amber-500/40 transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm text-slate-400">Total Holdings</p>
                  <Package className="w-5 h-5 text-amber-400" />
                </div>
                <p className="text-2xl font-bold text-white">
                  {holdings.length}
                </p>
                <p className="text-xs text-slate-500 mt-1">Active stocks</p>
              </CardContent>
            </Card>
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

        {/* Holdings List */}
        {holdings.length === 0 ? (
          <Card className="bg-slate-900/50 backdrop-blur-xl border-slate-800 shadow-2xl">
            <CardContent className="p-12 text-center">
              <div className="w-20 h-20 bg-slate-800/50 rounded-full flex items-center justify-center mx-auto mb-4">
                <Package className="w-10 h-10 text-slate-600" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                No Holdings Yet
              </h3>
              <p className="text-slate-400 mb-6">
                Start building your portfolio by buying stocks
              </p>
              <Button className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white">
                <ShoppingCart className="w-4 h-4 mr-2" />
                Explore Stocks
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {holdings.map((holding, index) => {
              const pnl =
                (holding.stock.currentPrice - holding.buyPrice) *
                holding.quantity;
              const pnlPercentage =
                ((holding.stock.currentPrice - holding.buyPrice) /
                  holding.buyPrice) *
                100;
              const isProfitable = pnl >= 0;

              return (
                <Card
                  key={holding._id}
                  className="bg-slate-900/50 backdrop-blur-xl border-slate-800 shadow-lg hover:shadow-xl hover:border-slate-700 transition-all duration-300 animate-in fade-in slide-in-from-bottom"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <CardContent className="p-6">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                      {/* Left Section - Stock Info */}
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="text-xl font-bold text-white mb-1 flex items-center gap-2">
                              {holding.stock.companyName}
                              <span className="px-2 py-1 bg-slate-800 rounded text-xs font-mono text-slate-400">
                                {holding.stock.symbol}
                              </span>
                            </h3>
                            <div className="flex items-center gap-4 text-sm text-slate-400">
                              <span className="flex items-center gap-1">
                                <Activity className="w-4 h-4" />
                                Qty:{" "}
                                <span className="text-white font-semibold">
                                  {holding.quantity}
                                </span>
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Price Info Grid */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          <div className="bg-slate-950/50 rounded-lg p-3 border border-slate-800">
                            <p className="text-xs text-slate-500 mb-1">
                              Buy Price
                            </p>
                            <p className="text-lg font-semibold text-white">
                              ₹{holding.buyPrice.toFixed(2)}
                            </p>
                          </div>
                          <div className="bg-slate-950/50 rounded-lg p-3 border border-slate-800">
                            <p className="text-xs text-slate-500 mb-1">
                              Current Price
                            </p>
                            <p className="text-lg font-semibold text-white">
                              ₹{holding.stock.currentPrice.toFixed(2)}
                            </p>
                          </div>
                          <div
                            className={`rounded-lg p-3 border ${
                              isProfitable
                                ? "bg-emerald-500/10 border-emerald-500/20"
                                : "bg-red-500/10 border-red-500/20"
                            }`}
                          >
                            <p className="text-xs text-slate-500 mb-1">P&L</p>
                            <p
                              className={`text-lg font-semibold ${
                                isProfitable
                                  ? "text-emerald-400"
                                  : "text-red-400"
                              }`}
                            >
                              {isProfitable ? "+" : ""}₹{pnl.toFixed(2)}
                            </p>
                          </div>
                          <div
                            className={`rounded-lg p-3 border ${
                              isProfitable
                                ? "bg-emerald-500/10 border-emerald-500/20"
                                : "bg-red-500/10 border-red-500/20"
                            }`}
                          >
                            <p className="text-xs text-slate-500 mb-1">
                              Returns
                            </p>
                            <p
                              className={`text-lg font-semibold flex items-center gap-1 ${
                                isProfitable
                                  ? "text-emerald-400"
                                  : "text-red-400"
                              }`}
                            >
                              {isProfitable ? (
                                <ArrowUpRight className="w-4 h-4" />
                              ) : (
                                <ArrowDownRight className="w-4 h-4" />
                              )}
                              {pnlPercentage.toFixed(2)}%
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Right Section - Sell Actions */}
                      <div className="lg:w-64 flex flex-col gap-3">
                        <div className="bg-slate-950/50 rounded-xl p-4 border border-slate-800">
                          <label className="text-xs text-slate-400 mb-2 block">
                            Quantity to Sell
                          </label>
                          <Input
                            type="number"
                            min={1}
                            max={holding.quantity}
                            placeholder="Enter qty"
                            value={sellQuantity[holding._id] || ""}
                            onChange={(e) =>
                              setSellQuantity({
                                ...sellQuantity,
                                [holding._id]: Number(e.target.value),
                              })
                            }
                            className="mb-3 bg-slate-900 border-slate-700 text-white text-center text-lg font-semibold focus:border-red-500 focus:ring-red-500/20"
                          />
                          <div className="flex gap-2">
                            <Button
                              onClick={() =>
                                handleSell(
                                  holding._id,
                                  sellQuantity[holding._id] || 0
                                )
                              }
                              disabled={
                                !sellQuantity[holding._id] ||
                                sellQuantity[holding._id] <= 0
                              }
                              className="flex-1 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              <TrendingDown className="w-4 h-4 mr-2" />
                              Sell
                            </Button>
                          </div>
                          <p className="text-xs text-slate-500 mt-2 text-center">
                            Max: {holding.quantity} shares
                          </p>
                        </div>

                        {/* Quick Actions */}
                        <div className="flex gap-2">
                          <Button
                            onClick={() =>
                              setSellQuantity({
                                ...sellQuantity,
                                [holding._id]: Math.floor(holding.quantity / 2),
                              })
                            }
                            className="flex-1 bg-slate-800 hover:bg-slate-700 text-white text-xs"
                            size="sm"
                          >
                            50%
                          </Button>
                          <Button
                            onClick={() =>
                              setSellQuantity({
                                ...sellQuantity,
                                [holding._id]: holding.quantity,
                              })
                            }
                            className="flex-1 bg-slate-800 hover:bg-slate-700 text-white text-xs"
                            size="sm"
                          >
                            100%
                          </Button>
                        </div>
                      </div>
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
