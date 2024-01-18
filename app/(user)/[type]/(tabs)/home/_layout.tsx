import React from "react";
import { StyleSheet } from "react-native";
import { Stack } from "expo-router";
import { useTheme } from "@react-navigation/native";

import { MyTheme } from "@types";
import { MyHeader } from "@components";

export default function HomeLayout() {
  const theme = useTheme() as MyTheme;

  return (
    <Stack
      initialRouteName="home/propertyDetail"
      screenOptions={({ navigation, route }) => ({
        headerShown: route.name == "index" ? false : true,
        header: (props) => {
          return <MyHeader {...props} showRight showBackIcon theme={theme} />;
        },
      })}
    />
  );
}

const styles = StyleSheet.create({});
