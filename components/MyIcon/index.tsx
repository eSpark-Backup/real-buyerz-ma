import React from "react";
import { Image, ImageStyle, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons"; // Import the appropriate icon library
import { MyIconProps } from "../../types";

export default function MyIcon({
  name,
  source,
  iconSize,
  iconColor,
  style,
  ...iconProps
}: MyIconProps) {
  if (name) {
    return (
      <Ionicons
        name={name}
        size={iconSize || 20}
        color={iconColor || "black"}
        style={[styles.icon, style]}
        {...iconProps}
      />
    );
  } else if (source) {
    const imageStyle: ImageStyle = {
      width: iconSize || 20,
      height: iconSize || 20,
    };

    return <Image source={source} style={[styles.image, imageStyle, style]} />;
  } else {
    return null; // Return null if neither name nor source is provided
  }
}

const styles = StyleSheet.create({
  icon: {
    // Add any default styles for icons here
  },
  image: {
    // Add any default styles for images here
  },
});
