import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Slot, Stack } from "expo-router";

export default function ListingLayout() {
  return (
    <Stack
      initialRouteName="listing/index"
      screenOptions={{
        headerShown: false,
        // contentStyle: { paddingTop: 14 },
      }}
    />
  );
}

const styles = StyleSheet.create({});
