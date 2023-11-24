import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { Card, GapView } from "@components";

export default function Search() {
  return (
    <View style={styles.container}>
      <View style={styles.searchBar}></View>
      <GapView length={40} />
      <View style={styles.purpose}></View>
      <GapView length={30} />
      <Card.Divider />
      <GapView length={30} />
      <View style={styles.city}></View>
      <GapView length={30} />
      <View style={styles.genre}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 14,
    alignItems: "center",
  },
  searchBar: {},
  purpose: {},
  city: {},
  genre: {},
});
