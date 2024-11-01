import React from "react";
import { StyleSheet } from "react-native";
import { Stack, useLocalSearchParams } from "expo-router";
import { useTheme } from "@react-navigation/native";

import { MyTheme, UserType } from "@types";
import { MyHeader } from "@components";

export default function HomeLayout() {
  const theme = useTheme() as MyTheme;
  const params = useLocalSearchParams<{ type: UserType }>();

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
              userType={params.type!}
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
