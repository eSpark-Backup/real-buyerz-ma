import React, { useState } from "react";
import { TextInput, View, StyleSheet, ViewStyle } from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";

import { MyInputProps, MyTheme } from "@types";

export default function MyInput({
  placeholder,
  password = false,
  onChange,
  text,
  style,
  inputStyle,
  rightIcon,
  placeholderColor,
}: MyInputProps) {
  const [showPassword, setShowPassword] = useState(false);
  const inputContainerStyle: ViewStyle = {
    ...styles.inputContainerStyle,
  };
  const theme = useTheme() as MyTheme;
  return (
    <View style={[inputContainerStyle, style]}>
      <TextInput
        secureTextEntry={password ? (showPassword ? false : true) : false}
        placeholder={placeholder}
        placeholderTextColor={placeholderColor}
        style={[styles.inputStyle, { fontFamily: "Inter-Regular" }, inputStyle]}
        value={text!}
        onChangeText={(val): void => onChange?.(val)}
      />
      {password && (
        <Ionicons
          name={showPassword ? "eye-outline" : "md-eye-off-outline"}
          size={15}
          color={theme.colors.placeholderText}
          onPress={() => setShowPassword(!showPassword)}
        />
      )}
      {rightIcon && (
        <MaterialIcons
          name={rightIcon.name}
          size={rightIcon.size || 15}
          color={rightIcon.color || "grey"}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainerStyle: {
    backgroundColor: "#f3f4f6", //todo: theme edit
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
