import React from "react";
import { StyleSheet, View, FlatList } from "react-native";
import { useTheme } from "@react-navigation/native";

import { MyListItem, GapView, MyText } from "@components";
import { MyTheme } from "@types";

interface FavoritesList {
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

const testData: FavoritesList[] = [
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

export default function FavoritesList() {
  const theme = useTheme() as MyTheme;

  return (
    <View style={styles(theme).container}>
      <View
        style={{
          borderBottomWidth: 1,
          marginHorizontal: 5,
          marginVertical: 8,
          borderColor: "#E9E9E9",
        }}
      >
        <View style={styles(theme).singleTab}>
          <MyText
            text="Favorites"
            size={16}
            textColor={theme.colors.primary}
            weight="600"
          />
        </View>
      </View>
      <View style={styles(theme).searchList}>
        <FlatList
          data={testData}
          renderItem={({ index, item }) => (
            <MyListItem item={item} index={index} theme={theme} fav />
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

const styles = (theme?: MyTheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      margin: 10,
      borderColor: "#E4E4E4",
      borderWidth: 1,
      borderRadius: 9,
    },
    singleTab: {
      height: 40,
      justifyContent: "center",
      borderBottomColor: theme?.colors.primary,
      borderBottomWidth: 2,
      marginLeft: "3%",
      width: "20%",
    },
    searchList: {
      flex: 1,
      padding: 11,
    },
  });
