import React from "react";
import { Text, TextStyle } from "react-native";

import { MyTextProps } from "../../types";

export default function MyText({
  text,
  textColor,
  weight,
  size,
  style,
}: MyTextProps) {
  const getFontFamily = (weight: string) => {
    switch (weight) {
      case "700":
        return "Inter-Bold";
      case "600":
        return "Inter-SemiBold";
      case "500":
        return "Inter-Medium";
      case "400":
        return "Inter-Regular";
      case "300":
        return "Inter-Light";
      default:
        return "Inter-Regular";
    }
  };

  const textStyle: TextStyle = {
    color: textColor,
    fontWeight: weight || "normal",
    fontSize: size || 14,
    fontFamily: weight ? getFontFamily(weight) : "Inter-Regular",
  };

  return <Text style={[textStyle, style]}>{text}</Text>;
}
