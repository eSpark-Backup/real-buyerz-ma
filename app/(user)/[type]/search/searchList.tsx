import React from "react";
import { StyleSheet, Text, View, FlatList, Image } from "react-native";

import { GapView, MyText, SearchBar } from "@components";
import { Ionicons } from "@expo/vector-icons";
import { BathOutline, BedOutline, LandPlot, Parking } from "@assets/images";

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
  return (
    <View style={styles.container}>
      <View style={styles.searchBar}>
        <SearchBar button />
      </View>
      <View style={styles.filterList}>
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
          renderItem={renderTagList}
        />
      </View>
      <View style={styles.searchList}>
        <FlatList
          data={testData}
          renderItem={renderSearchList}
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
}: {
  item: SearchList;
  index: number;
}) => {
  return (
    <View style={styles.searchItem}>
      <Image
        source={{ uri: item.image }}
        style={{ width: 120, height: 120, borderRadius: 2 }}
      />
      <View
        style={{
          flex: 1,
          height: 120,
          marginLeft: 5,
          // backgroundColor: "powderblue",
          justifyContent: "space-between",
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <MyText text="PKR " size={12} />
          <MyText text={item.cost} size={14} textColor="#333333" weight="500" />
        </View>
        <MyText text={item.title} textColor="#696969" size={10} />
        <MyText
          text={item.address + "some other ext"}
          numberOfLines={1}
          textColor="#333333"
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
        <MyText text={"Posted 3 hours ago"} size={8} textColor="#696969" />
      </View>
    </View>
  );
};

const renderTagList = ({ item, index }: { item: string; index: number }) => {
  return (
    <View style={styles.filterItem}>
      <Ionicons name="close" color={"#333333"} size={16} />
      <GapView mode="horizontal" />
      <MyText text={item} size={12} />
    </View>
  );
};

const styles = StyleSheet.create({
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
    borderColor: "#E9E9E9",
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
    borderColor: "#E9E9E9",
  },
});
