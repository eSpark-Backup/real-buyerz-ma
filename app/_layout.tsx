import { ThemeProvider } from "@react-navigation/native";
import { Slot } from "expo-router";
import { SafeAreaView } from "react-native";
import { StatusBar } from "expo-status-bar";

import { DarkTheme, LightTheme } from "../theme";

export default function RootLayout() {
  return (
    <ThemeProvider value={LightTheme}>
      <StatusBar style={"dark"} translucent />
      <SafeAreaView style={{ flex: 1 }}>
        <Slot />
      </SafeAreaView>
    </ThemeProvider>
  );
}
