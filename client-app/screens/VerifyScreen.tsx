import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Animated,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useProfileStore } from "../store/useProfileStore";

// Icon imports
import { Feather } from "@expo/vector-icons"; // trending-up, mail, lock
import { FontAwesome5 } from "@expo/vector-icons"; // key, shield
import { MaterialCommunityIcons } from "@expo/vector-icons"; // fingerprint, check-circle-outline, alert-circle-outline
import { Ionicons } from "@expo/vector-icons"; // arrow-back

export default function VerifyScreen() {
  const navigation = useNavigation();
  const { verifyPin } = useProfileStore();

  const [pin, setPin] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error">("error");

  const shakeAnim = useState(new Animated.Value(0))[0];

  const handleVerifyPin = async () => {
    if (pin.length < 4) {
      setMessage("Enter a valid PIN.");
      setMessageType("error");
      shake();
      return;
    }
    try {
      setLoading(true);
      await verifyPin(pin);
      setMessage("Login successful!");
      setMessageType("success");
    navigation.navigate("Dashboard" as never)
    } catch (err: any) {
      setMessage(err.message || "Failed to verify PIN");
      setMessageType("error");
      shake();
      setPin("");
    } finally {
      setLoading(false);
    }
  };

  const shake = () => {
    shakeAnim.setValue(0);
    Animated.sequence([
      Animated.timing(shakeAnim, { toValue: 10, duration: 50, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: -10, duration: 50, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: 10, duration: 50, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: 0, duration: 50, useNativeDriver: true }),
    ]).start();
  };

  const handleNumberClick = (num: string) => {
    if (pin.length < 4) setPin(pin + num);
  };

  const handleDelete = () => setPin(pin.slice(0, -1));
  const handleClear = () => setPin("");

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Logo */}
      <View style={styles.logoContainer}>
        <Feather name="trending-up" size={60} color="#34D399" />
        <Text style={styles.title}>TradeX</Text>
        <Text style={styles.subtitle}>⚡ Quick access to your portfolio</Text>
      </View>

      {/* PIN Card */}
      <Animated.View style={[styles.card, { transform: [{ translateX: shakeAnim }] }]}>
        <View style={styles.cardHeader}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
            <FontAwesome5 name="key" size={24} color="#34D399" />
            <Text style={styles.cardTitle}>Enter PIN</Text>
          </View>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="#94A3B8" />
          </TouchableOpacity>
        </View>
        <Text style={styles.cardDesc}>Enter your PIN to unlock your trading dashboard</Text>

        {/* PIN Display */}
        <View style={styles.pinDisplay}>
          {[0, 1, 2, 3].map((i) => (
            <View
              key={i}
              style={[styles.pinDot, i < pin.length && styles.pinDotFilled]}
            />
          ))}
        </View>

        {/* Hidden TextInput */}
        <TextInput
          value={pin}
          onChangeText={(text) => setPin(text.replace(/\D/g, "").slice(0, 4))}
          keyboardType="numeric"
          maxLength={4}
          style={{ height: 0, width: 0 }}
          autoFocus
        />

        {/* Number Pad */}
        <View style={styles.padContainer}>
          {[[1, 2, 3], [4, 5, 6], [7, 8, 9], ["C", 0, "←"]].map((row, rowIndex) => (
            <View key={rowIndex} style={styles.padRow}>
              {row.map((item) => (
                <TouchableOpacity
                  key={item}
                  style={styles.padButton}
                  disabled={loading}
                  onPress={() => {
                    if (item === "C") handleClear();
                    else if (item === "←") handleDelete();
                    else handleNumberClick(item.toString());
                  }}
                >
                  <Text style={styles.padText}>{item}</Text>
                </TouchableOpacity>
              ))}
            </View>
          ))}
        </View>

        {/* Message */}
        {message.length > 0 && (
          <View
            style={[
              styles.messageBox,
              messageType === "success" ? styles.success : styles.error,
            ]}
          >
            {messageType === "success" ? (
              <MaterialCommunityIcons name="check-circle-outline" size={20} color="#34D399" style={{ marginRight: 8 }} />
            ) : (
              <MaterialCommunityIcons name="alert-circle-outline" size={20} color="#F87171" style={{ marginRight: 8 }} />
            )}
            <Text
              style={{
                color: messageType === "success" ? "#D1FAE5" : "#FECACA",
                fontWeight: "500",
              }}
            >
              {message}
            </Text>
          </View>
        )}

        {/* Action Button */}
        <TouchableOpacity
          style={[styles.actionButton, loading || pin.length !== 4 ? styles.disabled : {}]}
          onPress={handleVerifyPin}
          disabled={loading || pin.length !== 4}
        >
          <Text style={styles.actionButtonText}>
            {loading ? "Verifying..." : "Unlock Dashboard"}
          </Text>
        </TouchableOpacity>

        {/* Security Features */}
        <View style={styles.securityContainer}>
          <View style={styles.securityBox}>
            <FontAwesome5 name="shield-alt" size={24} color="#34D399" />
            <Text style={styles.securityText}>AES-256</Text>
          </View>
          <View style={styles.securityBox}>
            <Feather name="lock" size={24} color="#3B82F6" />
            <Text style={styles.securityText}>Encrypted</Text>
          </View>
          <View style={styles.securityBox}>
            <MaterialCommunityIcons name="fingerprint" size={24} color="#A78BFA" />
            <Text style={styles.securityText}>Biometric</Text>
          </View>
        </View>
      </Animated.View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#0F172A",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },
  logoContainer: { alignItems: "center", marginBottom: 32 },
  title: { fontSize: 36, fontWeight: "bold", color: "#fff", marginTop: 8 },
  subtitle: { color: "#94A3B8", fontSize: 14, marginTop: 4 },
  card: {
    backgroundColor: "#1E293B",
    borderRadius: 16,
    padding: 24,
    width: "100%",
    maxWidth: 400,
  },
  cardHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 8 },
  cardTitle: { fontSize: 24, fontWeight: "bold", color: "#fff" },
  cardDesc: { color: "#94A3B8", marginBottom: 16 },
  pinDisplay: { flexDirection: "row", justifyContent: "center", marginBottom: 24, gap: 12 },
  pinDot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "#334155",
    backgroundColor: "#0F172A",
  },
  pinDotFilled: { backgroundColor: "#34D399", borderColor: "#34D399" },
  padContainer: { marginBottom: 16 },
  padRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 12 },
  padButton: {
    flex: 1,
    marginHorizontal: 4,
    backgroundColor: "#334155",
    height: 60,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  padText: { fontSize: 20, color: "#fff", fontWeight: "600" },
  actionButton: {
    backgroundColor: "#34D399",
    height: 50,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 8,
  },
  actionButtonText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
  disabled: { opacity: 0.5 },
  messageBox: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderRadius: 12,
    marginBottom: 12,
  },
  success: { backgroundColor: "#064E3B" },
  error: { backgroundColor: "#7F1D1D" },
  securityContainer: { flexDirection: "row", justifyContent: "space-around", marginTop: 16 },
  securityBox: { alignItems: "center", padding: 8, borderRadius: 12, backgroundColor: "#334155" },
  securityText: { color: "#94A3B8", fontSize: 12, marginTop: 4 },
});
