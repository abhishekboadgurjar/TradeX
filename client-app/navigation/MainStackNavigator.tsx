import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import VerifyScreen from "../screens/VerifyScreen";
import DashboardTabs from "../navigation/DashboardTabs";
import ProfileScreen from "../screens/ProfileScreen";
import StockChartScreen from "../screens/StockCharts";

export type MainStackParamList = {
  VerifyPin: undefined;
  Dashboard: undefined;
  Profile: undefined;
  StockChart:undefined
};

const Stack = createNativeStackNavigator<MainStackParamList>();

export default function MainStackNavigator() {
  return (
    <Stack.Navigator initialRouteName="VerifyPin" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="VerifyPin" component={VerifyScreen} />
      <Stack.Screen name="Dashboard" component={DashboardTabs} />
      <Stack.Screen name="Profile" component={ProfileScreen} options={{ headerShown: true, title: "Profile" }} />
            <Stack.Screen name="StockChart" component={StockChartScreen} />
    </Stack.Navigator>
  );
}
