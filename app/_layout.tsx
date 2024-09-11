import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider as NavigationThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";

import { useColorScheme } from "@/components/useColorScheme";
import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider, useTheme } from "./context/ThemeProvider"; // Seu ThemeProvider personalizado
import { MD3DarkTheme } from "react-native-paper";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  initialRouteName: "(tabs)",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  return (
    <ThemeProvider>
    
      <RootLayoutNav isFontsLoaded={loaded} />
    </ThemeProvider>
  );
}

function RootLayoutNav({ isFontsLoaded }: { isFontsLoaded: boolean }) {
  const { paperTheme } = useTheme();

  return (
    <NavigationThemeProvider
      value={paperTheme === MD3DarkTheme ? DarkTheme : DefaultTheme}
    >
      <AuthProvider>
        <Stack initialRouteName="index">
          <Stack.Screen name="resetpassword" />
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
      </AuthProvider>
    </NavigationThemeProvider>
  );
}
