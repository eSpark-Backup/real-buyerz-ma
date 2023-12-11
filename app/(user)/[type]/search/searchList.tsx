import React, { useEffect } from "react";
import { StyleSheet, View, FlatList, Image } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";

import { GapView, MyText, SearchBar } from "@components";
import { BathOutline, BedOutline, LandPlot, Parking } from "@assets/images";
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
  const params = useLocalSearchParams();

  console.log("para", params);

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
      <Image
        source={{ uri: item.image }}
        style={{ width: 120, height: 120, borderRadius: 2 }}
      />
      <View
        style={{
          flex: 1,
          height: 120,
          marginLeft: 5,
          justifyContent: "space-between",
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <MyText text="PKR " size={12} />
          <MyText
            text={item.cost}
            size={14}
            textColor={theme.colors.text}
            weight="500"
          />
        </View>
        <MyText
          text={item.title}
          textColor={theme.colors.text + "88"}
          size={10}
        />
        <MyText
          text={item.address + "some other ext"}
          numberOfLines={1}
          textColor={theme.colors.text}
          size={12}
          weight="300"
        />
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <BedOutline />
            <MyText
              text={item.beds.toString().padStart(2, "0")}
              style={{ marginLeft: 5 }}
              size={8}
              weight="300"
            />
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <BathOutline />
            <MyText
              text={item.bathroom.toString().padStart(2, "0")}
              style={{ marginLeft: 5 }}
              size={8}
              weight="300"
            />
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Parking />
            <MyText
              text={item.parking.toString().padStart(2, "0")}
              style={{ marginLeft: 5 }}
              size={8}
              weight="300"
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginRight: 10,
            }}
          >
            <LandPlot />
            <MyText
              text={item.sqft.toString().padStart(2, "0") + " sqft"}
              style={{ marginLeft: 5 }}
              size={8}
              weight="300"
            />
          </View>
        </View>
        <MyText
          text={"Posted 3 hours ago"}
          size={8}
          textColor={theme.colors.text + "88"}
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
      padding: 10,
      alignItems: "center",
      justifyContent: "space-between",
      borderWidth: 1,
      borderRadius: 5,
      borderColor: theme?.colors.border,
    },
  });
