import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, View, ViewStyle } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

import MyText from "@components/MyText";
import { MyTheme } from "@types";

export default function MyTopFilter({
  style,
  theme,
  onPressFilter,
  onReset,
  applied=false
}: {
  style?: ViewStyle;
  theme: MyTheme;
  onPressFilter: () => void;
  onReset?: () => void,
  applied?: boolean
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
        {applied && <View style={{height: 10, width: 10, position: 'absolute', top: -3, left:  -3, backgroundColor: theme.colors.primary, borderRadius: 100}} />}
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
        onPress={onReset}
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
