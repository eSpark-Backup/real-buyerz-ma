import React from "react";
import { StyleSheet, Text, TextStyle, TextProps } from "react-native";

import { MyTextProps } from "../../types";

export default function MyText({
  text,
  children,
  textColor,
  weight,
  size,
  style,
}: MyTextProps & TextProps) {
  const textStyle: TextStyle = {
    color: textColor,
    fontWeight: weight || "normal",
    fontSize: size || 14,
  };

  return (
    <Text style={[styles.plain, textStyle, style]}>{children || text}</Text>
  );
}

const styles = StyleSheet.create({
  plain: {
    fontFamily: "Inter",
  },
});
