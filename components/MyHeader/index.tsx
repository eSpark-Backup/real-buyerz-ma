import React from "react";
import { StyleSheet, View, ViewStyle } from "react-native";

import { NativeStackHeaderProps } from "@react-navigation/native-stack";
import { BottomTabHeaderProps } from "@react-navigation/bottom-tabs";
import { Entypo, Feather } from "@expo/vector-icons";
import { router } from "expo-router";

import { PLogo, ProfilePin, RText } from "@assets/images";
import { MyTheme } from "@types";
import { useTheme } from "@react-navigation/native";

interface MyProps {
  showBackIcon?: boolean;
  leftLogo?: boolean;
  showRight?: boolean;
  showProfilePin?: boolean;
  hideCenter?: boolean;
  type?: string;
  theme?: MyTheme;
}

type HeaderProps = (NativeStackHeaderProps | BottomTabHeaderProps) & MyProps;

export default function MyHeader({
  options,
  navigation,
  route,
  showBackIcon,
  showRight,
  leftLogo,
  showProfilePin,
  hideCenter,
  theme,
}: HeaderProps & MyProps) {
  const headerStyle = options.headerStyle as ViewStyle;
  return (
    <View style={{ ...styles(theme).container, ...headerStyle }}>
      <View style={styles(theme).left}>
        {showBackIcon && (
          <Feather
            name="arrow-left"
            color={theme?.colors.secondary}
            size={25}
            onPress={() => router.back()}
          />
        )}
        {leftLogo && <PLogo />}
      </View>
      {!hideCenter && (
        <View style={styles(theme).middle}>
          <RText />
        </View>
      )}
      <View style={styles(theme).right}>
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
                color={theme?.colors.secondary}
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

const styles = (theme?: MyTheme) =>
  StyleSheet.create({
    container: {
      flexDirection: "row",
      paddingHorizontal: 20,
      width: "100%",
      justifyContent: "center",
      height: 60,
      borderBottomColor: theme?.colors.border,
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
