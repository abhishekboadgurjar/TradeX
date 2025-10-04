// // app/page.tsx (Next.js 13+ App Router)
// "use client";

// import Link from "next/link";

// export default function HomePage() {
//   return (
//     <div className="min-h-screen bg-gray-100 p-6">
//       <h1 className="text-3xl font-bold mb-6 text-center">Trading Dashboard</h1>

//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//         {/* Holdings Card */}
//         <Link href="/dashboard/holdings">
//           <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition cursor-pointer">
//             <h2 className="text-xl font-semibold mb-2">Holdings</h2>
//             <p className="text-gray-500">View all your current holdings.</p>
//           </div>
//         </Link>

//         {/* Orders Card */}
//         <Link href="/dashboard/orders">
//           <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition cursor-pointer">
//             <h2 className="text-xl font-semibold mb-2">Orders</h2>
//             <p className="text-gray-500">Check your past and active orders.</p>
//           </div>
//         </Link>

//         {/* Stocks Card */}
//         <Link href="/dashboard/stocks">
//           <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition cursor-pointer">
//             <h2 className="text-xl font-semibold mb-2">Stocks</h2>
//             <p className="text-gray-500">Browse and track stocks.</p>
//           </div>
//         </Link>

//         {/* Profile Card */}
//         <Link href="/dashboard/profile">
//           <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition cursor-pointer">
//             <h2 className="text-xl font-semibold mb-2">Profile</h2>
//             <p className="text-gray-500">Update your personal information.</p>
//           </div>
//         </Link>
//       </div>
//     </div>
//   );
// }

// "use client";

// import { useState, useEffect } from "react";
// import Link from "next/link";
// import {
//   TrendingUp,
//   TrendingDown,
//   ArrowUpRight,
//   ArrowDownRight,
//   Eye,
//   EyeOff,
//   Bell,
//   Settings,
//   Search,
//   Plus,
//   Activity,
//   Wallet,
//   PieChart,
//   BarChart3,
//   Clock,
//   Star,
//   Zap,
//   ShoppingCart,
//   Calendar,
//   Award,
//   ChevronRight,
//   Menu,
//   X,
//   User,
//   LogOut,
//   Sparkles,
//   Target,
//   DollarSign
// } from "lucide-react";

// export default function DashboardHome() {
//   const [isBalanceVisible, setIsBalanceVisible] = useState(true);
//   const [currentTime, setCurrentTime] = useState(new Date());
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

//   useEffect(() => {
//     const timer = setInterval(() => setCurrentTime(new Date()), 1000);
//     return () => clearInterval(timer);
//   }, []);

//   // Mock user data
//   const userData = {
//     name: "Rahul Sharma",
//     email: "rahul.sharma@email.com",
//     avatar: "RS",
//     balance: 1245678.50,
//     invested: 980000,
//     currentValue: 1245678.50,
//     todayPnL: 45234.20,
//     totalPnL: 265678.50,
//     returns: 27.11
//   };

//   const holdings = [
//     { symbol: "RELIANCE", qty: 50, avgPrice: 2450.00, ltp: 2680.50, pnl: 11525.00, change: 9.41 },
//     { symbol: "TCS", qty: 30, avgPrice: 3520.00, ltp: 3845.75, change: 9.25, pnl: 9772.50 },
//     { symbol: "INFY", qty: 100, avgPrice: 1450.00, ltp: 1520.30, change: 4.85, pnl: 7030.00 },
//     { symbol: "HDFC", qty: 40, avgPrice: 1680.00, ltp: 1745.20, change: 3.88, pnl: 2608.00 },
//   ];

//   const watchlist = [
//     { symbol: "WIPRO", ltp: 445.60, change: 2.34, positive: true },
//     { symbol: "ICICIBANK", ltp: 945.80, change: -0.56, positive: false },
//     { symbol: "SBIN", ltp: 598.40, change: 1.87, positive: true },
//     { symbol: "BHARTIARTL", ltp: 1234.50, change: -1.23, positive: false },
//   ];

//   const recentOrders = [
//     { symbol: "RELIANCE", type: "BUY", qty: 10, price: 2680.50, status: "completed", time: "10:45 AM" },
//     { symbol: "TCS", type: "SELL", qty: 5, price: 3845.75, status: "completed", time: "09:30 AM" },
//     { symbol: "INFY", type: "BUY", qty: 20, price: 1520.30, status: "pending", time: "Yesterday" },
//   ];

//   const marketIndices = [
//     { name: "NIFTY 50", value: "21,456.78", change: "+234.56", percent: "+1.10%", positive: true },
//     { name: "SENSEX", value: "71,234.56", change: "+456.78", percent: "+0.64%", positive: true },
//     { name: "NIFTY BANK", value: "45,678.90", change: "-123.45", percent: "-0.27%", positive: false },
//   ];

//   const quickActions = [
//     { icon: <Plus className="w-5 h-5" />, label: "Buy Stocks", color: "emerald", href: "/dashboard/stocks" },
//     { icon: <ShoppingCart className="w-5 h-5" />, label: "Orders", color: "blue", href: "/dashboard/orders" },
//     { icon: <PieChart className="w-5 h-5" />, label: "Holdings", color: "purple", href: "/dashboard/holdings" },
//     { icon: <Wallet className="w-5 h-5" />, label: "Add Funds", color: "orange", href: "/dashboard/wallet" },
//   ];

//   const insights = [
//     { title: "Top Gainer", value: "RELIANCE", change: "+9.41%", icon: <TrendingUp className="w-5 h-5" />, color: "emerald" },
//     { title: "Today's P&L", value: "₹45,234", change: "+3.77%", icon: <DollarSign className="w-5 h-5" />, color: "blue" },
//     { title: "Win Rate", value: "68%", change: "Last 30 days", icon: <Target className="w-5 h-5" />, color: "purple" },
//   ];

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
//       {/* Animated Background */}
//       <div className="absolute inset-0 overflow-hidden pointer-events-none">
//         <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl animate-pulse"></div>
//         <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
//       </div>

//       {/* Top Navigation */}
//       <nav className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-xl border-b border-slate-800/50">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6">
//           <div className="flex items-center justify-between h-16">
//             {/* Logo */}
//             <div className="flex items-center gap-3">
//               <button
//                 onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
//                 className="lg:hidden p-2 text-slate-400 hover:text-white transition-colors"
//               >
//                 {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
//               </button>
//               <div className="flex items-center gap-2">
//                 <div className="w-9 h-9 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg flex items-center justify-center">
//                   <TrendingUp className="w-5 h-5 text-white" />
//                 </div>
//                 <span className="text-xl font-bold text-white hidden sm:block">TradeX</span>
//               </div>
//             </div>

//             {/* Search */}
//             <div className="hidden md:flex flex-1 max-w-md mx-8">
//               <div className="relative w-full">
//                 <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-500" />
//                 <input
//                   type="text"
//                   placeholder="Search stocks, indices..."
//                   className="w-full pl-10 pr-4 py-2 bg-slate-900/50 border border-slate-800 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500/50 transition-colors"
//                 />
//               </div>
//             </div>

//             {/* Right Actions */}
//             <div className="flex items-center gap-3">
//               <button className="relative p-2 text-slate-400 hover:text-white transition-colors">
//                 <Bell className="w-5 h-5" />
//                 <span className="absolute top-1 right-1 w-2 h-2 bg-emerald-500 rounded-full"></span>
//               </button>
//               <button className="p-2 text-slate-400 hover:text-white transition-colors hidden sm:block">
//                 <Settings className="w-5 h-5" />
//               </button>
//               <div className="flex items-center gap-2 ml-2 pl-3 border-l border-slate-800">
//                 <div className="w-9 h-9 bg-gradient-to-br from-emerald-500 to-blue-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
//                   {userData.avatar}
//                 </div>
//                 <div className="hidden lg:block">
//                   <div className="text-sm font-semibold text-white">{userData.name}</div>
//                   <div className="text-xs text-slate-500">{userData.email}</div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Market Status Bar */}
//         <div className="border-t border-slate-800/50 bg-slate-950/50">
//           <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2">
//             <div className="flex items-center justify-between text-xs">
//               <div className="flex items-center gap-6 overflow-x-auto">
//                 {marketIndices.map((index, idx) => (
//                   <div key={idx} className="flex items-center gap-2 whitespace-nowrap">
//                     <span className="text-slate-400">{index.name}</span>
//                     <span className="text-white font-semibold">{index.value}</span>
//                     <span className={`font-semibold ${index.positive ? 'text-emerald-400' : 'text-red-400'}`}>
//                       {index.percent}
//                     </span>
//                   </div>
//                 ))}
//               </div>
//               <div className="flex items-center gap-2 text-slate-400">
//                 <Clock className="w-3 h-3" />
//                 <span>{currentTime.toLocaleTimeString('en-IN')}</span>
//               </div>
//             </div>
//           </div>
//         </div>
//       </nav>

//       {/* Main Content */}
//       <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-6">
//         {/* Welcome Section */}
//         <div className="mb-8">
//           <div className="flex items-center justify-between mb-2">
//             <div>
//               <h1 className="text-2xl sm:text-3xl font-bold text-white">
//                 Welcome back, {userData.name.split(' ')[0]}! 👋
//               </h1>
//               <p className="text-slate-400 mt-1">Here's your portfolio overview</p>
//             </div>
//             <div className="hidden sm:flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-lg">
//               <Sparkles className="w-4 h-4 text-emerald-400" />
//               <span className="text-emerald-400 text-sm font-semibold">Market Open</span>
//             </div>
//           </div>
//         </div>

//         {/* Portfolio Summary Cards */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
//           {/* Total Value */}
//           <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-xl p-5 hover:border-emerald-500/50 transition-all">
//             <div className="flex items-center justify-between mb-3">
//               <span className="text-slate-400 text-sm">Total Value</span>
//               <button onClick={() => setIsBalanceVisible(!isBalanceVisible)} className="text-slate-500 hover:text-white transition-colors">
//                 {isBalanceVisible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
//               </button>
//             </div>
//             <div className="flex items-baseline gap-2 mb-2">
//               <span className="text-3xl font-bold text-white">
//                 {isBalanceVisible ? `₹${userData.currentValue.toLocaleString('en-IN')}` : '₹••••••'}
//               </span>
//             </div>
//             <div className="flex items-center gap-1 text-emerald-400 text-sm font-semibold">
//               <TrendingUp className="w-4 h-4" />
//               <span>+{userData.returns}%</span>
//               <span className="text-slate-500">All time</span>
//             </div>
//           </div>

//           {/* Today's P&L */}
//           <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-xl p-5 hover:border-blue-500/50 transition-all">
//             <div className="flex items-center justify-between mb-3">
//               <span className="text-slate-400 text-sm">Today's P&L</span>
//               <Activity className="w-5 h-5 text-blue-400" />
//             </div>
//             <div className="flex items-baseline gap-2 mb-2">
//               <span className="text-3xl font-bold text-white">
//                 ₹{userData.todayPnL.toLocaleString('en-IN')}
//               </span>
//             </div>
//             <div className="flex items-center gap-1 text-emerald-400 text-sm font-semibold">
//               <ArrowUpRight className="w-4 h-4" />
//               <span>+3.77%</span>
//               <span className="text-slate-500">Since open</span>
//             </div>
//           </div>

//           {/* Total P&L */}
//           <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-xl p-5 hover:border-purple-500/50 transition-all">
//             <div className="flex items-center justify-between mb-3">
//               <span className="text-slate-400 text-sm">Total P&L</span>
//               <BarChart3 className="w-5 h-5 text-purple-400" />
//             </div>
//             <div className="flex items-baseline gap-2 mb-2">
//               <span className="text-3xl font-bold text-white">
//                 ₹{userData.totalPnL.toLocaleString('en-IN')}
//               </span>
//             </div>
//             <div className="flex items-center gap-1 text-emerald-400 text-sm font-semibold">
//               <TrendingUp className="w-4 h-4" />
//               <span>+{((userData.totalPnL / userData.invested) * 100).toFixed(2)}%</span>
//               <span className="text-slate-500">Returns</span>
//             </div>
//           </div>

//           {/* Invested */}
//           <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-xl p-5 hover:border-orange-500/50 transition-all">
//             <div className="flex items-center justify-between mb-3">
//               <span className="text-slate-400 text-sm">Invested</span>
//               <Wallet className="w-5 h-5 text-orange-400" />
//             </div>
//             <div className="flex items-baseline gap-2 mb-2">
//               <span className="text-3xl font-bold text-white">
//                 ₹{userData.invested.toLocaleString('en-IN')}
//               </span>
//             </div>
//             <div className="flex items-center gap-1 text-slate-500 text-sm">
//               <span>Available: ₹2,45,000</span>
//             </div>
//           </div>
//         </div>

//         {/* Quick Actions */}
//         <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
//           {quickActions.map((action, idx) => (
//             <Link key={idx} href={action.href}>
//               <button className="w-full p-4 bg-slate-900/50 hover:bg-slate-800/50 border border-slate-800 hover:border-emerald-500/50 rounded-xl transition-all group">
//                 <div className="flex flex-col items-center gap-2">
//                   <div className="text-emerald-400 group-hover:scale-110 transition-transform">
//                     {action.icon}
//                   </div>
//                   <span className="text-sm text-white font-semibold">{action.label}</span>
//                 </div>
//               </button>
//             </Link>
//           ))}
//         </div>

//         {/* Insights Row */}
//         <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
//           {insights.map((insight, idx) => (
//             <div key={idx} className="bg-slate-900/50 border border-slate-800 rounded-xl p-4 hover:border-emerald-500/50 transition-all">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <div className="text-slate-400 text-xs mb-1">{insight.title}</div>
//                   <div className="text-2xl font-bold text-emerald-400 mb-1">{insight.value}</div>
//                   <div className="text-xs text-slate-500">{insight.change}</div>
//                 </div>
//                 <div className="w-12 h-12 bg-emerald-500/10 rounded-lg flex items-center justify-center text-emerald-400">
//                   {insight.icon}
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Main Content Grid */}
//         <div className="grid lg:grid-cols-3 gap-6">
//           {/* Holdings */}
//           <div className="lg:col-span-2 bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-xl p-6">
//             <div className="flex items-center justify-between mb-6">
//               <h2 className="text-xl font-bold text-white">Top Holdings</h2>
//               <Link href="/dashboard/holdings">
//                 <button className="text-emerald-400 text-sm font-semibold hover:text-emerald-300 transition-colors flex items-center gap-1">
//                   View All
//                   <ChevronRight className="w-4 h-4" />
//                 </button>
//               </Link>
//             </div>

//             <div className="space-y-3">
//               {holdings.map((holding, idx) => (
//                 <div key={idx} className="bg-slate-950/50 rounded-lg p-4 border border-slate-800 hover:border-slate-700 transition-all group">
//                   <div className="flex items-center justify-between">
//                     <div className="flex-1">
//                       <div className="flex items-center gap-3 mb-2">
//                         <span className="text-white font-semibold">{holding.symbol}</span>
//                         <span className="text-xs text-slate-500">Qty: {holding.qty}</span>
//                       </div>
//                       <div className="flex items-center gap-4 text-sm">
//                         <span className="text-slate-400">Avg: ₹{holding.avgPrice.toFixed(2)}</span>
//                         <span className="text-white font-semibold">LTP: ₹{holding.ltp.toFixed(2)}</span>
//                       </div>
//                     </div>
//                     <div className="text-right">
//                       <div className={`text-lg font-bold mb-1 ${holding.pnl >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
//                         ₹{holding.pnl.toFixed(2)}
//                       </div>
//                       <div className={`text-sm font-semibold flex items-center justify-end gap-1 ${holding.change >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
//                         {holding.change >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
//                         <span>{holding.change >= 0 ? '+' : ''}{holding.change.toFixed(2)}%</span>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Watchlist & Orders Sidebar */}
//           <div className="space-y-6">
//             {/* Watchlist */}
//             <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-xl p-6">
//               <div className="flex items-center justify-between mb-4">
//                 <h2 className="text-lg font-bold text-white">Watchlist</h2>
//                 <button className="text-slate-400 hover:text-yellow-400 transition-colors">
//                   <Star className="w-5 h-5" />
//                 </button>
//               </div>

//               <div className="space-y-3">
//                 {watchlist.map((stock, idx) => (
//                   <div key={idx} className="flex items-center justify-between p-3 bg-slate-950/50 rounded-lg border border-slate-800 hover:border-slate-700 transition-all">
//                     <div>
//                       <div className="text-white font-semibold text-sm mb-1">{stock.symbol}</div>
//                       <div className="text-white text-lg font-bold">₹{stock.ltp.toFixed(2)}</div>
//                     </div>
//                     <div className={`text-right ${stock.positive ? 'text-emerald-400' : 'text-red-400'}`}>
//                       <div className="flex items-center gap-1 text-sm font-semibold">
//                         {stock.positive ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
//                         <span>{stock.positive ? '+' : ''}{stock.change}%</span>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>

//               <Link href="/dashboard/stocks">
//                 <button className="w-full mt-4 py-2 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/20 rounded-lg text-emerald-400 font-semibold transition-all">
//                   Add More Stocks
//                 </button>
//               </Link>
//             </div>

//             {/* Recent Orders */}
//             <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-xl p-6">
//               <div className="flex items-center justify-between mb-4">
//                 <h2 className="text-lg font-bold text-white">Recent Orders</h2>
//                 <Link href="/dashboard/orders">
//                   <button className="text-emerald-400 text-sm font-semibold hover:text-emerald-300 transition-colors">
//                     View All
//                   </button>
//                 </Link>
//               </div>

//               <div className="space-y-3">
//                 {recentOrders.map((order, idx) => (
//                   <div key={idx} className="p-3 bg-slate-950/50 rounded-lg border border-slate-800">
//                     <div className="flex items-center justify-between mb-2">
//                       <span className="text-white font-semibold text-sm">{order.symbol}</span>
//                       <span className={`px-2 py-0.5 rounded text-xs font-semibold ${
//                         order.type === 'BUY' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'
//                       }`}>
//                         {order.type}
//                       </span>
//                     </div>
//                     <div className="flex items-center justify-between text-xs text-slate-400">
//                       <span>{order.qty} @ ₹{order.price}</span>
//                       <span>{order.time}</span>
//                     </div>
//                     <div className={`mt-2 text-xs font-semibold ${
//                       order.status === 'completed' ? 'text-emerald-400' : 'text-yellow-400'
//                     }`}>
//                       {order.status === 'completed' ? '✓ Completed' : '⏱ Pending'}
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import { useStockStore } from "../../store/useStockStore";
import { useProfileStore } from "../../store/useProfileStore";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  TrendingUp,
  TrendingDown,
  Wallet,
  Briefcase,
  FileText,
  Activity,
  ArrowUpRight,
  ArrowDownRight,
  ChevronRight,
  DollarSign,
  Package,
  ShoppingCart,
  PieChart,
  BarChart3,
  LineChart,
  Target,
  Zap,
  User,
  Award,
  Clock,
  Layers,
  Box,
} from "lucide-react";

export default function DashboardPage() {
  const {
    holdings,
    orders,
    stocks,
    fetchHoldings,
    fetchOrders,
    fetchStocks,
    loading,
  } = useStockStore();
  const { profile, fetchProfile } = useProfileStore();

  useEffect(() => {
    fetchProfile();
    fetchHoldings();
    fetchOrders();
    fetchStocks();
  }, [fetchProfile, fetchHoldings, fetchOrders, fetchStocks]);

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

  // Recent orders stats
  const recentOrders = orders.slice(0, 5);
  const buyOrders = orders.filter((o) => o.type === "buy").length;
  const sellOrders = orders.filter((o) => o.type === "sell").length;

  // Top performing stocks
  const topGainers = holdings
    .map((h) => ({
      ...h,
      pnl: (h.stock.currentPrice - h.buyPrice) * h.quantity,
      pnlPercentage: ((h.stock.currentPrice - h.buyPrice) / h.buyPrice) * 100,
    }))
    .sort((a, b) => b.pnlPercentage - a.pnlPercentage)
    .slice(0, 3);

  const topLosers = holdings
    .map((h) => ({
      ...h,
      pnl: (h.stock.currentPrice - h.buyPrice) * h.quantity,
      pnlPercentage: ((h.stock.currentPrice - h.buyPrice) / h.buyPrice) * 100,
    }))
    .sort((a, b) => a.pnlPercentage - b.pnlPercentage)
    .slice(0, 3);

  if (loading && !profile) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-emerald-500/30 border-t-emerald-500 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-400">Loading dashboard...</p>
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
          <div className="flex items-center justify-between mb-2">
            {/* Left side - Title + Welcome */}
            <div>
              <h1 className="text-4xl font-bold text-white mb-2 flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-blue-600 rounded-xl flex items-center justify-center">
                  <BarChart3 className="w-6 h-6 text-white" />
                </div>
                Trading Dashboard
              </h1>
              <p className="text-slate-400">
                Welcome back, {profile?.name || "Trader"}! Here's your portfolio
                overview
              </p>
            </div>

            {/* Right side - Menu options */}
            <div className="flex items-center gap-4 text-sm text-slate-400">
              <Link
                href="/dashboard/holdings"
                className="flex items-center gap-1 px-3 py-2 rounded-lg bg-slate-800/60 hover:bg-slate-700 transition-colors hover:text-white"
              >
                <Layers className="w-4 h-4 text-emerald-400" />
                <span>Holdings</span>
              </Link>

              <Link
                href="/dashboard/stocks"
                className="flex items-center gap-1 px-3 py-2 rounded-lg bg-slate-800/60 hover:bg-slate-700 transition-colors hover:text-white"
              >
                <Box className="w-4 h-4 text-blue-400" />
                <span>Stocks</span>
              </Link>

              <Link
                href="/dashboard/orders"
                className="flex items-center gap-1 px-3 py-2 rounded-lg bg-slate-800/60 hover:bg-slate-700 transition-colors hover:text-white"
              >
                <FileText className="w-4 h-4 text-purple-400" />
                <span>Orders</span>
              </Link>
              {/* Highlighted Profile */}
              <Link
                href="/dashboard/profile"
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 via-emerald-600 to-blue-500 text-white font-semibold shadow-lg shadow-emerald-500/50 hover:scale-105 transition-transform duration-300"
              >
                <User className="w-5 h-5 text-white" />
                <span className="text-sm sm:text-base">Profile</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Main Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card className="bg-gradient-to-br from-blue-500/10 to-blue-600/5 border-blue-500/20 hover:border-blue-500/40 transition-all duration-300 hover:scale-105 animate-in fade-in slide-in-from-bottom">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm text-slate-400">Available Balance</p>
                <Wallet className="w-5 h-5 text-blue-400" />
              </div>
              <p className="text-3xl font-bold text-white mb-1">
                ₹
                {profile?.balance.toLocaleString("en-IN", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </p>
              <p className="text-xs text-slate-500">Ready to invest</p>
            </CardContent>
          </Card>

          <Card
            className="bg-gradient-to-br from-purple-500/10 to-purple-600/5 border-purple-500/20 hover:border-purple-500/40 transition-all duration-300 hover:scale-105 animate-in fade-in slide-in-from-bottom"
            style={{ animationDelay: "50ms" }}
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm text-slate-400">Portfolio Value</p>
                <DollarSign className="w-5 h-5 text-purple-400" />
              </div>
              <p className="text-3xl font-bold text-white mb-1">
                ₹
                {currentValue.toLocaleString("en-IN", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </p>
              <p className="text-xs text-slate-500">Current holdings</p>
            </CardContent>
          </Card>

          <Card
            className={`bg-gradient-to-br ${
              totalPnL >= 0
                ? "from-emerald-500/10 to-emerald-600/5 border-emerald-500/20 hover:border-emerald-500/40"
                : "from-red-500/10 to-red-600/5 border-red-500/20 hover:border-red-500/40"
            } transition-all duration-300 hover:scale-105 animate-in fade-in slide-in-from-bottom`}
            style={{ animationDelay: "100ms" }}
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm text-slate-400">Total P&L</p>
                {totalPnL >= 0 ? (
                  <TrendingUp className="w-5 h-5 text-emerald-400" />
                ) : (
                  <TrendingDown className="w-5 h-5 text-red-400" />
                )}
              </div>
              <p
                className={`text-3xl font-bold mb-1 ${
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
                className={`text-xs flex items-center gap-1 ${
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

          <Card
            className="bg-gradient-to-br from-amber-500/10 to-amber-600/5 border-amber-500/20 hover:border-amber-500/40 transition-all duration-300 hover:scale-105 animate-in fade-in slide-in-from-bottom"
            style={{ animationDelay: "150ms" }}
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm text-slate-400">Active Holdings</p>
                <Package className="w-5 h-5 text-amber-400" />
              </div>
              <p className="text-3xl font-bold text-white mb-1">
                {holdings.length}
              </p>
              <p className="text-xs text-slate-500">
                {orders.length} total orders
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <a href="/dashboard/stocks" className="block">
            <Card className="bg-slate-900/50 backdrop-blur-xl border-slate-800 hover:border-emerald-500/40 transition-all duration-300 hover:scale-105 cursor-pointer group animate-in fade-in slide-in-from-left">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-emerald-500/20 rounded-xl flex items-center justify-center group-hover:bg-emerald-500/30 transition-colors">
                      <ShoppingCart className="w-6 h-6 text-emerald-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-1">
                        Buy Stocks
                      </h3>
                      <p className="text-sm text-slate-400">
                        {stocks.length} stocks available
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-slate-600 group-hover:text-emerald-400 transition-colors" />
                </div>
              </CardContent>
            </Card>
          </a>

          <a href="/dashboard/holdings" className="block">
            <Card
              className="bg-slate-900/50 backdrop-blur-xl border-slate-800 hover:border-blue-500/40 transition-all duration-300 hover:scale-105 cursor-pointer group animate-in fade-in slide-in-from-bottom"
              style={{ animationDelay: "50ms" }}
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center group-hover:bg-blue-500/30 transition-colors">
                      <Briefcase className="w-6 h-6 text-blue-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-1">
                        My Holdings
                      </h3>
                      <p className="text-sm text-slate-400">
                        {holdings.length} active positions
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-slate-600 group-hover:text-blue-400 transition-colors" />
                </div>
              </CardContent>
            </Card>
          </a>

          <a href="/dashboard/orders" className="block">
            <Card
              className="bg-slate-900/50 backdrop-blur-xl border-slate-800 hover:border-purple-500/40 transition-all duration-300 hover:scale-105 cursor-pointer group animate-in fade-in slide-in-from-right"
              style={{ animationDelay: "100ms" }}
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center group-hover:bg-purple-500/30 transition-colors">
                      <FileText className="w-6 h-6 text-purple-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-1">
                        Order History
                      </h3>
                      <p className="text-sm text-slate-400">
                        {orders.length} total orders
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-slate-600 group-hover:text-purple-400 transition-colors" />
                </div>
              </CardContent>
            </Card>
          </a>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Top Performers */}
          <Card className="bg-slate-900/50 backdrop-blur-xl border-slate-800 shadow-2xl animate-in fade-in slide-in-from-left">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                  <Award className="w-5 h-5 text-emerald-400" />
                  Top Performers
                </h3>
                <a href="/dashboard/holdings">
                  <Button
                    className="bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/20 hover:border-emerald-500/40"
                    size="sm"
                  >
                    View All
                  </Button>
                </a>
              </div>
              <div className="space-y-3">
                {topGainers.length > 0 ? (
                  topGainers.map((holding, index) => (
                    <div
                      key={holding._id}
                      className="flex items-center justify-between p-4 bg-slate-950/30 rounded-xl border border-slate-800 hover:border-emerald-500/30 transition-all"
                    >
                      <div>
                        <p className="font-semibold text-white">
                          {holding.stock.companyName}
                        </p>
                        <p className="text-xs text-slate-400">
                          {holding.quantity} shares
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-emerald-400">
                          +{holding.pnlPercentage.toFixed(2)}%
                        </p>
                        <p className="text-xs text-slate-400">
                          ₹{holding.pnl.toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <Package className="w-12 h-12 text-slate-700 mx-auto mb-3" />
                    <p className="text-slate-500">No holdings yet</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Recent Orders */}
          <Card className="bg-slate-900/50 backdrop-blur-xl border-slate-800 shadow-2xl animate-in fade-in slide-in-from-right">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                  <Activity className="w-5 h-5 text-blue-400" />
                  Recent Activity
                </h3>
                <a href="/dashboard/orders">
                  <Button
                    className="bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 border border-blue-500/20 hover:border-blue-500/40"
                    size="sm"
                  >
                    View All
                  </Button>
                </a>
              </div>
              <div className="space-y-3">
                {recentOrders.length > 0 ? (
                  recentOrders.map((order, index) => {
                    const isBuy = order.type === "buy";
                    return (
                      <div
                        key={order._id}
                        className="flex items-center justify-between p-4 bg-slate-950/30 rounded-xl border border-slate-800"
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                              isBuy ? "bg-emerald-500/20" : "bg-red-500/20"
                            }`}
                          >
                            {isBuy ? (
                              <ArrowDownRight className="w-4 h-4 text-emerald-400" />
                            ) : (
                              <ArrowUpRight className="w-4 h-4 text-red-400" />
                            )}
                          </div>
                          <div>
                            <p className="font-semibold text-white text-sm">
                              {order.stock.companyName}
                            </p>
                            <p className="text-xs text-slate-400">
                              {order.quantity} shares @ ₹
                              {order.price.toFixed(2)}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-semibold ${
                              isBuy
                                ? "bg-emerald-500/20 text-emerald-400"
                                : "bg-red-500/20 text-red-400"
                            }`}
                          >
                            {order.type.toUpperCase()}
                          </span>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="text-center py-8">
                    <FileText className="w-12 h-12 text-slate-700 mx-auto mb-3" />
                    <p className="text-slate-500">No orders yet</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Portfolio Distribution */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2 bg-slate-900/50 backdrop-blur-xl border-slate-800 shadow-2xl animate-in fade-in slide-in-from-left">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                <PieChart className="w-5 h-5 text-purple-400" />
                Portfolio Allocation
              </h3>
              {holdings.length > 0 ? (
                <div className="space-y-4">
                  {holdings.map((holding, index) => {
                    const allocation =
                      ((holding.stock.currentPrice * holding.quantity) /
                        currentValue) *
                      100;
                    return (
                      <div key={holding._id}>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm text-white font-medium">
                            {holding.stock.companyName}
                          </span>
                          <span className="text-sm text-slate-400">
                            {allocation.toFixed(1)}%
                          </span>
                        </div>
                        <div className="w-full bg-slate-800 rounded-full h-2">
                          <div
                            className="bg-gradient-to-r from-emerald-500 to-blue-500 h-2 rounded-full transition-all duration-500"
                            style={{ width: `${allocation}%` }}
                          ></div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-12">
                  <PieChart className="w-16 h-16 text-slate-700 mx-auto mb-4" />
                  <p className="text-slate-500">
                    Start investing to see your portfolio allocation
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Trading Stats */}
          <Card className="bg-slate-900/50 backdrop-blur-xl border-slate-800 shadow-2xl animate-in fade-in slide-in-from-right">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                <Target className="w-5 h-5 text-amber-400" />
                Trading Stats
              </h3>
              <div className="space-y-4">
                <div className="p-4 bg-slate-950/30 rounded-xl border border-slate-800">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-slate-400">Buy Orders</span>
                    <TrendingUp className="w-4 h-4 text-emerald-400" />
                  </div>
                  <p className="text-2xl font-bold text-white">{buyOrders}</p>
                </div>
                <div className="p-4 bg-slate-950/30 rounded-xl border border-slate-800">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-slate-400">Sell Orders</span>
                    <TrendingDown className="w-4 h-4 text-red-400" />
                  </div>
                  <p className="text-2xl font-bold text-white">{sellOrders}</p>
                </div>
                <div className="p-4 bg-slate-950/30 rounded-xl border border-slate-800">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-slate-400">Win Rate</span>
                    <Zap className="w-4 h-4 text-amber-400" />
                  </div>
                  <p className="text-2xl font-bold text-white">
                    {holdings.length > 0
                      ? ((topGainers.length / holdings.length) * 100).toFixed(0)
                      : 0}
                    %
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
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
