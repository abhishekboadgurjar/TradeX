// screens/ProfileScreen.tsx
import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Animated,
  Dimensions,
  StyleSheet,
  Alert as RNAlert,
} from "react-native";
import { useProfileStore } from "../store/useProfileStore";
import { useAuthStore } from "../store/useAuthStore";
import { Card, Button } from "react-native-paper";
import {
  User,
  Wallet,
  Activity,
  CheckCircle2,
  AlertCircle,
  Lock,
  Shield,
  CreditCard,
  Calendar,
  Users,
  LogOut,
  Edit3,
  Save,
  X,
  ChevronRight,
} from "lucide-react-native";

const { width } = Dimensions.get("window");

export default function ProfileScreen() {
  const {
    profile,
    fetchProfile,
    updateProfile,
    setLoginPin,
    verifyPin,
    loading,
  } = useProfileStore();
  const { logout } = useAuthStore();

  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    gender: "",
    date_of_birth: "",
  });
  const [pin, setPin] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"error" | "success">(
    "error"
  );

  useEffect(() => {
    fetchProfile();
  }, []);

  useEffect(() => {
    if (profile) {
      setFormData({
        name: profile.name || "",
        gender: profile.gender || "",
        date_of_birth: profile.date_of_birth || "",
      });
    }
  }, [profile]);

  const handleLogout = async () => {
    try {
      await logout();
      RNAlert.alert("Logged out", "You have been logged out.");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  const handleUpdateProfile = async () => {
    try {
      await updateProfile(formData);
      setMessage("Profile updated successfully!");
      setMessageType("success");
      setEditMode(false);
      setTimeout(() => setMessage(""), 3000);
    } catch (err: any) {
      setMessage(err.message);
      setMessageType("error");
    }
  };

  const handlePinAction = async () => {
    try {
      if (!pin || pin.length < 4) {
        setMessage("PIN must be at least 4 digits.");
        setMessageType("error");
        return;
      }

      if (!profile.login_pin_exist) {
        await setLoginPin(pin);
        setMessage("PIN set successfully!");
        setMessageType("success");
      } else {
        await verifyPin(pin);
        setMessage("PIN verified successfully!");
        setMessageType("success");
      }

      setPin("");
      fetchProfile();
      setTimeout(() => setMessage(""), 3000);
    } catch (err: any) {
      setMessage(err.message);
      setMessageType("error");
    }
  };

  // Marquee ticker animation
  const scrollX = useRef(new Animated.Value(0)).current;
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
        <Text style={{ color: "#9CA3AF" }}>Loading your profile...</Text>
      </View>
    );
  }

  if (!profile) {
    return (
      <View style={styles.center}>
        <Text style={{ color: "red" }}>No profile found</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {/* Stock Ticker */}
      <View style={styles.tickerContainer}>
        <Animated.View
          style={{ flexDirection: "row", transform: [{ translateX: scrollX }] }}
        >
          {["AAPL +2.45%", "MSFT +1.82%", "GOOGL -0.67%", "TSLA +3.21%"].map(
            (t, i) => (
              <Text
                key={i}
                style={{
                  color: t.includes("-") ? "#EF4444" : "#10B981",
                  marginRight: 24,
                }}
              >
                {t}
              </Text>
            )
          )}
        </Animated.View>
      </View>

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Profile Dashboard</Text>
        <Button
          mode="outlined"
          onPress={handleLogout}
          icon={() => <LogOut size={18} color="#EF4444" />}
        >
          Logout
        </Button>
      </View>

      {/* Stats Cards */}
      <View style={styles.statsContainer}>
        <Card style={styles.card}>
          <View style={styles.cardContent}>
            <View>
              <Text style={styles.cardLabel}>Portfolio Balance</Text>
              <Text style={styles.cardValue}>₹{profile.balance}</Text>
            </View>
            <Wallet size={32} color="#10B981" />
          </View>
          <View style={styles.cardFooter}>
            <Activity size={14} color="#10B981" />
            <Text style={styles.cardFooterText}>Active trading account</Text>
          </View>
        </Card>

        <Card style={styles.card}>
          <View style={styles.cardContent}>
            <View>
              <Text style={styles.cardLabel}>Account Status</Text>
              <Text style={styles.cardValue}>Verified</Text>
            </View>
            <CheckCircle2 size={32} color="#3B82F6" />
          </View>
          <View style={styles.cardFooter}>
            <Shield size={14} color="#3B82F6" />
            <Text style={styles.cardFooterText}>Full access enabled</Text>
          </View>
        </Card>

        <Card style={styles.card}>
          <View style={styles.cardContent}>
            <View>
              <Text style={styles.cardLabel}>Security Level</Text>
              <Text style={styles.cardValue}>
                {profile.login_pin_exist ? "High" : "Medium"}
              </Text>
            </View>
            <Lock size={32} color="#8B5CF6" />
          </View>
          <View style={styles.cardFooter}>
            <Shield size={14} color="#8B5CF6" />
            <Text style={styles.cardFooterText}>
              {profile.login_pin_exist ? "PIN enabled" : "Setup PIN"}
            </Text>
          </View>
        </Card>
      </View>

      {/* Profile Info */}
      <Card style={styles.sectionCard}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Personal Information</Text>
          {!editMode && (
            <Button
              mode="outlined"
              onPress={() => setEditMode(true)}
              icon={() => <Edit3 size={16} color="#10B981" />}
            >
              Edit
            </Button>
          )}
        </View>

        {editMode ? (
          <View>
            <TextInput
              placeholder="Full Name"
              value={formData.name}
              onChangeText={(t) => setFormData({ ...formData, name: t })}
              style={styles.input}
            />
            <TextInput
              placeholder="Gender"
              value={formData.gender}
              onChangeText={(t) => setFormData({ ...formData, gender: t })}
              style={styles.input}
            />
            <TextInput
              placeholder="Date of Birth"
              value={formData.date_of_birth}
              onChangeText={(t) =>
                setFormData({ ...formData, date_of_birth: t })
              }
              style={styles.input}
            />
            <View style={{ flexDirection: "row", gap: 10 }}>
              <Button
                mode="contained"
                onPress={handleUpdateProfile}
                icon={() => <Save size={16} color="#fff" />}
              >
                Save
              </Button>
              <Button
                mode="outlined"
                onPress={() => setEditMode(false)}
                icon={() => <X size={16} color="#fff" />}
              >
                Cancel
              </Button>
            </View>
          </View>
        ) : (
          <View>
            <Text style={styles.infoText}>Name: {profile.name}</Text>
            <Text style={styles.infoText}>Email: {profile.email}</Text>
            <Text style={styles.infoText}>
              Phone: {profile.phone_exists ? "Linked" : "Not linked"}
            </Text>
          </View>
        )}
      </Card>

      {/* Security Settings */}
      <Card style={styles.sectionCard}>
        <Text style={styles.sectionTitle}>Security Settings</Text>

        <View style={styles.pinContainer}>
          <TextInput
            placeholder="Enter PIN"
            value={pin}
            onChangeText={(t) => setPin(t.replace(/\D/g, ""))}
            keyboardType="numeric"
            maxLength={6}
            secureTextEntry
            style={styles.input}
          />
          <Button
            mode="contained"
            onPress={handlePinAction}
            style={{ flex: 1 }}
          >
            {profile.login_pin_exist ? "Verify" : "Set PIN"}
          </Button>
        </View>

        {message ? (
          <Text
            style={{
              color: messageType === "success" ? "#10B981" : "#EF4444",
              marginTop: 6,
            }}
          >
            {message}
          </Text>
        ) : null}
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0F172A", padding: 12 },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  tickerContainer: {
    height: 24,
    overflow: "hidden",
    borderBottomWidth: 1,
    borderBottomColor: "#334155",
    marginBottom: 12,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  title: { color: "#fff", fontSize: 24, fontWeight: "bold" },
  statsContainer: { flexDirection: "row", justifyContent: "space-between" },
  card: { backgroundColor: "#1E293B", padding: 12, borderRadius: 12, width: "30%" },
  cardContent: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  cardLabel: { color: "#9CA3AF", fontSize: 12 },
  cardValue: { color: "#fff", fontSize: 18, fontWeight: "bold" },
  cardFooter: { flexDirection: "row", alignItems: "center", marginTop: 6 },
  cardFooterText: { color: "#9CA3AF", marginLeft: 4, fontSize: 12 },
  sectionCard: { backgroundColor: "#1E293B", padding: 12, borderRadius: 12, marginVertical: 8 },
  sectionHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  sectionTitle: { color: "#fff", fontSize: 18, fontWeight: "bold", marginBottom: 8 },
  input: {
    backgroundColor: "#0F172A",
    borderColor: "#334155",
    borderWidth: 1,
    borderRadius: 8,
    padding: 8,
    color: "#fff",
    marginBottom: 8,
  },
  infoText: { color: "#fff", marginBottom: 4 },
  pinContainer: { flexDirection: "row", alignItems: "center", gap: 8 },
});
