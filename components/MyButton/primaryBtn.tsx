import { StyleSheet, TouchableOpacity } from "react-native";
import React from "react";

import MyText from "../MyText";
import { useTheme } from "@react-navigation/native";
import { IPropsBtn, MyTheme } from "@types";

const PrimaryBtn = ({
  title,
  onPress,
  textColor,
  width,
  btnStyle,
  labelStyle,
  weight,
  paddingV,
  children,
}: IPropsBtn) => {
  const theme = useTheme() as MyTheme;
  return (
    <TouchableOpacity
      activeOpacity={1}
      style={[
        {
          backgroundColor: theme.colors.primary,
          alignItems: "center",
          justifyContent: "center",
          paddingVertical: paddingV ? paddingV : 7,
          paddingHorizontal: 10,
          borderRadius: 3,
          width: width,
        },
        btnStyle,
      ]}
      onPress={onPress}
    >
      {children && children}
      <MyText
        textColor={textColor ? textColor : "#ffffff"}
        size={10}
        weight={weight}
        style={labelStyle}
      >
        {title}
      </MyText>
    </TouchableOpacity>
  );
};

export default PrimaryBtn;
