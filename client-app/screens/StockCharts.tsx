import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { LineChart, Grid } from 'react-native-svg-charts';
import { Circle, G, Line } from 'react-native-svg';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useStockSocketStore } from "../store/useStockSocketStore"
import { Feather } from '@expo/vector-icons';

interface Stock {
  symbol: string;
  companyName?: string;
  iconUrl?: string;
  currentPrice: number;
  lastDayTradedPrice: number;
  volume?: string;
  dayTimeSeries?: { time: number; close: number }[];
}

const CustomChart = ({ stock, timeSeriesData }: { stock: Stock; timeSeriesData: { time: number; close: number }[] }) => {
  const [chartData, setChartData] = useState<number[]>([]);

  useEffect(() => {
    // Use timeSeriesData if exists, otherwise generate mock
    const data = timeSeriesData && timeSeriesData.length > 0
      ? timeSeriesData.map(d => d.close)
      : Array.from({ length: 30 }, () => stock.lastDayTradedPrice + (Math.random() - 0.5) * stock.lastDayTradedPrice * 0.05);
    
    setChartData(data);
  }, [stock, timeSeriesData]);

  return (
    <LineChart
      style={{ height: 250, width: '100%' }}
      data={chartData}
      svg={{ stroke: chartData[chartData.length - 1] >= chartData[0] ? '#22c55e' : '#ef4444', strokeWidth: 2 }}
      contentInset={{ top: 20, bottom: 20 }}
    >
      <Grid />
    </LineChart>
  );
};

const StockChartScreen: React.FC = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { symbol } = (route.params as any) || {};

  const { liveStocks, subscribeStock, unsubscribeStock, connectSocket, connected } = useStockSocketStore();
  const stock = symbol ? liveStocks[symbol] : null;

  useEffect(() => {
    if (!connected) connectSocket();
  }, [connected, connectSocket]);

  useEffect(() => {
    if (symbol) {
      subscribeStock(symbol);
      return () => unsubscribeStock(symbol);
    }
  }, [symbol, subscribeStock, unsubscribeStock]);

  if (!symbol) {
    return (
      <View style={styles.center}>
        <Text style={styles.text}>No stock symbol provided</Text>
        <TouchableOpacity onPress={() => navigation.navigate('LiveStocksList')}>
          <Text style={[styles.text, { color: 'blue', marginTop: 10 }]}>Go to Stocks</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (!stock) {
    return (
      <View style={styles.center}>
        <Text style={styles.text}>Loading stock data for {symbol}...</Text>
      </View>
    );
  }

  const currentPrice = stock.currentPrice || stock.lastDayTradedPrice;
  const lastPrice = stock.lastDayTradedPrice;
  const priceChange = currentPrice - lastPrice;
  const percentChange = lastPrice !== 0 ? ((priceChange / lastPrice) * 100).toFixed(2) : '0.00';
  const isPositive = priceChange >= 0;

  return (
    <ScrollView style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Feather name="arrow-left" size={20} color="gray" />
        <Text style={{ marginLeft: 5 }}>Back to Stocks</Text>
      </TouchableOpacity>

      {/* Stock Header */}
      <View style={styles.header}>
        <Image source={{ uri: stock.iconUrl || 'https://via.placeholder.com/64' }} style={styles.icon} />
        <View>
          <Text style={styles.symbol}>{stock.symbol}</Text>
          <Text style={styles.company}>{stock.companyName || 'Loading...'}</Text>
        </View>
        {connected && (
          <View style={styles.liveBadge}>
            <View style={styles.liveDot} />
            <Text style={styles.liveText}>Live</Text>
          </View>
        )}
      </View>

      {/* Price Info */}
      <View style={styles.priceContainer}>
        <View style={[styles.priceBox, { backgroundColor: '#DBEAFE' }]}>
          <Text style={styles.label}>Current Price</Text>
          <Text style={styles.price}>${currentPrice.toFixed(2)}</Text>
        </View>
        <View style={[styles.priceBox, { backgroundColor: isPositive ? '#DCFCE7' : '#FEE2E2' }]}>
          <Text style={[styles.label, { color: isPositive ? '#166534' : '#B91C1C' }]}>Change</Text>
          <Text style={[styles.price, { color: isPositive ? '#166534' : '#B91C1C' }]}>
            {isPositive ? '+' : ''}{priceChange.toFixed(2)}
          </Text>
        </View>
        <View style={[styles.priceBox, { backgroundColor: isPositive ? '#DCFCE7' : '#FEE2E2' }]}>
          <Text style={[styles.label, { color: isPositive ? '#166534' : '#B91C1C' }]}>Percent Change</Text>
          <Text style={[styles.price, { color: isPositive ? '#166534' : '#B91C1C' }]}>
            {isPositive ? '+' : ''}{percentChange}%
          </Text>
        </View>
      </View>

      {/* Chart */}
      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>Price Chart</Text>
        <CustomChart stock={stock} timeSeriesData={stock.dayTimeSeries || []} />
      </View>

      {/* Market Stats */}
      <View style={styles.statsContainer}>
        <Text style={styles.statsTitle}>Market Stats</Text>
        <View style={styles.statsRow}>
          <Text style={styles.statsLabel}>Previous Close</Text>
          <Text style={styles.statsValue}>${lastPrice.toFixed(2)}</Text>
        </View>
        <View style={styles.statsRow}>
          <Text style={styles.statsLabel}>Day High</Text>
          <Text style={styles.statsValue}>${(currentPrice * 1.02).toFixed(2)}</Text>
        </View>
        <View style={styles.statsRow}>
          <Text style={styles.statsLabel}>Day Low</Text>
          <Text style={styles.statsValue}>${(currentPrice * 0.98).toFixed(2)}</Text>
        </View>
        <View style={styles.statsRow}>
          <Text style={styles.statsLabel}>Volume</Text>
          <Text style={styles.statsValue}>{stock.volume || '12.5M'}</Text>
        </View>
      </View>

      {/* About */}
      <View style={styles.aboutContainer}>
        <Text style={styles.statsTitle}>About</Text>
        <Text style={styles.aboutText}>
          Real-time trading data for {stock.companyName || stock.symbol} ({stock.symbol}). 
          Monitor live price updates and historical performance with interactive charts.
        </Text>
      </View>
    </ScrollView>
  );
};

export default StockChartScreen;

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0F172A', paddingHorizontal: 16 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  text: { color: '#64748B', fontSize: 16 },
  backButton: { flexDirection: 'row', alignItems: 'center', marginVertical: 10 },
  header: { flexDirection: 'row', alignItems: 'center', marginVertical: 16 },
  icon: { width: 64, height: 64, borderRadius: 32, marginRight: 12, backgroundColor: '#F3F4F6' },
  symbol: { fontSize: 24, fontWeight: 'bold', color: '#F8FAFC' },
  company: { fontSize: 14, color: '#94A3B8' },
  liveBadge: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#DCFCE7', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 50, marginLeft: 'auto' },
  liveDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#16A34A', marginRight: 4 },
  liveText: { fontSize: 12, color: '#166534', fontWeight: 'bold' },
  priceContainer: { flexDirection: 'row', justifyContent: 'space-between', marginVertical: 16 },
  priceBox: { flex: 1, marginHorizontal: 4, padding: 16, borderRadius: 16 },
  label: { fontSize: 12, fontWeight: '600', marginBottom: 4 },
  price: { fontSize: 24, fontWeight: 'bold' },
  chartContainer: { marginVertical: 16 },
  chartTitle: { fontSize: 18, fontWeight: 'bold', color: '#F8FAFC', marginBottom: 8 },
  statsContainer: { backgroundColor: '#fff', borderRadius: 16, padding: 16, marginVertical: 8 },
  statsTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 8 },
  statsRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 4 },
  statsLabel: { color: '#64748B', fontSize: 14 },
  statsValue: { fontWeight: '600', fontSize: 14 },
  aboutContainer: { backgroundColor: '#fff', borderRadius: 16, padding: 16, marginVertical: 8 },
  aboutText: { color: '#64748B', fontSize: 14, lineHeight: 20 },
});
