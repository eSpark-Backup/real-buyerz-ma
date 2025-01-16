import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";

import MyInput from "../MyInput";
import { MyTheme } from "@types";

interface SearchBarProps {
  clearIcon?: boolean;
  button?: boolean;
  onPress?: () => void;
  onValueChange?: (value: string) => void;
  leftIcon?: boolean;
  placeholder?: string;
  searchBtnColor?: string;
}

export default function SearchBar({
  clearIcon,
  button,
  onPress,
  leftIcon,
  onValueChange,
  placeholder,
  searchBtnColor = "#fb631c",
}: SearchBarProps) {
  const theme = useTheme() as MyTheme;

  const [searchText, setSearchText] = useState<string>("");

  const handleValueChange = (text: string) => {
    console.log("coming here " + text);
    setSearchText(text);
    onValueChange?.(text);
  };

  return (
    <View
      style={[
        styles(theme).container,
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
        style={styles(theme).inputContainer}
        inputStyle={styles(theme).inputStyle}
        placeholder={placeholder ? placeholder : "Search"}
        placeholderColor={theme.colors.placeholderText}
        value={searchText}
        onChange={handleValueChange}
      />
      {clearIcon && (
        <TouchableOpacity onPress={() => handleValueChange("")}>
          <Ionicons
            name="close"
            color={"#969696"}
            size={16}
            style={{ marginLeft: 10 }}
          />
        </TouchableOpacity>
      )}
      {button && (
        <TouchableOpacity
          onPress={() => {
            onPress?.();
            console.log("Search text:", searchText);
          }}
          activeOpacity={1}
          style={{
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: clearIcon ? "#ffffff" : searchBtnColor,
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

const styles = (theme?: MyTheme) =>
  StyleSheet.create({
    container: {
      flexDirection: "row",
      borderWidth: 1,
      borderRadius: 5,
      borderColor: theme?.colors.border,
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
      height: "100%",
      padding: 0,
      fontSize: 14,
      fontWeight: "300",
      fontFamily: "Inter",
      color: theme?.colors.placeholderText,
    },
  });
