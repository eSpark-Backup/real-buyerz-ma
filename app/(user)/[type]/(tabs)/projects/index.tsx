import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useTheme } from "@react-navigation/native";

import { GapView, MyListItem, MyTopFilter, MyTopTabs } from "@components";
import { MyTheme } from "@types";
interface SearchList {
  id: string;
  title: string;
  cost: string;
  address: string;
  beds: number;
  bathroom: number;
  parking: number;
  sqft: number;
  image: string;
}

const topTabsData = [
  { title: "Houses", selected: true },
  { title: "Plots", selected: false },
  { title: "Commercial", selected: false },
];

const testData: SearchList[] = [
  {
    id: "1",
    title: "Residential Plot for Sale",
    cost: "13 Lac",
    address: "Bahria Greens Bahria Town Karachi",
    beds: 5,
    bathroom: 3,
    parking: 2,
    sqft: 1080,
    image: "https://picsum.photos/id/58/200",
  },
  {
    id: "2",
    title: "Residential Plot for Sale",
    cost: "13 Lac",
    address: "Bahria Greens Bahria Town Karachi",
    beds: 5,
    bathroom: 3,
    parking: 2,
    sqft: 1080,
    image: "https://picsum.photos/id/90/200",
  },
  {
    id: "3",
    title: "Residential Plot for Sale",
    cost: "13 Lac",
    address: "Bahria Greens Bahria Town Karachi",
    beds: 5,
    bathroom: 3,
    parking: 2,
    sqft: 1080,
    image: "https://picsum.photos/id/99/200",
  },
  {
    id: "4",
    title: "Residential Plot for Sale",
    cost: "13 Lac",
    address: "Bahria Greens Bahria Town Karachi",
    beds: 5,
    bathroom: 3,
    parking: 2,
    sqft: 1080,
    image: "https://picsum.photos/id/200/200",
  },
  {
    id: "5",
    title: "Residential Plot for Sale",
    cost: "13 Lac",
    address: "Bahria Greens Bahria Town Karachi",
    beds: 5,
    bathroom: 3,
    parking: 2,
    sqft: 1080,
    image: "https://picsum.photos/id/212/200",
  },
];

export default function Projects() {
  const theme = useTheme() as MyTheme;
  return (
    <View style={{ flex: 1 }}>
      <MyTopFilter
        theme={theme}
        onPressFilter={() => console.log("e")}
        style={styles.topFilter}
      />
      <MyTopTabs data={topTabsData} />
      <View style={styles.searchList}>
        <FlatList
          data={testData}
          renderItem={({ index, item }) => (
            <MyListItem item={item} index={index} theme={theme} />
          )}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => <GapView />}
          keyExtractor={(item) => item.id}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  topFilter: {
    paddingTop: 27,
    paddingHorizontal: 25,
    justifyContent: "flex-end",
    paddingBottom: 5,
  },
  searchList: {
    flex: 1,
    paddingTop: 10,
    paddingHorizontal: 20,
  },
});
