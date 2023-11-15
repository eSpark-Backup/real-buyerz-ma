import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Tabs } from "expo-router/tabs";

export default function UserTypeLayout() {
  return (
    <Tabs initialRouteName="home/index" backBehavior="initialRoute">
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
    </Tabs>
  );
}

const styles = StyleSheet.create({});
