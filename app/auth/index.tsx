import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { useTheme } from "@react-navigation/native";
import { Link } from "expo-router";
import { MyTheme } from "../../types";

export default function App() {
  const { dark, colors } = useTheme() as MyTheme;
  return (
    <View
      style={{
        flex: 1,
        height: "100%",
        width: "100%",
      }}
    >
      <Link href="/(user)/anon/home">Go to Home</Link>
      <Text style={{ color: colors.text }}>App {dark ? "true" : "false"}</Text>
    </View>
  );
}

const styles = StyleSheet.create({});
