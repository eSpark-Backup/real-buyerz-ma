import React, { useEffect, useRef } from "react";
import {
  StatusBar,
  View,
  Animated,
  Easing,
  StyleSheet,
  BackHandler,
} from "react-native";
import { Slot } from "expo-router";

import { SCREEN_HEIGHT, WINDOW_HEIGHT } from "../../constants";

export default function AuthLayout() {
  const translateX = useRef(new Animated.Value(0)).current;
  const opacity = useRef(new Animated.Value(0.5)).current;

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 0.2,
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
      console.log("helo");
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

  return (
    <View
      style={{
        flex: 1,
      }}
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
        source={require("../../assets/images/bg_wide.png")}
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
          marginTop: StatusBar.currentHeight,
          flex: 1,
          zIndex: 1,
        }}
      >
        <Slot />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    resizeMode: "cover", // or 'stretch' or 'contain'
    position: "absolute",
    width: "200%",
    height: SCREEN_HEIGHT,
    zIndex: -1,
  },
});
