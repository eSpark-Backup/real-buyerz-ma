import React from "react";
import { StyleSheet, Text, View } from "react-native";

import {
  Card,
  GapView,
  MyDropdown,
  MySwitch,
  MyText,
  SearchBar,
} from "@components";

export default function Search() {
  return (
    <View style={styles.container}>
      <View style={styles.searchBar}>
        <SearchBar />
      </View>
      <GapView length={40} />
      <View style={styles.purpose}>
        <MyText text="Select Purpose" />
        <MySwitch
          titleSwitchOne="Buy"
          titleSwitchTwo="Rent"
          bgColor="transparent"
        />
      </View>
      <GapView length={30} />
      <Card.Divider />
      <GapView length={30} />
      <View style={styles.city}>
        <MyText text="City" />
        <MyDropdown
          data={[
            "Karachi",
            "Lahore",
            "Islamabad",
            "Quetta",
            "Peshawar",
            "Sialkot",
          ]}
          onSelect={(value) => {
            console.log("data", value);
          }}
        />
      </View>
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
  purpose: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  city: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  genre: {},
});
