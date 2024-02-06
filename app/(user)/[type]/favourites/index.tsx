import React from "react";
import { StyleSheet, View, FlatList } from "react-native";
import { useTheme } from "@react-navigation/native";

import { MyListItem, GapView, MyText, Card } from "@components";
import { MyTheme } from "@types";

interface FavouritesList {
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

const testData: FavouritesList[] = [
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

export default function Favourite() {
  const theme = useTheme() as MyTheme;

  return (
    <View style={styles(theme).container}>
      <Card style={styles(theme).cardContainer}>
        <View style={styles(theme).innerContainer}>
          <View style={styles(theme).singleTab}>
            <MyText
              text="Favourites"
              size={16}
              textColor={theme.colors.primary}
              weight="700"
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
      </Card>
    </View>
  );
}

const styles = (theme?: MyTheme) =>
  StyleSheet.create({
    container: { flex: 1, paddingHorizontal: 10 },
    cardContainer: {
      flex: 1,
      alignSelf: "center",
      marginTop: 12,
      borderColor: theme?.colors.border,
    },
    innerContainer: {
      borderBottomWidth: 1,
      marginTop: 8,
      marginBottom: 4,
      borderColor: theme?.colors.border,
    },
    singleTab: {
      height: 40,
      justifyContent: "center",
      alignItems: "center",
      borderBottomColor: theme?.colors.primary,
      borderBottomWidth: 2,
      marginLeft: "3%",
      width: "24%",
    },
    searchList: {
      // flex: 1,
      padding: 11,
    },
  });
