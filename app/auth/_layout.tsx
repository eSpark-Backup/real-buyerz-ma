import React, { useEffect, useRef } from "react";
import { View, Animated, Easing, StyleSheet, BackHandler } from "react-native";
import { Slot } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";

import { SCREEN_HEIGHT } from "@constants";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function AuthLayout() {
  const translateX = useRef(new Animated.Value(0)).current;
  const opacity = useRef(new Animated.Value(0.5)).current;
  const insets = useSafeAreaInsets();

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
      easing: Easing.linear,
    }).start();
    
    const slideAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(translateX, {
          toValue: -390, // Slide to the left
          duration: 15000,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.timing(translateX, {
          toValue: 0, // Slide back to the right
          duration: 15000,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
      ])
    );
    slideAnimation.start();

    return () => {
      slideAnimation.stop();
    };
  }, [translateX]);

  useEffect(() => {
    const backAction = () => {
      BackHandler.exitApp();
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <LinearGradient
        style={{ flex: 1 }}
        // Background Linear Gradient
        colors={["rgba(255,255,255,0.48)", "rgba(12,12,12,0.47)"]}
      >
        <Animated.View
          style={{
            backgroundColor: "#000000",
            opacity: opacity,
            position: "absolute",
            height: SCREEN_HEIGHT,
            width: "100%",
          }}
        />
        <Animated.Image
          source={require("@assets/images/png/bg_wide.png")}
          style={[
            styles.backgroundImage,
            {
              transform: [{ translateX }], //? 0 to -390 range
            },
          ]}
          resizeMode="cover"
        />
        <View
          style={{
            marginTop: insets.top,
            flex: 1,
            zIndex: 1,
          }}
        >
          <Slot />
        </View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    resizeMode: "cover", // or 'stretch' or 'contain'
    position: "absolute",
    width: "200%",
    height: "140%",
    zIndex: -1,
  },
});
