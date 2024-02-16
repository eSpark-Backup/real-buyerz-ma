import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Slot } from "expo-router";
import { useTheme } from "@react-navigation/native";
import { MyTheme } from "@types";
import { MyTabBar } from "@components";

export default function MyProposalsLayout() {
  const theme = useTheme() as MyTheme;
  return (
    <>
      <Slot />
      <MyTabBar.Static theme={theme} />
    </>
  );
}

const styles = StyleSheet.create({});
