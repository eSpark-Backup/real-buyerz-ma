import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, Appearance } from "react-native";
import MyText from "../../components/MyText";
import { MyCheckboxProps } from "../../types";
import { DarkTheme, LightTheme, colors } from "../../theme";

const colorScheme = Appearance.getColorScheme();
const theme = colorScheme === "dark" ? DarkTheme : LightTheme;

const MyCheckbox = ({
  label,
  onChange,
  style,
  checkboxStyle,
  ...restProps // Collect any additional props for TouchableOpacity
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
        <MyText text={label} style={restProps.labelStyle} />
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
    backgroundColor: theme.colors.secondary,
    // "#2e6fac"
  },
});

export default MyCheckbox;
