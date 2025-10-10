// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   TextInput,
//   StyleSheet,
//   Alert as RNAlert,
//   Animated,
// } from "react-native";
// import { useNavigation } from "@react-navigation/native";
// import { useProfileStore } from "../store/useProfileStore";
// import * as SecureStore from "expo-secure-store";
// import { Feather, MaterialIcons } from "@expo/vector-icons";

// export default function SetPinScreen() {
//   const navigation = useNavigation();
//   const { setLoginPin } = useProfileStore();

//   const [pin, setPin] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState("");
//   const [messageType, setMessageType] = useState<"success" | "error">("error");

//   const shakeAnim = useState(new Animated.Value(0))[0];

//   const handleSetPin = async () => {
//     if (pin.length < 4) {
//       setMessage("PIN must be at least 4 digits.");
//       setMessageType("error");
//       shake();
//       return;
//     }

//     try {
//       setLoading(true);
//       await setLoginPin(pin);
//       await SecureStore.setItemAsync("is_pin_set", "true");

//       setMessage("PIN set successfully. Redirecting to login...");
//       setMessageType("success");

//       setTimeout(() => {
//         navigation.navigate("LoginScreen" as never);
//       }, 1500);
//     } catch (err: any) {
//       setMessage(err.message || "Failed to set PIN");
//       setMessageType("error");
//       shake();
//     } finally {
//       setLoading(false);
//     }
//   };

//   const shake = () => {
//     shakeAnim.setValue(0);
//     Animated.sequence([
//       Animated.timing(shakeAnim, { toValue: 10, duration: 50, useNativeDriver: true }),
//       Animated.timing(shakeAnim, { toValue: -10, duration: 50, useNativeDriver: true }),
//       Animated.timing(shakeAnim, { toValue: 10, duration: 50, useNativeDriver: true }),
//       Animated.timing(shakeAnim, { toValue: 0, duration: 50, useNativeDriver: true }),
//     ]).start();
//   };

//   const handleNumberClick = (num: string) => {
//     if (pin.length < 6) setPin(pin + num);
//   };

//   const handleDelete = () => setPin(pin.slice(0, -1));
//   const handleClear = () => setPin("");

//   return (
//     <View style={styles.container}>
//       {/* Logo */}
//       <View style={styles.logoContainer}>
//         <Feather name="trending-up" size={50} color="#34D399" />
//         <Text style={styles.title}>TradeX</Text>
//         <Text style={styles.subtitle}>🔒 Secure your account with a PIN</Text>
//       </View>

//       {/* PIN card */}
//       <Animated.View style={[styles.card, { transform: [{ translateX: shakeAnim }] }]}>
//         <Text style={styles.cardTitle}>Set Your PIN</Text>
//         <Text style={styles.cardDesc}>Create a 4-6 digit PIN for quick and secure access</Text>

//         {/* PIN Display */}
//         <View style={styles.pinDisplay}>
//           {[0, 1, 2, 3, 4, 5].map((i) => (
//             <View
//               key={i}
//               style={[
//                 styles.pinDot,
//                 i < pin.length && styles.pinDotFilled,
//               ]}
//             />
//           ))}
//         </View>

//         {/* Hidden Input */}
//         <TextInput
//           value={pin}
//           onChangeText={(text) => setPin(text.replace(/\D/g, ""))}
//           keyboardType="numeric"
//           maxLength={6}
//           style={{ height: 0, width: 0 }}
//         />

//         {/* Number Pad */}
//         <View style={styles.padContainer}>
//           {[[1, 2, 3], [4, 5, 6], [7, 8, 9], ["C", 0, "←"]].map((row, rowIndex) => (
//             <View key={rowIndex} style={styles.padRow}>
//               {row.map((item) => (
//                 <TouchableOpacity
//                   key={item}
//                   style={styles.padButton}
//                   disabled={loading}
//                   onPress={() => {
//                     if (item === "C") handleClear();
//                     else if (item === "←") handleDelete();
//                     else handleNumberClick(item.toString());
//                   }}
//                 >
//                   <Text style={styles.padText}>{item}</Text>
//                 </TouchableOpacity>
//               ))}
//             </View>
//           ))}
//         </View>

//         {/* Message */}
//         {message.length > 0 && (
//           <View
//             style={[
//               styles.messageBox,
//               messageType === "success" ? styles.success : styles.error,
//             ]}
//           >
//             <MaterialIcons
//               name={messageType === "success" ? "check-circle" : "error"}
//               size={20}
//               color={messageType === "success" ? "#34D399" : "#F87171"}
//               style={{ marginRight: 8 }}
//             />
//             <Text
//               style={{
//                 color: messageType === "success" ? "#D1FAE5" : "#FECACA",
//                 fontWeight: "500",
//               }}
//             >
//               {message}
//             </Text>
//           </View>
//         )}

//         {/* Action Button */}
//         <TouchableOpacity
//           style={[styles.actionButton, loading || pin.length < 4 ? styles.disabled : {}]}
//           onPress={handleSetPin}
//           disabled={loading || pin.length < 4}
//         >
//           <Text style={styles.actionButtonText}>
//             {loading ? "Setting PIN..." : "Set Secure PIN"}
//           </Text>
//         </TouchableOpacity>
//       </Animated.View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#0F172A",
//     alignItems: "center",
//     justifyContent: "center",
//     padding: 16,
//   },
//   logoContainer: {
//     alignItems: "center",
//     marginBottom: 32,
//   },
//   title: {
//     fontSize: 36,
//     fontWeight: "bold",
//     color: "#fff",
//     marginTop: 8,
//   },
//   subtitle: { color: "#94A3B8", fontSize: 14, marginTop: 4 },
//   card: {
//     backgroundColor: "#1E293B",
//     borderRadius: 16,
//     padding: 24,
//     width: "100%",
//     maxWidth: 400,
//   },
//   cardTitle: { fontSize: 24, fontWeight: "bold", color: "#fff", marginBottom: 4 },
//   cardDesc: { color: "#94A3B8", marginBottom: 16 },
//   pinDisplay: { flexDirection: "row", justifyContent: "center", marginBottom: 24, gap: 12 },
//   pinDot: {
//     width: 16,
//     height: 16,
//     borderRadius: 8,
//     borderWidth: 2,
//     borderColor: "#334155",
//     backgroundColor: "#0F172A",
//   },
//   pinDotFilled: {
//     backgroundColor: "#34D399",
//     borderColor: "#34D399",
//   },
//   padContainer: { marginBottom: 16 },
//   padRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 12 },
//   padButton: {
//     flex: 1,
//     marginHorizontal: 4,
//     backgroundColor: "#334155",
//     height: 60,
//     borderRadius: 12,
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   padText: { fontSize: 20, color: "#fff", fontWeight: "600" },
//   actionButton: {
//     backgroundColor: "#34D399",
//     height: 50,
//     borderRadius: 12,
//     alignItems: "center",
//     justifyContent: "center",
//     marginTop: 8,
//   },
//   actionButtonText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
//   disabled: { opacity: 0.5 },
//   messageBox: {
//     flexDirection: "row",
//     alignItems: "center",
//     padding: 12,
//     borderRadius: 12,
//     marginBottom: 12,
//   },
//   success: { backgroundColor: "#064E3B" },
//   error: { backgroundColor: "#7F1D1D" },
// });


import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Animated,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useProfileStore } from "../store/useProfileStore";
import * as SecureStore from "expo-secure-store";
import { Feather, MaterialIcons } from "@expo/vector-icons";

export default function SetPinScreen() {
  const navigation = useNavigation();
  const { setLoginPin } = useProfileStore();

  const [pin, setPin] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error">("error");

  const shakeAnim = useState(new Animated.Value(0))[0];

  // Set PIN handler
  const handleSetPin = async () => {
    if (pin.length !== 4) {
      setMessage("PIN must be exactly 4 digits.");
      setMessageType("error");
      shake();
      return;
    }

    try {
      setLoading(true);
      await setLoginPin(pin);
      await SecureStore.setItemAsync("is_pin_set", "true");

      setMessage("PIN set successfully. Redirecting to login...");
      setMessageType("success");

      setTimeout(() => {
        navigation.navigate("LoginScreen" as never);
      }, 1500);
    } catch (err: any) {
      setMessage(err.message || "Failed to set PIN");
      setMessageType("error");
      shake();
    } finally {
      setLoading(false);
    }
  };

  // Shake animation for error
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
    if (pin.length < 4) setPin(pin + num); // max 4 digits
  };

  const handleDelete = () => setPin(pin.slice(0, -1));
  const handleClear = () => setPin("");

  return (
    <View style={styles.container}>
      {/* Logo */}
      <View style={styles.logoContainer}>
        <Feather name="trending-up" size={50} color="#34D399" />
        <Text style={styles.title}>TradeX</Text>
        <Text style={styles.subtitle}>🔒 Secure your account with a PIN</Text>
      </View>

      {/* PIN Card */}
      <Animated.View style={[styles.card, { transform: [{ translateX: shakeAnim }] }]}>
        <Text style={styles.cardTitle}>Set Your PIN</Text>
        <Text style={styles.cardDesc}>Create a 4-digit PIN for quick and secure access</Text>

        {/* PIN Dots */}
        <View style={styles.pinDisplay}>
          {[0, 1, 2, 3].map((i) => (
            <View
              key={i}
              style={[styles.pinDot, i < pin.length && styles.pinDotFilled]}
            />
          ))}
        </View>

        {/* Hidden Input */}
        <TextInput
          value={pin}
          onChangeText={(text) => setPin(text.replace(/\D/g, "").slice(0, 4))}
          keyboardType="numeric"
          maxLength={4}
          style={{ height: 0, width: 0 }}
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
            <MaterialIcons
              name={messageType === "success" ? "check-circle" : "error"}
              size={20}
              color={messageType === "success" ? "#34D399" : "#F87171"}
              style={{ marginRight: 8 }}
            />
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
          onPress={handleSetPin}
          disabled={loading || pin.length !== 4}
        >
          <Text style={styles.actionButtonText}>
            {loading ? "Setting PIN..." : "Set Secure PIN"}
          </Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0F172A",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 32,
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#fff",
    marginTop: 8,
  },
  subtitle: { color: "#94A3B8", fontSize: 14, marginTop: 4 },
  card: {
    backgroundColor: "#1E293B",
    borderRadius: 16,
    padding: 24,
    width: "100%",
    maxWidth: 400,
  },
  cardTitle: { fontSize: 24, fontWeight: "bold", color: "#fff", marginBottom: 4 },
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
  pinDotFilled: {
    backgroundColor: "#34D399",
    borderColor: "#34D399",
  },
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
});
