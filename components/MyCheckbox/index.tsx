import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, Appearance } from "react-native";
import { Feather } from "@expo/vector-icons";

import MyText from "../MyText";
import { MyCheckboxProps, MyTheme } from "@types";
import { useTheme } from "@react-navigation/native";

const MyCheckbox = ({
  label,
  onChange,
  style,
  checkboxStyle,
  ...restProps
}: MyCheckboxProps) => {
  const theme = useTheme() as MyTheme;
  const [checked, setChecked] = useState(false);

  const handlePress = () => {
    setChecked(!checked);
    if (onChange) {
      onChange(!checked);
    }
  };

  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={handlePress}
      style={[styles.checkboxContainer, style]}
    >
      <View
        style={[
          styles.checkbox,
          checkboxStyle,
          checked && styles.checked,
          {
            backgroundColor: theme.dark
              ? theme.colors.verificationBg
              : theme.colors.positive,
          },
        ]}
      >
        {checked && <Feather name="check" size={12} color="#ffffff" />}
      </View>
      <View>
        <MyText text={label} style={restProps.labelStyle} weight="300" />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  checkbox: {
    width: 15,
    height: 15,
    borderWidth: 1,
    borderColor: "#b5b7b9",
    borderRadius: 4,
    marginRight: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  checked: {
    backgroundColor: "#136FA9",
  },
});

export default MyCheckbox;
