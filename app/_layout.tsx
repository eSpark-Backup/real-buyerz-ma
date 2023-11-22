import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native";
import { ThemeProvider } from "@react-navigation/native";
import { Slot } from "expo-router";
import { StatusBar } from "expo-status-bar";
import * as Font from "expo-font";

import { customFonts } from "../utils/customFonts";
import { customImages } from "../utils/customImages";
import { DarkTheme, LightTheme } from "../theme";

export default function RootLayout() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    loadVectors();
  }, []);

  const loadVectors = async () => {
    await Font.loadAsync(customFonts);
    await Font.loadAsync(customImages);
    setLoaded(true);
  };

  return loaded ? (
    <ThemeProvider value={LightTheme}>
      <StatusBar style={"dark"} translucent />
      <SafeAreaView style={{ flex: 1 }}>
        <Slot />
      </SafeAreaView>
    </ThemeProvider>
  ) : null;
}
