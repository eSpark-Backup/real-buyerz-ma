import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { FontAwesome, Ionicons } from "@expo/vector-icons";

import MyInput from "components/MyInput";

interface SearchBarProps {
  clearIcon?: boolean;
  button?: boolean;
  onPress?: () => void;
  leftIcon?: boolean;
  placeholder?: string;
}

export default function SearchBar({
  clearIcon,
  button,
  onPress,
  leftIcon,
  placeholder,
}: SearchBarProps) {
  return (
    <View
      style={[
        styles.container,
        button
          ? { paddingLeft: 15, justifyContent: "space-between" }
          : { padding: 10, paddingHorizontal: 10 },
      ]}
    >
      {leftIcon && (
        <FontAwesome
          name="search"
          color={"#969696"}
          size={16}
          style={{ marginRight: 10 }}
        />
      )}
      <MyInput
        style={styles.inputContainer}
        inputStyle={styles.inputStyle}
        placeholder={placeholder ? placeholder : "Search"}
      />
      {clearIcon && (
        <Ionicons
          name="close"
          color={"#969696"}
          size={16}
          style={{ marginLeft: 10 }}
        />
      )}
      {button && (
        <TouchableOpacity
          onPress={onPress}
          activeOpacity={1}
          style={{
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: clearIcon ? "#ffffff" : "#fb631c",
            height: "100%",
            width: "14%",
            borderTopRightRadius: 5,
            borderBottomRightRadius: 5,
          }}
        >
          <FontAwesome name="search" color={"#ffffff"} size={16} />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#e7e7e7",
    alignItems: "center",
    justifyContent: "flex-start",
    height: "100%",
    width: "100%",
  },
  inputContainer: {
    backgroundColor: "transparent",
    flexDirection: "row",
    paddingHorizontal: 0,
    borderRadius: 0,
    alignItems: "flex-start",
    elevation: 0,
    width: "85%",
  },
  inputStyle: {
    flex: 1,
    padding: 0,
    fontSize: 14,
    fontWeight: "300",
    fontFamily: "Inter",
  },
});
