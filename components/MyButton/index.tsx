import { MyButtonProps } from "../../types";
import React from "react";
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  TextStyle,
  ViewStyle,
} from "react-native";
import { DarkTheme, LightTheme, colors } from "../../theme";
import { Appearance } from "react-native";

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

const styles = StyleSheet.create({
  // Add any specific styles for MyButton if needed
});

// const colors = {
//     light: {
//       primary: "#FB631C",
//       secondary: "#136FA9",
//       background: "#FFFFFF",
//       card: "#f5f6fa",
//       text: "#333333",
//       border: "#E9E9E9",
//       notification: "#FFFFFF", //todo: set later
//     },
//     dark: {
//       primary: "#FB631C",
//       secondary: "#136FA9",
//       background: "#101010",
//       card: "#1A1B1C",
//       text: "#FFFFFF",
//       border: "#29292E",
//       notification: "#FFFFFF", //todo: set later
//     },
//   };
