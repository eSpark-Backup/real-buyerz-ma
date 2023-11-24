import React, { useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  ImageBackground,
  Image,
  Animated,
  Easing,
} from "react-native";
import { SplashScreen, router } from "expo-router";
import * as Font from "expo-font";
import { Asset } from "expo-asset";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";

import { WINDOW_HEIGHT, WINDOW_WIDTH } from "@constants";
import { customFonts } from "utils/customFonts";
import { customImages } from "utils/customImages";

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);
  const translateY = useRef(new Animated.Value(WINDOW_HEIGHT * 1.5)).current;
  const scale = useRef(new Animated.Value(1)).current;
  const rotate = useRef(new Animated.Value(0)).current;

  const cacheImages = (images: any[]) => {
    return images.map((image) => {
      if (typeof image === "string") {
        return Image.prefetch(image);
      } else {
        return Asset.fromModule(image).downloadAsync();
      }
    });
  };

  const cacheFonts = (fonts: any[]) => {
    return fonts.map((font) => Font.loadAsync(font));
  };

  const loadResourcesAsync = async () => {
    try {
      SplashScreen.preventAutoHideAsync();

      const imageAssets = cacheImages(customImages);
      const customFontAssets = cacheFonts([customFonts]);
      const fontAssets = cacheFonts([
        MaterialCommunityIcons.font,
        Ionicons.font,
      ]);

      await Promise.all([...imageAssets, ...fontAssets, ...customFontAssets]);
    } catch (e) {
      console.warn(e);
    } finally {
      setAppIsReady(true);
      SplashScreen.hideAsync();
    }
  };

  useEffect(() => {
    loadResourcesAsync();
  }, []);

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

  if (!appIsReady) {
    return null;
  }

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
