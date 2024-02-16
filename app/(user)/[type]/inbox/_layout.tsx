import React from "react";
import { StyleSheet } from "react-native";
import { Stack } from "expo-router";
import { useTheme } from "@react-navigation/native";

import { MyTabBar } from "@components";
import { MyTheme } from "@types";

export default function InboxLayout() {
  const theme = useTheme() as MyTheme;
  return (
    <>
      <Stack
        initialRouteName="inbox/index"
        screenOptions={{
          headerShown: false,
          contentStyle: { paddingTop: 14 },
        }}
      />
      <MyTabBar.Static theme={theme} />
    </>
  );
}

const styles = StyleSheet.create({});
