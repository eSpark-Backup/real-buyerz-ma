import React from "react";
import { StyleSheet, View, ViewStyle } from "react-native";
import { NativeStackHeaderProps } from "@react-navigation/native-stack";
import { BottomTabHeaderProps } from "@react-navigation/bottom-tabs";
import { router } from "expo-router";

import { Head_Back, Head_Logo, Head_Menu, Head_Search } from "@assets/images";
import { MyTheme } from "@types";
import BubbleIcon from "@components/BubbleIcon";
import { DrawerActions } from "@react-navigation/native";
import { DrawerHeaderProps } from "@react-navigation/drawer";
import MyText from "@components/MyText";

interface MyProps {
  showBackIcon?: boolean;
  leftLogo?: boolean;
  showRight?: boolean;
  showProfilePin?: boolean;
  hideCenter?: boolean;
  type?: string;
  theme?: MyTheme;
  title?: string;
}

type HeaderProps = (
  | NativeStackHeaderProps
  | BottomTabHeaderProps
  | DrawerHeaderProps
) &
  MyProps;

export default function MyHeader({
  options,
  navigation,
  route,
  title,
  showBackIcon,
  showRight,
  hideCenter,
  theme,
}: HeaderProps & MyProps) {
  const headerStyle = options.headerStyle as ViewStyle;
  return (
    <View style={{ ...styles(theme).container, ...headerStyle }}>
      <View style={styles(theme).left}>
        <BubbleIcon
          onPress={() =>
            showBackIcon
              ? router.back()
              : navigation.dispatch(DrawerActions.openDrawer())
          }
          plain
          size={40}
        >
          {showBackIcon ? <Head_Back /> : <Head_Menu />}
        </BubbleIcon>
      </View>
      {title && (
        <View style={styles(theme).middle}>
          <MyText
            text={title}
            weight="700"
            size={22}
            textColor={theme?.colors.secondary}
          />
        </View>
      )}
      {!hideCenter && (
        <View style={styles(theme).middle}>
          <Head_Logo />
        </View>
      )}
      <View style={styles(theme).right}>
        {showRight && (
          <BubbleIcon
            plain
            size={40}
            onPress={() => router.push("/(user)/anon/search")}
          >
            <Head_Search />
          </BubbleIcon>
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
