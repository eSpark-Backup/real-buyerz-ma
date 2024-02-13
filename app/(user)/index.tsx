import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Redirect, useLocalSearchParams } from "expo-router";

export default function App() {
  const params = useLocalSearchParams();
  console.log("kia ha params", params);

  // return <Redirect href={"(user)"} />;
  return <View />;
}

const styles = StyleSheet.create({});
