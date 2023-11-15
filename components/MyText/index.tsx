import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TextStyle } from "react-native";
import { MyTextProps } from "../../types";
// import * as Font from "expo-font";

// let customFonts = {
//   "Inter-Bold": require("../../assets/fonts/Inter-Bold.ttf"),
//   "Inter-SemiBold": require("../../assets/fonts/Inter-SemiBold.ttf"),
//   "Inter-Medium": require("../../assets/fonts/Inter-Medium.ttf"),
//   "Inter-Regular": require("../../assets/fonts/Inter-Regular.ttf"),
//   "Inter-Light": require("../../assets/fonts/Inter-Light.ttf"),
// };

export default function MyText({
  text,
  textColor,
  weight,
  size,
  style,
}: MyTextProps) {
  // const getFontFamily = (weight: string) => {
  //   switch (weight) {
  //     case "700":
  //       return "Inter-Bold";
  //     case "600":
  //       return "Inter-SemiBold";
  //     case "500":
  //       return "Inter-Medium";
  //     case "400":
  //       return "Inter-Regular";
  //     case "300":
  //       return "Inter-Light";
  //     default:
  //       return "Inter-Regular";
  //   }
  // };

  const textStyle: TextStyle = {
    color: textColor,
    fontWeight: weight || "normal",
    fontSize: size || 14,
    // fontFamily: weight ? getFontFamily(weight) : "Inter-Regular",
  };

  return <Text style={[styles.plain, textStyle, style]}>{text}</Text>;
}

const styles = StyleSheet.create({
  plain: {
    fontFamily: "Inter",
  },
});
