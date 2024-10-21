import React from "react";
import { FlatList, ScrollView, StyleSheet, View } from "react-native";
import { useTheme } from "@react-navigation/native";
import { router, useLocalSearchParams } from "expo-router";

import { MyTheme, UserType } from "@types";
import {
  AdBox,
  Card,
  GapView,
  LabelValue,
  MyButton,
  MyText,
  MyTopTabs,
} from "@components";

interface ContentData {
  title: string;
  description: string;
  purpose: "Buying" | "Selling";
  type: "Commercial" | "Residential";
  city: string;
  location: string;
  amount: string;
}

const testContentData: ContentData[] = [
  {
    title: "Need 4 Room Apartments",
    description:
      "Ad voluptate magna id officia deserunt amet aliquip excepteur officia Lorem. Mollit quis sint ut ut est officia.",
    purpose: "Buying",
    type: "Commercial",
    city: "Karachi",
    location: "Gulshan-e-Iqbal",
    amount: "80M",
  },
  {
    title: "Need 4 Room Apartments",
    description:
      "Ad voluptate magna id officia deserunt amet aliquip excepteur officia Lorem. Mollit quis sint ut ut est officia.",
    purpose: "Buying",
    type: "Commercial",
    city: "Karachi",
    location: "Gulshan-e-Iqbal",
    amount: "80M",
  },
  {
    title: "Need 4 Room Apartments",
    description:
      "Ad voluptate magna id officia deserunt amet aliquip excepteur officia Lorem. Mollit quis sint ut ut est officia.",
    purpose: "Buying",
    type: "Commercial",
    city: "Karachi",
    location: "Gulshan-e-Iqbal",
    amount: "80M",
  },
  {
    title: "Need 4 Room Apartments",
    description:
      "Ad voluptate magna id officia deserunt amet aliquip excepteur officia Lorem. Mollit quis sint ut ut est officia.",
    purpose: "Buying",
    type: "Commercial",
    city: "Karachi",
    location: "Gulshan-e-Iqbal",
    amount: "80M",
  },
];

const topTabsData = [
  { title: "Best Matches", selected: true },
  { title: "Saved Leads", selected: false },
];

export default function Bidding() {
  const theme = useTheme() as MyTheme;
  const params = useLocalSearchParams<{ type?: UserType }>();

  const btnsData = [
    { label: "Trash", onPress: () => console.log("trash"), outline: true },
    {
      label: "View",
      onPress: () => {
        router.push(`(user)/${params.type}/(tabs)/dashboard/proposalPreview`);
      },
    },
  ];

  return (
    <ScrollView nestedScrollEnabled showsVerticalScrollIndicator={false}>
      <View style={styles.top}>
        <MyText
          text="Bidding"
          size={20}
          weight="600"
          textColor={theme.colors.negative}
        />
        <GapView />
        <MyText
          text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed venenatis gravida lectus nec sodales."
          size={12}
          textColor={theme.colors.text}
        />
      </View>
      <MyTopTabs data={topTabsData} />
      <View style={styles.content}>
        <FlatList
          data={testContentData}
          showsVerticalScrollIndicator={false}
          nestedScrollEnabled
          renderItem={({ item, index }) => (
            <AdBox
              title={item.title}
              description={item.description}
              botPost
              btns={btnsData}
              points={[
                { label: "Est. Range", value: item?.amount },
                { label: "Purpose", value: item?.purpose },
                { label: "Property Type", value: item?.type },
                { label: "City", value: item?.city },
                { label: "Location", value: item?.location },
              ]}
            />
          )}
          ItemSeparatorComponent={() => <GapView />}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 26,
  },
  top: {
    justifyContent: "space-between",
    marginBottom: 10,
    marginTop: 27,
    paddingHorizontal: 20,
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
  content: {
    flex: 1,
    marginTop: 10,
    paddingHorizontal: 20,
  },
});
