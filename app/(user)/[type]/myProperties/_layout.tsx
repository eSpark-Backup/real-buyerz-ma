import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Slot, useLocalSearchParams } from "expo-router";
import { useTheme } from "@react-navigation/native";

import { MyTheme, UserType } from "@types";
import { MyTabBar } from "@components";

export default function MyPropertiesLayout() {
  const theme = useTheme() as MyTheme;
  const params = useLocalSearchParams<{ type: UserType }>();

  return (
    <>
      <Slot />
      <MyTabBar.Static theme={theme} params={params} />
    </>
  );
}

const styles = StyleSheet.create({});
