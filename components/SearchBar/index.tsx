import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

import MyInput from "components/MyInput";

export default function SearchBar() {
  return (
    <View style={styles.container}>
      <MyInput
        style={styles.inputContainer}
        inputStyle={styles.inputStyle}
        placeholder="Search"
      />
      <FontAwesome name="search" color={"#136fa9"} size={16} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#e7e7e7",
    padding: 10,
    paddingHorizontal: 25,
    alignItems: "center",
    justifyContent: "center",
  },
  inputContainer: {
    backgroundColor: "transparent",
    flexDirection: "row",
    paddingHorizontal: 0,
    borderRadius: 0,
    alignItems: "flex-start",
    elevation: 0,
  },
  inputStyle: {
    flex: 1,
    padding: 0,
    fontSize: 14,
    fontWeight: "300",
    fontFamily: "Inter",
  },
});
