import React from "react";
import { StyleSheet } from "react-native";
import { Stack, useLocalSearchParams } from "expo-router";
import { useTheme } from "@react-navigation/native";

import { MyHeader, MyTabBar } from "@components";
import { MyTheme, UserType } from "@types";

export default function InboxLayout() {
  const theme = useTheme() as MyTheme;
  const params = useLocalSearchParams<{ type: UserType }>();
  console.log("🚀 ~ InboxLayout ~ params:", params);

  return (
    <>
      <Stack
        initialRouteName="index"
        screenOptions={{
          contentStyle: { paddingTop: 14 },
          header: (props) => (
            <MyHeader
              {...props}
              showRight
              userType={params?.type!}
              showBackIcon={props.route.name == "index" ? false : true}
              theme={theme}
            />
          ),
        }}
      />
      <MyTabBar.Static theme={theme} params={params} />
    </>
  );
}

const styles = StyleSheet.create({});
