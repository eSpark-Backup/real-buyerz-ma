import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, View, ViewStyle } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

import MyText from "@components/MyText";
import { MyTheme } from "@types";

export default function MyTopFilter({
  style,
  theme,
  onPressFilter,
}: {
  style?: ViewStyle;
  theme: MyTheme;
  onPressFilter: () => void;
}) {
  return (
    <View style={{ ...styles.top_filter, ...style }}>
      <TouchableOpacity
        activeOpacity={1}
        onPress={onPressFilter}
        style={{
          backgroundColor: theme.colors.secondary,
          height: "100%",
          alignItems: "center",
          justifyContent: "center",
          paddingHorizontal: 8,
          borderRadius: 5,
        }}
      >
        <FontAwesome
          name="filter"
          size={20}
          color="#ffffff"
          style={{ transform: [{ rotateY: "180deg" }] }}
        />
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={1}
        style={{
          paddingHorizontal: 13,
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
          borderWidth: 1,
          borderRadius: 4,
          marginLeft: 5,
          borderColor: theme.colors.secondary,
        }}
      >
        <MyText text="Reset" textColor={theme.colors.secondary} size={14} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  top_filter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    height: 35,
  },
});
