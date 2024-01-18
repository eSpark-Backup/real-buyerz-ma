import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Redirect } from "expo-router";

export default function App() {
  return <Redirect href={"(user)/anon/(tabs)"} />;
}

const styles = StyleSheet.create({});
