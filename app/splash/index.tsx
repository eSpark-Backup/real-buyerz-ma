import React, { useEffect } from "react";
import { StyleSheet, ImageBackground } from "react-native";
import { router } from "expo-router";

export default function App() {
  useEffect(() => {
    setTimeout(() => {
      router.push("/auth");
    }, 3000);
  }, []);

  return (
    <ImageBackground
      source={require("../../assets/images/splash_screen.png")}
      style={{ height: "100%", width: "100%" }}
      resizeMode="cover"
    />
  );
}

const styles = StyleSheet.create({});
