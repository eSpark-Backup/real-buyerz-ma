import React from "react";
import {
  TouchableOpacity,
  TextStyle,
  ViewStyle,
  Appearance,
} from "react-native";

import MyText from "../MyText";
import { MyButtonProps, MyTheme } from "@types";
import { DarkTheme, LightTheme } from "@theme";

const colorScheme = Appearance.getColorScheme();
const theme = colorScheme === "dark" ? DarkTheme : LightTheme;

export default function MyButton({
  label,
  onPress,
  textColor,
  backgroundColor,
  style,
  labelStyle,
  leftIcon,
}: MyButtonProps) {
  const buttonStyle: ViewStyle = {
    backgroundColor: backgroundColor || theme.colors.secondary,
    flexDirection: "row",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    ...style,
  };

  const buttonTextStyle: TextStyle = {
    color: textColor || theme.colors.text,
    fontWeight: "500",
    fontSize: 14,
    fontFamily: "Inter",
    ...labelStyle,
  };

  return (
    <TouchableOpacity onPress={onPress} style={[buttonStyle, style]}>
      {leftIcon && leftIcon}
      <MyText text={label} style={buttonTextStyle} />
    </TouchableOpacity>
  );
}
