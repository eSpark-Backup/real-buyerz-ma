import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useTheme } from "@react-navigation/native";
import { MyTheme } from "../../types";

export default function App() {
  const { dark, colors } = useTheme() as MyTheme;
  return (
    <View>
      <Text style={{ color: colors.text }}>App {dark ? "true" : "false"}</Text>
    </View>
  );
}

const styles = StyleSheet.create({});
