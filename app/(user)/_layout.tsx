import { Slot } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

export default function MainLayout() {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "pink", //todo: change it to the real bg value
      }}
    >
      <Slot />
    </SafeAreaView>
  );
}
