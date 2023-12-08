import React from "react";
import { StyleSheet, View, FlatList, ScrollView } from "react-native";
import { useTheme } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";

import { Card, GapView, MyButton, MyText } from "@components";
import { MyTheme } from "@types";

interface Posting {
  id: number;
  title: string;
  estRange: string;
  postedTime: Date;
  description: string;
  status: "Buying" | "Selling";
  city: string;
  area: string;
  proposal: number;
}

const minutesAgo: number = 30;
const pastDate: Date = new Date(new Date().getTime() - minutesAgo * 60000);

const testPostingData: Posting[] = [
  {
    id: 1,
    title: "Need 4 Room Apartments",
    estRange: "80M",
    postedTime: pastDate,
    description:
      "Sunt exercitation enim magna exercitation fugiat fugiat excepteur. Est dolor commodo commodo reprehenderit eiusmod dolore culpa.",
    status: "Buying",
    city: "karachi",
    area: "Gulshan-e-Iqbal",
    proposal: 5,
  },
  {
    id: 2,
    title: "Need 4 Room Apartments",
    estRange: "80M",
    postedTime: pastDate,
    description:
      "Sunt exercitation enim magna exercitation fugiat fugiat excepteur.",
    status: "Buying",
    city: "karachi",
    area: "Gulshan-e-Iqbal",
    proposal: 5,
  },
  {
    id: 3,
    title: "Need 4 Room Apartments",
    estRange: "80M",
    postedTime: pastDate,
    description:
      "Sunt exercitation enim magna exercitation fugiat fugiat excepteur.",
    status: "Buying",
    city: "karachi",
    area: "Gulshan-e-Iqbal",
    proposal: 5,
  },
  {
    id: 4,
    title: "Need 4 Room Apartments",
    estRange: "80M",
    postedTime: pastDate,
    description:
      "Sunt exercitation enim magna exercitation fugiat fugiat excepteur.",
    status: "Buying",
    city: "karachi",
    area: "Gulshan-e-Iqbal",
    proposal: 5,
  },
];

function timeAgo(date: Date, minutesAgo: number = 0): string {
  const diff: number =
    Math.floor((new Date().getTime() - date.getTime()) / 60000) - minutesAgo;
  return `${diff} mins ago`;
}

export default function Listings() {
  const theme = useTheme() as MyTheme;

  return (
    <ScrollView style={styles.container} nestedScrollEnabled>
      <View style={styles.top}>
        <MyText text="Dashboard" size={20} weight="600" />
        <MyButton
          label="Post a Request"
          backgroundColor={theme.colors.primary}
          textColor="#ffffff"
          labelStyle={{ fontSize: 10, fontWeight: "500" }}
          style={{ borderRadius: 4, padding: 10 }}
          leftIcon={
            <Feather
              name="plus"
              size={14}
              color="#ffffff"
              style={{ marginRight: 5 }}
            />
          }
        />
      </View>
      <View style={styles.content}>
        <Card>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              padding: 12,
              borderBottomWidth: 1,
              borderColor: theme.colors.border,
            }}
          >
            <MyText text="Your Posting" />
            <MyText text="see all postings" />
          </View>
          <View
            style={{ paddingVertical: 17, paddingHorizontal: 11, height: 410 }}
          >
            <FlatList
              data={testPostingData}
              renderItem={({ item, index }) =>
                renderPostingList({ item, index, theme })
              }
              showsVerticalScrollIndicator={false}
              ItemSeparatorComponent={() => <GapView length={20} />}
              keyExtractor={(item) => item.id.toString()}
            />
          </View>
        </Card>
      </View>
    </ScrollView>
  );
}

const renderPostingList = ({
  item,
  index,
  theme,
}: {
  item: Posting;
  index: number;
  theme: MyTheme;
}) => {
  return (
    <Card style={{ paddingVertical: 22, paddingHorizontal: 15 }}>
      <View>
        <MyText text={item.title} weight="500" size={16} />
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginBottom: 20,
          marginTop: 10,
        }}
      >
        <View style={{ flexDirection: "row" }}>
          <MyText text={`Est. Range: `} weight="400" size={12} />
          <MyText text={item.estRange} weight="600" size={12} />
        </View>
        <MyText
          text={`Posted ${timeAgo(item.postedTime, minutesAgo)}`}
          weight="400"
          size={12}
        />
      </View>
      <View style={{ marginBottom: 20 }}>
        <MyText
          text={item.description}
          numberOfLines={3}
          size={12}
          weight="300"
        />
      </View>
      <View>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <MyText
            text={`Status: `}
            weight="400"
            size={12}
            textColor={theme.colors.text + "77"}
          />
          <MyText text={`${item.status}`} weight="600" size={12} />
        </View>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <MyText
            text={`City: `}
            weight="400"
            size={12}
            textColor={theme.colors.text + "77"}
          />
          <MyText text={`${item.city}`} weight="600" size={12} />
        </View>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <MyText
            text={`Area: `}
            weight="400"
            size={12}
            textColor={theme.colors.text + "77"}
          />
          <MyText text={`${item.area}`} weight="600" size={12} />
        </View>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <MyText
            text={`Proposal: `}
            weight="400"
            size={12}
            textColor={theme.colors.text + "77"}
          />
          <MyText text={`${item.proposal} to 10`} weight="600" size={12} />
        </View>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 26,
    paddingHorizontal: 22,
  },
  top: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 17,
  },
  content: {},
});
