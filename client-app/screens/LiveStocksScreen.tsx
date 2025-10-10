// import React, { useEffect, useState } from 'react';
// import { View, Text, ScrollView, Image, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
// import { MaterialCommunityIcons, Feather, FontAwesome5 } from '@expo/vector-icons';
// import { useStockSocketStore } from '../store/useStockSocketStore';
// import { useNavigation } from "@react-navigation/native";
// interface Stock {
//   symbol: string;
//   companyName: string;
//   iconUrl: string;
//   lastDayTradedPrice: number;
//   currentPrice: number;
// }

// const mockStocks: Stock[] = [
//   { symbol: "AAPL", companyName: "Apple Inc.", iconUrl: "https://logo.clearbit.com/apple.com", lastDayTradedPrice: 175.43, currentPrice: 175.43 },
//   { symbol: "MSFT", companyName: "Microsoft Corporation", iconUrl: "https://logo.clearbit.com/microsoft.com", lastDayTradedPrice: 338.11, currentPrice: 338.11 },
//   { symbol: "GOOGL", companyName: "Alphabet Inc. (Google)", iconUrl: "https://logo.clearbit.com/google.com", lastDayTradedPrice: 142.56, currentPrice: 142.56 },
//   // ... Add more stocks as needed
// ];

// interface StockCardProps {
//   stock: Stock;
//   onPress: () => void;
// }

// const StockCard: React.FC<StockCardProps> = ({ stock, onPress }) => {
//   const [isUpdating, setIsUpdating] = useState(false);

//   const priceChange = stock.currentPrice - stock.lastDayTradedPrice;
//   const percentChange = ((priceChange / stock.lastDayTradedPrice) * 100).toFixed(2);
//   const isPositive = priceChange >= 0;
//   const navigation = useNavigation();
//   useEffect(() => {
//     setIsUpdating(true);
//     const timer = setTimeout(() => setIsUpdating(false), 300);
//     return () => clearTimeout(timer);
//   }, [stock.currentPrice]);

//   return (
//     <TouchableOpacity style={styles.card} onPress={onPress}>
//       {isUpdating && <View style={styles.updateOverlay} />}
//       <View style={styles.cardHeader}>
//         <View style={styles.stockInfo}>
//           <Image
//             source={{ uri: stock.iconUrl }}
//             style={styles.stockImage}
//             resizeMode="contain"
//             // defaultSource={require('../../../assets/placeholder.png')}
//           />
//           <View>
//             <Text style={styles.symbol}>{stock.symbol}</Text>
//             <Text style={styles.companyName}>{stock.companyName}</Text>
//           </View>
//         </View>
//         <View style={[styles.priceChangeBadge, { backgroundColor: isPositive ? '#D4EDDA' : '#F8D7DA' }]}>
//           {isPositive ? (
//             <MaterialCommunityIcons name="trending-up" size={20} color="#155724" />
//           ) : (
//             <MaterialCommunityIcons name="trending-down" size={20} color="#721C24" />
//           )}
//         </View>
//       </View>
//       <View style={styles.cardBody}>
//         <Text style={styles.currentPrice}>${stock.currentPrice.toFixed(2)}</Text>
//         <View style={[styles.changeContainer, { backgroundColor: isPositive ? '#C3E6CB' : '#F5C6CB' }]}>
//           <Text style={styles.changeText}>
//             {isPositive ? '+' : ''}{priceChange.toFixed(2)} ({isPositive ? '+' : ''}{percentChange}%)
//           </Text>
//         </View>
//       </View>
//       <View style={styles.cardFooter}>
//         <FontAwesome5 name="chart-line" size={16} color="#6B7280" />
//         <Text style={styles.footerText}>Tap to view chart</Text>
//       </View>
//     </TouchableOpacity>
//   );
// };

// const LiveStocksListPage: React.FC = () => {
//   const { connectSocket, disconnectSocket, subscribeMultipleStocks, liveStocks, connected } = useStockSocketStore();
//   const [marketStats, setMarketStats] = useState({ gainers: 0, losers: 0, neutral: 0 });

//   useEffect(() => {
//     connectSocket();
//     const symbols = mockStocks.map(s => s.symbol);
//     subscribeMultipleStocks(symbols);

//     return () => disconnectSocket();
//   }, [connectSocket, disconnectSocket, subscribeMultipleStocks]);

//   const displayStocks = mockStocks.map(stock =>
//     liveStocks[stock.symbol] ? { ...stock, ...liveStocks[stock.symbol] } : stock
//   );

//   useEffect(() => {
//     const stats = displayStocks.reduce((acc, stock) => {
//       const change = stock.currentPrice - stock.lastDayTradedPrice;
//       if (change > 0) acc.gainers++;
//       else if (change < 0) acc.losers++;
//       else acc.neutral++;
//       return acc;
//     }, { gainers: 0, losers: 0, neutral: 0 });
//     setMarketStats(stats);
//   }, [displayStocks]);

//   const handleStockClick = (symbol: string) => {
//     console.log('Navigate to chart for', symbol);
//     // Use React Navigation to navigate
//     navigation.navigate('StockChart', { symbol });
//   };

//   return (
//     <ScrollView style={styles.container}>
//       <View style={styles.header}>
//         <View style={styles.headerLeft}>
//           <MaterialCommunityIcons name="chart-line-variant" size={32} color="#4F46E5" />
//           <Text style={styles.headerTitle}>Live Stock Market</Text>
//         </View>
//         <View style={styles.marketStats}>
//           <View style={styles.gainers}>
//             <Text style={styles.statLabel}>Gainers</Text>
//             <Text style={styles.statValue}>{marketStats.gainers}</Text>
//           </View>
//           <View style={styles.losers}>
//             <Text style={styles.statLabel}>Losers</Text>
//             <Text style={styles.statValue}>{marketStats.losers}</Text>
//           </View>
//         </View>
//         <View style={styles.connectionStatus}>
//           <View style={[styles.statusDot, { backgroundColor: connected ? '#22C55E' : '#9CA3AF' }]} />
//           <Text style={styles.statusText}>{connected ? 'Live' : 'Connecting...'}</Text>
//         </View>
//       </View>

//       <FlatList
//         data={displayStocks}
//         keyExtractor={(item) => item.symbol}
//         renderItem={({ item }) => (
//           <StockCard stock={item} onPress={() => handleStockClick(item.symbol)} />
//         )}
//         contentContainerStyle={{ paddingBottom: 100 }}
//         numColumns={2}
//         columnWrapperStyle={{ justifyContent: 'space-between', marginBottom: 16 }}
//       />
//     </ScrollView>
//   );
// };

// export default LiveStocksListPage;

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: '#0F172A', padding: 16 },
//   header: { marginBottom: 24 },
//   headerLeft: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
//   headerTitle: { fontSize: 28, fontWeight: 'bold', color: '#F9FAFB', marginLeft: 12 },
//   marketStats: { flexDirection: 'row', gap: 16, marginBottom: 12 },
//   gainers: { backgroundColor: '#D1FAE5', padding: 8, borderRadius: 12, alignItems: 'center' },
//   losers: { backgroundColor: '#FEE2E2', padding: 8, borderRadius: 12, alignItems: 'center' },
//   statLabel: { fontSize: 12, fontWeight: '600', color: '#065F46' },
//   statValue: { fontSize: 18, fontWeight: 'bold', color: '#065F46' },
//   connectionStatus: { flexDirection: 'row', alignItems: 'center', gap: 8 },
//   statusDot: { width: 12, height: 12, borderRadius: 6 },
//   statusText: { color: '#F9FAFB', fontWeight: '600' },
//   card: { backgroundColor: '#FFFFFFDD', borderRadius: 16, padding: 16, marginBottom: 16, position: 'relative', flex: 1 },
//   updateOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: '#60A5FA22', borderRadius: 16 },
//   cardHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
//   stockInfo: { flexDirection: 'row', alignItems: 'center', gap: 12 },
//   stockImage: { width: 48, height: 48, borderRadius: 24, marginRight: 8 },
//   symbol: { fontSize: 18, fontWeight: 'bold', color: '#111827' },
//   companyName: { fontSize: 12, color: '#6B7280', maxWidth: 120 },
//   priceChangeBadge: { padding: 4, borderRadius: 12, justifyContent: 'center', alignItems: 'center' },
//   cardBody: { marginBottom: 12 },
//   currentPrice: { fontSize: 24, fontWeight: 'bold', color: '#111827' },
//   changeContainer: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 12, marginTop: 4 },
//   changeText: { fontSize: 12, fontWeight: '600', color: '#111827' },
//   cardFooter: { flexDirection: 'row', alignItems: 'center', gap: 4 }
// });


import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';
import { useStockSocketStore } from '../store/useStockSocketStore';
import { useNavigation } from "@react-navigation/native";

interface Stock {
  symbol: string;
  companyName: string;
  iconUrl: string;
  lastDayTradedPrice: number;
  currentPrice: number;
}

const mockStocks: Stock[] = [
  { symbol: "AAPL", companyName: "Apple Inc.", iconUrl: "https://logo.clearbit.com/apple.com", lastDayTradedPrice: 175.43, currentPrice: 175.43 },
  { symbol: "MSFT", companyName: "Microsoft Corporation", iconUrl: "https://logo.clearbit.com/microsoft.com", lastDayTradedPrice: 338.11, currentPrice: 338.11 },
  { symbol: "GOOGL", companyName: "Alphabet Inc.", iconUrl: "https://logo.clearbit.com/google.com", lastDayTradedPrice: 142.56, currentPrice: 142.56 },
];

interface StockCardProps {
  stock: Stock;
  onPress: () => void;
}

const StockCard: React.FC<StockCardProps> = ({ stock, onPress }) => {
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
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.8}>
      {isUpdating && <View style={styles.updateOverlay} />}
      <View style={styles.cardHeader}>
        <View style={styles.stockInfo}>
          <Image
            source={{ uri: stock.iconUrl }}
            style={styles.stockImage}
            resizeMode="contain"
          />
          <View>
            <Text style={styles.symbol}>{stock.symbol}</Text>
            <Text style={styles.companyName} numberOfLines={1}>{stock.companyName}</Text>
          </View>
        </View>
        <View style={[styles.priceChangeBadge, { backgroundColor: isPositive ? '#D4EDDA' : '#F8D7DA' }]}>
          <MaterialCommunityIcons
            name={isPositive ? "trending-up" : "trending-down"}
            size={20}
            color={isPositive ? "#155724" : "#721C24"}
          />
        </View>
      </View>
      <View style={styles.cardBody}>
        <Text style={styles.currentPrice}>${stock.currentPrice.toFixed(2)}</Text>
        <View style={[styles.changeContainer, { backgroundColor: isPositive ? '#C3E6CB' : '#F5C6CB' }]}>
          <Text style={styles.changeText}>
            {isPositive ? '+' : ''}{priceChange.toFixed(2)} ({isPositive ? '+' : ''}{percentChange}%)
          </Text>
        </View>
      </View>
      <View style={styles.cardFooter}>
        <FontAwesome5 name="chart-line" size={16} color="#6B7280" />
        <Text style={styles.footerText}>Tap to view chart</Text>
      </View>
    </TouchableOpacity>
  );
};

const LiveStocksListPage: React.FC = () => {
  const navigation = useNavigation();
  const { connectSocket, disconnectSocket, subscribeMultipleStocks, liveStocks, connected } = useStockSocketStore();
  const [marketStats, setMarketStats] = useState({ gainers: 0, losers: 0, neutral: 0 });

  useEffect(() => {
    connectSocket();
    const symbols = mockStocks.map(s => s.symbol);
    subscribeMultipleStocks(symbols);

    return () => disconnectSocket();
  }, [connectSocket, disconnectSocket, subscribeMultipleStocks]);

  const displayStocks = mockStocks.map(stock =>
    liveStocks[stock.symbol] ? { ...stock, ...liveStocks[stock.symbol] } : stock
  );

  useEffect(() => {
    const stats = displayStocks.reduce((acc, stock) => {
      const change = stock.currentPrice - stock.lastDayTradedPrice;
      if (change > 0) acc.gainers++;
      else if (change < 0) acc.losers++;
      else acc.neutral++;
      return acc;
    }, { gainers: 0, losers: 0, neutral: 0 });
    setMarketStats(stats);
  }, [displayStocks]);

  const handleStockClick = (symbol: string) => {
    navigation.navigate('StockChart', { symbol });
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <MaterialCommunityIcons name="chart-line-variant" size={32} color="#4F46E5" />
          <Text style={styles.headerTitle}>Live Stock Market</Text>
        </View>
        <View style={styles.marketStats}>
          <View style={styles.gainers}>
            <Text style={styles.statLabel}>Gainers</Text>
            <Text style={styles.statValue}>{marketStats.gainers}</Text>
          </View>
          <View style={styles.losers}>
            <Text style={styles.statLabel}>Losers</Text>
            <Text style={styles.statValue}>{marketStats.losers}</Text>
          </View>
        </View>
        <View style={styles.connectionStatus}>
          <View style={[styles.statusDot, { backgroundColor: connected ? '#22C55E' : '#9CA3AF' }]} />
          <Text style={styles.statusText}>{connected ? 'Live' : 'Connecting...'}</Text>
        </View>
      </View>

      <FlatList
        data={displayStocks}
        keyExtractor={(item) => item.symbol}
        renderItem={({ item }) => (
          <StockCard stock={item} onPress={() => handleStockClick(item.symbol)} />
        )}
        contentContainerStyle={{ paddingBottom: 100 }}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: 'space-between', marginBottom: 16 }}
      />
    </ScrollView>
  );
};

export default LiveStocksListPage;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0F172A', padding: 16 },
  header: { marginBottom: 24 },
  headerLeft: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  headerTitle: { fontSize: 28, fontWeight: 'bold', color: '#F9FAFB', marginLeft: 12 },
  marketStats: { flexDirection: 'row', marginBottom: 12 },
  gainers: { backgroundColor: '#D1FAE5', padding: 8, borderRadius: 12, alignItems: 'center', marginRight: 12 },
  losers: { backgroundColor: '#FEE2E2', padding: 8, borderRadius: 12, alignItems: 'center' },
  statLabel: { fontSize: 12, fontWeight: '600', color: '#065F46' },
  statValue: { fontSize: 18, fontWeight: 'bold', color: '#065F46' },
  connectionStatus: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  statusDot: { width: 12, height: 12, borderRadius: 6 },
  statusText: { color: '#F9FAFB', fontWeight: '600', marginLeft: 4 },
  card: { backgroundColor: '#FFFFFFDD', borderRadius: 16, padding: 16, marginBottom: 16, position: 'relative', flex: 1 },
  updateOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: '#60A5FA22', borderRadius: 16 },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
  stockInfo: { flexDirection: 'row', alignItems: 'center' },
  stockImage: { width: 48, height: 48, borderRadius: 24, marginRight: 8 },
  symbol: { fontSize: 18, fontWeight: 'bold', color: '#111827' },
  companyName: { fontSize: 12, color: '#6B7280', maxWidth: 120 },
  priceChangeBadge: { padding: 4, borderRadius: 12, justifyContent: 'center', alignItems: 'center' },
  cardBody: { marginBottom: 12 },
  currentPrice: { fontSize: 24, fontWeight: 'bold', color: '#111827' },
  changeContainer: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 12, marginTop: 4 },
  changeText: { fontSize: 12, fontWeight: '600', color: '#111827' },
  cardFooter: { flexDirection: 'row', alignItems: 'center', marginTop: 4 },
  footerText: { fontSize: 12, color: '#6B7280', marginLeft: 4 },
});
