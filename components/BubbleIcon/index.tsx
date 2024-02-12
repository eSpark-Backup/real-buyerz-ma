import React, { memo } from "react";
import { StyleSheet, TouchableOpacity, ViewStyle } from "react-native";
import { useTheme } from "@react-navigation/native";

interface Props {
  size?: number;
  children: React.ReactNode;
  style?: ViewStyle;
  plain?: boolean;
  onPress?: () => void;
}

function BubbleIcon({ size = 30, children, style, plain, onPress }: Props) {
  const theme = useTheme();
  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={onPress}
      style={{
        ...styles.container,
        elevation: plain ? 0 : 2,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: plain ? 0 : 0.2,
        shadowRadius: plain ? 0 : 1.41,
        borderColor: theme.colors.border,
        borderWidth: plain ? (!theme.dark ? 1 : 0) : 0,
        backgroundColor: theme.dark
          ? theme.colors.card
          : theme.colors.background,
        width: size,
        height: size,
        ...style,
      }}
    >
      {children}
    </TouchableOpacity>
  );
}

export default memo(BubbleIcon);

const styles = StyleSheet.create({
  container: {
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
  },
});
