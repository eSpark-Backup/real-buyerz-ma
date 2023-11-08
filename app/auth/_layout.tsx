import React from "react";
import { ImageBackground } from "react-native";
import { Slot } from "expo-router";

export default function AuthLayout() {
  return (
    <ImageBackground
      source={require("../../assets/images/background.png")}
      style={{ height: "100%", width: "100%" }}
      resizeMode="cover"
    >
      <Slot />
    </ImageBackground>
  );
}
