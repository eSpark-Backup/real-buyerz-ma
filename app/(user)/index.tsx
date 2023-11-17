import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Redirect } from "expo-router";

export default function App() {
  return <Redirect href={"(user)/anon"} />;
}

const styles = StyleSheet.create({});
