// import React from "react";
// import { View, Text, Button, StyleSheet } from "react-native";
// import { NativeStackNavigationProp } from "@react-navigation/native-stack";
// import { AuthStackParamList } from "../navigation/AuthStack";

// type Props = {
//   navigation: NativeStackNavigationProp<AuthStackParamList, "Welcome">;
// };

// export default function WelcomeScreen({ navigation }: Props) {
//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Welcome!</Text>
//       <Button title="Register" onPress={() => navigation.navigate("Register")} />
//       <Button title="Login" onPress={() => navigation.navigate("Login")} />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, justifyContent: "center", alignItems: "center" },
//   title: { fontSize: 24, marginBottom: 20 },
// });
import React, { useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Dimensions,
  TouchableOpacity,
  Animated,
  StatusBar,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import {
  TrendingUp,
  Shield,
  BarChart3,
  Zap,
} from "lucide-react-native";

const { width } = Dimensions.get("window");

const slides = [
  {
    key: "1",
    title: "Trade Smarter",
    desc: "Experience AI-powered insights and lightning-fast execution on every trade.",
    icon: <TrendingUp size={100} color="#34d399" />,
  },
  {
    key: "2",
    title: "Secure & Reliable",
    desc: "Your funds are protected with multi-layer security and encrypted transactions.",
    icon: <Shield size={100} color="#60a5fa" />,
  },
  {
    key: "3",
    title: "Track Everything",
    desc: "Get real-time portfolio analytics, market data, and performance tracking.",
    icon: <BarChart3 size={100} color="#a78bfa" />,
  },
  {
    key: "4",
    title: "Get Started",
    desc: "Join thousands of traders already using TradeX. Register or login to continue.",
    icon: <Zap size={100} color="#facc15" />,
  },
];

export default function OnboardingScreen() {
  const navigation = useNavigation<any>();
  const scrollX = useRef(new Animated.Value(0)).current;
  const [currentIndex, setCurrentIndex] = useState(0);
  const slidesRef = useRef<FlatList>(null);

  const viewableItemsChanged = useRef(({ viewableItems }: any) => {
    setCurrentIndex(viewableItems[0].index);
  }).current;

  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  const scrollToNext = () => {
    if (currentIndex < slides.length - 1) {
      slidesRef.current?.scrollToIndex({ index: currentIndex + 1 });
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0f172a" />
      <FlatList
        data={slides}
        renderItem={({ item }) => (
          <View style={[styles.slide, { width }]}>
            {item.icon}
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.desc}>{item.desc}</Text>

            {/* Show buttons only on last slide */}
            {item.key === "4" && (
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={styles.registerButton}
                  onPress={() => navigation.navigate("Register")}
                >
                  <Text style={styles.registerText}>Register</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.loginButton}
                  onPress={() => navigation.navigate("Login")}
                >
                  <Text style={styles.loginText}>Login</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        )}
        keyExtractor={(item) => item.key}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        bounces={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        onViewableItemsChanged={viewableItemsChanged}
        viewabilityConfig={viewConfig}
        ref={slidesRef}
      />

      {/* Pagination Dots */}
      <View style={styles.dotsContainer}>
        {slides.map((_, i) => {
          const inputRange = [(i - 1) * width, i * width, (i + 1) * width];
          const dotWidth = scrollX.interpolate({
            inputRange,
            outputRange: [8, 20, 8],
            extrapolate: "clamp",
          });
          const opacity = scrollX.interpolate({
            inputRange,
            outputRange: [0.3, 1, 0.3],
            extrapolate: "clamp",
          });
          return (
            <Animated.View
              key={i.toString()}
              style={[styles.dot, { width: dotWidth, opacity }]}
            />
          );
        })}
      </View>

      {/* Skip / Next button */}
      {currentIndex < slides.length - 1 && (
        <TouchableOpacity style={styles.nextButton} onPress={scrollToNext}>
          <Text style={styles.nextText}>Next →</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f172a",
    alignItems: "center",
    justifyContent: "center",
  },
  slide: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 30,
  },
  title: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 30,
  },
  desc: {
    color: "#94a3b8",
    fontSize: 16,
    textAlign: "center",
    marginTop: 10,
    lineHeight: 22,
  },
  dotsContainer: {
    flexDirection: "row",
    position: "absolute",
    bottom: 80,
  },
  dot: {
    height: 8,
    borderRadius: 4,
    backgroundColor: "#10b981",
    marginHorizontal: 4,
  },
  buttonContainer: {
    marginTop: 40,
    width: "100%",
    alignItems: "center",
  },
  registerButton: {
    backgroundColor: "#10b981",
    paddingVertical: 14,
    borderRadius: 12,
    width: "80%",
    alignItems: "center",
    marginBottom: 10,
  },
  registerText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  loginButton: {
    borderWidth: 1,
    borderColor: "#334155",
    paddingVertical: 14,
    borderRadius: 12,
    width: "80%",
    alignItems: "center",
  },
  loginText: {
    color: "#e2e8f0",
    fontWeight: "bold",
    fontSize: 16,
  },
  nextButton: {
    position: "absolute",
    bottom: 30,
    right: 30,
  },
  nextText: {
    color: "#10b981",
    fontSize: 16,
    fontWeight: "bold",
  },
});
