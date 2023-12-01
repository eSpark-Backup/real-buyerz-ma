import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Stack } from "expo-router";

export default function SearchLayout() {
  return (
    <Stack
      initialRouteName="search/index"
      screenOptions={{
        headerShown: false,
      }}
    />
  );
}

const styles = StyleSheet.create({});
