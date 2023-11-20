import { StyleSheet, Text, View } from "react-native";
import React from "react";

import { MyAppBar } from "../../../../components";
export default function Home() {
  return (
    <View style={styles.wrapper}>
      <MyAppBar />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
});
