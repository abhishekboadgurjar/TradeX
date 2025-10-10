import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Dimensions,
} from "react-native";
import { useStockStore } from "../store/useStockStore";
import { LinearGradient } from "expo-linear-gradient";
import {
  MaterialIcons,
  FontAwesome5,
  Feather,
  Entypo,
} from "@expo/vector-icons";

const { width } = Dimensions.get("window");

export default function OrdersPage() {
  const { orders, fetchOrders, loading, error } = useStockStore();
  const [filter, setFilter] = useState<"all" | "buy" | "sell">("all");
  const scrollAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  useEffect(() => {
    Animated.loop(
      Animated.timing(scrollAnim, {
        toValue: -width,
        duration: 20000,
        useNativeDriver: true,
      })
    ).start();
  }, []);

  const filteredOrders = orders.filter((order) =>
    filter === "all" ? true : order.type === filter
  );
  const totalBuyOrders = orders.filter((o) => o.type === "buy").length;
  const totalSellOrders = orders.filter((o) => o.type === "sell").length;
  const totalVolume = orders.reduce((sum, o) => sum + o.price * o.quantity, 0);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Animated.View style={styles.loader}></Animated.View>
        <Text style={styles.loadingText}>Loading your order history...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Gradient Background */}
      <LinearGradient
        colors={["#0f172a", "#111827", "#0f172a"]}
        style={StyleSheet.absoluteFill}
      />

      {/* Stock Ticker */}
      <View style={styles.tickerContainer}>
        <Animated.View
          style={{
            flexDirection: "row",
            transform: [{ translateX: scrollAnim }],
          }}
        >
          {["AAPL +2.45%", "MSFT +1.82%", "GOOGL -0.67%", "TSLA +3.21%"].map(
            (item, i) => (
              <Text
                key={i}
                style={{
                  marginRight: 24,
                  color: item.includes("-") ? "#f87171" : "#34d399",
                }}
              >
                {item}
              </Text>
            )
          )}
        </Animated.View>
      </View>

      <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 50 }}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <View style={styles.titleContainer}>
              <View style={styles.iconContainer}>
                <FontAwesome5 name="file-alt" size={20} color="white" />
              </View>
              <Text style={styles.title}>Order History</Text>
            </View>
            <Text style={styles.subtitle}>
              Track all your buy and sell transactions
            </Text>
          </View>

          <TouchableOpacity style={styles.exportButton}>
            <Feather name="download" size={16} color="#34d399" />
            <Text style={{ color: "#34d399", marginLeft: 6 }}>Export</Text>
          </TouchableOpacity>
        </View>

        {/* Stats Cards */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 16 }}>
          {[
            { label: "Total Orders", value: orders.length, icon: "activity", color: "#8b5cf6" },
            { label: "Buy Orders", value: totalBuyOrders, icon: "trending-up", color: "#34d399" },
            { label: "Sell Orders", value: totalSellOrders, icon: "trending-down", color: "#f87171" },
            { label: "Total Volume", value: `₹${totalVolume.toLocaleString("en-IN")}`, icon: "bar-chart", color: "#3b82f6" },
          ].map((card, i) => (
            <View key={i} style={[styles.card, { borderColor: card.color }]}>
              <Text style={styles.cardLabel}>{card.label}</Text>
              <Text style={[styles.cardValue, { color: card.color }]}>{card.value}</Text>
            </View>
          ))}
        </ScrollView>

        {/* Filter Buttons */}
        <View style={styles.filterContainer}>
          {["all", "buy", "sell"].map((f) => (
            <TouchableOpacity
              key={f}
              onPress={() => setFilter(f as any)}
              style={[
                styles.filterButton,
                filter === f && styles.filterButtonActive,
                f === "buy" && { borderColor: "#34d399" },
                f === "sell" && { borderColor: "#f87171" },
              ]}
            >
              <Text
                style={{
                  color:
                    filter === f
                      ? f === "buy"
                        ? "#34d399"
                        : f === "sell"
                        ? "#f87171"
                        : "white"
                      : "#9ca3af",
                }}
              >
                {f.toUpperCase()} ORDERS
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Error */}
        {error && (
          <View style={[styles.alert, { borderColor: "#f87171" }]}>
            <Entypo name="warning" size={16} color="#f87171" />
            <Text style={{ color: "#fca5a5", marginLeft: 6 }}>{error}</Text>
          </View>
        )}

        {/* Orders List */}
        {filteredOrders.length === 0 ? (
          <View style={styles.noOrders}>
            <FontAwesome5 name="file-alt" size={40} color="#64748b" />
            <Text style={styles.noOrdersText}>
              {filter === "all" ? "No Orders Yet" : `No ${filter} Orders`}
            </Text>
            <Text style={styles.noOrdersSub}>
              {filter === "all"
                ? "Start trading to see your order history"
                : `You haven't placed any ${filter} orders yet`}
            </Text>
          </View>
        ) : (
          filteredOrders.map((order) => {
            const isBuy = order.type === "buy";
            const totalAmount = order.price * order.quantity;
            return (
              <View
                key={order._id}
                style={[
                  styles.orderCard,
                  { borderColor: isBuy ? "#34d399" : "#f87171" },
                ]}
              >
                <View style={styles.orderRow}>
                  <View
                    style={[
                      styles.orderBadge,
                      { backgroundColor: isBuy ? "#d1fae5" : "#fee2e2" },
                    ]}
                  >
                    <Text style={{ color: isBuy ? "#10b981" : "#ef4444" }}>
                      {order.type.toUpperCase()}
                    </Text>
                  </View>
                  <View style={{ flex: 1, marginLeft: 12 }}>
                    <Text style={styles.orderCompany}>
                      {order.stock.companyName} ({order.stock.symbol})
                    </Text>
                    <Text style={styles.orderDate}>
                      {new Date(order.timestamp).toLocaleString("en-IN")}
                    </Text>
                    <Text style={styles.orderAmount}>
                      Qty: {order.quantity} | Price: ₹{order.price.toFixed(2)} | Total: ₹{totalAmount.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                    </Text>
                  </View>
                </View>
              </View>
            );
          })
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  loadingContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  loader: { width: 64, height: 64, borderRadius: 32, borderWidth: 4, borderColor: "#34d399", borderTopColor: "#10b981" },
  loadingText: { color: "#94a3b8", marginTop: 16 },
  tickerContainer: { height: 24, overflow: "hidden", backgroundColor: "#111827", paddingHorizontal: 16, justifyContent: "center" },
  header: { flexDirection: "row", justifyContent: "space-between", marginBottom: 16 },
  titleContainer: { flexDirection: "row", alignItems: "center" },
  iconContainer: { width: 48, height: 48, borderRadius: 12, backgroundColor: "#10b981", justifyContent: "center", alignItems: "center", marginRight: 8 },
  title: { fontSize: 28, color: "white", fontWeight: "bold" },
  subtitle: { color: "#94a3b8" },
  exportButton: { flexDirection: "row", alignItems: "center", borderWidth: 1, borderColor: "#34d399", padding: 8, borderRadius: 8 },
  card: { minWidth: 140, padding: 16, borderRadius: 12, marginRight: 12, borderWidth: 1 },
  cardLabel: { color: "#94a3b8", fontSize: 12 },
  cardValue: { fontSize: 20, fontWeight: "bold", marginTop: 4 },
  filterContainer: { flexDirection: "row", gap: 8, marginBottom: 16 },
  filterButton: { paddingVertical: 6, paddingHorizontal: 12, borderRadius: 8, borderWidth: 1, marginRight: 8 },
  filterButtonActive: { backgroundColor: "#374151" },
  alert: { flexDirection: "row", alignItems: "center", borderWidth: 1, padding: 8, borderRadius: 8, marginBottom: 16 },
  noOrders: { justifyContent: "center", alignItems: "center", padding: 32 },
  noOrdersText: { fontSize: 20, fontWeight: "bold", color: "white", marginTop: 12 },
  noOrdersSub: { color: "#94a3b8", textAlign: "center", marginTop: 8 },
  orderCard: { padding: 16, borderRadius: 12, marginBottom: 12, borderWidth: 1 },
  orderRow: { flexDirection: "row" },
  orderBadge: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 12 },
  orderCompany: { fontWeight: "bold", fontSize: 16, color: "white" },
  orderDate: { color: "#94a3b8", marginTop: 2, fontSize: 12 },
  orderAmount: { color: "white", marginTop: 4 },
});
