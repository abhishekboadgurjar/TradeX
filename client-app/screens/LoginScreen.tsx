import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Animated,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useAuthStore } from "../store/useAuthStore";
import { Feather, MaterialIcons } from "@expo/vector-icons";

export default function LoginScreen() {
  const navigation = useNavigation();
  const { login } = useAuthStore();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const scrollX = useState(new Animated.Value(0))[0];

  const handleLogin = async () => {
    setError("");
    if (!email || !password) {
      return setError("All fields are required");
    }

    setLoading(true);
    try {
      await login(email, password);
    //   navigation.navigate("VerifyPin" as never);
    } catch (err: any) {
      setError(err.message || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  // Marquee animation for stocks
  React.useEffect(() => {
    Animated.loop(
      Animated.timing(scrollX, {
        toValue: -300,
        duration: 20000,
        useNativeDriver: true,
      })
    ).start();
  }, []);

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ flexGrow: 1 }}>
      {/* Animated Stock Ticker */}
      <View style={styles.tickerContainer}>
        <Animated.View style={{ flexDirection: "row", transform: [{ translateX: scrollX }] }}>
          {["AAPL +2.45%", "MSFT +1.82%", "GOOGL -0.67%", "TSLA +3.21%", "AMZN +1.56%", "META -0.34%", "NVDA +4.12%"].map((stock, index) => (
            <Text
              key={index}
              style={[
                styles.tickerText,
                stock.includes("-") ? { color: "#F87171" } : { color: "#34D399" },
              ]}
            >
              {stock}{"  "}
            </Text>
          ))}
        </Animated.View>
      </View>

      <View style={styles.content}>
        {/* Logo */}
        <View style={styles.logoContainer}>
          <View style={styles.logoCircle}>
            <Feather name="trending-up" size={32} color="#fff" />
          </View>
          <Text style={styles.title}>TradeX</Text>
          <Text style={styles.subtitle}>Welcome back, trader</Text>
        </View>

        {/* Card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Sign In</Text>
          <Text style={styles.cardDesc}>Enter your credentials to access your portfolio</Text>

          {/* Email Input */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Email Address</Text>
            <View style={styles.inputWrapper}>
              <Feather name="mail" size={20} color="#94A3B8" style={styles.icon} />
              <TextInput
                placeholder="you@example.com"
                placeholderTextColor="#94A3B8"
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>
          </View>

          {/* Password Input */}
          <View style={styles.inputGroup}>
            <View style={styles.labelRow}>
              <Text style={styles.inputLabel}>Password</Text>
              <TouchableOpacity onPress={() => navigation.navigate("ForgotPasswordScreen" as never)}>
                <Text style={styles.forgotText}>Forgot password?</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.inputWrapper}>
              <Feather name="lock" size={20} color="#94A3B8" style={styles.icon} />
              <TextInput
                placeholder="Enter your password"
                placeholderTextColor="#94A3B8"
                style={styles.input}
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />
            </View>
          </View>

          {/* Login Button */}
          <TouchableOpacity
            style={[styles.button, (loading || !email || !password) && styles.buttonDisabled]}
            onPress={handleLogin}
            disabled={loading || !email || !password}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <View style={styles.buttonContent}>
                <Text style={styles.buttonText}>Sign In</Text>
                <Feather name="arrow-right" size={20} color="#fff" />
              </View>
            )}
          </TouchableOpacity>

          {/* Error Message */}
          {error.length > 0 && (
            <View style={styles.errorBox}>
              <MaterialIcons name="error" size={20} color="#F87171" style={{ marginRight: 6 }} />
              <Text style={styles.errorText}>{error}</Text>
            </View>
          )}

          {/* Quick Stats */}
          <View style={styles.statsDivider}>
            <Text style={styles.statsDividerText}>Quick Stats</Text>
          </View>

          <View style={styles.statsRow}>
            <View style={styles.statCard}>
              <Feather name="bar-chart-2" size={20} color="#34D399" style={{ marginBottom: 4 }} />
              <Text style={styles.statLabel}>Market Cap</Text>
              <Text style={styles.statValue}>$2.4T</Text>
            </View>
            <View style={styles.statCard}>
              <Feather name="activity" size={20} color="#3B82F6" style={{ marginBottom: 4 }} />
              <Text style={styles.statLabel}>Active Traders</Text>
              <Text style={styles.statValue}>125K+</Text>
            </View>
          </View>
        </View>

        {/* Footer */}
        <Text style={styles.footerText}>
          Don't have an account?{" "}
          <Text style={styles.footerLink} onPress={() => navigation.navigate("RegisterScreen" as never)}>
            Create Account
          </Text>
        </Text>

        <Text style={styles.securityText}>
          <Feather name="lock" size={14} /> Secured with 256-bit SSL encryption
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0F172A" },
  tickerContainer: {
    height: 24,
    overflow: "hidden",
    borderBottomWidth: 1,
    borderBottomColor: "#334155",
    backgroundColor: "rgba(15,23,42,0.8)",
  },
  tickerText: { color: "#34D399", fontSize: 12, marginRight: 16 },
  content: { flex: 1, alignItems: "center", padding: 16, paddingTop: 40 },
  logoContainer: { alignItems: "center", marginBottom: 24 },
  logoCircle: {
    width: 64,
    height: 64,
    borderRadius: 16,
    backgroundColor: "#10B981",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  title: { fontSize: 28, fontWeight: "bold", color: "#fff" },
  subtitle: { color: "#94A3B8", fontSize: 14, marginTop: 2 },
  card: {
    width: "100%",
    backgroundColor: "rgba(30,41,59,0.5)",
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  cardTitle: { fontSize: 22, fontWeight: "bold", color: "#fff", marginBottom: 4 },
  cardDesc: { color: "#94A3B8", marginBottom: 16 },
  inputGroup: { marginBottom: 12 },
  inputLabel: { color: "#CBD5E1", fontSize: 12, marginBottom: 4 },
  labelRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  forgotText: { color: "#34D399", fontSize: 12 },
  inputWrapper: { flexDirection: "row", alignItems: "center", backgroundColor: "#1E293B", borderRadius: 8, paddingHorizontal: 8 },
  icon: { marginRight: 6 },
  input: { flex: 1, color: "#fff", height: 40 },
  button: { backgroundColor: "#34D399", borderRadius: 8, paddingVertical: 12, alignItems: "center", marginTop: 8, flexDirection: "row", justifyContent: "center" },
  buttonDisabled: { opacity: 0.6 },
  buttonContent: { flexDirection: "row", alignItems: "center", gap: 8 },
  buttonText: { color: "#fff", fontWeight: "bold", marginRight: 6 },
  errorBox: { flexDirection: "row", alignItems: "center", backgroundColor: "#7F1D1D", padding: 8, borderRadius: 8, marginTop: 8 },
  errorText: { color: "#FECACA", fontSize: 12 },
  statsDivider: { alignItems: "center", marginVertical: 12 },
  statsDividerText: { color: "#94A3B8", fontSize: 10 },
  statsRow: { flexDirection: "row", justifyContent: "space-between" },
  statCard: { flex: 1, backgroundColor: "rgba(30,41,59,0.5)", borderRadius: 8, padding: 8, marginHorizontal: 4, alignItems: "center" },
  statLabel: { fontSize: 10, color: "#94A3B8" },
  statValue: { fontSize: 14, color: "#fff", fontWeight: "600" },
  footerText: { color: "#94A3B8", fontSize: 12, textAlign: "center", marginTop: 16 },
  footerLink: { color: "#34D399" },
  securityText: { color: "#94A3B8", fontSize: 12, marginTop: 8, textAlign: "center" },
});
