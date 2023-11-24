import React from "react";
import { StyleSheet, View, ViewStyle } from "react-native";
import { BottomTabHeaderProps } from "@react-navigation/bottom-tabs";
import { Entypo, Feather } from "@expo/vector-icons";

import { PLogo, ProfilePin, RText } from "@assets/images";
import { GapView } from "@components";
import { WINDOW_WIDTH } from "@constants";

interface MyProps {
  showBackIcon?: boolean;
  leftLogo?: boolean;
  showRight?: boolean;
  showProfilePin?: boolean;
}

export default function MyHeader({
  layout,
  options,
  navigation,
  route,
  showBackIcon,
  showRight,
  leftLogo,
  showProfilePin,
}: BottomTabHeaderProps & MyProps) {
  console.log("lay", options.headerStyle);
  const headerStyle = options.headerStyle as ViewStyle;
  return (
    <View style={{ ...styles.container, ...headerStyle }}>
      <View style={styles.left}>
        {showBackIcon && (
          <Feather name="arrow-left" color={"#136FA9"} size={25} />
        )}
        {leftLogo && <PLogo />}
      </View>
      <View style={styles.middle}>
        <RText />
      </View>
      {showRight && (
        <View style={styles.right}>
          {showProfilePin && (
            <>
              <ProfilePin />
            </>
          )}
          <Entypo
            name="dots-three-vertical"
            size={20}
            color={"#136FA9"}
            style={
              showProfilePin ? { marginLeft: 20, backgroundColor: "red" } : {}
            }
          />
          <View />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingHorizontal: 20,
    width: "100%",
    justifyContent: "center",
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
