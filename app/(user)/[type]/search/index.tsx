import React from "react";
import { StyleSheet, Text, View } from "react-native";

import {
  Card,
  GapView,
  MyDropdown,
  TabSwitch,
  MyText,
  SearchBar,
  TabFilter,
  MyButton,
} from "@components";
import { testData } from "@constants";

export default function Search() {
  return (
    <View style={styles.container}>
      <View style={styles.searchBar}>
        <SearchBar leftIcon clearIcon />
      </View>
      <GapView length={40} />
      <View style={styles.purpose}>
        <MyText text="Select Purpose" />
        <MyDropdown
          placeholder="Type"
          multiSelect
          data={["Buy", "Rent"]}
          onSelect={(value) => {
            console.log("data", value);
          }}
        />
      </View>
      <GapView length={30} />
      <Card.Divider />
      <GapView length={30} />
      <View style={styles.city}>
        <MyText text="City" />
        <MyDropdown
          placeholder="City"
          multiSelect
          zIndex={8}
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
      <View style={styles.genre}>
        <TabFilter
          data={testData}
          onSelect={(value) => {
            console.log("value", value);
          }}
        />
      </View>
      <View style={styles.button}>
        <MyButton
          label="Search"
          textColor="#ffffff"
          backgroundColor="#fb631c"
          style={{ borderRadius: 4, padding: 8, paddingHorizontal: 20 }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 14,
    alignItems: "center",
  },
  searchBar: {
    height: 46,
    width: "100%",
  },
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
  genre: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    marginTop: 50,
  },
});
