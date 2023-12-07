import React from "react";
import { StyleSheet, View, ViewStyle } from "react-native";

import {
  NativeStackHeaderProps,
  NativeStackNavigationOptions,
} from "@react-navigation/native-stack";

import { Entypo, Feather } from "@expo/vector-icons";
import { router } from "expo-router";

import { PLogo, ProfilePin, RText } from "@assets/images";

interface MyProps {
  showBackIcon?: boolean;
  leftLogo?: boolean;
  showRight?: boolean;
  showProfilePin?: boolean;
  hideCenter?: boolean;
  type?: string;
}

type HeaderProps = NativeStackHeaderProps &
  NativeStackNavigationOptions &
  MyProps;

export default function MyHeader({
  options,
  navigation,
  route,
  showBackIcon,
  showRight,
  leftLogo,
  showProfilePin,
  hideCenter,
}: HeaderProps) {
  console.log("lay", options.headerStyle);
  const headerStyle = options.headerStyle as ViewStyle;
  return (
    <View style={{ ...styles.container, ...headerStyle }}>
      <View style={styles.left}>
        {showBackIcon && (
          <Feather
            name="arrow-left"
            color={"#136FA9"}
            size={25}
            onPress={() => router.back()}
          />
        )}
        {leftLogo && <PLogo />}
      </View>
      {!hideCenter && (
        <View style={styles.middle}>
          <RText />
        </View>
      )}
      <View style={styles.right}>
        {showRight && (
          <>
            {showProfilePin && (
              <>
                <ProfilePin />
              </>
            )}
            <>
              <Entypo
                name="dots-three-vertical"
                size={20}
                color={"#136FA9"}
                style={showProfilePin ? { marginLeft: 20 } : {}}
              />
              <View />
            </>
          </>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingHorizontal: 20,
    width: "100%",
    justifyContent: "center",
    height: 60,
    borderBottomColor: "#E4E4E4",
    borderBottomWidth: 1,
  },
  left: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "center",
  },
  middle: {
    alignItems: "center",
    justifyContent: "center",
  },
  right: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
});
