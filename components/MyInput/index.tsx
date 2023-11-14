import React, { useState } from "react";
import { TextInput, View, StyleSheet, ViewStyle } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { MyInputProps } from "../../types";
import { useTheme } from "@react-navigation/native";
import MyText from "../MyText";
import { MyTheme } from "../../types";

export default function MyInput({
  label,
  placeholder,
  password = false,
  onChange,
  text,
  style,
}: MyInputProps) {
  const [showPassword, setShowPassword] = useState(false);
  const inputContainerStyle: ViewStyle = {
    ...styles.inputContainerStyle,
  };

  return (
    <View style={[styles.inputContainerStyle, style, inputContainerStyle]}>
      {/* {label && <MyText text={label} textColor="grey"/> } */}
      <TextInput
        secureTextEntry={password ? (showPassword ? false : true) : false}
        placeholder={placeholder}
        style={styles.inputStyle}
        value={text!}
        onChangeText={(val): void => onChange?.(val)}
      />
      {password && (
        <Ionicons
          name={showPassword ? "eye-outline" : "md-eye-off-outline"}
          size={24}
          color="grey"
          onPress={() => setShowPassword(!showPassword)}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainerStyle: {
    marginVertical: 1,
    backgroundColor: "#f3f4f6",

    flexDirection: "row",
    paddingHorizontal: 10,
    borderRadius: 5,
    alignItems: "center",
    elevation: 3,
  },
  inputStyle: {
    flex: 1,
    padding: 10,
  },
});
