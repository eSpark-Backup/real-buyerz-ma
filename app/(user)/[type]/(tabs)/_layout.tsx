import React, { memo } from "react";
import { StyleSheet } from "react-native";
import { Tabs } from "expo-router/tabs";
import { useLocalSearchParams } from "expo-router";
import { useTheme, useNavigation } from "@react-navigation/native";

import { MyTabBar, MyHeader } from "@components";
import { MyTheme } from "@types";

function UserTabLayout() {
  const theme = useTheme() as MyTheme;
  const params = useLocalSearchParams();

  return (
    <Tabs
      initialRouteName="home"
      backBehavior="initialRoute"
      sceneContainerStyle={{ paddingBottom: 35 }}
      screenOptions={{
        headerShown: false,
        // headerStyle: styles(theme).headerStyle,
        header: (props) => {
          return <MyHeader {...props} showRight theme={theme} />;
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
          headerShown: true,
          title: "Home",
          href: "(user)/anon/(tabs)/home",
        }}
      />
      <Tabs.Screen
        name="projects"
        options={{
          headerShown: true,
          title: "Projects",
          href: "(user)/anon/(tabs)/projects",
        }}
      />
      <Tabs.Screen
        name="dashboard"
        options={{
          headerShown: true,
          title: "Dashboard",
          href: "(user)/anon/(tabs)/dashboard",
        }}
      />

      <Tabs.Screen
        name="listings"
        options={{
          headerShown: true,
          title: "Listings",
          href: "(user)/anon/(tabs)/listings",
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          headerShown: true,
          title: "Settings",
          href: "(user)/anon/(tabs)/settings",
        }}
      />
    </Tabs>
  );
}

export default memo(UserTabLayout);

const styles = (theme: MyTheme) =>
  StyleSheet.create({
    headerStyle: {
      height: 60,
      borderBottomColor: theme.colors.border,
      borderBottomWidth: 1,
    },
  });
