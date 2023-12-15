import React from "react";
import { StyleSheet, Text, View, ViewStyle, TextStyle } from "react-native";

import MyText from "../MyText";
import { MyTheme } from "@types";
import { useTheme } from "@react-navigation/native";

export default function Card({
  style,
  radius = 5,
  children,
}: {
  style?: ViewStyle;
  radius?: number;
  children?: React.ReactNode;
}) {
  const theme = useTheme() as MyTheme;
  return (
    <View style={[styles({ radius, theme }).cardStyle, { ...style }]}>
      {children}
    </View>
  );
}

function Title({
  children,
  style,
  titleStyle,
}: {
  children: React.ReactNode;
  style?: ViewStyle;
  titleStyle?: TextStyle;
}) {
  return (
    <View style={[{ paddingVertical: 15 }, style]}>
      <MyText style={[styles({}).textStyle, titleStyle]}>{children}</MyText>
    </View>
  );
}

function Divider({
  thickness = 1,
  color = "rgba(233, 233, 233, 1)",
  style,
}: {
  thickness?: number;
  color?: string;
  style?: ViewStyle;
}) {
  return (
    <View
      style={[
        { width: "100%", height: thickness, backgroundColor: color },
        style,
      ]}
    />
  );
}

Card.Title = Title;
Card.Divider = Divider;

const styles = ({ radius, theme }: { radius?: number; theme?: MyTheme }) =>
  StyleSheet.create({
    cardStyle: {
      minHeight: 10,
      width: "100%",
      backgroundColor: theme?.colors.cardBg,
      borderRadius: radius,
      borderWidth: 1,
      borderColor: theme?.colors.cardBorder,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.18,
      shadowRadius: 1.0,

      elevation: 1,
    },
    textStyle: {
      fontWeight: "500",
      fontSize: 16,
      textAlign: "center",
      color: "#000000",
    },
  });
