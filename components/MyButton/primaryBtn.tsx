import {
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import React from "react";

import MyText from "../MyText";

interface IPropsBtn {
  title: string;
  onPress?: () => void;
  textColor?: string;
  width?: any;
  btnStyle?: ViewStyle;
  labelStyle?: TextStyle;
  weight?:
    | "normal"
    | "bold"
    | "100"
    | "200"
    | "300"
    | "400"
    | "500"
    | "600"
    | "700"
    | "800"
    | "900";
}

const PrimaryBtn = ({
  title,
  onPress,
  textColor,
  width,
  btnStyle,
  labelStyle,
  weight,
}: IPropsBtn) => {
  return (
    <TouchableOpacity
      style={[
        {
          backgroundColor: "#FF631C",
          alignItems: "center",
          justifyContent: "center",
          paddingVertical: 7,
          paddingHorizontal: 10,
          borderRadius: 3,
          width: width,
        },
        btnStyle,
      ]}
      onPress={() => console.log("asd")}
    >
      <MyText
        textColor={textColor}
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

const styles = StyleSheet.create({});
