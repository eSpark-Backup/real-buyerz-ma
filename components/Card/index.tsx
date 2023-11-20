import React from "react";
import { StyleSheet, Text, View, ViewStyle, TextStyle } from "react-native";
import MyText from "../MyText";

export default function Card({
  style,
  radius = 5,
  children,
}: {
  style?: ViewStyle;
  radius?: number;
  children?: React.ReactNode;
}) {
  return (
    <View style={[styles({ radius }).cardStyle, { ...style }]}>{children}</View>
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

const styles = ({ radius }: { radius?: number }) =>
  StyleSheet.create({
    cardStyle: {
      minHeight: 10,
      width: "100%",
      backgroundColor: "#fff",
      borderRadius: radius,
      borderWidth: 1,
      borderColor: "#E4E4E4",
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
