import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";

import { MyTheme } from "@types";
import { MyButton, MyText } from "@components";

interface FilterBtn {
  id: number;
  label: string;
  count: number;
  selected: boolean;
}

const filterBtns: FilterBtn[] = [
  { id: 1, label: "All", count: 0, selected: true },
  { id: 2, label: "Active", count: 0, selected: false },
  { id: 3, label: "Request", count: 0, selected: false },
  { id: 4, label: "Reject", count: 0, selected: false },
  { id: 5, label: "Trash", count: 0, selected: false },
];

export default function AllPosting() {
  const theme = useTheme() as MyTheme;

  return (
    <View style={styles.container}>
      <View style={styles.top_filter}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => console.log("yes")}
          style={{
            backgroundColor: theme.colors.secondary,
            padding: 10,
            borderRadius: 5,
          }}
        >
          <FontAwesome name="filter" size={15} color="#ffffff" />
        </TouchableOpacity>
        <MyText
          text="Reset"
          textColor={theme.colors.secondary}
          size={14}
          style={{ marginLeft: 10, textDecorationLine: "underline" }}
        />
      </View>
      <View style={styles.top_selection_btns}>
        {filterBtns.map((item, index) => (
          <FilterBtnComp item={item} index={index} theme={theme} />
        ))}
      </View>
    </View>
  );
}

const FilterBtnComp = ({
  item,
  index,
  theme,
}: {
  item: FilterBtn;
  index: number;
  theme: MyTheme;
}) => {
  return (
    <MyButton
      key={item.id}
      label={`${item.label} (${item.count.toString()})`}
      labelStyle={{
        color: item.selected ? "#ffffff" : theme.colors.primary,
        fontSize: 10,
      }}
      style={{
        width: 90,
        height: 30,
        marginVertical: 10,
        marginHorizontal: 10,
        borderWidth: 1,
        borderRadius: 4,
        backgroundColor: item.selected ? theme.colors.primary : "transparent",
        borderColor: theme.colors.primary,
      }}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 30,
    paddingTop: 26,
  },
  top_filter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  top_selection_btns: {
    marginTop: 25,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
  },
});
