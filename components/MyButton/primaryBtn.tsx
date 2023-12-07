import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import React from "react";
import MyText from "components/MyText";

interface IPropsBtn {
  title: string;
  onPress?: () => void;
  textColor?: string;
  width: number;
  btnStyle?: ViewStyle;
}

const PrimaryBtn = ({
  title,
  onPress,
  textColor,
  width,
  btnStyle,
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
      <MyText textColor={textColor} size={10} style={{ fontWeight: "600" }}>
        {title}
      </MyText>
    </TouchableOpacity>
  );
};

export default PrimaryBtn;

const styles = StyleSheet.create({});
