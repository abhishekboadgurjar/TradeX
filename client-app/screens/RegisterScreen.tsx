import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useAuthStore } from "../store/useAuthStore";
import { Mail, Lock, CheckCircle2, ArrowRight, Shield, TrendingUp } from "lucide-react-native";

export default function RegisterScreen() {
  const { checkEmail, sendOtp, verifyOtp, register } = useAuthStore();
  const navigation = useNavigation();

  const [step, setStep] = useState<"email" | "otp" | "password" | "done">("email");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleCheckEmail = async () => {
    setError("");
    if (!email) return setError("Email is required");
    setLoading(true);
    try {
      const exists = await checkEmail(email);
      if (exists) {
        setError("Email already registered");
      } else {
        await sendOtp(email, "email");
        setStep("otp");
      }
    } catch (err: any) {
      setError(err.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    setError("");
    if (!otp) return setError("OTP is required");
    setLoading(true);
    try {
      await verifyOtp(email, otp, "email");
      setStep("password");
    } catch (err: any) {
      setError(err.message || "OTP verification failed");
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async () => {
    setError("");
    if (!password) return setError("Password is required");
    setLoading(true);
    try {
      await register(email, password);
      setStep("done");
      navigation.navigate("SetPin" as never); // cast for TS navigation
    } catch (err: any) {
      setError(err.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Logo */}
      <View style={styles.logoContainer}>
        <TrendingUp size={48} color="#fff" />
        <Text style={styles.title}>TradeX</Text>
        <Text style={styles.subtitle}>Join thousands of traders worldwide</Text>
      </View>

      {/* Card */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>
          Create Account {step === "done" && <CheckCircle2 size={24} color="#10b981" />}
        </Text>
        <Text style={styles.cardDescription}>
          {step === "email" && "Enter your email to get started"}
          {step === "otp" && "Verify your email address"}
          {step === "password" && "Secure your account"}
          {step === "done" && "Welcome to TradeX"}
        </Text>

        {/* Error */}
        {error ? <Text style={styles.error}>{error}</Text> : null}

        {/* Step: Email */}
        {step === "email" && (
          <View style={styles.stepContainer}>
            <View style={styles.inputContainer}>
              <Mail size={20} color="#9ca3af" style={styles.icon} />
              <TextInput
                placeholder="you@example.com"
                placeholderTextColor="#9ca3af"
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>
            <TouchableOpacity style={styles.button} onPress={handleCheckEmail} disabled={loading}>
              {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Continue →</Text>}
            </TouchableOpacity>
          </View>
        )}

        {/* Step: OTP */}
        {step === "otp" && (
          <View style={styles.stepContainer}>
            <View style={styles.alert}>
              <Shield size={16} color="#10b981" />
              <Text style={styles.alertText}>Verification code sent to {email}</Text>
            </View>
            <TextInput
              placeholder="Enter 6-digit code"
              placeholderTextColor="#9ca3af"
              style={[styles.input, styles.otpInput]}
              value={otp}
              onChangeText={setOtp}
              keyboardType="numeric"
              maxLength={6}
            />
            <TouchableOpacity style={styles.button} onPress={handleVerifyOtp} disabled={loading}>
              {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Verify Code →</Text>}
            </TouchableOpacity>
          </View>
        )}

        {/* Step: Password */}
        {step === "password" && (
          <View style={styles.stepContainer}>
            <View style={styles.inputContainer}>
              <Lock size={20} color="#9ca3af" style={styles.icon} />
              <TextInput
                placeholder="Minimum 8 characters"
                placeholderTextColor="#9ca3af"
                style={styles.input}
                secureTextEntry
                value={password}
                onChangeText={setPassword}
              />
            </View>
            <Text style={styles.hint}>Use 8+ characters with letters and numbers</Text>
            <TouchableOpacity style={styles.button} onPress={handleRegister} disabled={loading}>
              {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Complete Registration →</Text>}
            </TouchableOpacity>
          </View>
        )}

        {/* Step: Done */}
        {step === "done" && (
          <View style={styles.doneContainer}>
            <CheckCircle2 size={48} color="#10b981" />
            <Text style={styles.doneTitle}>Welcome Aboard!</Text>
            <Text style={styles.doneText}>Your account has been created successfully</Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#111827",
    flexGrow: 1,
    justifyContent: "center",
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 24,
  },
  title: { fontSize: 28, fontWeight: "bold", color: "#fff", marginTop: 8 },
  subtitle: { fontSize: 14, color: "#9ca3af", marginTop: 2 },
  card: {
    backgroundColor: "#1f2937",
    borderRadius: 12,
    padding: 20,
    shadowColor: "#10b981",
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
  },
  cardTitle: { fontSize: 20, fontWeight: "bold", color: "#fff", marginBottom: 4 },
  cardDescription: { fontSize: 14, color: "#9ca3af", marginBottom: 16 },
  stepContainer: { marginBottom: 12 },
  inputContainer: { flexDirection: "row", alignItems: "center", marginBottom: 12, backgroundColor: "#111827", borderRadius: 8 },
  icon: { marginHorizontal: 8 },
  input: { flex: 1, height: 44, color: "#fff", paddingHorizontal: 8 },
  otpInput: { textAlign: "center", fontSize: 24, letterSpacing: 8 },
  button: { backgroundColor: "#10b981", paddingVertical: 12, borderRadius: 8, alignItems: "center" },
  buttonText: { color: "#fff", fontWeight: "bold" },
  hint: { fontSize: 12, color: "#9ca3af", marginBottom: 12 },
  error: { color: "#f87171", marginBottom: 12 },
  alert: { flexDirection: "row", alignItems: "center", backgroundColor: "#064e3b", padding: 8, borderRadius: 6, marginBottom: 12 },
  alertText: { color: "#6ee7b7", marginLeft: 6 },
  doneContainer: { alignItems: "center", paddingVertical: 24 },
  doneTitle: { fontSize: 20, fontWeight: "bold", color: "#fff", marginTop: 12 },
  doneText: { fontSize: 14, color: "#9ca3af", marginTop: 4 },
});
