import React, { memo, useEffect, useState } from "react";
import { Tabs } from "expo-router/tabs";
import { useGlobalSearchParams, useLocalSearchParams } from "expo-router";
import { useTheme } from "@react-navigation/native";

import { MyTabBar, MyHeader, LoginModal } from "@components";
import { MyTheme, UserType } from "@types";

function UserTabLayout() {
  const theme = useTheme() as MyTheme;
  const params = useGlobalSearchParams<{ type: UserType }>();
  const [visible, setVisible] = useState(false);
  const [lastRoute, setLastRoute] = useState("");

  console.log("params "+JSON.stringify(params))

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
          initialParams={{ type: params.type }}
        />

        <Tabs.Screen
          name="dashboard"
          options={{
            headerShown: false,
            title: "Dashboard",
            href: `(user)/${params?.type!}/(tabs)/dashboard/bidding`,
          }}
          initialParams={{ userType: params.type }}
        />
        <Tabs.Screen
          name="listings"
          options={{
            headerShown: false,
            title: params.type === "user" ? "Post Request" : "Listings",
            href: `(user)/${params?.type!}/(tabs)/listings`,
          }}
          initialParams={{ type: params.type }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            href: `(user)/${params?.type!}/(tabs)/profile`,
          }}
          initialParams={{ type: params.type }}
        />
      </Tabs>

      <LoginModal
        visible={visible}
        onClose={() => setVisible(false)}
        lastRoute={lastRoute}
      />
    </>
  );
}

export default memo(UserTabLayout);
