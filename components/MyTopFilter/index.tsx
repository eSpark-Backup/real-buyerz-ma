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
          padding: 6,
          paddingHorizontal: 8,
          borderRadius: 5,
        }}
      >
        <FontAwesome
          name="filter"
          size={18}
          color="#ffffff"
          style={{ transform: [{ rotateY: "180deg" }] }}
        />
      </TouchableOpacity>
      <MyText
        text="Reset"
        textColor={theme.colors.secondary}
        size={14}
        style={{ marginLeft: 10, textDecorationLine: "underline" }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  top_filter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
});
