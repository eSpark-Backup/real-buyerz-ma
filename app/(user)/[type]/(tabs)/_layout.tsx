import React, { memo, useEffect, useState } from "react";
import { Tabs } from "expo-router/tabs";
import { useLocalSearchParams } from "expo-router";
import { useTheme } from "@react-navigation/native";

import { MyTabBar, MyHeader, LoginModal } from "@components";
import { MyTheme, UserType } from "@types";

function UserTabLayout() {
  const theme = useTheme() as MyTheme;
  const params = useLocalSearchParams<{ type: UserType }>();
  const [visible, setVisible] = useState(false);
  const [lastRoute, setLastRoute] = useState("");

  useEffect(() => {
    console.log('User type:', params.type);
  });
  
  
  const openLoginModal = (routeName: string, isFromTab: boolean) => {
    setLastRoute(routeName);
    setVisible(true);
  };

  return (
    <>
      <Tabs
        initialRouteName="home"
        backBehavior="initialRoute"
        sceneContainerStyle={{ paddingBottom: 35 }}
        screenOptions={{
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
              openModal={openLoginModal}
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
            title: "Listings",
            href: `(user)/${params?.type!}/(tabs)/listings`,
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            href: `(user)/${params?.type!}/(tabs)/profile`,
          }}
        />
      </Tabs>

      <LoginModal visible={visible} onClose={() => setVisible(false)} lastRoute={lastRoute} />
    </>
  );
}

export default memo(UserTabLayout);