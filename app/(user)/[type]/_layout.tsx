import React from "react";
import { StyleSheet } from "react-native";
import { Tabs } from "expo-router/tabs";

import { MyTabBar, MyHeader } from "@components";

export default function UserTypeLayout() {
  return (
    <Tabs
      initialRouteName="home/index"
      backBehavior="initialRoute"
      screenOptions={({ navigation, route }) => ({
        headerShown: false,
        headerStyle: {
          height: 60,
          borderBottomColor: "#E4E4E4",
          borderBottomWidth: 1,
        },
        header: (props) => {
          return <MyHeader {...props} showRight showBackIcon />;
        },
      })}
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
        name="home/index"
        options={{
          // headerShown: false,
          title: "Home",
          href: "(user)/anon/home",
        }}
      />
      <Tabs.Screen
        name="inbox/index"
        options={{
          // headerShown: false,
          title: "Inbox",
          href: "(user)/anon/inbox",
        }}
      />
      <Tabs.Screen
        name="search/index"
        options={{
          headerShown: true,
          title: "Search",
          href: "(user)/anon/search",
        }}
      />
      <Tabs.Screen
        name="listings/index"
        options={{
          // headerShown: false,
          title: "Listings",
          href: "(user)/anon/listings",
        }}
      />
      <Tabs.Screen
        name="settings/index"
        options={{
          // headerShown: false,
          title: "Settings",
          href: "(user)/anon/settings",
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({});
