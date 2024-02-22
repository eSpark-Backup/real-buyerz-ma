import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Slot, Stack, useLocalSearchParams } from "expo-router";
import { MyHeader } from "@components";
import { useTheme } from "@react-navigation/native";
import { MyTheme, UserType } from "@types";

export default function ShopLayout() {
  const theme = useTheme() as MyTheme;

  const params = useLocalSearchParams<{ type: UserType }>();

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
    </>
  );
}

const styles = StyleSheet.create({});
