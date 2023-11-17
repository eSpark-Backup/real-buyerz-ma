import React from "react";
import { StyleSheet } from "react-native";
import { useTheme } from "@react-navigation/native";
import { Redirect } from "expo-router";

import { MyTheme } from "../../types";

export default function App() {
  const { dark, colors } = useTheme() as MyTheme;
  return <Redirect href={"/auth/signIn"} />;
}

const styles = StyleSheet.create({});
