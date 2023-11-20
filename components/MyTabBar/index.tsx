import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";

import MyText from "../MyText";

function MyTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  return (
    <View style={styles().container}>
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
            route.name == "search/index"
              ? styles(isFocused).searchStyle
              : styles(isFocused).normalStyle;

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
              {route.name == "search/index" ? (
                <View
                  style={{
                    backgroundColor: "#136fa9",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: 35,
                    width: "84%",
                    height: "84%",
                  }}
                >
                  <Text>Icon</Text>
                  <MyText style={{ color: "#ffffff" }}>
                    {label as string}
                  </MyText>
                </View>
              ) : (
                <>
                  <Text>Icon</Text>
                  <MyText style={{ color: isFocused ? "#fb631c" : "#ffffff" }}>
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

export default MyTabBar;

const styles = (isFocused?: boolean) =>
  StyleSheet.create({
    container: {
      flexDirection: "row",
      backgroundColor: "#136fa9",
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
      borderColor: isFocused ? "#fb631c" : "transparent",
    },
    searchStyle: {
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 35,
      bottom: 25,
      width: 72,
      height: 72,
      backgroundColor: "#fff",
    },
  });
