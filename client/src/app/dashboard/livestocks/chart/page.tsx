// "use client";
// import React, { useEffect, useRef } from 'react';
// import { useRouter, useSearchParams } from 'next/navigation';
// import { createChart, ColorType } from 'lightweight-charts';
// import { ArrowLeft, Activity, TrendingUp, TrendingDown } from 'lucide-react';
// import { useStockSocketStore } from '../../../../store/useStockSocketStore';

// const TradingViewChart = ({ stock, timeSeriesData }) => {
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
//       height: 450,
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
//         secondsVisible: true,
//       },
//     });

//     const candlestickSeries = chart.addCandlestickSeries({
//       upColor: '#22c55e',
//       downColor: '#ef4444',
//       borderVisible: false,
//       wickUpColor: '#22c55e',
//       wickDownColor: '#ef4444',
//     });

//     // Generate mock historical data if no real data
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

//     const chartData = timeSeriesData && timeSeriesData.length > 0 
//       ? timeSeriesData 
//       : generateMockData(stock.lastDayTradedPrice);
    
//     candlestickSeries.setData(chartData);

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
//   }, [stock, timeSeriesData]);

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
//   }, [stock.currentPrice, stock.lastDayTradedPrice]);

//   return <div ref={chartContainerRef} className="w-full" />;
// };

// const StockChartPage = () => {
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const symbol = searchParams.get('symbol');
  
//   const { liveStocks, subscribeStock, unsubscribeStock, connectSocket, connected } = useStockSocketStore();
  
//   const stock = symbol ? liveStocks[symbol] : null;

//   useEffect(() => {
//     if (!connected) {
//       connectSocket();
//     }
//   }, [connected, connectSocket]);

//   useEffect(() => {
//     if (symbol) {
//       subscribeStock(symbol);
      
//       return () => {
//         unsubscribeStock(symbol);
//       };
//     }
//   }, [symbol, subscribeStock, unsubscribeStock]);

//   if (!symbol || !stock) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
//           <p className="text-gray-600">Loading stock data...</p>
//         </div>
//       </div>
//     );
//   }

//   const priceChange = stock.currentPrice - stock.lastDayTradedPrice;
//   const percentChange = ((priceChange / stock.lastDayTradedPrice) * 100).toFixed(2);
//   const isPositive = priceChange >= 0;

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
//       <div className="max-w-7xl mx-auto px-4 py-6">
//         <button
//           onClick={() => router.back()}
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
//             <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-green-100">
//               <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
//               <span className="text-sm font-medium text-green-700">Live</span>
//             </div>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
//             <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6">
//               <p className="text-sm text-blue-700 mb-2 font-medium">Current Price</p>
//               <p className="text-4xl font-bold text-blue-900">${stock.currentPrice.toFixed(2)}</p>
//             </div>
//             <div className={`bg-gradient-to-br ${isPositive ? 'from-green-50 to-green-100' : 'from-red-50 to-red-100'} rounded-xl p-6`}>
//               <p className={`text-sm ${isPositive ? 'text-green-700' : 'text-red-700'} mb-2 font-medium`}>Change</p>
//               <p className={`text-4xl font-bold ${isPositive ? 'text-green-900' : 'text-red-900'}`}>
//                 {isPositive ? '+' : ''}{priceChange.toFixed(2)}
//               </p>
//             </div>
//             <div className={`bg-gradient-to-br ${isPositive ? 'from-green-50 to-green-100' : 'from-red-50 to-red-100'} rounded-xl p-6`}>
//               <p className={`text-sm ${isPositive ? 'text-green-700' : 'text-red-700'} mb-2 font-medium`}>Percent Change</p>
//               <p className={`text-4xl font-bold ${isPositive ? 'text-green-900' : 'text-red-900'}`}>
//                 {isPositive ? '+' : ''}{percentChange}%
//               </p>
//             </div>
//           </div>

//           <div className="border-t pt-6">
//             <div className="flex items-center justify-between mb-4">
//               <h2 className="text-xl font-bold text-gray-900">Price Chart</h2>
//               <div className="flex gap-2">
//                 <button className="px-3 py-1 text-xs font-medium rounded-lg bg-blue-100 text-blue-700">1D</button>
//                 <button className="px-3 py-1 text-xs font-medium rounded-lg hover:bg-gray-100 text-gray-600">5D</button>
//                 <button className="px-3 py-1 text-xs font-medium rounded-lg hover:bg-gray-100 text-gray-600">1M</button>
//                 <button className="px-3 py-1 text-xs font-medium rounded-lg hover:bg-gray-100 text-gray-600">1Y</button>
//               </div>
//             </div>
//             <TradingViewChart 
//               stock={stock} 
//               timeSeriesData={stock.dayTimeSeries || []} 
//             />
//           </div>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           <div className="bg-white rounded-2xl shadow-lg p-6">
//             <h3 className="text-lg font-bold text-gray-900 mb-4">Market Stats</h3>
//             <div className="space-y-3">
//               <div className="flex justify-between py-3 border-b border-gray-100">
//                 <span className="text-gray-600">Previous Close</span>
//                 <span className="font-semibold text-gray-900">${stock.lastDayTradedPrice.toFixed(2)}</span>
//               </div>
//               <div className="flex justify-between py-3 border-b border-gray-100">
//                 <span className="text-gray-600">Day High</span>
//                 <span className="font-semibold text-gray-900">${(stock.currentPrice * 1.02).toFixed(2)}</span>
//               </div>
//               <div className="flex justify-between py-3 border-b border-gray-100">
//                 <span className="text-gray-600">Day Low</span>
//                 <span className="font-semibold text-gray-900">${(stock.currentPrice * 0.98).toFixed(2)}</span>
//               </div>
//               <div className="flex justify-between py-3">
//                 <span className="text-gray-600">Volume</span>
//                 <span className="font-semibold text-gray-900">12.5M</span>
//               </div>
//             </div>
//           </div>

//           <div className="bg-white rounded-2xl shadow-lg p-6">
//             <h3 className="text-lg font-bold text-gray-900 mb-4">About</h3>
//             <p className="text-gray-600 leading-relaxed mb-4">
//               Real-time trading data for {stock.companyName} ({stock.symbol}). 
//               Monitor live price updates and historical performance with interactive charts.
//             </p>
//             <div className="flex items-center gap-2 text-sm text-gray-500">
//               <Activity className="w-4 h-4" />
//               <span>Updates every second</span>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default StockChartPage;

// "use client";
// import React, { useEffect, useRef } from 'react';
// import { useRouter, useSearchParams } from 'next/navigation';
// import { ArrowLeft, Activity } from 'lucide-react';
// import { useStockSocketStore } from '../../../../store/useStockSocketStore';

// const TradingViewChart = ({ stock, timeSeriesData }) => {
//   const chartContainerRef = useRef(null);
//   const chartRef = useRef(null);
//   const seriesRef = useRef(null);

//   useEffect(() => {
//     if (!chartContainerRef.current) return;

//     // Dynamically import lightweight-charts
//     const initChart = async () => {
//       try {
//         const { createChart, ColorType } = await import('lightweight-charts');

//         const chart = createChart(chartContainerRef.current, {
//           layout: {
//             background: { type: ColorType.Solid, color: '#ffffff' },
//             textColor: '#333',
//           },
//           width: chartContainerRef.current.clientWidth,
//           height: 450,
//           grid: {
//             vertLines: { color: '#f0f0f0' },
//             horzLines: { color: '#f0f0f0' },
//           },
//           crosshair: {
//             mode: 1,
//           },
//           rightPriceScale: {
//             borderColor: '#e1e1e1',
//           },
//           timeScale: {
//             borderColor: '#e1e1e1',
//             timeVisible: true,
//             secondsVisible: true,
//           },
//         });

//         const candlestickSeries = chart.addCandlestickSeries({
//           upColor: '#22c55e',
//           downColor: '#ef4444',
//           borderVisible: false,
//           wickUpColor: '#22c55e',
//           wickDownColor: '#ef4444',
//         });

//         // Generate mock historical data if no real data
//         const generateMockData = (basePrice) => {
//           const data = [];
//           const now = Math.floor(Date.now() / 1000);
//           const oneDay = 86400;
          
//           for (let i = 30; i >= 0; i--) {
//             const time = now - (i * oneDay);
//             const variation = (Math.random() - 0.5) * basePrice * 0.05;
//             const open = basePrice + variation;
//             const close = open + (Math.random() - 0.5) * basePrice * 0.03;
//             const high = Math.max(open, close) + Math.random() * basePrice * 0.02;
//             const low = Math.min(open, close) - Math.random() * basePrice * 0.02;
            
//             data.push({
//               time,
//               open: parseFloat(open.toFixed(2)),
//               high: parseFloat(high.toFixed(2)),
//               low: parseFloat(low.toFixed(2)),
//               close: parseFloat(close.toFixed(2)),
//             });
//           }
//           return data;
//         };

//         const chartData = timeSeriesData && timeSeriesData.length > 0 
//           ? timeSeriesData 
//           : generateMockData(stock.lastDayTradedPrice);
        
//         candlestickSeries.setData(chartData);

//         chartRef.current = chart;
//         seriesRef.current = candlestickSeries;

//         const handleResize = () => {
//           if (chartContainerRef.current) {
//             chart.applyOptions({ 
//               width: chartContainerRef.current.clientWidth 
//             });
//           }
//         };

//         window.addEventListener('resize', handleResize);

//         return () => {
//           window.removeEventListener('resize', handleResize);
//           chart.remove();
//         };
//       } catch (error) {
//         console.error('Error loading chart:', error);
//       }
//     };

//     initChart();
//   }, [stock.lastDayTradedPrice, timeSeriesData]);

//   // Update chart with live price
//   useEffect(() => {
//     if (seriesRef.current && stock.currentPrice) {
//       const now = Math.floor(Date.now() / 1000);
//       try {
//         seriesRef.current.update({
//           time: now,
//           open: stock.lastDayTradedPrice,
//           high: Math.max(stock.currentPrice, stock.lastDayTradedPrice) * 1.001,
//           low: Math.min(stock.currentPrice, stock.lastDayTradedPrice) * 0.999,
//           close: stock.currentPrice,
//         });
//       } catch (error) {
//         console.error('Error updating chart:', error);
//       }
//     }
//   }, [stock.currentPrice, stock.lastDayTradedPrice]);

//   return (
//     <div className="relative">
//       <div ref={chartContainerRef} className="w-full" />
//       {!chartRef.current && (
//         <div className="absolute inset-0 flex items-center justify-center bg-gray-50">
//           <div className="text-center">
//             <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
//             <p className="text-sm text-gray-600">Loading chart...</p>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// const StockChartPage = () => {
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const symbol = searchParams.get('symbol');
  
//   const { liveStocks, subscribeStock, unsubscribeStock, connectSocket, connected } = useStockSocketStore();
  
//   const stock = symbol ? liveStocks[symbol] : null;

//   useEffect(() => {
//     if (!connected) {
//       connectSocket();
//     }
//   }, [connected, connectSocket]);

//   useEffect(() => {
//     if (symbol) {
//       subscribeStock(symbol);
      
//       return () => {
//         unsubscribeStock(symbol);
//       };
//     }
//   }, [symbol, subscribeStock, unsubscribeStock]);

//   if (!symbol) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
//         <div className="text-center">
//           <p className="text-gray-600">No stock symbol provided</p>
//           <button 
//             onClick={() => router.push('/stocks')}
//             className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
//           >
//             Go to Stocks
//           </button>
//         </div>
//       </div>
//     );
//   }

//   if (!stock) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
//           <p className="text-gray-600">Loading stock data for {symbol}...</p>
//         </div>
//       </div>
//     );
//   }

//   const priceChange = stock.currentPrice - stock.lastDayTradedPrice;
//   const percentChange = ((priceChange / stock.lastDayTradedPrice) * 100).toFixed(2);
//   const isPositive = priceChange >= 0;

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
//       <div className="max-w-7xl mx-auto px-4 py-6">
//         <button
//           onClick={() => router.push('/stocks')}
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
//             <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-green-100">
//               <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
//               <span className="text-sm font-medium text-green-700">Live</span>
//             </div>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
//             <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6">
//               <p className="text-sm text-blue-700 mb-2 font-medium">Current Price</p>
//               <p className="text-4xl font-bold text-blue-900">${stock.currentPrice.toFixed(2)}</p>
//             </div>
//             <div className={`bg-gradient-to-br ${isPositive ? 'from-green-50 to-green-100' : 'from-red-50 to-red-100'} rounded-xl p-6`}>
//               <p className={`text-sm ${isPositive ? 'text-green-700' : 'text-red-700'} mb-2 font-medium`}>Change</p>
//               <p className={`text-4xl font-bold ${isPositive ? 'text-green-900' : 'text-red-900'}`}>
//                 {isPositive ? '+' : ''}{priceChange.toFixed(2)}
//               </p>
//             </div>
//             <div className={`bg-gradient-to-br ${isPositive ? 'from-green-50 to-green-100' : 'from-red-50 to-red-100'} rounded-xl p-6`}>
//               <p className={`text-sm ${isPositive ? 'text-green-700' : 'text-red-700'} mb-2 font-medium`}>Percent Change</p>
//               <p className={`text-4xl font-bold ${isPositive ? 'text-green-900' : 'text-red-900'}`}>
//                 {isPositive ? '+' : ''}{percentChange}%
//               </p>
//             </div>
//           </div>

//           <div className="border-t pt-6">
//             <div className="flex items-center justify-between mb-4">
//               <h2 className="text-xl font-bold text-gray-900">Price Chart</h2>
//               <div className="flex gap-2">
//                 <button className="px-3 py-1 text-xs font-medium rounded-lg bg-blue-100 text-blue-700">1D</button>
//                 <button className="px-3 py-1 text-xs font-medium rounded-lg hover:bg-gray-100 text-gray-600">5D</button>
//                 <button className="px-3 py-1 text-xs font-medium rounded-lg hover:bg-gray-100 text-gray-600">1M</button>
//                 <button className="px-3 py-1 text-xs font-medium rounded-lg hover:bg-gray-100 text-gray-600">1Y</button>
//               </div>
//             </div>
//             <TradingViewChart 
//               stock={stock} 
//               timeSeriesData={stock.dayTimeSeries || []} 
//             />
//           </div>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           <div className="bg-white rounded-2xl shadow-lg p-6">
//             <h3 className="text-lg font-bold text-gray-900 mb-4">Market Stats</h3>
//             <div className="space-y-3">
//               <div className="flex justify-between py-3 border-b border-gray-100">
//                 <span className="text-gray-600">Previous Close</span>
//                 <span className="font-semibold text-gray-900">${stock.lastDayTradedPrice.toFixed(2)}</span>
//               </div>
//               <div className="flex justify-between py-3 border-b border-gray-100">
//                 <span className="text-gray-600">Day High</span>
//                 <span className="font-semibold text-gray-900">${(stock.currentPrice * 1.02).toFixed(2)}</span>
//               </div>
//               <div className="flex justify-between py-3 border-b border-gray-100">
//                 <span className="text-gray-600">Day Low</span>
//                 <span className="font-semibold text-gray-900">${(stock.currentPrice * 0.98).toFixed(2)}</span>
//               </div>
//               <div className="flex justify-between py-3">
//                 <span className="text-gray-600">Volume</span>
//                 <span className="font-semibold text-gray-900">12.5M</span>
//               </div>
//             </div>
//           </div>

//           <div className="bg-white rounded-2xl shadow-lg p-6">
//             <h3 className="text-lg font-bold text-gray-900 mb-4">About</h3>
//             <p className="text-gray-600 leading-relaxed mb-4">
//               Real-time trading data for {stock.companyName} ({stock.symbol}). 
//               Monitor live price updates and historical performance with interactive charts.
//             </p>
//             <div className="flex items-center gap-2 text-sm text-gray-500">
//               <Activity className="w-4 h-4" />
//               <span>Updates every second</span>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default StockChartPage;


// "use client";
// import React, { useEffect, useRef, useState } from 'react';
// import { useRouter, useSearchParams } from 'next/navigation';
// import { ArrowLeft, Activity } from 'lucide-react';
// import { useStockSocketStore } from '../../../../store/useStockSocketStore';

// const TradingViewChart = ({ stock, timeSeriesData }) => {
//   const chartContainerRef = useRef(null);
//   const chartRef = useRef(null);
//   const seriesRef = useRef(null);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     if (!chartContainerRef.current) return;

//     let isSubscribed = true;

//     const initChart = async () => {
//       try {
//         const { createChart, ColorType } = await import('lightweight-charts');

//         if (!isSubscribed) return;

//         const chart = createChart(chartContainerRef.current, {
//           layout: {
//             background: { type: ColorType.Solid, color: '#ffffff' },
//             textColor: '#333',
//           },
//           width: chartContainerRef.current.clientWidth,
//           height: 450,
//           grid: {
//             vertLines: { color: '#f0f0f0' },
//             horzLines: { color: '#f0f0f0' },
//           },
//           crosshair: {
//             mode: 1,
//           },
//           rightPriceScale: {
//             borderColor: '#e1e1e1',
//           },
//           timeScale: {
//             borderColor: '#e1e1e1',
//             timeVisible: true,
//             secondsVisible: false,
//           },
//         });

//         const candlestickSeries = chart.addCandlestickSeries({
//           upColor: '#22c55e',
//           downColor: '#ef4444',
//           borderVisible: false,
//           wickUpColor: '#22c55e',
//           wickDownColor: '#ef4444',
//         });

//         // Generate mock historical data
//         const generateMockData = (basePrice) => {
//           const data = [];
//           const now = Math.floor(Date.now() / 1000);
//           const oneDay = 86400;
          
//           for (let i = 30; i >= 0; i--) {
//             const time = now - (i * oneDay);
//             const variation = (Math.random() - 0.5) * basePrice * 0.05;
//             const open = basePrice + variation;
//             const close = open + (Math.random() - 0.5) * basePrice * 0.03;
//             const high = Math.max(open, close) + Math.random() * basePrice * 0.02;
//             const low = Math.min(open, close) - Math.random() * basePrice * 0.02;
            
//             data.push({
//               time,
//               open: parseFloat(open.toFixed(2)),
//               high: parseFloat(high.toFixed(2)),
//               low: parseFloat(low.toFixed(2)),
//               close: parseFloat(close.toFixed(2)),
//             });
//           }
//           return data;
//         };

//         const chartData = timeSeriesData && timeSeriesData.length > 0 
//           ? timeSeriesData 
//           : generateMockData(stock.lastDayTradedPrice || 100);
        
//         candlestickSeries.setData(chartData);

//         chartRef.current = chart;
//         seriesRef.current = candlestickSeries;
//         setIsLoading(false);

//         const handleResize = () => {
//           if (chartContainerRef.current && chart) {
//             chart.applyOptions({ 
//               width: chartContainerRef.current.clientWidth 
//             });
//           }
//         };

//         window.addEventListener('resize', handleResize);

//         return () => {
//           window.removeEventListener('resize', handleResize);
//           if (chart) {
//             chart.remove();
//           }
//         };
//       } catch (error) {
//         console.error('Error loading chart:', error);
//         setIsLoading(false);
//       }
//     };

//     const cleanup = initChart();

//     return () => {
//       isSubscribed = false;
//       if (cleanup && typeof cleanup.then === 'function') {
//         cleanup.then(cleanupFn => {
//           if (cleanupFn && typeof cleanupFn === 'function') {
//             cleanupFn();
//           }
//         });
//       }
//     };
//   }, [stock.lastDayTradedPrice, timeSeriesData]);

//   // Update chart with live price
//   useEffect(() => {
//     if (seriesRef.current && stock.currentPrice && stock.lastDayTradedPrice) {
//       const now = Math.floor(Date.now() / 1000);
//       try {
//         seriesRef.current.update({
//           time: now,
//           open: stock.lastDayTradedPrice,
//           high: Math.max(stock.currentPrice, stock.lastDayTradedPrice) * 1.001,
//           low: Math.min(stock.currentPrice, stock.lastDayTradedPrice) * 0.999,
//           close: stock.currentPrice,
//         });
//       } catch (error) {
//         console.error('Error updating chart:', error);
//       }
//     }
//   }, [stock.currentPrice, stock.lastDayTradedPrice]);

//   return (
//     <div className="relative">
//       <div ref={chartContainerRef} className="w-full" />
//       {isLoading && (
//         <div className="absolute inset-0 flex items-center justify-center bg-gray-50">
//           <div className="text-center">
//             <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
//             <p className="text-sm text-gray-600">Loading chart...</p>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// const StockChartPage = () => {
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const symbol = searchParams.get('symbol');
  
//   const { liveStocks, subscribeStock, unsubscribeStock, connectSocket, connected } = useStockSocketStore();
  
//   const stock = symbol ? liveStocks[symbol] : null;

//   useEffect(() => {
//     if (!connected) {
//       connectSocket();
//     }
//   }, [connected, connectSocket]);

//   useEffect(() => {
//     if (symbol) {
//       subscribeStock(symbol);
      
//       return () => {
//         unsubscribeStock(symbol);
//       };
//     }
//   }, [symbol, subscribeStock, unsubscribeStock]);

//   if (!symbol) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
//         <div className="text-center">
//           <p className="text-gray-600">No stock symbol provided</p>
//           <button 
//             onClick={() => router.push('/stocks')}
//             className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
//           >
//             Go to Stocks
//           </button>
//         </div>
//       </div>
//     );
//   }

//   if (!stock) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
//           <p className="text-gray-600">Loading stock data for {symbol}...</p>
//         </div>
//       </div>
//     );
//   }

//   const currentPrice = stock.currentPrice || stock.lastDayTradedPrice || 0;
//   const lastPrice = stock.lastDayTradedPrice || 0;
//   const priceChange = currentPrice - lastPrice;
//   const percentChange = lastPrice !== 0 ? ((priceChange / lastPrice) * 100).toFixed(2) : '0.00';
//   const isPositive = priceChange >= 0;

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
//       <div className="max-w-7xl mx-auto px-4 py-6">
//         <button
//           onClick={() => router.push('/stocks')}
//           className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
//         >
//           <ArrowLeft className="w-5 h-5" />
//           <span className="font-medium">Back to Stocks</span>
//         </button>

//         <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
//           <div className="flex items-start justify-between mb-6">
//             <div className="flex items-center gap-4">
//               <img 
//                 src={stock.iconUrl || 'https://via.placeholder.com/64'} 
//                 alt={stock.companyName || stock.symbol}
//                 className="w-16 h-16 rounded-full bg-gray-100 p-2"
//                 onError={(e) => { e.target.src = 'https://via.placeholder.com/64'; }}
//               />
//               <div>
//                 <h1 className="text-3xl font-bold text-gray-900">{stock.symbol}</h1>
//                 <p className="text-gray-600">{stock.companyName || 'Loading...'}</p>
//               </div>
//             </div>
//             {connected && (
//               <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-green-100">
//                 <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
//                 <span className="text-sm font-medium text-green-700">Live</span>
//               </div>
//             )}
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
//             <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6">
//               <p className="text-sm text-blue-700 mb-2 font-medium">Current Price</p>
//               <p className="text-4xl font-bold text-blue-900">${currentPrice.toFixed(2)}</p>
//             </div>
//             <div className={`bg-gradient-to-br ${isPositive ? 'from-green-50 to-green-100' : 'from-red-50 to-red-100'} rounded-xl p-6`}>
//               <p className={`text-sm ${isPositive ? 'text-green-700' : 'text-red-700'} mb-2 font-medium`}>Change</p>
//               <p className={`text-4xl font-bold ${isPositive ? 'text-green-900' : 'text-red-900'}`}>
//                 {isPositive ? '+' : ''}{priceChange.toFixed(2)}
//               </p>
//             </div>
//             <div className={`bg-gradient-to-br ${isPositive ? 'from-green-50 to-green-100' : 'from-red-50 to-red-100'} rounded-xl p-6`}>
//               <p className={`text-sm ${isPositive ? 'text-green-700' : 'text-red-700'} mb-2 font-medium`}>Percent Change</p>
//               <p className={`text-4xl font-bold ${isPositive ? 'text-green-900' : 'text-red-900'}`}>
//                 {isPositive ? '+' : ''}{percentChange}%
//               </p>
//             </div>
//           </div>

//           <div className="border-t pt-6">
//             <div className="flex items-center justify-between mb-4">
//               <h2 className="text-xl font-bold text-gray-900">Price Chart</h2>
//               <div className="flex gap-2">
//                 <button className="px-3 py-1 text-xs font-medium rounded-lg bg-blue-100 text-blue-700">1D</button>
//                 <button className="px-3 py-1 text-xs font-medium rounded-lg hover:bg-gray-100 text-gray-600">5D</button>
//                 <button className="px-3 py-1 text-xs font-medium rounded-lg hover:bg-gray-100 text-gray-600">1M</button>
//                 <button className="px-3 py-1 text-xs font-medium rounded-lg hover:bg-gray-100 text-gray-600">1Y</button>
//               </div>
//             </div>
//             <TradingViewChart 
//               stock={stock} 
//               timeSeriesData={stock.dayTimeSeries || []} 
//             />
//           </div>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           <div className="bg-white rounded-2xl shadow-lg p-6">
//             <h3 className="text-lg font-bold text-gray-900 mb-4">Market Stats</h3>
//             <div className="space-y-3">
//               <div className="flex justify-between py-3 border-b border-gray-100">
//                 <span className="text-gray-600">Previous Close</span>
//                 <span className="font-semibold text-gray-900">${lastPrice.toFixed(2)}</span>
//               </div>
//               <div className="flex justify-between py-3 border-b border-gray-100">
//                 <span className="text-gray-600">Day High</span>
//                 <span className="font-semibold text-gray-900">${(currentPrice * 1.02).toFixed(2)}</span>
//               </div>
//               <div className="flex justify-between py-3 border-b border-gray-100">
//                 <span className="text-gray-600">Day Low</span>
//                 <span className="font-semibold text-gray-900">${(currentPrice * 0.98).toFixed(2)}</span>
//               </div>
//               <div className="flex justify-between py-3">
//                 <span className="text-gray-600">Volume</span>
//                 <span className="font-semibold text-gray-900">{stock.volume || '12.5M'}</span>
//               </div>
//             </div>
//           </div>

//           <div className="bg-white rounded-2xl shadow-lg p-6">
//             <h3 className="text-lg font-bold text-gray-900 mb-4">About</h3>
//             <p className="text-gray-600 leading-relaxed mb-4">
//               Real-time trading data for {stock.companyName || stock.symbol} ({stock.symbol}). 
//               Monitor live price updates and historical performance with interactive charts.
//             </p>
//             <div className="flex items-center gap-2 text-sm text-gray-500">
//               <Activity className="w-4 h-4" />
//               <span>Updates every second</span>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default StockChartPage;


// "use client";
// import React, { useEffect, useRef, useState } from 'react';
// import { useRouter, useSearchParams } from 'next/navigation';
// import { ArrowLeft, Activity } from 'lucide-react';
// import { useStockSocketStore } from '../../../../store/useStockSocketStore';

// const TradingViewChart = ({ stock, timeSeriesData }) => {
//   const chartContainerRef = useRef(null);
//   const chartRef = useRef(null);
//   const seriesRef = useRef(null);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     if (!chartContainerRef.current) return;

//     let isSubscribed = true;

//     const initChart = async () => {
//       try {
//         const { createChart, ColorType } = await import('lightweight-charts');

//         if (!isSubscribed) return;

//         const chart = createChart(chartContainerRef.current, {
//           layout: {
//             background: { type: ColorType.Solid, color: '#ffffff' },
//             textColor: '#333',
//           },
//           width: chartContainerRef.current.clientWidth,
//           height: 450,
//           grid: {
//             vertLines: { color: '#f0f0f0' },
//             horzLines: { color: '#f0f0f0' },
//           },
//           crosshair: {
//             mode: 1,
//           },
//           rightPriceScale: {
//             borderColor: '#e1e1e1',
//           },
//           timeScale: {
//             borderColor: '#e1e1e1',
//             timeVisible: true,
//             secondsVisible: false,
//           },
//         });

//         // Try candlestick series first (v4+), fallback to line series
//         let candlestickSeries;
//         try {
//           candlestickSeries = chart.addCandlestickSeries({
//             upColor: '#22c55e',
//             downColor: '#ef4444',
//             borderVisible: false,
//             wickUpColor: '#22c55e',
//             wickDownColor: '#ef4444',
//           });
//         } catch (e) {
//           // Fallback to area series for older versions
//           candlestickSeries = chart.addAreaSeries({
//             topColor: 'rgba(33, 150, 243, 0.56)',
//             bottomColor: 'rgba(33, 150, 243, 0.04)',
//             lineColor: 'rgba(33, 150, 243, 1)',
//             lineWidth: 2,
//           });
//         }

//         // Generate mock historical data
//         const generateMockData = (basePrice) => {
//           const data = [];
//           const now = Math.floor(Date.now() / 1000);
//           const oneDay = 86400;
          
//           for (let i = 30; i >= 0; i--) {
//             const time = now - (i * oneDay);
//             const variation = (Math.random() - 0.5) * basePrice * 0.05;
//             const open = basePrice + variation;
//             const close = open + (Math.random() - 0.5) * basePrice * 0.03;
//             const high = Math.max(open, close) + Math.random() * basePrice * 0.02;
//             const low = Math.min(open, close) - Math.random() * basePrice * 0.02;
            
//             data.push({
//               time,
//               open: parseFloat(open.toFixed(2)),
//               high: parseFloat(high.toFixed(2)),
//               low: parseFloat(low.toFixed(2)),
//               close: parseFloat(close.toFixed(2)),
//               value: parseFloat(close.toFixed(2)), // For line/area series
//             });
//           }
//           return data;
//         };

//         const chartData = timeSeriesData && timeSeriesData.length > 0 
//           ? timeSeriesData 
//           : generateMockData(stock.lastDayTradedPrice || 100);
        
//         candlestickSeries.setData(chartData);

//         chartRef.current = chart;
//         seriesRef.current = candlestickSeries;
//         setIsLoading(false);

//         const handleResize = () => {
//           if (chartContainerRef.current && chart) {
//             chart.applyOptions({ 
//               width: chartContainerRef.current.clientWidth 
//             });
//           }
//         };

//         window.addEventListener('resize', handleResize);

//         return () => {
//           window.removeEventListener('resize', handleResize);
//           if (chart) {
//             chart.remove();
//           }
//         };
//       } catch (error) {
//         console.error('Error loading chart:', error);
//         setIsLoading(false);
//       }
//     };

//     const cleanup = initChart();

//     return () => {
//       isSubscribed = false;
//       if (cleanup && typeof cleanup.then === 'function') {
//         cleanup.then(cleanupFn => {
//           if (cleanupFn && typeof cleanupFn === 'function') {
//             cleanupFn();
//           }
//         });
//       }
//     };
//   }, [stock.lastDayTradedPrice, timeSeriesData]);

//   // Update chart with live price
//   useEffect(() => {
//     if (seriesRef.current && stock.currentPrice && stock.lastDayTradedPrice) {
//       const now = Math.floor(Date.now() / 1000);
//       try {
//         // Try updating as candlestick data
//         const updateData = {
//           time: now,
//           open: stock.lastDayTradedPrice,
//           high: Math.max(stock.currentPrice, stock.lastDayTradedPrice) * 1.001,
//           low: Math.min(stock.currentPrice, stock.lastDayTradedPrice) * 0.999,
//           close: stock.currentPrice,
//           value: stock.currentPrice, // For line/area series
//         };
//         seriesRef.current.update(updateData);
//       } catch (error) {
//         // If candlestick update fails, try simple value update for line/area series
//         try {
//           seriesRef.current.update({
//             time: now,
//             value: stock.currentPrice,
//           });
//         } catch (e) {
//           console.error('Error updating chart:', error);
//         }
//       }
//     }
//   }, [stock.currentPrice, stock.lastDayTradedPrice]);

//   return (
//     <div className="relative">
//       <div ref={chartContainerRef} className="w-full" />
//       {isLoading && (
//         <div className="absolute inset-0 flex items-center justify-center bg-gray-50">
//           <div className="text-center">
//             <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
//             <p className="text-sm text-gray-600">Loading chart...</p>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// const StockChartPage = () => {
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const symbol = searchParams.get('symbol');
  
//   const { liveStocks, subscribeStock, unsubscribeStock, connectSocket, connected } = useStockSocketStore();
  
//   const stock = symbol ? liveStocks[symbol] : null;

//   useEffect(() => {
//     if (!connected) {
//       connectSocket();
//     }
//   }, [connected, connectSocket]);

//   useEffect(() => {
//     if (symbol) {
//       subscribeStock(symbol);
      
//       return () => {
//         unsubscribeStock(symbol);
//       };
//     }
//   }, [symbol, subscribeStock, unsubscribeStock]);

//   if (!symbol) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
//         <div className="text-center">
//           <p className="text-gray-600">No stock symbol provided</p>
//           <button 
//             onClick={() => router.push('/stocks')}
//             className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
//           >
//             Go to Stocks
//           </button>
//         </div>
//       </div>
//     );
//   }

//   if (!stock) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
//           <p className="text-gray-600">Loading stock data for {symbol}...</p>
//         </div>
//       </div>
//     );
//   }

//   const currentPrice = stock.currentPrice || stock.lastDayTradedPrice || 0;
//   const lastPrice = stock.lastDayTradedPrice || 0;
//   const priceChange = currentPrice - lastPrice;
//   const percentChange = lastPrice !== 0 ? ((priceChange / lastPrice) * 100).toFixed(2) : '0.00';
//   const isPositive = priceChange >= 0;

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
//       <div className="max-w-7xl mx-auto px-4 py-6">
//         <button
//           onClick={() => router.push('/stocks')}
//           className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
//         >
//           <ArrowLeft className="w-5 h-5" />
//           <span className="font-medium">Back to Stocks</span>
//         </button>

//         <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
//           <div className="flex items-start justify-between mb-6">
//             <div className="flex items-center gap-4">
//               <img 
//                 src={stock.iconUrl || 'https://via.placeholder.com/64'} 
//                 alt={stock.companyName || stock.symbol}
//                 className="w-16 h-16 rounded-full bg-gray-100 p-2"
//                 onError={(e) => { e.target.src = 'https://via.placeholder.com/64'; }}
//               />
//               <div>
//                 <h1 className="text-3xl font-bold text-gray-900">{stock.symbol}</h1>
//                 <p className="text-gray-600">{stock.companyName || 'Loading...'}</p>
//               </div>
//             </div>
//             {connected && (
//               <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-green-100">
//                 <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
//                 <span className="text-sm font-medium text-green-700">Live</span>
//               </div>
//             )}
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
//             <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6">
//               <p className="text-sm text-blue-700 mb-2 font-medium">Current Price</p>
//               <p className="text-4xl font-bold text-blue-900">${currentPrice.toFixed(2)}</p>
//             </div>
//             <div className={`bg-gradient-to-br ${isPositive ? 'from-green-50 to-green-100' : 'from-red-50 to-red-100'} rounded-xl p-6`}>
//               <p className={`text-sm ${isPositive ? 'text-green-700' : 'text-red-700'} mb-2 font-medium`}>Change</p>
//               <p className={`text-4xl font-bold ${isPositive ? 'text-green-900' : 'text-red-900'}`}>
//                 {isPositive ? '+' : ''}{priceChange.toFixed(2)}
//               </p>
//             </div>
//             <div className={`bg-gradient-to-br ${isPositive ? 'from-green-50 to-green-100' : 'from-red-50 to-red-100'} rounded-xl p-6`}>
//               <p className={`text-sm ${isPositive ? 'text-green-700' : 'text-red-700'} mb-2 font-medium`}>Percent Change</p>
//               <p className={`text-4xl font-bold ${isPositive ? 'text-green-900' : 'text-red-900'}`}>
//                 {isPositive ? '+' : ''}{percentChange}%
//               </p>
//             </div>
//           </div>

//           <div className="border-t pt-6">
//             <div className="flex items-center justify-between mb-4">
//               <h2 className="text-xl font-bold text-gray-900">Price Chart</h2>
//               <div className="flex gap-2">
//                 <button className="px-3 py-1 text-xs font-medium rounded-lg bg-blue-100 text-blue-700">1D</button>
//                 <button className="px-3 py-1 text-xs font-medium rounded-lg hover:bg-gray-100 text-gray-600">5D</button>
//                 <button className="px-3 py-1 text-xs font-medium rounded-lg hover:bg-gray-100 text-gray-600">1M</button>
//                 <button className="px-3 py-1 text-xs font-medium rounded-lg hover:bg-gray-100 text-gray-600">1Y</button>
//               </div>
//             </div>
//             <TradingViewChart 
//               stock={stock} 
//               timeSeriesData={stock.dayTimeSeries || []} 
//             />
//           </div>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           <div className="bg-white rounded-2xl shadow-lg p-6">
//             <h3 className="text-lg font-bold text-gray-900 mb-4">Market Stats</h3>
//             <div className="space-y-3">
//               <div className="flex justify-between py-3 border-b border-gray-100">
//                 <span className="text-gray-600">Previous Close</span>
//                 <span className="font-semibold text-gray-900">${lastPrice.toFixed(2)}</span>
//               </div>
//               <div className="flex justify-between py-3 border-b border-gray-100">
//                 <span className="text-gray-600">Day High</span>
//                 <span className="font-semibold text-gray-900">${(currentPrice * 1.02).toFixed(2)}</span>
//               </div>
//               <div className="flex justify-between py-3 border-b border-gray-100">
//                 <span className="text-gray-600">Day Low</span>
//                 <span className="font-semibold text-gray-900">${(currentPrice * 0.98).toFixed(2)}</span>
//               </div>
//               <div className="flex justify-between py-3">
//                 <span className="text-gray-600">Volume</span>
//                 <span className="font-semibold text-gray-900">{stock.volume || '12.5M'}</span>
//               </div>
//             </div>
//           </div>

//           <div className="bg-white rounded-2xl shadow-lg p-6">
//             <h3 className="text-lg font-bold text-gray-900 mb-4">About</h3>
//             <p className="text-gray-600 leading-relaxed mb-4">
//               Real-time trading data for {stock.companyName || stock.symbol} ({stock.symbol}). 
//               Monitor live price updates and historical performance with interactive charts.
//             </p>
//             <div className="flex items-center gap-2 text-sm text-gray-500">
//               <Activity className="w-4 h-4" />
//               <span>Updates every second</span>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default StockChartPage;




// "use client";
// import React, { useEffect, useRef, useState } from 'react';
// import { useRouter, useSearchParams } from 'next/navigation';
// import { ArrowLeft, Activity } from 'lucide-react';
// import { useStockSocketStore } from '../../../../store/useStockSocketStore';

// const TradingViewChart = ({ stock, timeSeriesData }) => {
//   const chartContainerRef = useRef(null);
//   const chartRef = useRef(null);
//   const seriesRef = useRef(null);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     if (!chartContainerRef.current) return;

//     let isSubscribed = true;

//     const initChart = async () => {
//       try {
//         const LightweightCharts = await import('lightweight-charts');
//         const { createChart, ColorType } = LightweightCharts;

//         if (!isSubscribed) return;

//         // Log available methods for debugging
//         console.log('Lightweight Charts loaded, version info:', {
//           hasCandlestick: typeof createChart === 'function',
//           methods: Object.keys(LightweightCharts),
//         });

//         const chart = createChart(chartContainerRef.current, {
//           layout: {
//             background: { type: ColorType.Solid, color: '#ffffff' },
//             textColor: '#333',
//           },
//           width: chartContainerRef.current.clientWidth,
//           height: 450,
//           grid: {
//             vertLines: { color: '#f0f0f0' },
//             horzLines: { color: '#f0f0f0' },
//           },
//           crosshair: {
//             mode: 1,
//           },
//           rightPriceScale: {
//             borderColor: '#e1e1e1',
//           },
//           timeScale: {
//             borderColor: '#e1e1e1',
//             timeVisible: true,
//             secondsVisible: false,
//           },
//         });

//         // Try different series types based on what's available
//         let mainSeries;
        
//         if (typeof chart.addCandlestickSeries === 'function') {
//           // Version 4.0+
//           mainSeries = chart.addCandlestickSeries({
//             upColor: '#22c55e',
//             downColor: '#ef4444',
//             borderVisible: false,
//             wickUpColor: '#22c55e',
//             wickDownColor: '#ef4444',
//           });
//         } else if (typeof chart.addAreaSeries === 'function') {
//           // Version 3.x with area series
//           mainSeries = chart.addAreaSeries({
//             topColor: 'rgba(34, 197, 94, 0.56)',
//             bottomColor: 'rgba(34, 197, 94, 0.04)',
//             lineColor: 'rgba(34, 197, 94, 1)',
//             lineWidth: 2,
//           });
//         } else if (typeof chart.addLineSeries === 'function') {
//           // Fallback to line series (most compatible)
//           mainSeries = chart.addLineSeries({
//             color: '#2196F3',
//             lineWidth: 2,
//           });
//         } else {
//           throw new Error('No compatible series type found');
//         }

//         // Generate mock historical data
//         const generateMockData = (basePrice) => {
//           const data = [];
//           const now = Math.floor(Date.now() / 1000);
//           const oneDay = 86400;
          
//           for (let i = 30; i >= 0; i--) {
//             const time = now - (i * oneDay);
//             const variation = (Math.random() - 0.5) * basePrice * 0.05;
//             const open = basePrice + variation;
//             const close = open + (Math.random() - 0.5) * basePrice * 0.03;
//             const high = Math.max(open, close) + Math.random() * basePrice * 0.02;
//             const low = Math.min(open, close) - Math.random() * basePrice * 0.02;
            
//             data.push({
//               time,
//               open: parseFloat(open.toFixed(2)),
//               high: parseFloat(high.toFixed(2)),
//               low: parseFloat(low.toFixed(2)),
//               close: parseFloat(close.toFixed(2)),
//               value: parseFloat(close.toFixed(2)), // For line/area series
//             });
//           }
//           return data;
//         };

//         const chartData = timeSeriesData && timeSeriesData.length > 0 
//           ? timeSeriesData 
//           : generateMockData(stock.lastDayTradedPrice || 100);
        
//         mainSeries.setData(chartData);

//         chartRef.current = chart;
//         seriesRef.current = mainSeries;
//         setIsLoading(false);

//         const handleResize = () => {
//           if (chartContainerRef.current && chart) {
//             chart.applyOptions({ 
//               width: chartContainerRef.current.clientWidth 
//             });
//           }
//         };

//         window.addEventListener('resize', handleResize);

//         return () => {
//           window.removeEventListener('resize', handleResize);
//           if (chart) {
//             chart.remove();
//           }
//         };
//       } catch (error) {
//         console.error('Error loading chart:', error);
//         setIsLoading(false);
//       }
//     };

//     const cleanup = initChart();

//     return () => {
//       isSubscribed = false;
//       if (cleanup && typeof cleanup.then === 'function') {
//         cleanup.then(cleanupFn => {
//           if (cleanupFn && typeof cleanupFn === 'function') {
//             cleanupFn();
//           }
//         });
//       }
//     };
//   }, [stock.lastDayTradedPrice, timeSeriesData]);

//   // Update chart with live price
//   useEffect(() => {
//     if (seriesRef.current && stock.currentPrice && stock.lastDayTradedPrice) {
//       const now = Math.floor(Date.now() / 1000);
//       try {
//         // Try updating as candlestick data
//         const updateData = {
//           time: now,
//           open: stock.lastDayTradedPrice,
//           high: Math.max(stock.currentPrice, stock.lastDayTradedPrice) * 1.001,
//           low: Math.min(stock.currentPrice, stock.lastDayTradedPrice) * 0.999,
//           close: stock.currentPrice,
//           value: stock.currentPrice, // For line/area series
//         };
//         seriesRef.current.update(updateData);
//       } catch (error) {
//         // If candlestick update fails, try simple value update for line/area series
//         try {
//           seriesRef.current.update({
//             time: now,
//             value: stock.currentPrice,
//           });
//         } catch (e) {
//           console.error('Error updating chart:', error);
//         }
//       }
//     }
//   }, [stock.currentPrice, stock.lastDayTradedPrice]);

//   return (
//     <div className="relative">
//       <div ref={chartContainerRef} className="w-full" />
//       {isLoading && (
//         <div className="absolute inset-0 flex items-center justify-center bg-gray-50">
//           <div className="text-center">
//             <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
//             <p className="text-sm text-gray-600">Loading chart...</p>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// const StockChartPage = () => {
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const symbol = searchParams.get('symbol');
  
//   const { liveStocks, subscribeStock, unsubscribeStock, connectSocket, connected } = useStockSocketStore();
  
//   const stock = symbol ? liveStocks[symbol] : null;

//   useEffect(() => {
//     if (!connected) {
//       connectSocket();
//     }
//   }, [connected, connectSocket]);

//   useEffect(() => {
//     if (symbol) {
//       subscribeStock(symbol);
      
//       return () => {
//         unsubscribeStock(symbol);
//       };
//     }
//   }, [symbol, subscribeStock, unsubscribeStock]);

//   if (!symbol) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
//         <div className="text-center">
//           <p className="text-gray-600">No stock symbol provided</p>
//           <button 
//             onClick={() => router.push('/stocks')}
//             className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
//           >
//             Go to Stocks
//           </button>
//         </div>
//       </div>
//     );
//   }

//   if (!stock) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
//           <p className="text-gray-600">Loading stock data for {symbol}...</p>
//         </div>
//       </div>
//     );
//   }

//   const currentPrice = stock.currentPrice || stock.lastDayTradedPrice || 0;
//   const lastPrice = stock.lastDayTradedPrice || 0;
//   const priceChange = currentPrice - lastPrice;
//   const percentChange = lastPrice !== 0 ? ((priceChange / lastPrice) * 100).toFixed(2) : '0.00';
//   const isPositive = priceChange >= 0;

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
//       <div className="max-w-7xl mx-auto px-4 py-6">
//         <button
//           onClick={() => router.push('/stocks')}
//           className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
//         >
//           <ArrowLeft className="w-5 h-5" />
//           <span className="font-medium">Back to Stocks</span>
//         </button>

//         <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
//           <div className="flex items-start justify-between mb-6">
//             <div className="flex items-center gap-4">
//               <img 
//                 src={stock.iconUrl || 'https://via.placeholder.com/64'} 
//                 alt={stock.companyName || stock.symbol}
//                 className="w-16 h-16 rounded-full bg-gray-100 p-2"
//                 onError={(e) => { e.target.src = 'https://via.placeholder.com/64'; }}
//               />
//               <div>
//                 <h1 className="text-3xl font-bold text-gray-900">{stock.symbol}</h1>
//                 <p className="text-gray-600">{stock.companyName || 'Loading...'}</p>
//               </div>
//             </div>
//             {connected && (
//               <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-green-100">
//                 <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
//                 <span className="text-sm font-medium text-green-700">Live</span>
//               </div>
//             )}
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
//             <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6">
//               <p className="text-sm text-blue-700 mb-2 font-medium">Current Price</p>
//               <p className="text-4xl font-bold text-blue-900">${currentPrice.toFixed(2)}</p>
//             </div>
//             <div className={`bg-gradient-to-br ${isPositive ? 'from-green-50 to-green-100' : 'from-red-50 to-red-100'} rounded-xl p-6`}>
//               <p className={`text-sm ${isPositive ? 'text-green-700' : 'text-red-700'} mb-2 font-medium`}>Change</p>
//               <p className={`text-4xl font-bold ${isPositive ? 'text-green-900' : 'text-red-900'}`}>
//                 {isPositive ? '+' : ''}{priceChange.toFixed(2)}
//               </p>
//             </div>
//             <div className={`bg-gradient-to-br ${isPositive ? 'from-green-50 to-green-100' : 'from-red-50 to-red-100'} rounded-xl p-6`}>
//               <p className={`text-sm ${isPositive ? 'text-green-700' : 'text-red-700'} mb-2 font-medium`}>Percent Change</p>
//               <p className={`text-4xl font-bold ${isPositive ? 'text-green-900' : 'text-red-900'}`}>
//                 {isPositive ? '+' : ''}{percentChange}%
//               </p>
//             </div>
//           </div>

//           <div className="border-t pt-6">
//             <div className="flex items-center justify-between mb-4">
//               <h2 className="text-xl font-bold text-gray-900">Price Chart</h2>
//               <div className="flex gap-2">
//                 <button className="px-3 py-1 text-xs font-medium rounded-lg bg-blue-100 text-blue-700">1D</button>
//                 <button className="px-3 py-1 text-xs font-medium rounded-lg hover:bg-gray-100 text-gray-600">5D</button>
//                 <button className="px-3 py-1 text-xs font-medium rounded-lg hover:bg-gray-100 text-gray-600">1M</button>
//                 <button className="px-3 py-1 text-xs font-medium rounded-lg hover:bg-gray-100 text-gray-600">1Y</button>
//               </div>
//             </div>
//             <TradingViewChart 
//               stock={stock} 
//               timeSeriesData={stock.dayTimeSeries || []} 
//             />
//           </div>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           <div className="bg-white rounded-2xl shadow-lg p-6">
//             <h3 className="text-lg font-bold text-gray-900 mb-4">Market Stats</h3>
//             <div className="space-y-3">
//               <div className="flex justify-between py-3 border-b border-gray-100">
//                 <span className="text-gray-600">Previous Close</span>
//                 <span className="font-semibold text-gray-900">${lastPrice.toFixed(2)}</span>
//               </div>
//               <div className="flex justify-between py-3 border-b border-gray-100">
//                 <span className="text-gray-600">Day High</span>
//                 <span className="font-semibold text-gray-900">${(currentPrice * 1.02).toFixed(2)}</span>
//               </div>
//               <div className="flex justify-between py-3 border-b border-gray-100">
//                 <span className="text-gray-600">Day Low</span>
//                 <span className="font-semibold text-gray-900">${(currentPrice * 0.98).toFixed(2)}</span>
//               </div>
//               <div className="flex justify-between py-3">
//                 <span className="text-gray-600">Volume</span>
//                 <span className="font-semibold text-gray-900">{stock.volume || '12.5M'}</span>
//               </div>
//             </div>
//           </div>

//           <div className="bg-white rounded-2xl shadow-lg p-6">
//             <h3 className="text-lg font-bold text-gray-900 mb-4">About</h3>
//             <p className="text-gray-600 leading-relaxed mb-4">
//               Real-time trading data for {stock.companyName || stock.symbol} ({stock.symbol}). 
//               Monitor live price updates and historical performance with interactive charts.
//             </p>
//             <div className="flex items-center gap-2 text-sm text-gray-500">
//               <Activity className="w-4 h-4" />
//               <span>Updates every second</span>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default StockChartPage;


"use client";
import React, { useEffect, useRef, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ArrowLeft, Activity } from 'lucide-react';
import { useStockSocketStore } from '../../../../store/useStockSocketStore';

const CustomChart = ({ stock, timeSeriesData }) => {
  const canvasRef = useRef(null);
  const [chartData, setChartData] = useState([]);

  // Generate mock data
  useEffect(() => {
    const generateMockData = (basePrice) => {
      const data = [];
      const now = Date.now();
      const oneDay = 86400000;
      
      for (let i = 30; i >= 0; i--) {
        const time = now - (i * oneDay);
        const variation = (Math.random() - 0.5) * basePrice * 0.05;
        const price = basePrice + variation;
        
        data.push({
          time,
          price: parseFloat(price.toFixed(2)),
        });
      }
      return data;
    };

    const data = timeSeriesData && timeSeriesData.length > 0 
      ? timeSeriesData.map(d => ({ time: d.time * 1000, price: d.close }))
      : generateMockData(stock.lastDayTradedPrice || 100);
    
    setChartData(data);
  }, [stock.lastDayTradedPrice, timeSeriesData]);

  // Add live price to chart
  useEffect(() => {
    if (stock.currentPrice && chartData.length > 0) {
      setChartData(prev => {
        const newData = [...prev];
        const lastTime = newData[newData.length - 1]?.time || Date.now();
        const timeDiff = Date.now() - lastTime;
        
        if (timeDiff > 60000) { // Add new point every minute
          newData.push({
            time: Date.now(),
            price: stock.currentPrice,
          });
          // Keep only last 50 points
          if (newData.length > 50) {
            newData.shift();
          }
        } else {
          // Update last point
          newData[newData.length - 1] = {
            time: Date.now(),
            price: stock.currentPrice,
          };
        }
        return newData;
      });
    }
  }, [stock.currentPrice]);

  // Draw chart
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || chartData.length === 0) return;

    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const width = rect.width;
    const height = rect.height;
    const padding = { top: 20, right: 60, bottom: 40, left: 10 };
    const chartWidth = width - padding.left - padding.right;
    const chartHeight = height - padding.top - padding.bottom;

    // Clear canvas
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, width, height);

    // Find min and max prices
    const prices = chartData.map(d => d.price);
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);
    const priceRange = maxPrice - minPrice || 1;

    // Draw grid lines
    ctx.strokeStyle = '#f0f0f0';
    ctx.lineWidth = 1;
    for (let i = 0; i <= 5; i++) {
      const y = padding.top + (chartHeight / 5) * i;
      ctx.beginPath();
      ctx.moveTo(padding.left, y);
      ctx.lineTo(width - padding.right, y);
      ctx.stroke();

      // Price labels
      const price = maxPrice - (priceRange / 5) * i;
      ctx.fillStyle = '#666';
      ctx.font = '12px Arial';
      ctx.textAlign = 'left';
      ctx.fillText(`$${price.toFixed(2)}`, width - padding.right + 5, y + 4);
    }

    // Draw area chart
    if (chartData.length > 1) {
      const firstPrice = chartData[0].price;
      const lastPrice = chartData[chartData.length - 1].price;
      const isPositive = lastPrice >= firstPrice;

      // Create gradient
      const gradient = ctx.createLinearGradient(0, padding.top, 0, height - padding.bottom);
      if (isPositive) {
        gradient.addColorStop(0, 'rgba(34, 197, 94, 0.3)');
        gradient.addColorStop(1, 'rgba(34, 197, 94, 0.01)');
      } else {
        gradient.addColorStop(0, 'rgba(239, 68, 68, 0.3)');
        gradient.addColorStop(1, 'rgba(239, 68, 68, 0.01)');
      }

      // Draw area
      ctx.beginPath();
      chartData.forEach((point, index) => {
        const x = padding.left + (chartWidth / (chartData.length - 1)) * index;
        const y = padding.top + chartHeight - ((point.price - minPrice) / priceRange) * chartHeight;
        
        if (index === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      });
      
      // Complete the area shape
      const lastX = padding.left + chartWidth;
      const lastY = padding.top + chartHeight - ((chartData[chartData.length - 1].price - minPrice) / priceRange) * chartHeight;
      ctx.lineTo(lastX, height - padding.bottom);
      ctx.lineTo(padding.left, height - padding.bottom);
      ctx.closePath();
      ctx.fillStyle = gradient;
      ctx.fill();

      // Draw line
      ctx.beginPath();
      chartData.forEach((point, index) => {
        const x = padding.left + (chartWidth / (chartData.length - 1)) * index;
        const y = padding.top + chartHeight - ((point.price - minPrice) / priceRange) * chartHeight;
        
        if (index === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      });
      ctx.strokeStyle = isPositive ? '#22c55e' : '#ef4444';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Draw current price dot
      const currentX = padding.left + chartWidth;
      const currentY = padding.top + chartHeight - ((lastPrice - minPrice) / priceRange) * chartHeight;
      ctx.beginPath();
      ctx.arc(currentX, currentY, 4, 0, Math.PI * 2);
      ctx.fillStyle = isPositive ? '#22c55e' : '#ef4444';
      ctx.fill();
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2;
      ctx.stroke();
    }

    // Draw time labels
    const timeLabels = [0, Math.floor(chartData.length / 2), chartData.length - 1];
    ctx.fillStyle = '#666';
    ctx.font = '11px Arial';
    ctx.textAlign = 'center';
    
    timeLabels.forEach(index => {
      if (chartData[index]) {
        const x = padding.left + (chartWidth / (chartData.length - 1)) * index;
        const date = new Date(chartData[index].time);
        const label = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        ctx.fillText(label, x, height - padding.bottom + 20);
      }
    });

  }, [chartData]);

  return (
    <div className="relative w-full h-[450px] bg-white rounded-lg">
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{ display: 'block' }}
      />
    </div>
  );
};

const StockChartPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const symbol = searchParams.get('symbol');
  
  const { liveStocks, subscribeStock, unsubscribeStock, connectSocket, connected } = useStockSocketStore();
  
  const stock = symbol ? liveStocks[symbol] : null;

  useEffect(() => {
    if (!connected) {
      connectSocket();
    }
  }, [connected, connectSocket]);

  useEffect(() => {
    if (symbol) {
      subscribeStock(symbol);
      
      return () => {
        unsubscribeStock(symbol);
      };
    }
  }, [symbol, subscribeStock, unsubscribeStock]);

  if (!symbol) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">No stock symbol provided</p>
          <button 
            onClick={() => router.push('/dashboard/livestocks')}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Go to Stocks
          </button>
        </div>
      </div>
    );
  }

  if (!stock) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading stock data for {symbol}...</p>
        </div>
      </div>
    );
  }

  const currentPrice = stock.currentPrice || stock.lastDayTradedPrice || 0;
  const lastPrice = stock.lastDayTradedPrice || 0;
  const priceChange = currentPrice - lastPrice;
  const percentChange = lastPrice !== 0 ? ((priceChange / lastPrice) * 100).toFixed(2) : '0.00';
  const isPositive = priceChange >= 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <button
          onClick={() => router.push('/stocks')}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-medium">Back to Stocks</span>
        </button>

        <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-4">
              <img 
                src={stock.iconUrl || 'https://via.placeholder.com/64'} 
                alt={stock.companyName || stock.symbol}
                className="w-16 h-16 rounded-full bg-gray-100 p-2"
                onError={(e) => { e.target.src = 'https://via.placeholder.com/64'; }}
              />
              <div>
                <h1 className="text-3xl font-bold text-gray-900">{stock.symbol}</h1>
                <p className="text-gray-600">{stock.companyName || 'Loading...'}</p>
              </div>
            </div>
            {connected && (
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-green-100">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-green-700">Live</span>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6">
              <p className="text-sm text-blue-700 mb-2 font-medium">Current Price</p>
              <p className="text-4xl font-bold text-blue-900">${currentPrice.toFixed(2)}</p>
            </div>
            <div className={`bg-gradient-to-br ${isPositive ? 'from-green-50 to-green-100' : 'from-red-50 to-red-100'} rounded-xl p-6`}>
              <p className={`text-sm ${isPositive ? 'text-green-700' : 'text-red-700'} mb-2 font-medium`}>Change</p>
              <p className={`text-4xl font-bold ${isPositive ? 'text-green-900' : 'text-red-900'}`}>
                {isPositive ? '+' : ''}{priceChange.toFixed(2)}
              </p>
            </div>
            <div className={`bg-gradient-to-br ${isPositive ? 'from-green-50 to-green-100' : 'from-red-50 to-red-100'} rounded-xl p-6`}>
              <p className={`text-sm ${isPositive ? 'text-green-700' : 'text-red-700'} mb-2 font-medium`}>Percent Change</p>
              <p className={`text-4xl font-bold ${isPositive ? 'text-green-900' : 'text-red-900'}`}>
                {isPositive ? '+' : ''}{percentChange}%
              </p>
            </div>
          </div>

          <div className="border-t pt-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900">Price Chart</h2>
              <div className="flex gap-2">
                <button className="px-3 py-1 text-xs font-medium rounded-lg bg-blue-100 text-blue-700">1D</button>
                <button className="px-3 py-1 text-xs font-medium rounded-lg hover:bg-gray-100 text-gray-600">5D</button>
                <button className="px-3 py-1 text-xs font-medium rounded-lg hover:bg-gray-100 text-gray-600">1M</button>
                <button className="px-3 py-1 text-xs font-medium rounded-lg hover:bg-gray-100 text-gray-600">1Y</button>
              </div>
            </div>
            <CustomChart 
              stock={stock} 
              timeSeriesData={stock.dayTimeSeries || []} 
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Market Stats</h3>
            <div className="space-y-3">
              <div className="flex justify-between py-3 border-b border-gray-100">
                <span className="text-gray-600">Previous Close</span>
                <span className="font-semibold text-gray-900">${lastPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between py-3 border-b border-gray-100">
                <span className="text-gray-600">Day High</span>
                <span className="font-semibold text-gray-900">${(currentPrice * 1.02).toFixed(2)}</span>
              </div>
              <div className="flex justify-between py-3 border-b border-gray-100">
                <span className="text-gray-600">Day Low</span>
                <span className="font-semibold text-gray-900">${(currentPrice * 0.98).toFixed(2)}</span>
              </div>
              <div className="flex justify-between py-3">
                <span className="text-gray-600">Volume</span>
                <span className="font-semibold text-gray-900">{stock.volume || '12.5M'}</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">About</h3>
            <p className="text-gray-600 leading-relaxed mb-4">
              Real-time trading data for {stock.companyName || stock.symbol} ({stock.symbol}). 
              Monitor live price updates and historical performance with interactive charts.
            </p>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Activity className="w-4 h-4" />
              <span>Updates every second</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StockChartPage;