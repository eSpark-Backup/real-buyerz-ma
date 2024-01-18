import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";

import MyText from "../MyText";
import { MyTheme } from "@types";
import {
  HomeTab,
  ListingTab,
  SettingsTab,
  Tab_Dashbaord,
  Tab_Projects,
} from "@assets/images";

function MyTabBar({
  state,
  descriptors,
  navigation,
  theme,
}: BottomTabBarProps & { theme: MyTheme }) {
  return (
    <View style={styles({ theme }).container}>
      {state.routes.map((route, index) => {
        if (
          route.name !== "index" &&
          route.name !== "inbox" &&
          route.name !== "search"
        ) {
          const { options } = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name, route.params);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: "tabLongPress",
              target: route.key,
            });
          };

          const btnStyle =
            route.name == "dashboard"
              ? styles({ isFocused, theme }).dashboardStyles
              : styles({ isFocused, theme }).normalStyle;

          return (
            <TouchableOpacity
              activeOpacity={1}
              key={route.name}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={btnStyle}
            >
              {route.name == "dashboard" ? (
                <View style={styles({ theme, isFocused }).dashboardInnerStyles}>
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
                    {label as string}
                  </MyText>
                </View>
              ) : (
                <>
                  {renderTabIcon(route.name, theme, isFocused)}
                  <MyText
                    style={{
                      color: theme.colors.TabBarText,
                      marginTop: 4,
                    }}
                    weight="600"
                    size={9}
                  >
                    {label as string}
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

const renderTabIcon = (
  routeName: string,
  theme: MyTheme,
  isFocused?: boolean
) => {
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
        <ListingTab
          style={{
            color: theme.colors.TabBarText,
          }}
        />
      );
    case "settings":
      return (
        <SettingsTab
          style={{
            color: theme.colors.TabBarText,
          }}
        />
      );
  }
};

export default MyTabBar;

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
