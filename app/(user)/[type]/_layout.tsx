import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Tabs } from "expo-router/tabs";
import { MyTabBar } from "../../../components";

export default function UserTypeLayout() {
  return (
    <Tabs
      initialRouteName="home/index"
      backBehavior="initialRoute"
      tabBar={(props) => {
        // console.log("pop", JSON.stringify(descriptors));
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
          headerShown: false,
          title: "Home",
          href: "(user)/anon/home",
        }}
      />
      <Tabs.Screen
        name="inbox/index"
        options={{
          headerShown: false,
          title: "Inbox",
          href: "(user)/anon/inbox",
        }}
      />
      <Tabs.Screen
        name="search/index"
        options={{
          headerShown: false,
          title: "Search",
          href: "(user)/anon/search",
        }}
      />
      <Tabs.Screen
        name="listings/index"
        options={{
          headerShown: false,
          title: "Listings",
          href: "(user)/anon/listings",
        }}
      />
      <Tabs.Screen
        name="settings/index"
        options={{
          headerShown: false,
          title: "Settings",
          href: "(user)/anon/settings",
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({});
