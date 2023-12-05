import React from "react";
import { StyleSheet } from "react-native";
import { Tabs } from "expo-router/tabs";
import { useTheme } from "@react-navigation/native";

import { MyTabBar, MyHeader } from "@components";
import { MyTheme } from "@types";

export default function UserTypeLayout() {
  const theme = useTheme() as MyTheme;

  return (
    <Tabs
      initialRouteName="home"
      backBehavior="initialRoute"
      screenOptions={{
        headerShown: false,
        headerStyle: styles(theme).headerStyle,
        header: (props) => {
          return <MyHeader {...props} showRight showBackIcon />;
        },
      }}
      tabBar={(props) => {
        return <MyTabBar {...props} />;
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="home"
        options={{
          // headerShown: false,
          title: "Home",
          href: "(user)/anon/home",
        }}
      />
      <Tabs.Screen
        name="inbox"
        options={{
          headerShown: true,
          title: "Inbox",
          href: "(user)/anon/inbox",
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          headerShown: true,
          header: (props) => {
            return <MyHeader {...props} hideCenter showBackIcon />;
          },
          title: "Search",
          href: "(user)/anon/search",
        }}
      />
      <Tabs.Screen
        name="listings"
        options={{
          // headerShown: false,
          title: "Listings",
          href: "(user)/anon/listings",
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          headerShown: true,
          title: "Settings",
          href: "(user)/anon/settings",
        }}
      />
    </Tabs>
  );
}

const styles = (theme: MyTheme) =>
  StyleSheet.create({
    headerStyle: {
      height: 60,
      borderBottomColor: theme.colors.border,
      borderBottomWidth: 1,
    },
  });
