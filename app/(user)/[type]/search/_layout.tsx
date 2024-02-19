import React from "react";
import { StyleSheet } from "react-native";
import { Stack, useLocalSearchParams, useNavigation } from "expo-router";
import { MyHeader, MyTabBar } from "@components";
import { useTheme } from "@react-navigation/native";
import { MyTheme, UserType } from "@types";

import { Tabs } from "expo-router/tabs";

export default function SearchLayout() {
  const params = useLocalSearchParams<{ type: UserType }>();
  const theme = useTheme() as MyTheme;
  const navigation = useNavigation();

  console.log("params of Search Layout: ", params);

  return (
    <Stack
      initialRouteName="search/index"
      screenOptions={() => ({
        headerShown: true,
        contentStyle: { paddingHorizontal: 20, paddingTop: 14 },
      })}
    >
      <Stack.Screen
        name="index"
        options={{
          header: (props) => {
            return (
              <MyHeader
                {...props}
                userType={params?.type!}
                showBackIcon
                hideCenter
                theme={theme}
              />
            );
          },
        }}
      />
      <Stack.Screen
        name="searchList"
        options={{
          header: (props) => {
            return (
              <MyHeader
                {...props}
                userType={params?.type!}
                showBackIcon
                showRight
                theme={theme}
              />
            );
          },
        }}
      />
    </Stack>
  );
}

const styles = StyleSheet.create({});
