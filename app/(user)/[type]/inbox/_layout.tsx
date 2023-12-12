import React from "react";
import { StyleSheet } from "react-native";
import { Stack } from "expo-router";

export default function InboxLayout() {
  return (
    <Stack
      initialRouteName="inbox/index"
      screenOptions={{
        headerShown: false,
        contentStyle: { paddingTop: 14 },
      }}
    />
  );
}

const styles = StyleSheet.create({});
