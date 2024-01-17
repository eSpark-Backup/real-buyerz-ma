import React from "react";
import { StyleSheet } from "react-native";
import { Tabs } from "expo-router/tabs";
import { useLocalSearchParams } from "expo-router";
import { useTheme, useNavigation } from "@react-navigation/native";

import { MyTabBar, MyHeader } from "@components";
import { MyTheme } from "@types";

export default function UserTypeLayout() {
  const theme = useTheme() as MyTheme;
  const params = useLocalSearchParams();

  return (
    <Tabs
      initialRouteName="home"
      backBehavior="initialRoute"
      sceneContainerStyle={{ paddingBottom: 35 }}
      screenOptions={{
        headerShown: false,
        headerStyle: styles(theme).headerStyle,
        header: (props) => {
          return <MyHeader {...props} showRight showBackIcon theme={theme} />;
        },
      }}
      tabBar={(props) => {
        return <MyTabBar {...props} theme={theme} />;
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
          headerShown: false,
          title: "Home",
          href: "(user)/anon/home",
        }}
      />
      <Tabs.Screen
        name="projects"
        options={{
          headerShown: true,
          title: "Projects",
          href: "(user)/anon/projects",
        }}
      />
      <Tabs.Screen
        name="inbox"
        options={{
          title: "Inbox",
          href: "(user)/anon/inbox",
        }}
      />
      <Tabs.Screen
        name="dashboard"
        options={{
          headerShown: true,
          title: "Dashboard",
          href: "(user)/anon/dashboard",
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          headerShown: true,
          header: (props) => {
            const searchRoute = props.navigation
              .getState()
              .routes.find((item) => item.name === "search");
            const isSearchList = searchRoute?.state?.index !== 1;
            return (
              <MyHeader
                {...props}
                hideCenter={isSearchList}
                showBackIcon
                theme={theme}
              />
            );
          },
          title: "Search",
          href: "(user)/anon/search",
        }}
      />
      <Tabs.Screen
        name="listings"
        options={{
          headerShown: true,
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
