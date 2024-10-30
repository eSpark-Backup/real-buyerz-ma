import React from "react";
import { StyleSheet } from "react-native";
import { useTheme } from "@react-navigation/native";
import { Stack, useGlobalSearchParams, useLocalSearchParams } from "expo-router";

import { MyTheme, UserType } from "@types";
import { MyHeader } from "@components";

export default function DashboardLayout() {
  const theme = useTheme() as MyTheme;
  const params = useGlobalSearchParams<{ type: UserType }>();

  return (
    <Stack
      initialRouteName="index"
      screenOptions={({ navigation, route }) => ({
        headerShown: true,
        header: (props) => {
          return (
            <MyHeader
              {...props}
              showRight
              userType={params?.type!}
              showBackIcon={route.name == "index" ? false : true}
              theme={theme}
            />
          );
        },
      })}
    />
  );
}

const styles = StyleSheet.create({});
