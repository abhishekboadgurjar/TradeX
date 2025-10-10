import React from "react";
import AppNavigator from "./navigation/AppNavigator"
import { SafeAreaView,SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar,Platform } from "react-native";


export default function App() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{flex:1,backgroundColor:"white",paddingTop:Platform.OS==="android"?StatusBar.currentHeight:0}}>
        <StatusBar barStyle="dark-content" backgroundColor="white" />
        <AppNavigator />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}