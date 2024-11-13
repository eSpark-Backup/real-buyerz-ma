import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Slot, Stack, useGlobalSearchParams } from "expo-router";
import { MyHeader } from "@components";
import { MyTheme, UserType } from "@types";
import { useTheme } from "@react-navigation/native";

export default function ListingLayout() {
  const theme = useTheme() as MyTheme;
  const params = useGlobalSearchParams<{ type: UserType, redirectionFrom:string }>();

  return (
    <Stack
      initialRouteName="listing/index"
      screenOptions={({ navigation, route }) => ({
        headerShown: true,
        header: (props) => {
          return (
            <MyHeader
              {...props}
              showRight
              userType={params?.type!}
              showBackIcon={route.name !== "index" ||params?.redirectionFrom=="proposalPreview" ? true : false}
              theme={theme}
            />
          );
        },
      })}
    />
  );
}

const styles = StyleSheet.create({});
