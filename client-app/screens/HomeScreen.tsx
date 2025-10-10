// screens/DashboardScreen.tsx
import React, { useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  ScrollView,
  StyleSheet,
  Dimensions,
} from "react-native";
import { useStockStore } from "../store/useStockStore";
import { useProfileStore } from "../store/useProfileStore";
import { Card, Button } from "react-native-paper";
import {
  Wallet,
  DollarSign,
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  ArrowDownRight,
  Package,
  Award,
  PieChart,
  Zap,
} from "lucide-react-native";

const { width } = Dimensions.get("window");

export default function HomeScreen() {
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
  }, []);

  const balance = Number(profile?.balance ?? 0);

  // Portfolio calculations
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

  const recentOrders = orders.slice(0, 5);
  const buyOrders = orders.filter((o) => o.type === "buy").length;
  const sellOrders = orders.filter((o) => o.type === "sell").length;

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

  const renderRecentOrder = ({ item }: any) => {
    const isBuy = item.type === "buy";
    return (
      <Card style={styles.smallCard}>
        <View style={styles.rowSpace}>
          <View style={styles.row}>
            <View
              style={[
                styles.iconCircle,
                { backgroundColor: isBuy ? "rgba(16,185,129,0.2)" : "rgba(239,68,68,0.2)" },
              ]}
            >
              {isBuy ? (
                <ArrowDownRight size={16} color="#10B981" />
              ) : (
                <ArrowUpRight size={16} color="#EF4444" />
              )}
            </View>
            <View>
              <Text style={styles.itemTitle}>{item.stock.companyName}</Text>
              <Text style={styles.itemSubtitle}>
                {item.quantity} shares @ ₹{item.price.toFixed(2)}
              </Text>
            </View>
          </View>
          <View>
            <Text
              style={[
                styles.orderBadge,
                { backgroundColor: isBuy ? "rgba(16,185,129,0.2)" : "rgba(239,68,68,0.2)", color: isBuy ? "#10B981" : "#EF4444" },
              ]}
            >
              {item.type.toUpperCase()}
            </Text>
          </View>
        </View>
      </Card>
    );
  };

  const renderTopPerformer = ({ item }: any) => (
    <Card style={styles.smallCard}>
      <View style={styles.rowSpace}>
        <View>
          <Text style={styles.itemTitle}>{item.stock.companyName}</Text>
          <Text style={styles.itemSubtitle}>{item.quantity} shares</Text>
        </View>
        <View style={{ alignItems: "flex-end" }}>
          <Text style={{ color: "#10B981", fontWeight: "bold" }}>
            +{item.pnlPercentage.toFixed(2)}%
          </Text>
          <Text style={styles.itemSubtitle}>₹{item.pnl.toFixed(2)}</Text>
        </View>
      </View>
    </Card>
  );

  return (
    <FlatList
      data={recentOrders} // main data
      keyExtractor={(item) => item._id}
      ListHeaderComponent={
        <>
          <View style={{ padding: 16 }}>
            <Text style={styles.headerTitle}>
              Welcome back, {profile?.name ?? "Trader"}!
            </Text>

            {/* Stats Grid */}
            <View style={styles.statsGrid}>
              <Card style={[styles.statCard, { borderColor: "#3B82F6" }]}>
                <View>
                  <Text style={styles.statLabel}>Available Balance</Text>
                  <Text style={styles.statValue}>₹{balance.toFixed(2)}</Text>
                </View>
                <Wallet size={24} color="#3B82F6" />
              </Card>

              <Card style={[styles.statCard, { borderColor: "#8B5CF6" }]}>
                <View>
                  <Text style={styles.statLabel}>Portfolio Value</Text>
                  <Text style={styles.statValue}>₹{currentValue.toFixed(2)}</Text>
                </View>
                <DollarSign size={24} color="#8B5CF6" />
              </Card>

              <Card
                style={[
                  styles.statCard,
                  { borderColor: totalPnL >= 0 ? "#10B981" : "#EF4444" },
                ]}
              >
                <View>
                  <Text style={styles.statLabel}>Total P&L</Text>
                  <Text
                    style={{
                      fontSize: 24,
                      fontWeight: "bold",
                      color: totalPnL >= 0 ? "#10B981" : "#EF4444",
                    }}
                  >
                    {totalPnL >= 0 ? "+" : ""}
                    ₹{totalPnL.toFixed(2)}
                  </Text>
                  <Text
                    style={{
                      color: totalPnL >= 0 ? "#10B981" : "#EF4444",
                      fontSize: 12,
                    }}
                  >
                    {totalPnLPercentage.toFixed(2)}%
                  </Text>
                </View>
                {totalPnL >= 0 ? (
                  <TrendingUp size={24} color="#10B981" />
                ) : (
                  <TrendingDown size={24} color="#EF4444" />
                )}
              </Card>

              <Card style={[styles.statCard, { borderColor: "#F59E0B" }]}>
                <View>
                  <Text style={styles.statLabel}>Active Holdings</Text>
                  <Text style={styles.statValue}>{holdings.length}</Text>
                  <Text style={styles.statSubtitle}>{orders.length} orders</Text>
                </View>
                <Package size={24} color="#F59E0B" />
              </Card>
            </View>

            {/* Top Performers */}
            <Text style={styles.sectionTitle}>Top Performers</Text>
            <FlatList
              data={topGainers}
              keyExtractor={(item) => item._id}
              renderItem={renderTopPerformer}
              scrollEnabled={false}
              style={{ marginBottom: 16 }}
            />

            {/* Portfolio Allocation */}
            <Text style={styles.sectionTitle}>Portfolio Allocation</Text>
            {holdings.map((h) => {
              const allocation = ((h.stock.currentPrice * h.quantity) / currentValue) * 100 || 0;
              return (
                <View key={h._id} style={{ marginBottom: 8 }}>
                  <View style={styles.allocationRow}>
                    <Text style={styles.itemTitle}>{h.stock.companyName}</Text>
                    <Text style={styles.itemSubtitle}>{allocation.toFixed(1)}%</Text>
                  </View>
                  <View style={styles.progressBar}>
                    <View
                      style={[styles.progressFill, { width: `${allocation}%` }]}
                    />
                  </View>
                </View>
              );
            })}

            {/* Trading Stats */}
            <Text style={styles.sectionTitle}>Trading Stats</Text>
            <View style={styles.statsGrid}>
              <Card style={styles.smallCard}>
                <Text>Buy Orders</Text>
                <Text style={styles.statValue}>{buyOrders}</Text>
              </Card>
              <Card style={styles.smallCard}>
                <Text>Sell Orders</Text>
                <Text style={styles.statValue}>{sellOrders}</Text>
              </Card>
              <Card style={styles.smallCard}>
                <Text>Win Rate</Text>
                <Text style={styles.statValue}>
                  {holdings.length > 0
                    ? ((topGainers.length / holdings.length) * 100).toFixed(0)
                    : 0}
                  %
                </Text>
              </Card>
            </View>

            <Text style={styles.sectionTitle}>Recent Orders</Text>
          </View>
        </>
      }
      renderItem={renderRecentOrder}
    />
  );
}

const styles = StyleSheet.create({
  headerTitle: { fontSize: 24, fontWeight: "bold", color: "#fff", marginBottom: 16 },
  statsGrid: { flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between", marginBottom: 16 },
  statCard: { width: width / 2 - 24, padding: 12, borderWidth: 1, borderRadius: 12, marginBottom: 12, flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  statLabel: { fontSize: 12, color: "#9CA3AF" },
  statValue: { fontSize: 18, fontWeight: "bold", color: "#fff" },
  statSubtitle: { fontSize: 10, color: "#9CA3AF" },
  sectionTitle: { fontSize: 18, fontWeight: "bold", color: "#fff", marginBottom: 8, marginTop: 16 },
  smallCard: { padding: 12, marginBottom: 8, borderRadius: 12, backgroundColor: "#1F2937" },
  row: { flexDirection: "row", alignItems: "center", gap: 8 },
  rowSpace: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  iconCircle: { width: 32, height: 32, borderRadius: 8, justifyContent: "center", alignItems: "center" },
  itemTitle: { color: "#fff", fontWeight: "bold" },
  itemSubtitle: { color: "#9CA3AF", fontSize: 12 },
  orderBadge: { paddingHorizontal: 6, paddingVertical: 2, borderRadius: 8, fontSize: 10, fontWeight: "bold" },
  allocationRow: { flexDirection: "row", justifyContent: "space-between" },
  progressBar: { width: "100%", height: 8, backgroundColor: "#374151", borderRadius: 4 },
  progressFill: { height: 8, borderRadius: 4, backgroundColor: "#10B981" },
});
