import { Slot } from "expo-router";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { useTheme } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";

import { MyTheme } from "@types";
import { View } from "react-native";

export default function MainLayout() {
  const { colors, dark } = useTheme() as MyTheme;

  const insets = useSafeAreaInsets();

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.background,
      }}
    >
      <View
        style={{
          backgroundColor: colors.secondary,
          height: insets.top,
        }}
      />
      <StatusBar backgroundColor={colors.secondary} style="light" />
      <Slot />
    </View>
  );
}
