import React, { memo, useState } from "react";
import { StyleSheet } from "react-native";
import { Tabs } from "expo-router/tabs";
import { useLocalSearchParams } from "expo-router";
import { useTheme, useNavigation } from "@react-navigation/native";

import { MyTabBar, MyHeader, LoginModal } from "@components";
import { MyTheme, UserType } from "@types";

function UserTabLayout() {
  const theme = useTheme() as MyTheme;
  const params = useLocalSearchParams<{ type: UserType }>();
  const [visible, setVisible] = useState(false);

  console.log("What is the type", params.type);

  return (
    <>
      <Tabs
        initialRouteName="projects"
        backBehavior="initialRoute"
        sceneContainerStyle={{ paddingBottom: 35 }}
        screenOptions={{
          // headerShown: false,
          // headerStyle: styles(theme).headerStyle,
          header: (props) => {
            return (
              <MyHeader
                {...props}
                userType={params?.type!}
                showRight
                theme={theme}
              />
            );
          },
        }}
        tabBar={(props) => {
          return (
            <MyTabBar
              openModal={(value) => setVisible(value)}
              userType={params?.type!}
              {...props}
              theme={theme}
            />
          );
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
            href: `(user)/${params?.type!}/(tabs)/home`,
          }}
        />
        <Tabs.Screen
          name="projects"
          options={{
            // headerShown: true,
            title: "Projects",
            href: `(user)/${params?.type!}/(tabs)/projects`,
          }}
        />
        <Tabs.Screen
          name="dashboard"
          options={{
            headerShown: false,
            title: "Dashboard",
            href: `(user)/${params?.type!}/(tabs)/dashboard`,
          }}
        />

        <Tabs.Screen
          name="listings"
          options={{
            // headerShown: true,
            title: "Listings",
            href: `(user)/${params?.type!}/(tabs)/listings`,
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            // headerShown: true,
            title: "Profile",
            href: `(user)/${params?.type!}/(tabs)/profile`,
          }}
        />
      </Tabs>
      <LoginModal visible={visible} onClose={() => setVisible(false)} />
    </>
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
