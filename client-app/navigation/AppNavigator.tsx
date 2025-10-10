// import React, { useEffect, useState } from "react";
// import { NavigationContainer } from "@react-navigation/native";
// import AuthStack from "./AuthStack";
// import MainStackNavigator from "./MainStackNavigator";
// import { useAuthStore } from "../store/useAuthStore";
// import { useProfileStore } from "../store/useProfileStore"; // optional if PIN info is in profile

// export default function AppNavigator() {
//   const { user, loadTokens } = useAuthStore();
//   const { profile, fetchProfile } = useProfileStore(); // optional
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     const initAuth = async () => {
//       try {
//         await loadTokens(); // load access_token / refresh_token
//         if (user) {
//           await fetchProfile(); // load profile including login_pin_exist
//         }
//       } catch (err) {
//         console.log("Failed to load tokens or profile:", err);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     initAuth();
//   }, []);

//   if (isLoading) return null; // or <SplashScreen />


//   return (
//     <NavigationContainer>
//       {user ? <MainStackNavigator /> : <AuthStack />}
//     </NavigationContainer>
//   );
// }

// import React, { useEffect, useState } from "react";
// import { NavigationContainer } from "@react-navigation/native";
// import AuthStack from "./AuthStack"; 
// import { useAuthStore } from "../store/useAuthStore";

// export default function AppNavigator() {
//   const { loadTokens } = useAuthStore();
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     const initAuth = async () => {
//       try {
//         await loadTokens();
//       } catch (err) {
//         console.log("Failed to load tokens:", err);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     initAuth();
//   }, []);

//   if (isLoading) return null;

//   // Render AuthStack properly
//   return (
//     <NavigationContainer>
//       <AuthStack />
//     </NavigationContainer>
//   );
// }
// import React, { useEffect, useState } from "react";
// import { NavigationContainer } from "@react-navigation/native";
// import AuthStack from "./AuthStack";
// import MainStackNavigator from "./MainStackNavigator";
// import * as SecureStore from "expo-secure-store";
// import { ActivityIndicator, View } from "react-native";

// export default function AppNavigator() {
//   const [initialRoute, setInitialRoute] = useState<"Auth" | "Main" | null>(null);

//   useEffect(() => {
//     const init = async () => {
//       try {
//         // Read stored tokens
//         const access = await SecureStore.getItemAsync("access_token");
//         const refresh = await SecureStore.getItemAsync("refresh_token");
//         const socketAccess = await SecureStore.getItemAsync("socket_access_token");
//         const socketRefresh = await SecureStore.getItemAsync("socket_refresh_token");

//         // If all tokens exist, go to main
//         if (access && refresh && socketAccess && socketRefresh) {
//           setInitialRoute("Main");
//         } else {
//           setInitialRoute("Auth");
//         }
//       } catch (err) {
//         console.error("Error checking stored tokens:", err);
//         setInitialRoute("Auth");
//       }
//     };

//     init();
//   }, []);

//   // Show loader while checking
//   if (!initialRoute) {
//     return (
//       <View
//         style={{
//           flex: 1,
//           backgroundColor: "#0f172a",
//           justifyContent: "center",
//           alignItems: "center",
//         }}
//       >
//         <ActivityIndicator size="large" color="#10b981" />
//       </View>
//     );
//   }

//   return (
//     <NavigationContainer>
//       {initialRoute === "Main" ? <MainStackNavigator /> : <AuthStack />}
//     </NavigationContainer>
//   );
// }

// import React, { useEffect, useState } from "react";
// import { NavigationContainer } from "@react-navigation/native";
// import AuthStack from "./AuthStack";
// import MainStackNavigator from "./MainStackNavigator";
// import { useAuthStore } from "../store/useAuthStore";

// export default function AppNavigator() {
//   const { user, loadTokens } = useAuthStore();
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     const initAuth = async () => {
//       try {
//         await loadTokens();
//       } catch (err) {
//         console.log("Failed to load tokens:", err);
//       } finally {
//         setIsLoading(false);
//       }
//     };
//     initAuth();
//   }, []);

//   if (isLoading) return null; // or splash

//   return (
//     <NavigationContainer>
//       {user ? <MainStackNavigator /> : <AuthStack />}
//     </NavigationContainer>
//   );
// }


// import React, { useEffect, useState } from "react";
// import { NavigationContainer } from "@react-navigation/native";
// import AuthStack from "./AuthStack";
// import MainStackNavigator from "./MainStackNavigator";
// import { useAuthStore } from "../store/useAuthStore";

// export default function AppNavigator() {
//   const { user, loadTokens } = useAuthStore();
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     const init = async () => {
//       try {
//         await loadTokens(); // check tokens and load user
//       } catch (err) {
//         console.log("Failed to load tokens:", err);
//       } finally {
//         setIsLoading(false);
//       }
//     };
//     init();
//   }, []);

//   if (isLoading) return null; // or splash screen

//   return (
//     <NavigationContainer>
//       {user ? <MainStackNavigator /> : <AuthStack />}
//     </NavigationContainer>
//   );
// }
import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import AuthStack from "./AuthStack";
import MainStackNavigator from "./MainStackNavigator";
import { useAuthStore } from "../store/useAuthStore";

export default function AppNavigator() {
  const { loadUserFromStorage, user } = useAuthStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      await loadUserFromStorage();
      setIsLoading(false);
    };
    initAuth();
  }, []);

  if (isLoading) return null; // or <SplashScreen />

  return (
    <NavigationContainer>
      {user ? <MainStackNavigator /> : <AuthStack />}
    </NavigationContainer>
  );
}
