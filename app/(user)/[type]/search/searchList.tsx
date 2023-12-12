import React from "react";
import { StyleSheet, View, FlatList } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";

import { FavoriteListItem, GapView, MyText, SearchBar } from "@components";
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

export default function SearchList() {
  const theme = useTheme() as MyTheme;

  return (
    <View style={styles(theme).container}>
      <View style={styles(theme).searchBar}>
        <SearchBar button />
      </View>
      <View style={styles(theme).filterList}>
        <FlatList
          data={[
            "Buy",
            "Residential Houses",
            "Karachi",
            "Lahore",
            "Upper Portion",
          ]}
          horizontal
          showsHorizontalScrollIndicator={false}
          ItemSeparatorComponent={() => <GapView mode="horizontal" />}
          renderItem={({ item, index }) =>
            renderTagList({ index, item, theme })
          }
        />
      </View>
      <View style={styles(theme).searchList}>
        <FlatList
          data={testData}
          renderItem={({ index, item }) => (
            <FavoriteListItem item={item} index={index} theme={theme} />
          )}
          showsVerticalScrollIndicator={false}
          ListFooterComponent={() => <GapView length={36} />}
          ItemSeparatorComponent={() => <GapView />}
          keyExtractor={(item) => item.id}
        />
      </View>
    </View>
  );
}

const renderTagList = ({
  item,
  index,
  theme,
}: {
  item: string;
  index: number;
  theme: MyTheme;
}) => {
  return (
    <View style={styles(theme).filterItem}>
      <Ionicons name="close" color={theme.colors.text} size={16} />
      <GapView mode="horizontal" />
      <MyText text={item} size={12} />
    </View>
  );
};

const styles = (theme?: MyTheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    searchBar: {
      height: 46,
      width: "100%",
    },
    filterList: {
      paddingVertical: 10,
    },
    filterItem: {
      flexDirection: "row",
      padding: 10,
      borderRadius: 20,
      justifyContent: "space-between",
      alignItems: "center",
      borderWidth: 1,
      borderColor: theme?.colors.border,
    },
    searchList: {
      flex: 1,
      paddingTop: 10,
    },
  });
