import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ViewStyle,
  TextStyle,
  Pressable,
} from "react-native";

import MyText from "../MyText";
import { MyTheme } from "@types";
import { useTheme } from "@react-navigation/native";

export default function Card({
  style,
  radius = 5,
  children,
  plain,
  onPress,
}: {
  style?: ViewStyle;
  radius?: number;
  children?: React.ReactNode;
  plain?: boolean;
  onPress?: () => void;
}) {
  const theme = useTheme() as MyTheme;
  return (
    <Pressable
      style={[styles({ radius, theme, plain }).cardStyle, { ...style }]}
      onPress={onPress}
    >
      {children}
    </Pressable>
  );
}

function Title({
  children,
  style,
  titleStyle,
  weight,
}: {
  children: React.ReactNode;
  style?: ViewStyle;
  titleStyle?: TextStyle;
  weight?: TextStyle["fontWeight"];
}) {
  const theme = useTheme() as MyTheme;
  return (
    <View style={[{ paddingVertical: 15 }, style]}>
      <MyText weight={weight} style={[styles({ theme }).textStyle, titleStyle]}>
        {children}
      </MyText>
    </View>
  );
}

function Divider({
  thickness = 1,
  color,
  style,
}: {
  thickness?: number;
  color?: string;
  style?: ViewStyle;
}) {
  const theme = useTheme() as MyTheme;
  return (
    <View
      style={[
        {
          width: "100%",
          height: thickness,
          backgroundColor: color ? color : theme.colors.border,
        },
        style,
      ]}
    />
  );
}

Card.Title = Title;
Card.Divider = Divider;

const styles = ({
  radius,
  theme,
  plain,
}: {
  radius?: number;
  theme?: MyTheme;
  plain?: boolean;
}) => {
  const shadow = !plain
    ? {
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.18,
        shadowRadius: 1.0,
        elevation: 1,
      }
    : {};
  return StyleSheet.create({
    cardStyle: {
      minHeight: 10,
      width: "100%",
      backgroundColor: theme?.colors.cardBg,
      borderRadius: radius,
      borderWidth: 1,
      borderColor: theme?.colors.cardBorder,
      ...shadow,
    },
    textStyle: {
      fontWeight: "500",
      fontSize: 16,
      textAlign: "center",
      color: theme?.colors.negative,
    },
  });
};
