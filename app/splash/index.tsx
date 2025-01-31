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
import {
  MaterialCommunityIcons,
  Ionicons,
  Feather,
  Octicons,
  Entypo,
  MaterialIcons,
} from "@expo/vector-icons";

import { WINDOW_HEIGHT, WINDOW_WIDTH } from "@constants";
import { customFonts } from "utils/customFonts";
import { customImages } from "utils/customImages";
import {
  checkLoggedInUser,
  getLoggedInUserInfo,
} from "app/auth/utils/authUtils";
import { useDispatch } from "react-redux";
import { setUserData, setUserToken } from "features/user/userSlice";
import { api } from "api";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { SocketProvider } from "@components/SocketProvider";

SplashScreen.preventAutoHideAsync(); //? Disable Auto Hide

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

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);
  const translateY = useRef(new Animated.Value(WINDOW_HEIGHT * 1.5)).current;
  const scale = useRef(new Animated.Value(1)).current;
  const rotate = useRef(new Animated.Value(0)).current;
  const dispatch = useDispatch();
  const [authToken, setAuthToken] = useState<string | null>(null);

  const loadResourcesAsync = async () => {
    try {
      const imageAssets = cacheImages(customImages);
      const customFontAssets = cacheFonts([customFonts]);
      const fontAssets = cacheFonts([
        MaterialCommunityIcons.font,
        Ionicons.font,
        Feather.font,
        Octicons.font,
        Entypo.font,
        MaterialIcons.font,
      ]);

      await Promise.all([...imageAssets, ...fontAssets, ...customFontAssets]);
    } catch (e) {
      console.warn(e);
    } finally {
      setAppIsReady(true);
      SplashScreen.hideAsync();
    }
  };

  const sessionCheckLoggedIn = async () => {
    const isLoggedIn = checkLoggedInUser();
    if (isLoggedIn) {
      const userInfo = getLoggedInUserInfo();
      const actualToken = userInfo?.token
        .replace(/\\+/g, "")
        .replace(/^"|"$/g, "");
      api.setHeader("Authorization", `Bearer ${actualToken}`);
      dispatch(setUserData(userInfo?.user));
      dispatch(setUserToken(userInfo?.token as string));
      setAuthToken(userInfo?.token as string);
      const role =
        userInfo && userInfo.user && userInfo.user.role
          ? userInfo.user.role
          : "user";
      // router.push(`(user)/${role}/home`);
      router.push({
        pathname: "/(user)/[type]/(tabs)/home",
        params: { type: role },
      });
    } else {
      setTimeout(() => {
        router.push("/auth");
      }, 5000);
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
    console.log("Google Configuration Done");
    GoogleSignin.configure({
      webClientId:
        "492548208583-rpi38i7kjp5ml1vnujaak5p82prurde9.apps.googleusercontent.com",
      iosClientId:
        "492548208583-4i851s5dkvcslrb1p9qvntjlna18ebcb.apps.googleusercontent.com",
      offlineAccess: true,
    });
    sessionCheckLoggedIn();
  }, []);

  if (!appIsReady) {
    return null;
  }

  return (
    <SocketProvider authToken={authToken}>
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
    </SocketProvider>
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
    top: WINDOW_WIDTH,
  },
});
