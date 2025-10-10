// screens/StocksScreen.tsx
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Dimensions,
  StyleSheet,
  Animated,
} from "react-native";
import { useStockStore } from "../store/useStockStore";
import { Card, Button } from "react-native-paper";
import { Svg, Path, Defs, LinearGradient, Stop } from "react-native-svg";
import {
  TrendingUp,
  TrendingDown,
  ShoppingCart,
  ArrowUpRight,
  ArrowDownRight,
  Star,
  Activity,
} from "lucide-react-native";

const { width } = Dimensions.get("window");

export default function StocksScreen() {
  const { stocks, fetchStocks, buyStock, loading, error } = useStockStore();
  const [buyQuantity, setBuyQuantity] = useState<{ [key: string]: number }>({});
  const [view, setView] = useState<"detailed" | "grid">("detailed");

  useEffect(() => {
    fetchStocks();
  }, []);

  const handleBuy = async (stockId: string, quantity: number) => {
    if (quantity <= 0) return;
    await buyStock(stockId, quantity);
    setBuyQuantity({ ...buyQuantity, [stockId]: 0 });
  };

  // Marquee animation
  const scrollX = new Animated.Value(0);
  useEffect(() => {
    Animated.loop(
      Animated.timing(scrollX, {
        toValue: -width,
        duration: 20000,
        useNativeDriver: true,
      })
    ).start();
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <Text style={{ color: "#9CA3AF" }}>Loading market data...</Text>
      </View>
    );
  }

  const displayedStocks = view === "detailed" ? stocks.slice(0, 2) : stocks;

  const renderStockCard = (stock: any, index: number) => {
    const priceChange = stock.currentPrice - stock.lastDayTradedPrice;
    const percentChange = (priceChange / stock.lastDayTradedPrice) * 100;
    const isPositive = priceChange >= 0;

    return (
      <Card key={stock._id} style={styles.card}>
        <View style={{ padding: 12 }}>
          {/* Header */}
          <View style={styles.rowSpace}>
            <View>
              <Text style={styles.companyName}>{stock.companyName}</Text>
              <Text style={styles.symbol}>{stock.symbol}</Text>
            </View>
            <Star size={24} color="#FBBF24" />
          </View>

          {/* Price */}
          <View
            style={[
              styles.priceBox,
              { backgroundColor: isPositive ? "rgba(5,150,105,0.1)" : "rgba(239,68,68,0.1)" },
            ]}
          >
            <Text style={styles.price}>₹{stock.currentPrice.toFixed(2)}</Text>
            <View style={styles.row}>
              {isPositive ? (
                <TrendingUp size={20} color="#10B981" />
              ) : (
                <TrendingDown size={20} color="#EF4444" />
              )}
              <Text style={{ color: isPositive ? "#10B981" : "#EF4444", marginLeft: 4 }}>
                {isPositive ? "+" : ""}
                {priceChange.toFixed(2)} ({percentChange.toFixed(2)}%)
              </Text>
            </View>
          </View>

          {/* Chart */}
          <View style={{ marginVertical: 12, height: 120 }}>
            <Svg width="100%" height="100%" viewBox="0 0 200 100">
              <Defs>
                <LinearGradient id={`grad-${index}`} x1="0" y1="0" x2="0" y2="1">
                  <Stop offset="0" stopColor={isPositive ? "#10B981" : "#EF4444"} stopOpacity={0.3} />
                  <Stop offset="1" stopColor={isPositive ? "#10B981" : "#EF4444"} stopOpacity={0} />
                </LinearGradient>
              </Defs>
              <Path
                d={`M0,50 ${Array.from({ length: 20 }, (_, i) => {
                  const x = (i + 1) * 10;
                  const y = 50 + Math.sin(i * 0.5) * 20 + (isPositive ? -i : i);
                  return `L${x},${y}`;
                }).join(" ")}`}
                fill="none"
                stroke={isPositive ? "#10B981" : "#EF4444"}
                strokeWidth={2}
              />
            </Svg>
          </View>

          {/* Buy Section */}
          <View>
            <TextInput
              keyboardType="numeric"
              placeholder="Quantity"
              value={buyQuantity[stock._id]?.toString() || ""}
              onChangeText={(val) =>
                setBuyQuantity({ ...buyQuantity, [stock._id]: Number(val) })
              }
              style={styles.input}
            />
            <Button
              mode="contained"
              onPress={() => handleBuy(stock._id, buyQuantity[stock._id] || 1)}
              style={{ marginTop: 6 }}
            >
              <ShoppingCart size={20} color="#fff" /> Buy
            </Button>
          </View>
        </View>
      </Card>
    );
  };

  return (
    <View style={styles.container}>
      {/* Marquee Ticker */}
      <View style={styles.tickerContainer}>
        <Animated.View
          style={{
            flexDirection: "row",
            transform: [{ translateX: scrollX }],
          }}
        >
          {stocks.map((s) => {
            const change = s.currentPrice - s.lastDayTradedPrice;
            const isPositive = change >= 0;
            return (
              <Text
                key={s._id}
                style={{ color: isPositive ? "#10B981" : "#EF4444", marginRight: 24 }}
              >
                {s.symbol} {isPositive ? "+" : ""}
                {((change / s.lastDayTradedPrice) * 100).toFixed(2)}%
              </Text>
            );
          })}
        </Animated.View>
      </View>

      {/* View Toggle */}
      <View style={styles.row}>
        <Button
          mode={view === "detailed" ? "contained" : "outlined"}
          onPress={() => setView("detailed")}
          style={{ marginRight: 6 }}
        >
          Detailed
        </Button>
        <Button
          mode={view === "grid" ? "contained" : "outlined"}
          onPress={() => setView("grid")}
        >
          Grid
        </Button>
      </View>

      {/* Stock List */}
      {view === "detailed" ? (
        <ScrollView style={{ marginTop: 12 }}>
          {displayedStocks.map((s, i) => renderStockCard(s, i))}
        </ScrollView>
      ) : (
        <FlatList
          style={{ marginTop: 12 }}
          data={stocks}
          keyExtractor={(item) => item._id}
          numColumns={2}
          renderItem={({ item, index }) => (
            <View style={{ flex: 1, margin: 6 }}>{renderStockCard(item, index)}</View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0F172A", padding: 12 },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  row: { flexDirection: "row", alignItems: "center", marginBottom: 12 },
  rowSpace: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  card: { backgroundColor: "#1E293B", borderRadius: 12, marginBottom: 12, overflow: "hidden" },
  companyName: { color: "#fff", fontSize: 18, fontWeight: "bold" },
  symbol: { color: "#9CA3AF", fontSize: 12, marginTop: 2 },
  priceBox: { padding: 8, borderRadius: 12, marginTop: 6 },
  price: { fontSize: 20, fontWeight: "bold", color: "#fff" },
  input: {
    backgroundColor: "#0F172A",
    borderColor: "#334155",
    borderWidth: 1,
    borderRadius: 8,
    padding: 8,
    color: "#fff",
    marginTop: 6,
  },
  tickerContainer: {
    height: 24,
    overflow: "hidden",
    borderBottomWidth: 1,
    borderBottomColor: "#334155",
    marginBottom: 12,
  },
});
