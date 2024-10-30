import React from "react";
import { StyleSheet } from "react-native";
import { Slot, Stack, useLocalSearchParams } from "expo-router";
import { MyHeader } from "@components";
import { useTheme } from "@react-navigation/native";
import { MyTheme, UserType } from "@types";

export default function ProjectsLayout() {
  const theme = useTheme() as MyTheme;
  const params = useLocalSearchParams<{ type: UserType }>();

  console.log(`Project ${JSON.stringify(params)}`);

  return (
    <Stack
      initialRouteName="index"
      screenOptions={({ navigation, route }) => ({
        headerShown: false,
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
