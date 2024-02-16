import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";

import MyText from "@components/MyText";
import { MyTheme } from "@types";
import {
  HomeTab,
  Tab_Listing,
  Tab_Dashbaord,
  Tab_Projects,
  Tab_Profile,
} from "@assets/images";
import { router } from "expo-router";

const routes = [
  { name: "home" },
  { name: "projects" },
  { name: "dashboard" },
  { name: "listings" },
  { name: "profile" },
];

function Static({ theme }: { theme: MyTheme }) {
  return (
    <View style={styles({ theme }).container}>
      {routes.map((route, index) => {
        if (
          route.name !== "index" &&
          route.name !== "inbox" &&
          route.name !== "search"
        ) {
          const onPress = () => {
            router.push("(user)/anon/(tabs)/" + route.name);
          };

          const btnStyle =
            route.name == "dashboard"
              ? styles({ theme }).dashboardStyles
              : styles({ theme }).normalStyle;

          return (
            <TouchableOpacity
              activeOpacity={1}
              key={route.name}
              accessibilityRole="button"
              onPress={onPress}
              style={btnStyle}
            >
              {route.name == "dashboard" ? (
                <View style={styles({ theme }).dashboardInnerStyles}>
                  <Tab_Dashbaord
                    style={{
                      color: theme.colors.TabBarText,
                    }}
                  />
                  <MyText
                    style={{ color: theme.colors.TabBarText, marginTop: 4 }}
                    weight="700"
                    size={9}
                  >
                    {
                      (route.name.charAt(0).toUpperCase() +
                        route.name.slice(1)) as string
                    }
                  </MyText>
                </View>
              ) : (
                <>
                  {renderTabIcon(route.name, theme)}
                  <MyText
                    style={{
                      color: theme.colors.TabBarText,
                      marginTop: 4,
                    }}
                    weight="600"
                    size={9}
                  >
                    {
                      (route.name.charAt(0).toUpperCase() +
                        route.name.slice(1)) as string
                    }
                  </MyText>
                </>
              )}
            </TouchableOpacity>
          );
        }
      })}
    </View>
  );
}

const renderTabIcon = (routeName: string, theme: MyTheme) => {
  switch (routeName) {
    case "home":
      return (
        <HomeTab
          style={{
            color: theme.colors.TabBarText,
          }}
        />
      );
    case "projects":
      return (
        <Tab_Projects
          style={{
            color: theme.colors.TabBarText,
          }}
        />
      );
    case "listings":
      return (
        <Tab_Listing
          style={{
            color: theme.colors.TabBarText,
          }}
        />
      );
    case "profile":
      return (
        <Tab_Profile
          style={{
            color: theme.colors.TabBarText,
          }}
        />
      );
  }
};

export default Static;

const styles = ({
  isFocused,
  theme,
}: {
  isFocused?: boolean;
  theme?: MyTheme;
}) =>
  StyleSheet.create({
    container: {
      flexDirection: "row",
      backgroundColor: theme?.colors.TabBar,
      justifyContent: "center",
      alignItems: "center",
      height: 52,
      marginTop: 35,
    },
    normalStyle: {
      justifyContent: "center",
      alignItems: "center",
      width: "21%",
      height: "100%",
      backgroundColor: isFocused ? theme?.colors.primary : "transparent",
    },
    dashboardStyles: {
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 35,
      bottom: 25,
      width: 72,
      height: 72,
      backgroundColor: theme?.colors.TabBarText,
    },
    dashboardInnerStyles: {
      backgroundColor: isFocused
        ? theme?.colors.primary
        : theme?.dark
        ? theme?.colors.background
        : theme?.colors.secondary,
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 35,
      width: "84%",
      height: "84%",
    },
  });
