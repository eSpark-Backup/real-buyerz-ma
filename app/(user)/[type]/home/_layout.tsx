import React from "react";
import {
  StyleProp,
  StyleSheet,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";
import { Stack } from "expo-router";

import { MyHeader } from "@components";

export default function HomeLayout() {
  return (
    <Stack
      initialRouteName="home/propertyDetail"
      screenOptions={{
        headerShown: true,
        header: (props) => {
          return <MyHeader {...props} showRight showBackIcon />;
        },
      }}
    />
  );
}

const styles = StyleSheet.create({});
