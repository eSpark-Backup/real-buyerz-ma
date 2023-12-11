import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, Appearance } from "react-native";

import MyText from "../MyText";
import { MyCheckboxProps } from "@types";

const MyCheckbox = ({
  label,
  onChange,
  style,
  checkboxStyle,
  ...restProps
}: MyCheckboxProps) => {
  const [checked, setChecked] = useState(false);

  const handlePress = () => {
    setChecked(!checked);
    if (onChange) {
      onChange(!checked);
    }
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      style={[styles.checkboxContainer, style]}
    >
      <View
        style={[styles.checkbox, checkboxStyle, checked && styles.checked]}
      />
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
    backgroundColor: "white",
    borderRadius: 4,
    marginRight: 5,
  },
  checked: {
    backgroundColor: "#136FA9",
  },
});

export default MyCheckbox;
