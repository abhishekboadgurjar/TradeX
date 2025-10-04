// "use client";

// import { useEffect } from "react";
// import { useStockStore } from "../../../store/useStockStore";

// export default function OrdersPage() {
//   const { orders, fetchOrders, loading, error } = useStockStore();

//   useEffect(() => {
//     fetchOrders();
//   }, [fetchOrders]);

//   if (loading) return <p className="text-center p-6">Loading orders...</p>;
//   if (error) return <p className="text-center text-red-500 p-6">{error}</p>;

//   return (
//     <div className="max-w-6xl mx-auto mt-10">
//       <h1 className="text-2xl font-semibold mb-4">Order History</h1>
//       {orders.length === 0 ? (
//         <p>No orders yet.</p>
//       ) : (
//         <div className="overflow-x-auto">
//           <table className="min-w-full border rounded-lg">
//             <thead>
//               <tr className="bg-gray-100">
//                 <th className="p-2 border">Stock</th>
//                 <th className="p-2 border">Type</th>
//                 <th className="p-2 border">Quantity</th>
//                 <th className="p-2 border">Price</th>
//                 <th className="p-2 border">Remaining Balance</th>
//                 <th className="p-2 border">Timestamp</th>
//               </tr>
//             </thead>
//             <tbody>
//               {orders.map((order) => (
//                 <tr key={order._id} className="text-center">
//                   <td className="p-2 border">
//                     {order.stock.companyName} ({order.stock.symbol})
//                   </td>
//                   <td
//                     className={`p-2 border font-medium ${
//                       order.type === "buy" ? "text-green-600" : "text-red-600"
//                     }`}
//                   >
//                     {order.type.toUpperCase()}
//                   </td>
//                   <td className="p-2 border">{order.quantity}</td>
//                   <td className="p-2 border">₹{order.price.toFixed(2)}</td>
//                   <td className="p-2 border">
//                     ₹{order.remainingBalance.toFixed(2)}
//                   </td>
//                   <td className="p-2 border">
//                     {new Date(order.timestamp).toLocaleString()}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
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
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  TrendingUp,
  TrendingDown,
  Clock,
  ShoppingCart,
  DollarSign,
  AlertCircle,
  FileText,
  Calendar,
  Filter,
  Download,
  ArrowUpRight,
  ArrowDownRight,
  Activity,
  Wallet,
  BarChart3,
} from "lucide-react";

export default function OrdersPage() {
  const { orders, fetchOrders, loading, error } = useStockStore();
  const [filter, setFilter] = useState<"all" | "buy" | "sell">("all");

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  // Filter orders
  const filteredOrders = orders.filter((order) =>
    filter === "all" ? true : order.type === filter
  );

  // Calculate stats
  const totalBuyOrders = orders.filter((o) => o.type === "buy").length;
  const totalSellOrders = orders.filter((o) => o.type === "sell").length;
  const totalVolume = orders.reduce((sum, o) => sum + o.price * o.quantity, 0);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-emerald-500/30 border-t-emerald-500 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-400">Loading your order history...</p>
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
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2 flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-blue-600 rounded-xl flex items-center justify-center">
                  <FileText className="w-6 h-6 text-white" />
                </div>
                Order History
              </h1>
              <p className="text-slate-400">
                Track all your buy and sell transactions
              </p>
            </div>
            <Button className="bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/20 hover:border-emerald-500/40">
              <Download className="w-4 h-4 mr-2" />
              Export Report
            </Button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="bg-gradient-to-br from-purple-500/10 to-purple-600/5 border-purple-500/20 hover:border-purple-500/40 transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm text-slate-400">Total Orders</p>
                  <Activity className="w-5 h-5 text-purple-400" />
                </div>
                <p className="text-2xl font-bold text-white">{orders.length}</p>
                <p className="text-xs text-slate-500 mt-1">All transactions</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-emerald-500/10 to-emerald-600/5 border-emerald-500/20 hover:border-emerald-500/40 transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm text-slate-400">Buy Orders</p>
                  <TrendingUp className="w-5 h-5 text-emerald-400" />
                </div>
                <p className="text-2xl font-bold text-white">
                  {totalBuyOrders}
                </p>
                <p className="text-xs text-slate-500 mt-1">Purchase orders</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-red-500/10 to-red-600/5 border-red-500/20 hover:border-red-500/40 transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm text-slate-400">Sell Orders</p>
                  <TrendingDown className="w-5 h-5 text-red-400" />
                </div>
                <p className="text-2xl font-bold text-white">
                  {totalSellOrders}
                </p>
                <p className="text-xs text-slate-500 mt-1">Sale orders</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-blue-500/10 to-blue-600/5 border-blue-500/20 hover:border-blue-500/40 transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm text-slate-400">Total Volume</p>
                  <BarChart3 className="w-5 h-5 text-blue-400" />
                </div>
                <p className="text-2xl font-bold text-white">
                  ₹
                  {totalVolume.toLocaleString("en-IN", {
                    maximumFractionDigits: 0,
                  })}
                </p>
                <p className="text-xs text-slate-500 mt-1">Trading volume</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Filter Buttons */}
        <div
          className="flex gap-3 mb-6 animate-in fade-in slide-in-from-top duration-700"
          style={{ animationDelay: "100ms" }}
        >
          <Button
            onClick={() => setFilter("all")}
            className={`${
              filter === "all"
                ? "bg-slate-700 text-white"
                : "bg-slate-800/50 text-slate-400 hover:bg-slate-700 hover:text-white"
            } border border-slate-700`}
          >
            <Filter className="w-4 h-4 mr-2" />
            All Orders
          </Button>
          <Button
            onClick={() => setFilter("buy")}
            className={`${
              filter === "buy"
                ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/40"
                : "bg-slate-800/50 text-slate-400 hover:bg-emerald-500/10 hover:text-emerald-400"
            } border border-slate-700`}
          >
            <TrendingUp className="w-4 h-4 mr-2" />
            Buy Orders
          </Button>
          <Button
            onClick={() => setFilter("sell")}
            className={`${
              filter === "sell"
                ? "bg-red-500/20 text-red-400 border-red-500/40"
                : "bg-slate-800/50 text-slate-400 hover:bg-red-500/10 hover:text-red-400"
            } border border-slate-700`}
          >
            <TrendingDown className="w-4 h-4 mr-2" />
            Sell Orders
          </Button>
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

        {/* Orders List */}
        {filteredOrders.length === 0 ? (
          <Card className="bg-slate-900/50 backdrop-blur-xl border-slate-800 shadow-2xl">
            <CardContent className="p-12 text-center">
              <div className="w-20 h-20 bg-slate-800/50 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="w-10 h-10 text-slate-600" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                {filter === "all" ? "No Orders Yet" : `No ${filter} Orders`}
              </h3>
              <p className="text-slate-400 mb-6">
                {filter === "all"
                  ? "Start trading to see your order history"
                  : `You haven't placed any ${filter} orders yet`}
              </p>
              <Button className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white">
                <ShoppingCart className="w-4 h-4 mr-2" />
                Start Trading
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {filteredOrders.map((order, index) => {
              const isBuy = order.type === "buy";
              const totalAmount = order.price * order.quantity;

              return (
                <Card
                  key={order._id}
                  className="bg-slate-900/50 backdrop-blur-xl border-slate-800 shadow-lg hover:shadow-xl hover:border-slate-700 transition-all duration-300 animate-in fade-in slide-in-from-bottom"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <CardContent className="p-6">
                    <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                      {/* Left - Order Type Badge */}
                      <div
                        className={`flex items-center justify-center w-16 h-16 rounded-xl ${
                          isBuy
                            ? "bg-emerald-500/20 border border-emerald-500/30"
                            : "bg-red-500/20 border border-red-500/30"
                        }`}
                      >
                        {isBuy ? (
                          <ArrowDownRight className="w-8 h-8 text-emerald-400" />
                        ) : (
                          <ArrowUpRight className="w-8 h-8 text-red-400" />
                        )}
                      </div>

                      {/* Middle - Order Details */}
                      <div className="flex-1">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                          <div>
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="text-xl font-bold text-white">
                                {order.stock.companyName}
                              </h3>
                              <span className="px-2 py-1 bg-slate-800 rounded text-xs font-mono text-slate-400">
                                {order.stock.symbol}
                              </span>
                              <span
                                className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                  isBuy
                                    ? "bg-emerald-500/20 text-emerald-400"
                                    : "bg-red-500/20 text-red-400"
                                }`}
                              >
                                {order.type.toUpperCase()}
                              </span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-slate-400">
                              <Clock className="w-4 h-4" />
                              {new Date(order.timestamp).toLocaleString(
                                "en-IN",
                                {
                                  dateStyle: "medium",
                                  timeStyle: "short",
                                }
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Order Stats Grid */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
                          <div className="bg-slate-950/50 rounded-lg p-3 border border-slate-800">
                            <p className="text-xs text-slate-500 mb-1">
                              Quantity
                            </p>
                            <p className="text-lg font-semibold text-white">
                              {order.quantity}
                            </p>
                          </div>
                          <div className="bg-slate-950/50 rounded-lg p-3 border border-slate-800">
                            <p className="text-xs text-slate-500 mb-1">
                              Price per Share
                            </p>
                            <p className="text-lg font-semibold text-white">
                              ₹{order.price.toFixed(2)}
                            </p>
                          </div>
                          <div
                            className={`rounded-lg p-3 border ${
                              isBuy
                                ? "bg-emerald-500/10 border-emerald-500/20"
                                : "bg-red-500/10 border-red-500/20"
                            }`}
                          >
                            <p className="text-xs text-slate-500 mb-1">
                              Total Amount
                            </p>
                            <p
                              className={`text-lg font-semibold ${
                                isBuy ? "text-emerald-400" : "text-red-400"
                              }`}
                            >
                              ₹
                              {totalAmount.toLocaleString("en-IN", {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                              })}
                            </p>
                          </div>
                          <div className="bg-slate-950/50 rounded-lg p-3 border border-slate-800">
                            <p className="text-xs text-slate-500 mb-1">
                              Balance After
                            </p>
                            <p className="text-lg font-semibold text-white">
                              ₹
                              {order.remainingBalance.toLocaleString("en-IN", {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                              })}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Right - Status Badge */}
                      <div className="flex flex-col items-center gap-2 lg:w-32">
                        <div className="px-4 py-2 bg-emerald-500/10 border border-emerald-500/30 rounded-full">
                          <p className="text-xs font-semibold text-emerald-400">
                            EXECUTED
                          </p>
                        </div>
                        <p className="text-xs text-slate-500">Order Complete</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}

        {/* Pagination Info */}
        {filteredOrders.length > 0 && (
          <div className="mt-6 text-center">
            <p className="text-sm text-slate-500">
              Showing {filteredOrders.length} of {orders.length} orders
            </p>
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
