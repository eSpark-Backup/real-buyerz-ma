import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";

export default function App() {
  const params = useLocalSearchParams();

  return <View />;
}

const styles = StyleSheet.create({});
