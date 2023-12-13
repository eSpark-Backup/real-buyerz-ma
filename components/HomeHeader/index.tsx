import React from "react";
import { View, StyleSheet } from "react-native";
import { useTheme } from "@react-navigation/native";

import { PLogo, RText } from "@assets/images";
import { MyTheme } from "@types";

export default function HomeHeader() {
  const theme = useTheme() as MyTheme;
  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <View style={styles.left}>
        <PLogo />
      </View>
      <View style={styles.middle}>
        <RText />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingHorizontal: 15,
    width: "100%",
    height: 60,
  },
  left: {
    justifyContent: "center",
  },
  middle: {
    alignItems: "center",
    justifyContent: "center",
    width: "80%",
  },
});
