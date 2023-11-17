import React from "react";
import {
  TouchableOpacity,
  Text,
  TextStyle,
  ViewStyle,
  Appearance,
} from "react-native";

import { MyButtonProps } from "../../types";
import { DarkTheme, LightTheme } from "../../theme";

const colorScheme = Appearance.getColorScheme();
const theme = colorScheme === "dark" ? DarkTheme : LightTheme;

export default function MyButton({
  label,
  onPress,
  textColor,
  backgroundColor,
  style,
  labelStyle,
}: MyButtonProps) {
  const buttonStyle: ViewStyle = {
    backgroundColor: backgroundColor || theme.colors.secondary,

    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    ...style,
  };

  const buttonTextStyle: TextStyle = {
    color: textColor || theme.colors.text, // Default color or use the provided one
    fontWeight: "500",
    fontSize: 14,
    ...labelStyle,
  };

  return (
    <TouchableOpacity onPress={onPress} style={buttonStyle}>
      <Text style={buttonTextStyle}>{label}</Text>
    </TouchableOpacity>
  );
}
