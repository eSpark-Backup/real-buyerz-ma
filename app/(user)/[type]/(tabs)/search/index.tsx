import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { router } from "expo-router";
import { useTheme } from "@react-navigation/native";

import {
  Card,
  GapView,
  MyDropdown,
  MyText,
  SearchBar,
  TabFilter,
  MyButton,
} from "@components";
import { testData } from "@constants";
import { MyTheme } from "@types";

export default function Search() {
  const theme = useTheme() as MyTheme;

  return (
    <View style={styles.container}>
      <View style={styles.searchBar}>
        <SearchBar leftIcon clearIcon />
      </View>
      <TouchableOpacity style={styles.filterCont}>
        <MyText
          size={10}
          text="Clear Filter"
          style={[styles.filter, { color: theme.colors.secondary }]}
        />
      </TouchableOpacity>
      <GapView length={25} />
      <View style={styles.purpose}>
        <MyText text="Purpose" size={14} />
        <MyDropdown
          placeholder="Purpose"
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
          textColor={"#ffffff"}
          backgroundColor={theme.colors.primary}
          onPress={() => router.push("(user)/anon/(tabs)/search/searchList")}
          style={{ borderRadius: 4, padding: 8, paddingHorizontal: 20 }}
          labelStyle={{ fontSize: 15 }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
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
  filter: {
    textDecorationLine: "underline",
  },
  filterCont: { alignSelf: "flex-end" },
});
