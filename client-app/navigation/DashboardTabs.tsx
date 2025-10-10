// import React from "react";
// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import { TouchableOpacity, View, Text } from "react-native";
// import { useNavigation } from "@react-navigation/native";

// import StocksScreen from "../screens/StocksScreen";
// import HoldingsScreen from "../screens/HoldingsScreen";
// import OrdersScreen from "../screens/OrdersScreen";
// import LiveStocksScreen from "../screens/LiveStocksScreen";

// const Tab = createBottomTabNavigator();


// export default function DashboardTabs() {
//   return (
//     <Tab.Navigator
//       initialRouteName="Stocks"
//       screenOptions={{
//         headerShown: false,
//       }}
//     >
//       <Tab.Screen name="Stocks" component={StocksScreen} />
//       <Tab.Screen name="Holdings" component={HoldingsScreen} />
//       <Tab.Screen name="Orders" component={OrdersScreen} />
//       <Tab.Screen name="LiveStocks" component={LiveStocksScreen} />
//     </Tab.Navigator>
//   );
// }

import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { TouchableOpacity, View, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons"; // Make sure to install react-native-vector-icons

import StocksScreen from "../screens/StocksScreen";
import HoldingsScreen from "../screens/HoldingsScreen";
import OrdersScreen from "../screens/OrdersScreen";
import LiveStocksScreen from "../screens/LiveStocksScreen";

import HomeScreen from "../screens/HomeScreen";

const Tab = createBottomTabNavigator();

export default function DashboardTabs() {
  const navigation = useNavigation();

  const HeaderRightProfileButton = () => (
    <TouchableOpacity
      style={{ marginRight: 15 }}
      onPress={() => navigation.navigate("Profile" as never)}
    >
      <Icon name="person-circle-outline" size={28} color="#333" />
    </TouchableOpacity>
  );

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        headerShown: true,
        headerRight: () => <HeaderRightProfileButton />,
        tabBarActiveTintColor: "#007AFF",
        tabBarInactiveTintColor: "#8e8e93",
        tabBarLabelStyle: { fontSize: 12, fontWeight: "600" },
        tabBarStyle: { height: 60, paddingBottom: 5 },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName = "";

          switch (route.name) {
            case "Stocks":
              iconName = focused ? "trending-up" : "trending-up-outline";
              break;
            case "Holdings":
              iconName = focused ? "pie-chart" : "pie-chart-outline";
              break;
            case "Orders":
              iconName = focused ? "clipboard" : "clipboard-outline";
              break;
            case "LiveStocks":
              iconName = focused ? "flash" : "flash-outline";
              break;
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
      })}
    >
         <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Stocks" component={StocksScreen} />
      <Tab.Screen name="Holdings" component={HoldingsScreen} />
      <Tab.Screen name="Orders" component={OrdersScreen} />
      <Tab.Screen name="LiveStocks" component={LiveStocksScreen} />
    </Tab.Navigator>
  );
}
