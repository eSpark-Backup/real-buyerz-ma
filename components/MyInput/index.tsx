import React, { useState } from "react";
import { TextInput, View, StyleSheet, ViewStyle, Platform } from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";

import { MyInputProps, MyTheme } from "@types";

export default function MyInput({
  multiline,
  placeholder,
  password = false,
  onChange,
  text,
  style,
  inputStyle,
  rightIcon,
  placeholderColor,
  keyboardType,
  editable = true,
}: MyInputProps) {
  const [showPassword, setShowPassword] = useState(false);
  const inputContainerStyle: ViewStyle = {
    ...styles.inputContainerStyle,
  };

  const theme = useTheme() as MyTheme;
  return (
    <View
      style={[
        {
          backgroundColor: theme.colors.inputBg,
          paddingVertical: Platform.OS == "ios" ? (multiline ? 5 : 12) : 6,
        },
        inputContainerStyle,
        style,
      ]}
    >
      <TextInput
        multiline={multiline}
        secureTextEntry={password ? (showPassword ? false : true) : false}
        placeholder={placeholder}
        placeholderTextColor={placeholderColor}
        editable={editable} 
        style={[
          styles.inputStyle,
          { fontFamily: "Inter-Regular" },
          inputStyle,
          { textAlignVertical: multiline ? "top" : "center" },
        ]}
        value={text!}
        onChangeText={(val): void => onChange?.(val)}
        keyboardType={keyboardType ? keyboardType : "default"}
      />
      {password && (
        <Ionicons
          name={showPassword ? "eye-outline" : "eye-off-outline"}
          size={15}
          style={{ alignSelf: "center" }}
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
    flex: 1,
    flexDirection: "row",
    paddingHorizontal: 8,
    borderRadius: 5,
    elevation: 3,
  },
  inputStyle: {
    flex: 1,
    height: "100%",
    alignSelf: "flex-start",
  },
});
