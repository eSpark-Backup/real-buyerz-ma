import React from "react";
import { TouchableOpacity, TextStyle, ViewStyle } from "react-native";
import { useTheme } from "@react-navigation/native";

import MyText from "../MyText";
import { MyButtonProps, MyTheme } from "@types";
import PrimaryBtn from "./primaryBtn";

export default function MyButton({
  label,
  onPress,
  textColor,
  backgroundColor,
  style,
  labelStyle,
  leftIcon,
}: MyButtonProps) {
  const theme = useTheme() as MyTheme;
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
    <TouchableOpacity
      activeOpacity={1}
      onPress={onPress}
      style={[buttonStyle, style]}
    >
      {leftIcon && leftIcon}
      <MyText text={label} style={buttonTextStyle} />
    </TouchableOpacity>
  );
}

export { PrimaryBtn };
