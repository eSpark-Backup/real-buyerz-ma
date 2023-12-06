import React from "react";
import { StyleSheet, View, ViewStyle } from "react-native";
import { BottomTabHeaderProps } from "@react-navigation/bottom-tabs";
import { Entypo, Feather } from "@expo/vector-icons";
import { router } from "expo-router";

import { PLogo, ProfilePin, RText } from "@assets/images";

interface MyProps {
  showBackIcon?: boolean;
  leftLogo?: boolean;
  showRight?: boolean;
  showProfilePin?: boolean;
  hideCenter?: boolean;
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
  hideCenter,
}: BottomTabHeaderProps & MyProps) {
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
