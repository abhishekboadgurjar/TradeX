// "use client";

// import { useState, useEffect } from "react";
// import Link from "next/link";
// import {
//   TrendingUp,
//   Shield,
//   Zap,
//   BarChart3,
//   ArrowRight,
//   Play,
//   ChevronRight,
//   Star,
//   Users,
//   Award,
//   Globe,
//   Lock,
//   Activity,
//   Sparkles,
//   LineChart,
// } from "lucide-react";

// export default function HomePage() {
//   const [scrollY, setScrollY] = useState(0);
//   const [currentStat, setCurrentStat] = useState(0);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   useEffect(() => {
//     const handleScroll = () => setScrollY(window.scrollY);
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   useEffect(() => {
//     const user = localStorage.getItem("UserData"); // or get from context
//     if (user) setIsLoggedIn(true);
//   }, []);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentStat((prev) => (prev + 1) % 4);
//     }, 3000);
//     return () => clearInterval(interval);
//   }, []);

//   const marketData = [
//     {
//       symbol: "NIFTY 50",
//       price: "21,456.78",
//       change: "+2.34%",
//       positive: true,
//     },
//     { symbol: "SENSEX", price: "71,234.56", change: "+1.87%", positive: true },
//     {
//       symbol: "BANKNIFTY",
//       price: "45,678.90",
//       change: "-0.45%",
//       positive: false,
//     },
//     {
//       symbol: "FINNIFTY",
//       price: "19,876.54",
//       change: "+3.21%",
//       positive: true,
//     },
//   ];

//   const features = [
//     {
//       icon: <Zap className="w-8 h-8" />,
//       title: "Lightning Fast",
//       description:
//         "Execute trades in milliseconds with our advanced infrastructure",
//       color: "emerald",
//     },
//     {
//       icon: <Shield className="w-8 h-8" />,
//       title: "Bank-Grade Security",
//       description: "Your investments protected with military-grade encryption",
//       color: "blue",
//     },
//     {
//       icon: <BarChart3 className="w-8 h-8" />,
//       title: "Real-Time Analytics",
//       description: "Make informed decisions with live market data and insights",
//       color: "purple",
//     },
//     {
//       icon: <Globe className="w-8 h-8" />,
//       title: "Global Markets",
//       description: "Access stocks from NSE, BSE, and international exchanges",
//       color: "orange",
//     },
//   ];

//   const stats = [
//     {
//       label: "Active Traders",
//       value: "500K+",
//       icon: <Users className="w-6 h-6" />,
//     },
//     {
//       label: "Daily Volume",
//       value: "₹1000Cr+",
//       icon: <Activity className="w-6 h-6" />,
//     },
//     {
//       label: "Avg Response",
//       value: "<50ms",
//       icon: <Zap className="w-6 h-6" />,
//     },
//     {
//       label: "Trust Score",
//       value: "4.9/5",
//       icon: <Star className="w-6 h-6" />,
//     },
//   ];

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 overflow-hidden">
//       {/* Animated Background Elements */}
//       <div className="absolute inset-0 overflow-hidden pointer-events-none">
//         <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-pulse"></div>
//         <div
//           className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"
//           style={{ animationDelay: "1s" }}
//         ></div>
//         <div
//           className="absolute top-1/2 left-1/2 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"
//           style={{ animationDelay: "2s" }}
//         ></div>
//       </div>

//       {/* Live Market Ticker */}
//       <div className="sticky top-0 left-0 right-0 bg-slate-950/80 backdrop-blur-md border-b border-slate-800/50 z-50">
//         <div className="overflow-hidden py-3">
//           <div className="flex gap-8 animate-marquee whitespace-nowrap">
//             {[...marketData, ...marketData].map((item, idx) => (
//               <div key={idx} className="flex items-center gap-3 text-sm">
//                 <span className="font-semibold text-slate-300">
//                   {item.symbol}
//                 </span>
//                 <span className="text-white font-mono">{item.price}</span>
//                 <span
//                   className={`font-semibold ${
//                     item.positive ? "text-emerald-400" : "text-red-400"
//                   }`}
//                 >
//                   {item.change}
//                 </span>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Navigation */}
//       {/* Navigation */}
//       <nav className="relative z-40 border-b border-slate-800/50 bg-slate-950/50 backdrop-blur-sm">
//         <div className="max-w-7xl mx-auto px-6 py-4">
//           <div className="flex items-center justify-between">
//             {/* Logo */}
//             <div className="flex items-center gap-2">
//               <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg flex items-center justify-center">
//                 <TrendingUp className="w-6 h-6 text-white" />
//               </div>
//               <span className="text-2xl font-bold text-white">TradeX</span>
//             </div>

//             {/* Desktop Links */}
//             <div className="hidden md:flex items-center gap-8">
//               <a
//                 href="#features"
//                 className="text-slate-300 hover:text-white transition-colors"
//               >
//                 Features
//               </a>
//               <a
//                 href="#about"
//                 className="text-slate-300 hover:text-white transition-colors"
//               >
//                 About
//               </a>
//               <a
//                 href="#pricing"
//                 className="text-slate-300 hover:text-white transition-colors"
//               >
//                 Pricing
//               </a>
//             </div>

//             {/* Right Side - Auth / Dashboard */}
//             <div className="flex items-center gap-4">
//               {!isLoggedIn ? (
//                 <>
//                   <Link href="/auth/login">
//                     <button className="px-4 py-2 text-slate-300 hover:text-white transition-colors">
//                       Login
//                     </button>
//                   </Link>
//                   <Link href="/auth/register">
//                     <button className="px-6 py-2 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white rounded-lg font-semibold transition-all transform hover:scale-105 shadow-lg shadow-emerald-500/25">
//                       Get Started
//                     </button>
//                   </Link>
//                 </>
//               ) : (
//                 <Link href="/dashboard">
//                   <button className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-all transform hover:scale-105 shadow-lg shadow-blue-500/25">
//                     Dashboard
//                   </button>
//                 </Link>
//               )}
//             </div>
//           </div>
//         </div>
//       </nav>

//       {/* Hero Section */}
//       <section className="relative z-10 max-w-7xl mx-auto px-6 pt-20 pb-32">
//         <div className="grid lg:grid-cols-2 gap-12 items-center">
//           <div className="space-y-8 animate-in fade-in slide-in-from-left duration-700">
//             <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-emerald-400 text-sm">
//               <Sparkles className="w-4 h-4" />
//               <span>Trusted by 500,000+ traders</span>
//             </div>

//             <h1 className="text-5xl lg:text-7xl font-bold text-white leading-tight">
//               Trade Smarter,
//               <br />
//               <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-500">
//                 Grow Faster
//               </span>
//             </h1>

//             <p className="text-xl text-slate-400 leading-relaxed max-w-xl">
//               Experience the future of trading with zero commission, real-time
//               analytics, and institutional-grade security. Start your journey to
//               financial freedom today.
//             </p>

//             <div className="flex flex-col sm:flex-row gap-4">
//               <Link href="/dashboard/stocks">
//                 <button className="group px-8 py-4 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white rounded-xl font-semibold transition-all transform hover:scale-105 shadow-2xl shadow-emerald-500/25 flex items-center justify-center gap-2">
//                   Start Trading Now
//                   <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
//                 </button>
//               </Link>
//               <button className="group px-8 py-4 bg-slate-800/50 hover:bg-slate-800 border border-slate-700 text-white rounded-xl font-semibold transition-all flex items-center justify-center gap-2">
//                 <Play className="w-5 h-5" />
//                 Watch Demo
//               </button>
//             </div>

//             {/* Live Stats */}
//             <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-8">
//               {stats.map((stat, idx) => (
//                 <div
//                   key={idx}
//                   className={`p-4 bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-xl transition-all duration-500 ${
//                     currentStat === idx
//                       ? "scale-105 border-emerald-500/50 shadow-lg shadow-emerald-500/10"
//                       : ""
//                   }`}
//                 >
//                   <div className="text-emerald-400 mb-2">{stat.icon}</div>
//                   <div className="text-2xl font-bold text-white mb-1">
//                     {stat.value}
//                   </div>
//                   <div className="text-xs text-slate-500">{stat.label}</div>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Dashboard Preview */}
//           <div className="relative animate-in fade-in slide-in-from-right duration-700 delay-300">
//             <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-blue-500/20 blur-3xl"></div>
//             <div className="relative bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-2xl p-8 shadow-2xl">
//               <div className="grid grid-cols-2 gap-4 mb-6">
//                 {[
//                   {
//                     title: "Holdings",
//                     value: "₹12,45,678",
//                     change: "+12.5%",
//                     positive: true,
//                   },
//                   {
//                     title: "P&L Today",
//                     value: "₹45,234",
//                     change: "+8.2%",
//                     positive: true,
//                   },
//                 ].map((item, idx) => (
//                   <div
//                     key={idx}
//                     className="bg-slate-950/50 rounded-xl p-4 border border-slate-800"
//                   >
//                     <div className="text-slate-500 text-sm mb-2">
//                       {item.title}
//                     </div>
//                     <div className="text-white text-2xl font-bold mb-1">
//                       {item.value}
//                     </div>
//                     <div
//                       className={`text-sm font-semibold ${
//                         item.positive ? "text-emerald-400" : "text-red-400"
//                       }`}
//                     >
//                       {item.change}
//                     </div>
//                   </div>
//                 ))}
//               </div>

//               {/* Quick Actions */}
//               <div className="grid grid-cols-2 gap-3">
//                 <Link href="/dashboard/holdings">
//                   <button className="w-full p-4 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/20 rounded-xl text-emerald-400 font-semibold transition-all group">
//                     <div className="flex items-center justify-between">
//                       <span>Holdings</span>
//                       <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
//                     </div>
//                   </button>
//                 </Link>
//                 <Link href="/dashboard/orders">
//                   <button className="w-full p-4 bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/20 rounded-xl text-blue-400 font-semibold transition-all group">
//                     <div className="flex items-center justify-between">
//                       <span>Orders</span>
//                       <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
//                     </div>
//                   </button>
//                 </Link>
//                 <Link href="/dashboard/stocks">
//                   <button className="w-full p-4 bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/20 rounded-xl text-purple-400 font-semibold transition-all group">
//                     <div className="flex items-center justify-between">
//                       <span>Stocks</span>
//                       <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
//                     </div>
//                   </button>
//                 </Link>
//                 <Link href="/dashboard/profile">
//                   <button className="w-full p-4 bg-orange-500/10 hover:bg-orange-500/20 border border-orange-500/20 rounded-xl text-orange-400 font-semibold transition-all group">
//                     <div className="flex items-center justify-between">
//                       <span>Profile</span>
//                       <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
//                     </div>
//                   </button>
//                 </Link>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Features Section */}
//       <section
//         id="features"
//         className="relative z-10 max-w-7xl mx-auto px-6 py-20"
//       >
//         <div className="text-center mb-16">
//           <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
//             Why Choose TradeX?
//           </h2>
//           <p className="text-xl text-slate-400 max-w-2xl mx-auto">
//             Built for traders who demand the best in technology, security, and
//             performance
//           </p>
//         </div>

//         <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
//           {features.map((feature, idx) => (
//             <div
//               key={idx}
//               className="group p-6 bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl hover:border-emerald-500/50 transition-all duration-300 hover:transform hover:scale-105 hover:shadow-2xl hover:shadow-emerald-500/10"
//             >
//               <div
//                 className={`w-16 h-16 bg-${feature.color}-500/10 rounded-xl flex items-center justify-center text-${feature.color}-400 mb-4 group-hover:scale-110 transition-transform`}
//               >
//                 {feature.icon}
//               </div>
//               <h3 className="text-xl font-bold text-white mb-2">
//                 {feature.title}
//               </h3>
//               <p className="text-slate-400">{feature.description}</p>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* CTA Section */}
//       <section className="relative z-10 max-w-7xl mx-auto px-6 py-20">
//         <div className="relative bg-gradient-to-r from-emerald-500/10 to-blue-500/10 backdrop-blur-xl border border-slate-800 rounded-3xl p-12 overflow-hidden">
//           <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-blue-500/5"></div>
//           <div className="relative z-10 text-center max-w-3xl mx-auto">
//             <Award className="w-16 h-16 text-emerald-400 mx-auto mb-6" />
//             <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
//               Ready to Start Your Trading Journey?
//             </h2>
//             <p className="text-xl text-slate-400 mb-8">
//               Join thousands of successful traders. Open your account in
//               minutes.
//             </p>
//             <Link href="/dashboard/stocks">
//               <button className="px-10 py-5 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white text-lg rounded-xl font-bold transition-all transform hover:scale-105 shadow-2xl shadow-emerald-500/25">
//                 Open Free Account
//               </button>
//             </Link>
//           </div>
//         </div>
//       </section>

//       {/* Footer */}
//       <footer className="relative z-10 border-t border-slate-800/50 bg-slate-950/50 backdrop-blur-sm mt-20">
//         <div className="max-w-7xl mx-auto px-6 py-12">
//           <div className="grid md:grid-cols-4 gap-8 mb-8">
//             <div>
//               <div className="flex items-center gap-2 mb-4">
//                 <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg flex items-center justify-center">
//                   <TrendingUp className="w-5 h-5 text-white" />
//                 </div>
//                 <span className="text-xl font-bold text-white">TradeX</span>
//               </div>
//               <p className="text-slate-400 text-sm">
//                 Empowering traders with cutting-edge technology and unmatched
//                 security.
//               </p>
//             </div>
//             <div>
//               <h4 className="text-white font-semibold mb-4">Product</h4>
//               <ul className="space-y-2 text-slate-400 text-sm">
//                 <li>
//                   <a href="#" className="hover:text-white transition-colors">
//                     Features
//                   </a>
//                 </li>
//                 <li>
//                   <a href="#" className="hover:text-white transition-colors">
//                     Pricing
//                   </a>
//                 </li>
//                 <li>
//                   <a href="#" className="hover:text-white transition-colors">
//                     Security
//                   </a>
//                 </li>
//               </ul>
//             </div>
//             <div>
//               <h4 className="text-white font-semibold mb-4">Company</h4>
//               <ul className="space-y-2 text-slate-400 text-sm">
//                 <li>
//                   <a href="#" className="hover:text-white transition-colors">
//                     About
//                   </a>
//                 </li>
//                 <li>
//                   <a href="#" className="hover:text-white transition-colors">
//                     Careers
//                   </a>
//                 </li>
//                 <li>
//                   <a href="#" className="hover:text-white transition-colors">
//                     Contact
//                   </a>
//                 </li>
//               </ul>
//             </div>
//             <div>
//               <h4 className="text-white font-semibold mb-4">Legal</h4>
//               <ul className="space-y-2 text-slate-400 text-sm">
//                 <li>
//                   <a href="#" className="hover:text-white transition-colors">
//                     Privacy
//                   </a>
//                 </li>
//                 <li>
//                   <a href="#" className="hover:text-white transition-colors">
//                     Terms
//                   </a>
//                 </li>
//                 <li>
//                   <a href="#" className="hover:text-white transition-colors">
//                     Compliance
//                   </a>
//                 </li>
//               </ul>
//             </div>
//           </div>
//           <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
//             <p className="text-slate-500 text-sm">
//               © 2025 TradeX. All rights reserved.
//             </p>
//             <div className="flex items-center gap-2 text-slate-500 text-sm">
//               <Lock className="w-4 h-4" />
//               <span>Secured by 256-bit SSL encryption</span>
//             </div>
//           </div>
//         </div>
//       </footer>

//       <style jsx>{`
//         @keyframes marquee {
//           0% {
//             transform: translateX(0);
//           }
//           100% {
//             transform: translateX(-50%);
//           }
//         }
//         .animate-marquee {
//           animation: marquee 30s linear infinite;
//         }
//       `}</style>
//     </div>
//   );
// }

"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Cookies from "js-cookie";
import {
  TrendingUp,
  Shield,
  Zap,
  BarChart3,
  ArrowRight,
  Play,
  ChevronRight,
  Star,
  Users,
  Award,
  Globe,
  Lock,
  Activity,
  Sparkles,
  LineChart,
} from "lucide-react";

export default function HomePage() {
  const [scrollY, setScrollY] = useState(0);
  const [currentStat, setCurrentStat] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // Check if user is authenticated by checking for access token in cookies
    const accessToken = Cookies.get("access_token");
    setIsLoggedIn(!!accessToken);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStat((prev) => (prev + 1) % 4);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const marketData = [
    {
      symbol: "NIFTY 50",
      price: "21,456.78",
      change: "+2.34%",
      positive: true,
    },
    { symbol: "SENSEX", price: "71,234.56", change: "+1.87%", positive: true },
    {
      symbol: "BANKNIFTY",
      price: "45,678.90",
      change: "-0.45%",
      positive: false,
    },
    {
      symbol: "FINNIFTY",
      price: "19,876.54",
      change: "+3.21%",
      positive: true,
    },
  ];

  const features = [
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Lightning Fast",
      description:
        "Execute trades in milliseconds with our advanced infrastructure",
      color: "emerald",
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Bank-Grade Security",
      description: "Your investments protected with military-grade encryption",
      color: "blue",
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: "Real-Time Analytics",
      description: "Make informed decisions with live market data and insights",
      color: "purple",
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Global Markets",
      description: "Access stocks from NSE, BSE, and international exchanges",
      color: "orange",
    },
  ];

  const stats = [
    {
      label: "Active Traders",
      value: "500K+",
      icon: <Users className="w-6 h-6" />,
    },
    {
      label: "Daily Volume",
      value: "₹1000Cr+",
      icon: <Activity className="w-6 h-6" />,
    },
    {
      label: "Avg Response",
      value: "<50ms",
      icon: <Zap className="w-6 h-6" />,
    },
    {
      label: "Trust Score",
      value: "4.9/5",
      icon: <Star className="w-6 h-6" />,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/2 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      {/* Live Market Ticker */}
      <div className="sticky top-0 left-0 right-0 bg-slate-950/80 backdrop-blur-md border-b border-slate-800/50 z-50">
        <div className="overflow-hidden py-3">
          <div className="flex gap-8 animate-marquee whitespace-nowrap">
            {[...marketData, ...marketData].map((item, idx) => (
              <div key={idx} className="flex items-center gap-3 text-sm">
                <span className="font-semibold text-slate-300">
                  {item.symbol}
                </span>
                <span className="text-white font-mono">{item.price}</span>
                <span
                  className={`font-semibold ${
                    item.positive ? "text-emerald-400" : "text-red-400"
                  }`}
                >
                  {item.change}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="relative z-40 border-b border-slate-800/50 bg-slate-950/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-white">TradeX</span>
            </div>

            {/* Desktop Links */}
            <div className="hidden md:flex items-center gap-8">
              <a
                href="#features"
                className="text-slate-300 hover:text-white transition-colors"
              >
                Features
              </a>
              <a
                href="#about"
                className="text-slate-300 hover:text-white transition-colors"
              >
                About
              </a>
              <a
                href="#pricing"
                className="text-slate-300 hover:text-white transition-colors"
              >
                Pricing
              </a>
            </div>

            {/* Right Side - Auth / Dashboard */}
            <div className="flex items-center gap-4">
              {isLoggedIn ? (
                <Link href="/auth/verifypin">
                  <button className="px-6 py-2 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white rounded-lg font-semibold transition-all transform hover:scale-105 shadow-lg shadow-emerald-500/25">
                    Dashboard
                  </button>
                </Link>
              ) : (
                <>
                  <Link href="/auth/login">
                    <button className="px-4 py-2 text-slate-300 hover:text-white transition-colors">
                      Login
                    </button>
                  </Link>
                  <Link href="/auth/register">
                    <button className="px-6 py-2 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white rounded-lg font-semibold transition-all transform hover:scale-105 shadow-lg shadow-emerald-500/25">
                      Get Started
                    </button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 pt-20 pb-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 animate-in fade-in slide-in-from-left duration-700">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-emerald-400 text-sm">
              <Sparkles className="w-4 h-4" />
              <span>Trusted by 500,000+ traders</span>
            </div>

            <h1 className="text-5xl lg:text-7xl font-bold text-white leading-tight">
              Trade Smarter,
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-500">
                Grow Faster
              </span>
            </h1>

            <p className="text-xl text-slate-400 leading-relaxed max-w-xl">
              Experience the future of trading with zero commission, real-time
              analytics, and institutional-grade security. Start your journey to
              financial freedom today.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              {isLoggedIn ? (
                <Link href="/auth/verifypin">
                  <button className="group px-8 py-4 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white rounded-xl font-semibold transition-all transform hover:scale-105 shadow-2xl shadow-emerald-500/25 flex items-center justify-center gap-2">
                    Go to Dashboard
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </Link>
              ) : (
                <Link href="/auth/register">
                  <button className="group px-8 py-4 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white rounded-xl font-semibold transition-all transform hover:scale-105 shadow-2xl shadow-emerald-500/25 flex items-center justify-center gap-2">
                    Start Trading Now
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </Link>
              )}
              <button className="group px-8 py-4 bg-slate-800/50 hover:bg-slate-800 border border-slate-700 text-white rounded-xl font-semibold transition-all flex items-center justify-center gap-2">
                <Play className="w-5 h-5" />
                Watch Demo
              </button>
            </div>

            {/* Live Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-8">
              {stats.map((stat, idx) => (
                <div
                  key={idx}
                  className={`p-4 bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-xl transition-all duration-500 ${
                    currentStat === idx
                      ? "scale-105 border-emerald-500/50 shadow-lg shadow-emerald-500/10"
                      : ""
                  }`}
                >
                  <div className="text-emerald-400 mb-2">{stat.icon}</div>
                  <div className="text-2xl font-bold text-white mb-1">
                    {stat.value}
                  </div>
                  <div className="text-xs text-slate-500">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Dashboard Preview */}
          <div className="relative animate-in fade-in slide-in-from-right duration-700 delay-300">
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-blue-500/20 blur-3xl"></div>
            <div className="relative bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-2xl p-8 shadow-2xl">
              <div className="grid grid-cols-2 gap-4 mb-6">
                {[
                  {
                    title: "Holdings",
                    value: "₹12,45,678",
                    change: "+12.5%",
                    positive: true,
                  },
                  {
                    title: "P&L Today",
                    value: "₹45,234",
                    change: "+8.2%",
                    positive: true,
                  },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="bg-slate-950/50 rounded-xl p-4 border border-slate-800"
                  >
                    <div className="text-slate-500 text-sm mb-2">
                      {item.title}
                    </div>
                    <div className="text-white text-2xl font-bold mb-1">
                      {item.value}
                    </div>
                    <div
                      className={`text-sm font-semibold ${
                        item.positive ? "text-emerald-400" : "text-red-400"
                      }`}
                    >
                      {item.change}
                    </div>
                  </div>
                ))}
              </div>

              {/* Quick Actions */}
              <div className="grid grid-cols-2 gap-3">
                <Link href="/dashboard/holdings">
                  <button className="w-full p-4 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/20 rounded-xl text-emerald-400 font-semibold transition-all group">
                    <div className="flex items-center justify-between">
                      <span>Holdings</span>
                      <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </button>
                </Link>
                <Link href="/dashboard/orders">
                  <button className="w-full p-4 bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/20 rounded-xl text-blue-400 font-semibold transition-all group">
                    <div className="flex items-center justify-between">
                      <span>Orders</span>
                      <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </button>
                </Link>
                <Link href="/dashboard/stocks">
                  <button className="w-full p-4 bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/20 rounded-xl text-purple-400 font-semibold transition-all group">
                    <div className="flex items-center justify-between">
                      <span>Stocks</span>
                      <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </button>
                </Link>
                <Link href="/dashboard/profile">
                  <button className="w-full p-4 bg-orange-500/10 hover:bg-orange-500/20 border border-orange-500/20 rounded-xl text-orange-400 font-semibold transition-all group">
                    <div className="flex items-center justify-between">
                      <span>Profile</span>
                      <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section
        id="features"
        className="relative z-10 max-w-7xl mx-auto px-6 py-20"
      >
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
            Why Choose TradeX?
          </h2>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Built for traders who demand the best in technology, security, and
            performance
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="group p-6 bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl hover:border-emerald-500/50 transition-all duration-300 hover:transform hover:scale-105 hover:shadow-2xl hover:shadow-emerald-500/10"
            >
              <div
                className={`w-16 h-16 bg-${feature.color}-500/10 rounded-xl flex items-center justify-center text-${feature.color}-400 mb-4 group-hover:scale-110 transition-transform`}
              >
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-slate-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 py-20">
        <div className="relative bg-gradient-to-r from-emerald-500/10 to-blue-500/10 backdrop-blur-xl border border-slate-800 rounded-3xl p-12 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-blue-500/5"></div>
          <div className="relative z-10 text-center max-w-3xl mx-auto">
            <Award className="w-16 h-16 text-emerald-400 mx-auto mb-6" />
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Ready to Start Your Trading Journey?
            </h2>
            <p className="text-xl text-slate-400 mb-8">
              Join thousands of successful traders. Open your account in
              minutes.
            </p>
            {isLoggedIn ? (
              <Link href="/dashboard">
                <button className="px-10 py-5 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white text-lg rounded-xl font-bold transition-all transform hover:scale-105 shadow-2xl shadow-emerald-500/25">
                  Go to Dashboard
                </button>
              </Link>
            ) : (
              <Link href="/auth/register">
                <button className="px-10 py-5 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white text-lg rounded-xl font-bold transition-all transform hover:scale-105 shadow-2xl shadow-emerald-500/25">
                  Open Free Account
                </button>
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-slate-800/50 bg-slate-950/50 backdrop-blur-sm mt-20">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-white">TradeX</span>
              </div>
              <p className="text-slate-400 text-sm">
                Empowering traders with cutting-edge technology and unmatched
                security.
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Security
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Privacy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Terms
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Compliance
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-slate-500 text-sm">
              © 2025 TradeX. All rights reserved.
            </p>
            <div className="flex items-center gap-2 text-slate-500 text-sm">
              <Lock className="w-4 h-4" />
              <span>Secured by 256-bit SSL encryption</span>
            </div>
          </div>
        </div>
      </footer>

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
          animation: marquee 30s linear infinite;
        }
      `}</style>
    </div>
  );
}
