import React from "react";
import { ImageBackground, StatusBar, View } from "react-native";
import { Slot } from "expo-router";

export default function AuthLayout() {
  return (
    <ImageBackground
      source={require("../../assets/images/background.png")}
      style={{ height: "100%", width: "100%" }}
      resizeMode="cover"
    >
      <View style={{ marginTop: StatusBar.currentHeight }}>
        <Slot />
      </View>
    </ImageBackground>
  );
}
