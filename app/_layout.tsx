import { SafeAreaView, LogBox } from "react-native";
import { ThemeProvider } from "@react-navigation/native";
import { Slot } from "expo-router";
import { useSelector, Provider } from "react-redux";
import { StatusBar } from "expo-status-bar";

import { RootState, store } from "@store";
import { DarkTheme, LightTheme } from "@theme";
import { ThemeTypes } from "@types";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";

LogBox.ignoreLogs([
  "VirtualizedLists should never be nested inside plain ScrollViews",
]);

export default function RootLayout() {
  return (
    <Provider store={store}>
      <BottomSheetModalProvider>
        <RootComponent />
      </BottomSheetModalProvider>
    </Provider>
  );
}

function RootComponent() {
  const theme = useSelector(
    (state: RootState): ThemeTypes => state.theme.value
  );
  console.log("Theme", theme);

  return (
    <ThemeProvider value={theme === "Dark" ? DarkTheme : LightTheme}>
      <StatusBar style={"dark"} translucent />
      <SafeAreaView style={{ flex: 1 }}>
        <Slot />
      </SafeAreaView>
    </ThemeProvider>
  );
}
