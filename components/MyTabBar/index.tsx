import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";

import MyText from "../MyText";
import { MyTheme } from "@types";
import {
  HomeTab,
  InboxTab,
  ListingTab,
  SearchTab,
  SettingsTab,
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
        if (route.name !== "index") {
          const { options } = descriptors[route.key];
          console.log("route", route);
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
            route.name == "search"
              ? styles({ isFocused, theme }).searchStyle
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
              {route.name == "search" ? (
                <View style={styles({ theme }).searchInnerStyle}>
                  <SearchTab
                    style={{
                      color: theme.colors.background,
                    }}
                  />
                  <MyText
                    style={{ color: theme.colors.background, marginTop: 4 }}
                    size={10}
                  >
                    {label as string}
                  </MyText>
                </View>
              ) : (
                <>
                  {renderTabIcon(route.name, theme, isFocused)}
                  <MyText
                    style={{
                      color: isFocused
                        ? theme.colors.primary
                        : theme.colors.background,
                      marginTop: 4,
                    }}
                    size={10}
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
  console.log("routeName", routeName);
  switch (routeName) {
    case "home":
      return (
        <HomeTab
          style={{
            color: isFocused ? theme.colors.primary : theme.colors.background,
          }}
        />
      );
    case "inbox":
      return (
        <InboxTab
          style={{
            color: isFocused ? theme.colors.primary : theme.colors.background,
          }}
        />
      );
    case "listings":
      return (
        <ListingTab
          style={{
            color: isFocused ? theme.colors.primary : theme.colors.background,
          }}
        />
      );
    case "settings":
      return (
        <SettingsTab
          style={{
            color: isFocused ? theme.colors.primary : theme.colors.background,
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
      backgroundColor: theme?.colors.secondary,
      justifyContent: "center",
      alignItems: "center",
      height: 52,
    },
    normalStyle: {
      justifyContent: "center",
      alignItems: "center",
      width: "21%",
      height: "100%",
      borderTopWidth: isFocused ? 3 : 0,
      borderColor: isFocused ? theme?.colors.primary : "transparent",
    },
    searchStyle: {
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 35,
      bottom: 25,
      width: 72,
      height: 72,
      backgroundColor: theme?.colors.background,
    },
    searchInnerStyle: {
      backgroundColor: theme?.colors.secondary,
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 35,
      width: "84%",
      height: "84%",
    },
  });
