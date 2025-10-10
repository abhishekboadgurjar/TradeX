import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator } from "react-native";
import { useStockStore } from "../store/useStockStore";
import Icon from "react-native-vector-icons/Ionicons"; // For icons

export default function HoldingsPage() {
  const { holdings, fetchHoldings, sellStock, loading, error } = useStockStore();
  const [sellQuantity, setSellQuantity] = useState<{ [key: string]: number }>({});

  useEffect(() => {
    fetchHoldings();
  }, [fetchHoldings]);

  const handleSell = async (holdingId: string, quantity: number) => {
    if (quantity <= 0) return;
    await sellStock(holdingId, quantity);
    setSellQuantity({ ...sellQuantity, [holdingId]: 0 });
  };

  // Portfolio metrics
  const totalInvestment = holdings.reduce((sum, h) => sum + h.buyPrice * h.quantity, 0);
  const currentValue = holdings.reduce((sum, h) => sum + h.stock.currentPrice * h.quantity, 0);
  const totalPnL = currentValue - totalInvestment;
  const totalPnLPercentage = totalInvestment > 0 ? (totalPnL / totalInvestment) * 100 : 0;

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#00ff00" />
        <Text style={styles.loaderText}>Loading your portfolio...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {/* Portfolio Summary */}
      <View style={styles.summaryContainer}>
        <Text style={styles.header}>My Holdings</Text>
        <Text style={styles.subHeader}>Track and manage your investment portfolio</Text>

        <View style={styles.cardsRow}>
          <View style={[styles.card, styles.investmentCard]}>
            <Text style={styles.cardTitle}>Total Investment</Text>
            <Text style={styles.cardValue}>₹{totalInvestment.toFixed(2)}</Text>
          </View>

          <View style={[styles.card, styles.currentValueCard]}>
            <Text style={styles.cardTitle}>Current Value</Text>
            <Text style={styles.cardValue}>₹{currentValue.toFixed(2)}</Text>
          </View>

          <View style={[styles.card, totalPnL >= 0 ? styles.pnlCardPositive : styles.pnlCardNegative]}>
            <Text style={styles.cardTitle}>Total P&L</Text>
            <Text style={styles.cardValue}>
              {totalPnL >= 0 ? "+" : ""}₹{totalPnL.toFixed(2)}
            </Text>
            <Text style={styles.pnlPercentage}>{totalPnLPercentage.toFixed(2)}%</Text>
          </View>

          <View style={[styles.card, styles.totalHoldingsCard]}>
            <Text style={styles.cardTitle}>Total Holdings</Text>
            <Text style={styles.cardValue}>{holdings.length}</Text>
          </View>
        </View>
      </View>

      {/* Error */}
      {error && (
        <View style={styles.errorBox}>
          <Icon name="alert-circle-outline" size={20} color="#f87171" />
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}

      {/* Holdings List */}
      {holdings.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyTitle}>No Holdings Yet</Text>
          <Text style={styles.emptySubtitle}>Start building your portfolio by buying stocks</Text>
          <TouchableOpacity style={styles.exploreButton}>
            <Text style={styles.exploreButtonText}>Explore Stocks</Text>
          </TouchableOpacity>
        </View>
      ) : (
        holdings.map((holding) => {
          const pnl = (holding.stock.currentPrice - holding.buyPrice) * holding.quantity;
          const pnlPercentage = ((holding.stock.currentPrice - holding.buyPrice) / holding.buyPrice) * 100;
          const isProfitable = pnl >= 0;

          return (
            <View key={holding._id} style={styles.holdingCard}>
              {/* Stock Info */}
              <View style={styles.holdingInfo}>
                <Text style={styles.stockName}>{holding.stock.companyName} ({holding.stock.symbol})</Text>
                <Text style={styles.quantity}>Qty: {holding.quantity}</Text>

                <View style={styles.priceRow}>
                  <View style={styles.priceBox}>
                    <Text style={styles.priceLabel}>Buy Price</Text>
                    <Text style={styles.priceValue}>₹{holding.buyPrice.toFixed(2)}</Text>
                  </View>

                  <View style={styles.priceBox}>
                    <Text style={styles.priceLabel}>Current Price</Text>
                    <Text style={styles.priceValue}>₹{holding.stock.currentPrice.toFixed(2)}</Text>
                  </View>

                  <View style={[styles.priceBox, isProfitable ? styles.pnlPositive : styles.pnlNegative]}>
                    <Text style={styles.priceLabel}>P&L</Text>
                    <Text style={styles.priceValue}>{isProfitable ? "+" : ""}₹{pnl.toFixed(2)}</Text>
                  </View>

                  <View style={[styles.priceBox, isProfitable ? styles.pnlPositive : styles.pnlNegative]}>
                    <Text style={styles.priceLabel}>Returns</Text>
                    <Text style={styles.priceValue}>{pnlPercentage.toFixed(2)}%</Text>
                  </View>
                </View>
              </View>

              {/* Sell Section */}
              <View style={styles.sellSection}>
                <TextInput
                  style={styles.sellInput}
                  keyboardType="numeric"
                  placeholder="Qty to sell"
                  value={sellQuantity[holding._id]?.toString() || ""}
                  onChangeText={(val) =>
                    setSellQuantity({ ...sellQuantity, [holding._id]: Number(val) })
                  }
                />
                <TouchableOpacity
                  style={[styles.sellButton, (!sellQuantity[holding._id] || sellQuantity[holding._id] <= 0) && styles.disabledButton]}
                  disabled={!sellQuantity[holding._id] || sellQuantity[holding._id] <= 0}
                  onPress={() => handleSell(holding._id, sellQuantity[holding._id] || 0)}
                >
                  <Text style={styles.sellButtonText}>Sell</Text>
                </TouchableOpacity>

                <View style={styles.quickButtons}>
                  <TouchableOpacity
                    style={styles.quickButton}
                    onPress={() => setSellQuantity({ ...sellQuantity, [holding._id]: Math.floor(holding.quantity / 2) })}
                  >
                    <Text style={styles.quickButtonText}>50%</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.quickButton}
                    onPress={() => setSellQuantity({ ...sellQuantity, [holding._id]: holding.quantity })}
                  >
                    <Text style={styles.quickButtonText}>100%</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          );
        })
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#111827", padding: 16 },
  loaderContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  loaderText: { color: "#94a3b8", marginTop: 8 },

  summaryContainer: { marginBottom: 16 },
  header: { fontSize: 28, fontWeight: "bold", color: "#fff", marginBottom: 4 },
  subHeader: { fontSize: 14, color: "#94a3b8", marginBottom: 12 },
  cardsRow: { flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between" },
  card: { flex: 1, margin: 4, borderRadius: 12, padding: 16 },
  investmentCard: { backgroundColor: "#1e3a8a" },
  currentValueCard: { backgroundColor: "#6b21a8" },
  pnlCardPositive: { backgroundColor: "#065f46" },
  pnlCardNegative: { backgroundColor: "#991b1b" },
  totalHoldingsCard: { backgroundColor: "#b45309" },
  cardTitle: { color: "#94a3b8", fontSize: 12 },
  cardValue: { color: "#fff", fontSize: 18, fontWeight: "bold", marginTop: 4 },
  pnlPercentage: { color: "#fff", fontSize: 12, marginTop: 2 },

  errorBox: { flexDirection: "row", alignItems: "center", padding: 8, backgroundColor: "#fef2f2", marginVertical: 8, borderRadius: 8 },
  errorText: { color: "#b91c1c", marginLeft: 8 },

  emptyContainer: { alignItems: "center", padding: 32 },
  emptyTitle: { color: "#fff", fontSize: 20, fontWeight: "bold", marginBottom: 8 },
  emptySubtitle: { color: "#94a3b8", fontSize: 14, marginBottom: 16 },
  exploreButton: { backgroundColor: "#10b981", padding: 12, borderRadius: 8 },
  exploreButtonText: { color: "#fff", fontWeight: "bold" },

  holdingCard: { backgroundColor: "#1f2937", borderRadius: 12, padding: 16, marginBottom: 12 },
  holdingInfo: { marginBottom: 12 },
  stockName: { color: "#fff", fontSize: 16, fontWeight: "bold", marginBottom: 4 },
  quantity: { color: "#94a3b8", fontSize: 12 },
  priceRow: { flexDirection: "row", justifyContent: "space-between", flexWrap: "wrap" },
  priceBox: { flex: 1, backgroundColor: "#111827", borderRadius: 8, padding: 8, margin: 4 },
  priceLabel: { color: "#94a3b8", fontSize: 10 },
  priceValue: { color: "#fff", fontSize: 14, fontWeight: "bold" },
  pnlPositive: { backgroundColor: "#065f46" },
  pnlNegative: { backgroundColor: "#991b1b" },

  sellSection: { marginTop: 8 },
  sellInput: { backgroundColor: "#1f2937", color: "#fff", borderRadius: 8, padding: 8, marginBottom: 8 },
  sellButton: { backgroundColor: "#b91c1c", padding: 12, borderRadius: 8, alignItems: "center" },
  disabledButton: { opacity: 0.5 },
  sellButtonText: { color: "#fff", fontWeight: "bold" },
  quickButtons: { flexDirection: "row", justifyContent: "space-between", marginTop: 8 },
  quickButton: { flex: 1, backgroundColor: "#374151", padding: 8, borderRadius: 6, marginHorizontal: 2, alignItems: "center" },
  quickButtonText: { color: "#fff", fontSize: 12 },
});
