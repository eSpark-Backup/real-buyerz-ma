import React, { useEffect, useRef } from "react";
import {
  StyleSheet,
  ImageBackground,
  Text,
  Image,
  Animated,
} from "react-native";
import { router } from "expo-router";

export default function App() {
  const translateY = useRef(new Animated.Value(1000)).current;
  const scale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.timing(translateY, {
      toValue: 0,
      duration: 1000, // Animation duration in milliseconds
      useNativeDriver: true,
    }).start(() => {
      // Animation completed, start the next phase
      Animated.parallel([
        Animated.timing(translateY, {
          toValue: -200, // Move the image further up
          delay: 500,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(scale, {
          toValue: 0.8, // Reduce the width and height
          delay: 500,
          duration: 500,
          useNativeDriver: true,
        }),
      ]).start();
    });
  }, [translateY, scale]);

  useEffect(() => {
    // setTimeout(() => {
    //   router.push("/auth");
    // }, 3000);
  }, []);

  return (
    <ImageBackground
      source={require("../../assets/splash.png")}
      style={styles.background}
      resizeMode="cover"
    >
      <Animated.Image
        source={require("../../assets/images/RB_Logo.png")}
        style={[styles.logo_l, { transform: [{ translateY }, { scale }] }]}
      />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    height: "100%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  logo_l: {
    height: 195,
    width: 314.68,
  },
  logo_s: {
    height: 151.82,
    width: 245,
  },
});
