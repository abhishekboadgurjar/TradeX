// "use client";
// import React, { useEffect } from "react";
// import { useStockSocketStore } from "../../../store/useStockSocketStore";

// const LiveStockList = () => {
//   const { connectSocket, subscribeMultipleStocks, liveStocks } =
//     useStockSocketStore();

//   useEffect(() => {
//     connectSocket();
//     subscribeMultipleStocks(["AAPL", "GOOGL", "TSLA"]);
//   }, []);

//   return (
//     <div>
//       <h2>Live Stock Prices</h2>
//       <ul>
//         {Object.keys(liveStocks).map((symbol) => (
//           <li key={symbol}>
//             <strong>{symbol}</strong>: {liveStocks[symbol].currentPrice}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default LiveStockList;


// "use client";
// import React, { useEffect, useState, useRef } from 'react';
// import { createChart, ColorType, IChartApi, ISeriesApi } from 'lightweight-charts';
// import { ArrowLeft, TrendingUp, TrendingDown, Activity } from 'lucide-react';
// import { useStockSocketStore } from '../../../store/useStockSocketStore';

// // Mock store for demo - replace with your actual import
// const mockStocks = [
//   { symbol: "AAPL", companyName: "Apple Inc.", iconUrl: "https://logo.clearbit.com/apple.com", lastDayTradedPrice: 175.43, currentPrice: 175.43 },
//   { symbol: "MSFT", companyName: "Microsoft Corporation", iconUrl: "https://logo.clearbit.com/microsoft.com", lastDayTradedPrice: 338.11, currentPrice: 338.11 },
//   { symbol: "GOOGL", companyName: "Alphabet Inc. (Google)", iconUrl: "https://logo.clearbit.com/google.com", lastDayTradedPrice: 142.56, currentPrice: 142.56 },
//   { symbol: "AMZN", companyName: "Amazon.com Inc.", iconUrl: "https://logo.clearbit.com/amazon.com", lastDayTradedPrice: 145.24, currentPrice: 145.24 },
//   { symbol: "TSLA", companyName: "Tesla Inc.", iconUrl: "https://logo.clearbit.com/tesla.com", lastDayTradedPrice: 248.50, currentPrice: 248.50 },
//   { symbol: "META", companyName: "Meta Platforms Inc.", iconUrl: "https://logo.clearbit.com/meta.com", lastDayTradedPrice: 334.87, currentPrice: 334.87 },
//   { symbol: "NVDA", companyName: "NVIDIA Corporation", iconUrl: "https://logo.clearbit.com/nvidia.com", lastDayTradedPrice: 485.09, currentPrice: 485.09 },
//   { symbol: "NFLX", companyName: "Netflix Inc.", iconUrl: "https://logo.clearbit.com/netflix.com", lastDayTradedPrice: 492.19, currentPrice: 492.19 },
//   { symbol: "JPM", companyName: "JPMorgan Chase & Co.", iconUrl: "https://logo.clearbit.com/jpmorganchase.com", lastDayTradedPrice: 172.28, currentPrice: 172.28 },
//   { symbol: "JNJ", companyName: "Johnson & Johnson", iconUrl: "https://logo.clearbit.com/jnj.com", lastDayTradedPrice: 162.45, currentPrice: 162.45 },
//   { symbol: "V", companyName: "Visa Inc.", iconUrl: "https://logo.clearbit.com/visa.com", lastDayTradedPrice: 264.85, currentPrice: 264.85 },
//   { symbol: "WMT", companyName: "Walmart Inc.", iconUrl: "https://logo.clearbit.com/walmart.com", lastDayTradedPrice: 67.56, currentPrice: 67.56 },
//   { symbol: "PG", companyName: "Procter & Gamble Co.", iconUrl: "https://logo.clearbit.com/pg.com", lastDayTradedPrice: 156.78, currentPrice: 156.78 },
//   { symbol: "HD", companyName: "The Home Depot Inc.", iconUrl: "https://logo.clearbit.com/homedepot.com", lastDayTradedPrice: 342.56, currentPrice: 342.56 },
//   { symbol: "DIS", companyName: "The Walt Disney Company", iconUrl: "https://logo.clearbit.com/disney.com", lastDayTradedPrice: 89.07, currentPrice: 89.07 }
// ];

// const StockCard = ({ stock, onClick }) => {
//   const priceChange = stock.currentPrice - stock.lastDayTradedPrice;
//   const percentChange = ((priceChange / stock.lastDayTradedPrice) * 100).toFixed(2);
//   const isPositive = priceChange >= 0;

//   return (
//     <div 
//       onClick={() => onClick(stock)}
//       className="bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-all cursor-pointer border border-gray-100 hover:border-blue-200"
//     >
//       <div className="flex items-start justify-between mb-3">
//         <div className="flex items-center gap-3">
//           <img 
//             src={stock.iconUrl} 
//             alt={stock.companyName}
//             className="w-10 h-10 rounded-full bg-gray-100 p-1"
//             onError={(e) => e.target.src = 'https://via.placeholder.com/40'}
//           />
//           <div>
//             <h3 className="font-bold text-gray-900">{stock.symbol}</h3>
//             <p className="text-xs text-gray-500 truncate max-w-[150px]">{stock.companyName}</p>
//           </div>
//         </div>
//         {isPositive ? (
//           <TrendingUp className="w-5 h-5 text-green-500" />
//         ) : (
//           <TrendingDown className="w-5 h-5 text-red-500" />
//         )}
//       </div>
      
//       <div className="space-y-1">
//         <div className="text-2xl font-bold text-gray-900">
//           ${stock.currentPrice.toFixed(2)}
//         </div>
//         <div className={`text-sm font-medium ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
//           {isPositive ? '+' : ''}{priceChange.toFixed(2)} ({isPositive ? '+' : ''}{percentChange}%)
//         </div>
//       </div>
//     </div>
//   );
// };

// const TradingViewChart = ({ stock }) => {
//   const chartContainerRef = useRef(null);
//   const chartRef = useRef(null);
//   const seriesRef = useRef(null);

//   useEffect(() => {
//     if (!chartContainerRef.current) return;

//     const chart = createChart(chartContainerRef.current, {
//       layout: {
//         background: { type: ColorType.Solid, color: '#ffffff' },
//         textColor: '#333',
//       },
//       width: chartContainerRef.current.clientWidth,
//       height: 400,
//       grid: {
//         vertLines: { color: '#f0f0f0' },
//         horzLines: { color: '#f0f0f0' },
//       },
//       crosshair: {
//         mode: 1,
//       },
//       rightPriceScale: {
//         borderColor: '#e1e1e1',
//       },
//       timeScale: {
//         borderColor: '#e1e1e1',
//         timeVisible: true,
//         secondsVisible: false,
//       },
//     });

//     const candlestickSeries = chart.addCandlestickSeries({
//       upColor: '#22c55e',
//       downColor: '#ef4444',
//       borderVisible: false,
//       wickUpColor: '#22c55e',
//       wickDownColor: '#ef4444',
//     });

//     // Generate mock historical data
//     const generateMockData = (basePrice) => {
//       const data = [];
//       const now = Math.floor(Date.now() / 1000);
//       const oneDay = 86400;
      
//       for (let i = 30; i >= 0; i--) {
//         const time = now - (i * oneDay);
//         const variation = (Math.random() - 0.5) * basePrice * 0.05;
//         const open = basePrice + variation;
//         const close = open + (Math.random() - 0.5) * basePrice * 0.03;
//         const high = Math.max(open, close) + Math.random() * basePrice * 0.02;
//         const low = Math.min(open, close) - Math.random() * basePrice * 0.02;
        
//         data.push({
//           time,
//           open: parseFloat(open.toFixed(2)),
//           high: parseFloat(high.toFixed(2)),
//           low: parseFloat(low.toFixed(2)),
//           close: parseFloat(close.toFixed(2)),
//         });
//       }
//       return data;
//     };

//     const mockData = generateMockData(stock.lastDayTradedPrice);
//     candlestickSeries.setData(mockData);

//     chartRef.current = chart;
//     seriesRef.current = candlestickSeries;

//     const handleResize = () => {
//       if (chartContainerRef.current) {
//         chart.applyOptions({ 
//           width: chartContainerRef.current.clientWidth 
//         });
//       }
//     };

//     window.addEventListener('resize', handleResize);

//     return () => {
//       window.removeEventListener('resize', handleResize);
//       chart.remove();
//     };
//   }, [stock]);

//   // Update chart with live price
//   useEffect(() => {
//     if (seriesRef.current && stock.currentPrice) {
//       const now = Math.floor(Date.now() / 1000);
//       seriesRef.current.update({
//         time: now,
//         open: stock.lastDayTradedPrice,
//         high: Math.max(stock.currentPrice, stock.lastDayTradedPrice) * 1.001,
//         low: Math.min(stock.currentPrice, stock.lastDayTradedPrice) * 0.999,
//         close: stock.currentPrice,
//       });
//     }
//   }, [stock.currentPrice]);

//   return <div ref={chartContainerRef} className="w-full" />;
// };

// const StockDetail = ({ stock, onBack }) => {
//   const priceChange = stock.currentPrice - stock.lastDayTradedPrice;
//   const percentChange = ((priceChange / stock.lastDayTradedPrice) * 100).toFixed(2);
//   const isPositive = priceChange >= 0;

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
//       <div className="max-w-7xl mx-auto px-4 py-6">
//         <button
//           onClick={onBack}
//           className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
//         >
//           <ArrowLeft className="w-5 h-5" />
//           <span className="font-medium">Back to Stocks</span>
//         </button>

//         <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
//           <div className="flex items-start justify-between mb-6">
//             <div className="flex items-center gap-4">
//               <img 
//                 src={stock.iconUrl} 
//                 alt={stock.companyName}
//                 className="w-16 h-16 rounded-full bg-gray-100 p-2"
//                 onError={(e) => e.target.src = 'https://via.placeholder.com/64'}
//               />
//               <div>
//                 <h1 className="text-3xl font-bold text-gray-900">{stock.symbol}</h1>
//                 <p className="text-gray-600">{stock.companyName}</p>
//               </div>
//             </div>
//             <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100">
//               <Activity className="w-4 h-4 text-blue-600" />
//               <span className="text-sm font-medium text-gray-700">Live</span>
//             </div>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
//             <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6">
//               <p className="text-sm text-blue-700 mb-2">Current Price</p>
//               <p className="text-4xl font-bold text-blue-900">${stock.currentPrice.toFixed(2)}</p>
//             </div>
//             <div className={`bg-gradient-to-br ${isPositive ? 'from-green-50 to-green-100' : 'from-red-50 to-red-100'} rounded-xl p-6`}>
//               <p className={`text-sm ${isPositive ? 'text-green-700' : 'text-red-700'} mb-2`}>Change</p>
//               <p className={`text-4xl font-bold ${isPositive ? 'text-green-900' : 'text-red-900'}`}>
//                 {isPositive ? '+' : ''}{priceChange.toFixed(2)}
//               </p>
//             </div>
//             <div className={`bg-gradient-to-br ${isPositive ? 'from-green-50 to-green-100' : 'from-red-50 to-red-100'} rounded-xl p-6`}>
//               <p className={`text-sm ${isPositive ? 'text-green-700' : 'text-red-700'} mb-2`}>Percent Change</p>
//               <p className={`text-4xl font-bold ${isPositive ? 'text-green-900' : 'text-red-900'}`}>
//                 {isPositive ? '+' : ''}{percentChange}%
//               </p>
//             </div>
//           </div>

//           <div className="border-t pt-6">
//             <h2 className="text-xl font-bold text-gray-900 mb-4">Price Chart</h2>
//             <TradingViewChart stock={stock} />
//           </div>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           <div className="bg-white rounded-2xl shadow-lg p-6">
//             <h3 className="text-lg font-bold text-gray-900 mb-4">Market Stats</h3>
//             <div className="space-y-3">
//               <div className="flex justify-between py-2 border-b">
//                 <span className="text-gray-600">Previous Close</span>
//                 <span className="font-semibold">${stock.lastDayTradedPrice.toFixed(2)}</span>
//               </div>
//               <div className="flex justify-between py-2 border-b">
//                 <span className="text-gray-600">Day High</span>
//                 <span className="font-semibold">${(stock.currentPrice * 1.02).toFixed(2)}</span>
//               </div>
//               <div className="flex justify-between py-2 border-b">
//                 <span className="text-gray-600">Day Low</span>
//                 <span className="font-semibold">${(stock.currentPrice * 0.98).toFixed(2)}</span>
//               </div>
//             </div>
//           </div>

//           <div className="bg-white rounded-2xl shadow-lg p-6">
//             <h3 className="text-lg font-bold text-gray-900 mb-4">About</h3>
//             <p className="text-gray-600 leading-relaxed">
//               Real-time trading data for {stock.companyName} ({stock.symbol}). 
//               Monitor live price updates and historical performance with interactive charts.
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// const LiveStocksApp = () => {
//   const [selectedStock, setSelectedStock] = useState(null);
//   const [stocks, setStocks] = useState(mockStocks);
  
//   // Uncomment to use real Zustand store
//   const { connectSocket, disconnectSocket, subscribeMultipleStocks, liveStocks, connected } = useStockSocketStore();

//   useEffect(() => {
//     // Simulate live price updates for demo
//     const interval = setInterval(() => {
//       setStocks(prev => prev.map(stock => ({
//         ...stock,
//         currentPrice: stock.currentPrice + (Math.random() - 0.5) * 2
//       })));
//     }, 2000);

//     // Uncomment to use real socket connection
//     connectSocket();
//     const symbols = mockStocks.map(s => s.symbol);
//     subscribeMultipleStocks(symbols);

//     return () => {
//       clearInterval(interval);
//       disconnectSocket();
//     };
//   }, []);

// //   Uncomment to sync with live socket data
//   useEffect(() => {
//     if (Object.keys(liveStocks).length > 0) {
//       setStocks(prev => prev.map(stock => 
//         liveStocks[stock.symbol] ? { ...stock, ...liveStocks[stock.symbol] } : stock
//       ));
//     }
//   }, [liveStocks]);

//   if (selectedStock) {
//     const liveStock = stocks.find(s => s.symbol === selectedStock.symbol) || selectedStock;
//     return <StockDetail stock={liveStock} onBack={() => setSelectedStock(null)} />;
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
//       <div className="max-w-7xl mx-auto px-4 py-8">
//         <div className="mb-8">
//           <h1 className="text-4xl font-bold text-gray-900 mb-2">Live Stock Market</h1>
//           <p className="text-gray-600">Real-time stock prices and market data</p>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//           {stocks.map((stock) => (
//             <StockCard 
//               key={stock.symbol} 
//               stock={stock} 
//               onClick={setSelectedStock}
//             />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LiveStocksApp;

// "use client";
// import React, { useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import { TrendingUp, TrendingDown, Activity } from 'lucide-react';
// import { useStockSocketStore } from '../../../store/useStockSocketStore';

// const mockStocks = [
//   { symbol: "AAPL", companyName: "Apple Inc.", iconUrl: "https://logo.clearbit.com/apple.com", lastDayTradedPrice: 175.43, currentPrice: 175.43 },
//   { symbol: "MSFT", companyName: "Microsoft Corporation", iconUrl: "https://logo.clearbit.com/microsoft.com", lastDayTradedPrice: 338.11, currentPrice: 338.11 },
//   { symbol: "GOOGL", companyName: "Alphabet Inc. (Google)", iconUrl: "https://logo.clearbit.com/google.com", lastDayTradedPrice: 142.56, currentPrice: 142.56 },
//   { symbol: "AMZN", companyName: "Amazon.com Inc.", iconUrl: "https://logo.clearbit.com/amazon.com", lastDayTradedPrice: 145.24, currentPrice: 145.24 },
//   { symbol: "TSLA", companyName: "Tesla Inc.", iconUrl: "https://logo.clearbit.com/tesla.com", lastDayTradedPrice: 248.50, currentPrice: 248.50 },
//   { symbol: "META", companyName: "Meta Platforms Inc.", iconUrl: "https://logo.clearbit.com/meta.com", lastDayTradedPrice: 334.87, currentPrice: 334.87 },
//   { symbol: "NVDA", companyName: "NVIDIA Corporation", iconUrl: "https://logo.clearbit.com/nvidia.com", lastDayTradedPrice: 485.09, currentPrice: 485.09 },
//   { symbol: "NFLX", companyName: "Netflix Inc.", iconUrl: "https://logo.clearbit.com/netflix.com", lastDayTradedPrice: 492.19, currentPrice: 492.19 },
//   { symbol: "JPM", companyName: "JPMorgan Chase & Co.", iconUrl: "https://logo.clearbit.com/jpmorganchase.com", lastDayTradedPrice: 172.28, currentPrice: 172.28 },
//   { symbol: "JNJ", companyName: "Johnson & Johnson", iconUrl: "https://logo.clearbit.com/jnj.com", lastDayTradedPrice: 162.45, currentPrice: 162.45 },
//   { symbol: "V", companyName: "Visa Inc.", iconUrl: "https://logo.clearbit.com/visa.com", lastDayTradedPrice: 264.85, currentPrice: 264.85 },
//   { symbol: "WMT", companyName: "Walmart Inc.", iconUrl: "https://logo.clearbit.com/walmart.com", lastDayTradedPrice: 67.56, currentPrice: 67.56 },
//   { symbol: "PG", companyName: "Procter & Gamble Co.", iconUrl: "https://logo.clearbit.com/pg.com", lastDayTradedPrice: 156.78, currentPrice: 156.78 },
//   { symbol: "HD", companyName: "The Home Depot Inc.", iconUrl: "https://logo.clearbit.com/homedepot.com", lastDayTradedPrice: 342.56, currentPrice: 342.56 },
//   { symbol: "DIS", companyName: "The Walt Disney Company", iconUrl: "https://logo.clearbit.com/disney.com", lastDayTradedPrice: 89.07, currentPrice: 89.07 }
// ];

// const StockCard = ({ stock, onClick }) => {
//   const priceChange = stock.currentPrice - stock.lastDayTradedPrice;
//   const percentChange = ((priceChange / stock.lastDayTradedPrice) * 100).toFixed(2);
//   const isPositive = priceChange >= 0;

//   return (
//     <div 
//       onClick={onClick}
//       className="bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-all cursor-pointer border border-gray-100 hover:border-blue-200 group"
//     >
//       <div className="flex items-start justify-between mb-3">
//         <div className="flex items-center gap-3">
//           <img 
//             src={stock.iconUrl} 
//             alt={stock.companyName}
//             className="w-10 h-10 rounded-full bg-gray-100 p-1"
//             onError={(e) => e.target.src = 'https://via.placeholder.com/40'}
//           />
//           <div>
//             <h3 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors">{stock.symbol}</h3>
//             <p className="text-xs text-gray-500 truncate max-w-[150px]">{stock.companyName}</p>
//           </div>
//         </div>
//         {isPositive ? (
//           <TrendingUp className="w-5 h-5 text-green-500" />
//         ) : (
//           <TrendingDown className="w-5 h-5 text-red-500" />
//         )}
//       </div>
      
//       <div className="space-y-1">
//         <div className="text-2xl font-bold text-gray-900">
//           ${stock.currentPrice.toFixed(2)}
//         </div>
//         <div className={`text-sm font-medium ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
//           {isPositive ? '+' : ''}{priceChange.toFixed(2)} ({isPositive ? '+' : ''}{percentChange}%)
//         </div>
//       </div>
//     </div>
//   );
// };

// const LiveStocksListPage = () => {
//   const router = useRouter();
//   const { connectSocket, disconnectSocket, subscribeMultipleStocks, liveStocks, connected } = useStockSocketStore();

//   useEffect(() => {
//     connectSocket();
//     const symbols = mockStocks.map(s => s.symbol);
//     subscribeMultipleStocks(symbols);

//     return () => {
//       disconnectSocket();
//     };
//   }, [connectSocket, disconnectSocket, subscribeMultipleStocks]);

//   const handleStockClick = (symbol) => {
//     router.push(`/dashboard/livestocks/chart?symbol=${symbol}`);
//   };

//   // Merge live data with mock stocks
//   const displayStocks = mockStocks.map(stock => 
//     liveStocks[stock.symbol] ? { ...stock, ...liveStocks[stock.symbol] } : stock
//   );

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
//       <div className="max-w-7xl mx-auto px-4 py-8">
//         <div className="mb-8">
//           <div className="flex items-center justify-between">
//             <div>
//               <h1 className="text-4xl font-bold text-gray-900 mb-2">Live Stock Market</h1>
//               <p className="text-gray-600">Real-time stock prices and market data</p>
//             </div>
//             <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white shadow-sm border border-gray-200">
//               <div className={`w-2 h-2 rounded-full ${connected ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`}></div>
//               <span className="text-sm font-medium text-gray-700">
//                 {connected ? 'Connected' : 'Connecting...'}
//               </span>
//             </div>
//           </div>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//           {displayStocks.map((stock) => (
//             <StockCard 
//               key={stock.symbol} 
//               stock={stock} 
//               onClick={() => handleStockClick(stock.symbol)}
//             />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LiveStocksListPage;


"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { TrendingUp, TrendingDown, Activity, Sparkles, BarChart3, RefreshCw } from 'lucide-react';
import { useStockSocketStore } from '../../../store/useStockSocketStore';

const mockStocks = [
  { symbol: "AAPL", companyName: "Apple Inc.", iconUrl: "https://logo.clearbit.com/apple.com", lastDayTradedPrice: 175.43, currentPrice: 175.43 },
  { symbol: "MSFT", companyName: "Microsoft Corporation", iconUrl: "https://logo.clearbit.com/microsoft.com", lastDayTradedPrice: 338.11, currentPrice: 338.11 },
  { symbol: "GOOGL", companyName: "Alphabet Inc. (Google)", iconUrl: "https://logo.clearbit.com/google.com", lastDayTradedPrice: 142.56, currentPrice: 142.56 },
  { symbol: "AMZN", companyName: "Amazon.com Inc.", iconUrl: "https://logo.clearbit.com/amazon.com", lastDayTradedPrice: 145.24, currentPrice: 145.24 },
  { symbol: "TSLA", companyName: "Tesla Inc.", iconUrl: "https://logo.clearbit.com/tesla.com", lastDayTradedPrice: 248.50, currentPrice: 248.50 },
  { symbol: "META", companyName: "Meta Platforms Inc.", iconUrl: "https://logo.clearbit.com/meta.com", lastDayTradedPrice: 334.87, currentPrice: 334.87 },
  { symbol: "NVDA", companyName: "NVIDIA Corporation", iconUrl: "https://logo.clearbit.com/nvidia.com", lastDayTradedPrice: 485.09, currentPrice: 485.09 },
  { symbol: "NFLX", companyName: "Netflix Inc.", iconUrl: "https://logo.clearbit.com/netflix.com", lastDayTradedPrice: 492.19, currentPrice: 492.19 },
  { symbol: "JPM", companyName: "JPMorgan Chase & Co.", iconUrl: "https://logo.clearbit.com/jpmorganchase.com", lastDayTradedPrice: 172.28, currentPrice: 172.28 },
  { symbol: "JNJ", companyName: "Johnson & Johnson", iconUrl: "https://logo.clearbit.com/jnj.com", lastDayTradedPrice: 162.45, currentPrice: 162.45 },
  { symbol: "V", companyName: "Visa Inc.", iconUrl: "https://logo.clearbit.com/visa.com", lastDayTradedPrice: 264.85, currentPrice: 264.85 },
  { symbol: "WMT", companyName: "Walmart Inc.", iconUrl: "https://logo.clearbit.com/walmart.com", lastDayTradedPrice: 67.56, currentPrice: 67.56 },
  { symbol: "PG", companyName: "Procter & Gamble Co.", iconUrl: "https://logo.clearbit.com/pg.com", lastDayTradedPrice: 156.78, currentPrice: 156.78 },
  { symbol: "HD", companyName: "The Home Depot Inc.", iconUrl: "https://logo.clearbit.com/homedepot.com", lastDayTradedPrice: 342.56, currentPrice: 342.56 },
  { symbol: "DIS", companyName: "The Walt Disney Company", iconUrl: "https://logo.clearbit.com/disney.com", lastDayTradedPrice: 89.07, currentPrice: 89.07 }
];

const StockCard = ({ stock, onClick }) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const priceChange = stock.currentPrice - stock.lastDayTradedPrice;
  const percentChange = ((priceChange / stock.lastDayTradedPrice) * 100).toFixed(2);
  const isPositive = priceChange >= 0;

  useEffect(() => {
    setIsUpdating(true);
    const timer = setTimeout(() => setIsUpdating(false), 300);
    return () => clearTimeout(timer);
  }, [stock.currentPrice]);

  return (
    <div 
      onClick={onClick}
      className="relative bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer border border-gray-200/50 hover:border-blue-300 hover:-translate-y-1 group overflow-hidden"
    >
      {/* Animated gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      {/* Pulse animation on price update */}
      {isUpdating && (
        <div className="absolute inset-0 bg-blue-400/10 animate-pulse rounded-2xl"></div>
      )}
      
      <div className="relative z-10">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full blur-md opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
              <img 
                src={stock.iconUrl} 
                alt={stock.companyName}
                className="relative w-12 h-12 rounded-full bg-gradient-to-br from-gray-50 to-gray-100 p-2 shadow-sm ring-2 ring-gray-100 group-hover:ring-blue-200 transition-all"
                onError={(e) => e.target.src = 'https://via.placeholder.com/48'}
              />
            </div>
            <div>
              <h3 className="font-bold text-lg text-gray-900 group-hover:text-blue-600 transition-colors">{stock.symbol}</h3>
              <p className="text-xs text-gray-500 truncate max-w-[140px]">{stock.companyName}</p>
            </div>
          </div>
          <div className={`p-2 rounded-xl ${isPositive ? 'bg-green-50' : 'bg-red-50'} group-hover:scale-110 transition-transform`}>
            {isPositive ? (
              <TrendingUp className="w-5 h-5 text-green-600" />
            ) : (
              <TrendingDown className="w-5 h-5 text-red-600" />
            )}
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
            ${stock.currentPrice.toFixed(2)}
          </div>
          <div className="flex items-center gap-2">
            <div className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-semibold ${
              isPositive 
                ? 'bg-green-100 text-green-700' 
                : 'bg-red-100 text-red-700'
            }`}>
              <span>{isPositive ? '+' : ''}{priceChange.toFixed(2)}</span>
              <span className="text-xs">({isPositive ? '+' : ''}{percentChange}%)</span>
            </div>
          </div>
        </div>

        {/* Hover effect indicator */}
        <div className="mt-4 pt-4 border-t border-gray-100 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-2 text-xs text-gray-500">
          <BarChart3 className="w-4 h-4" />
          <span>Click to view chart</span>
        </div>
      </div>
    </div>
  );
};

const LiveStocksListPage = () => {
  const router = useRouter();
  const { connectSocket, disconnectSocket, subscribeMultipleStocks, liveStocks, connected } = useStockSocketStore();
  const [marketStats, setMarketStats] = useState({ gainers: 0, losers: 0, neutral: 0 });

  useEffect(() => {
    connectSocket();
    const symbols = mockStocks.map(s => s.symbol);
    subscribeMultipleStocks(symbols);

    return () => {
      disconnectSocket();
    };
  }, [connectSocket, disconnectSocket, subscribeMultipleStocks]);

  const handleStockClick = (symbol) => {
    router.push(`/dashboard/livestocks/chart?symbol=${symbol}`);
  };

  // Merge live data with mock stocks
  const displayStocks = mockStocks.map(stock => 
    liveStocks[stock.symbol] ? { ...stock, ...liveStocks[stock.symbol] } : stock
  );

  // Calculate market stats
  useEffect(() => {
    const stocks = mockStocks.map(stock => 
      liveStocks[stock.symbol] ? { ...stock, ...liveStocks[stock.symbol] } : stock
    );
    
    const stats = stocks.reduce((acc, stock) => {
      const change = stock.currentPrice - stock.lastDayTradedPrice;
      if (change > 0) acc.gainers++;
      else if (change < 0) acc.losers++;
      else acc.neutral++;
      return acc;
    }, { gainers: 0, losers: 0, neutral: 0 });
    setMarketStats(stats);
  }, [liveStocks]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-300/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-300/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-pink-300/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="mb-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-6">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl shadow-lg">
                  <Activity className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h1 className="text-5xl font-bold bg-white bg-clip-text text-transparent">
                    Live Stock Market
                  </h1>
                  <p className="text-gray-600 mt-1 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-yellow-500" />
                    Real-time prices and market insights
                  </p>
                </div>
              </div>
            </div>
            
            <div className="flex flex-wrap items-center gap-4">
              {/* Market Stats */}
              <div className="flex gap-3">
                <div className="px-4 py-2 rounded-xl bg-green-50 border border-green-200 shadow-sm">
                  <div className="text-xs text-green-600 font-medium">Gainers</div>
                  <div className="text-xl font-bold text-green-700">{marketStats.gainers}</div>
                </div>
                <div className="px-4 py-2 rounded-xl bg-red-50 border border-red-200 shadow-sm">
                  <div className="text-xs text-red-600 font-medium">Losers</div>
                  <div className="text-xl font-bold text-red-700">{marketStats.losers}</div>
                </div>
              </div>

              {/* Connection Status */}
              <div className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-white/90 backdrop-blur-sm shadow-lg border border-gray-200">
                <div className="relative">
                  <div className={`w-3 h-3 rounded-full ${connected ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                  {connected && (
                    <div className="absolute inset-0 w-3 h-3 rounded-full bg-green-500 animate-ping"></div>
                  )}
                </div>
                <div>
                  <div className="text-xs text-gray-500">Status</div>
                  <div className="text-sm font-bold text-gray-900">
                    {connected ? 'Live' : 'Connecting...'}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Info Banner */}
          <div className="bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 backdrop-blur-sm rounded-2xl p-4 border border-blue-200/50 shadow-sm">
            <div className="flex items-center gap-3">
              <RefreshCw className="w-5 h-5 text-blue-600 animate-spin" style={{ animationDuration: '3s' }} />
              <p className="text-sm text-gray-700">
                <span className="font-semibold">Live updates enabled.</span> Prices refresh automatically in real-time.
              </p>
            </div>
          </div>
        </div>

        {/* Stock Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {displayStocks.map((stock) => (
            <StockCard 
              key={stock.symbol} 
              stock={stock} 
              onClick={() => handleStockClick(stock.symbol)}
            />
          ))}
        </div>

        {/* Footer */}
        <div className="mt-12 text-center">
          <p className="text-sm text-gray-500">
            Market data provided in real-time • Last updated: {new Date().toLocaleTimeString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default LiveStocksListPage;