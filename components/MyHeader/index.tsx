import React from "react";
import { ImageStyle, StyleSheet, Text, View, ViewStyle } from "react-native";
import { BottomTabHeaderProps } from "@react-navigation/bottom-tabs";
import { Entypo, Feather } from "@expo/vector-icons";

import { PLogo, ProfilePin, RText } from "@assets/images";
import { GapView } from "@components";

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
              {/* <GapView mode="horizontal" /> */}
            </>
          )}
          <Entypo
            name="dots-three-vertical"
            size={20}
            color={"#136FA9"}
            style={!showProfilePin ? { marginLeft: 40 } : {}}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    // backgroundColor: "yellow",
  },
  left: {
    flex: 2,
    alignItems: "flex-start",
    left: 20,
    justifyContent: "center",
    // backgroundColor: "red",
  },
  middle: {
    flex: 5,
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor: "teal",
  },
  right: {
    flex: 2,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor: "orange",
  },
});
