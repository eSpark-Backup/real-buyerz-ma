import React, { useEffect } from "react";
import {
  StyleSheet,
  View,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";

import { GapView, MyText, SearchBar } from "@components";
import {
  BathOutline,
  BedOutline,
  LandPlot,
  Parking,
  LikeButton,
} from "@assets/images";
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
          renderItem={({ index, item }) =>
            renderSearchList({ index, item, theme })
          }
          showsVerticalScrollIndicator={false}
          ListFooterComponent={() => <GapView length={36} />}
          ItemSeparatorComponent={() => <GapView />}
          keyExtractor={(item) => item.id}
        />
      </View>
    </View>
  );
}

const renderSearchList = ({
  item,
  index,
  theme,
}: {
  item: SearchList;
  index: number;
  theme: MyTheme;
}) => {
  return (
    <View style={styles(theme).searchItem}>
      <View>
        <Image source={{ uri: item.image }} style={styles(theme).image} />

        <TouchableOpacity style={styles(theme).likeBtn}>
          <LikeButton />
        </TouchableOpacity>
      </View>
      <View style={styles(theme).rows}>
        <View style={styles(theme).row1}>
          <MyText
            text={item.title}
            textColor={theme.colors.listText}
            size={12}
            style={{ width: "70%" }}
            numberOfLines={2}
          />
          <View style={styles(theme).row1_inner}>
            <MyText text="PKR " size={12} />
            <MyText
              text={item.cost}
              size={14}
              textColor={theme.colors.text}
              weight="500"
            />
          </View>
        </View>
        <MyText
          text={item.address}
          textColor={theme.colors.text}
          size={14}
          numberOfLines={2}
        />
        <View style={styles(theme).row1}>
          <View style={styles(theme).row1_inner}>
            <BedOutline />
            <MyText
              text={item.beds.toString().padStart(2, "0")}
              style={styles(theme).miniText}
              size={10}
              weight="300"
            />
          </View>
          <View style={styles(theme).row1_inner}>
            <BathOutline />
            <MyText
              text={item.bathroom.toString().padStart(2, "0")}
              style={styles(theme).miniText}
              size={10}
              weight="300"
            />
          </View>
          <View style={styles(theme).row1_inner}>
            <Parking />
            <MyText
              text={item.parking.toString().padStart(2, "0")}
              style={styles(theme).miniText}
              size={10}
              weight="300"
            />
          </View>
          <View style={styles(theme).sqft}>
            <LandPlot />
            <MyText
              text={item.sqft.toString().padStart(2, "0") + " sqft"}
              style={styles(theme).miniText}
              size={10}
              weight="300"
            />
          </View>
        </View>
        <MyText
          text={"Posted 3 hours ago"}
          size={10}
          textColor={theme.colors.listText}
        />
      </View>
    </View>
  );
};

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
    searchItem: {
      flexDirection: "row",
      height: 150,
      padding: 10,
      alignItems: "center",
      justifyContent: "space-between",
      borderWidth: 1,
      borderRadius: 5,
      borderColor: theme?.colors.border,
    },
    rows: {
      flex: 1,
      height: 120,
      marginLeft: 5,
      justifyContent: "space-between",
    },
    image: {
      width: 120,
      height: 120,
      borderRadius: 2,
    },
    likeBtn: {
      position: "absolute",
      alignSelf: "flex-end",
      padding: 4,
    },
    row1: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    row1_inner: {
      flexDirection: "row",
      alignItems: "center",
    },
    miniText: { marginLeft: 5 },
    sqft: {
      flexDirection: "row",
      alignItems: "center",
      marginRight: 10,
    },
  });
