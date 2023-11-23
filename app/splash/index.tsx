import React, { useEffect, useRef } from "react";
import {
  StyleSheet,
  ImageBackground,
  Text,
  Image,
  Animated,
  Easing,
} from "react-native";
import { router } from "expo-router";

import { customImages } from "../../utils/customImages";
import { WINDOW_HEIGHT, WINDOW_WIDTH } from "@constants";

export default function App() {
  const translateY = useRef(new Animated.Value(WINDOW_HEIGHT * 1.5)).current;
  const scale = useRef(new Animated.Value(1)).current;
  const rotate = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const rotationAnimation = Animated.loop(
      Animated.timing(rotate, {
        toValue: 1,
        duration: 1000, // Rotation duration in milliseconds
        easing: Easing.linear,
        useNativeDriver: true,
      })
    );
    rotationAnimation.start();

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
    return () => {
      rotationAnimation.stop();
    };
  }, [translateY, scale]);

  useEffect(() => {
    setTimeout(() => {
      router.push("/auth");
    }, 3000);
  }, []);

  return (
    <ImageBackground
      source={require("@assets/images/png/background.png")}
      style={styles.background}
      resizeMode="cover"
    >
      <Animated.Image
        source={require("@assets/images/png/RB_Logo.png")}
        style={[styles.logo, { transform: [{ translateY }, { scale }] }]}
      />
      <Animated.Image
        source={require("@assets/images/png/loader_white.png")}
        style={[
          styles.loader,
          {
            transform: [
              { translateY },
              {
                rotate: rotate.interpolate({
                  inputRange: [0, 1],
                  outputRange: ["360deg", "0deg"],
                }),
              },
            ],
          },
        ]}
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
  logo: {
    height: 195,
    width: 314.68,
  },
  loader: {
    height: 56.15,
    width: 56.15,
    top: WINDOW_WIDTH / 1.1,
  },
});
