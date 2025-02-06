import { useEffect, useState } from "react";
import { storage } from "store/mmkv";
import { SafeAreaView, LogBox } from "react-native";
import { ThemeProvider, useTheme } from "@react-navigation/native";
import { Slot } from "expo-router";
import { useSelector, Provider } from "react-redux";
import { StatusBar } from "expo-status-bar";
import { RootState, store } from "@store";
import { DarkTheme, LightTheme } from "@theme";
import { ThemeTypes } from "@types";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import ToastConfig from "./utils/toastConfig";
import { SocketProvider } from "@components/SocketProvider";
import { SocketChatProvider } from "@components/SocketProvider/chat";


export default function RootLayout() {
  return (
    <GestureHandlerRootView>
      <Provider store={store}>
        <BottomSheetModalProvider>
          <RootComponent />
        </BottomSheetModalProvider>
      </Provider>
    </GestureHandlerRootView>
  );
}

function RootComponent() {
  const theme = useSelector(
    (state: RootState): ThemeTypes => state.theme.value
  );

  const [storedTheme, setStoredTheme] = useState(storage.getBoolean("theme"));
  const [authToken, setAuthToken] = useState<string | null>(null);

  useEffect(() => {
    const token = storage.getString("userToken");
    setAuthToken(token??null);
    console.log(theme ? "dark" : "default");
  }, [theme]);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SocketProvider authToken={authToken}>
      <SocketChatProvider authToken={authToken}> 
        <ThemeProvider value={theme === "Dark" ? DarkTheme : LightTheme}>
          <StatusBar style={"dark"} translucent />
          <Slot />
          <ToastConfig />
        </ThemeProvider>
        </SocketChatProvider>
      </SocketProvider>
    </GestureHandlerRootView>
  );
}