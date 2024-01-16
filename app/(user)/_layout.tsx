import { Slot } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";

import { MyTheme } from "@types";

export default function MainLayout() {
  const { colors, dark } = useTheme() as MyTheme;

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.background,
      }}
    >
      <StatusBar backgroundColor={colors.secondary} style="light" />
      <Slot />
    </SafeAreaView>
  );
}
