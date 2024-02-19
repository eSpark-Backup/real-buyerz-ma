import React from "react";
import {
  StyleSheet,
  View,
  FlatList,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useTheme } from "@react-navigation/native";
import { router, useLocalSearchParams } from "expo-router";

import { Card, GapView, LabelValue, MyButton, MyText } from "@components";
import { MyTheme, UserType } from "@types";
import { Feather, Ionicons } from "@expo/vector-icons";
import Bidding from "./bidding";

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

function Dashboard() {
  const theme = useTheme() as MyTheme;
  const params = useLocalSearchParams<{ type: UserType }>();
  return (
    <>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.container}>
          <View style={styles.top}>
            <MyText
              text="Dashboard"
              size={20}
              weight="600"
              textColor={theme.colors.negative}
            />
          </View>
          <View style={styles.content}>
            <Card style={{ flex: 1 }}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: 12,
                  borderBottomWidth: 1,
                  borderColor: theme.colors.border,
                }}
              >
                <MyText
                  text="Your Posting"
                  weight="600"
                  size={16}
                  textColor={theme.colors.negative}
                />
                <TouchableOpacity
                  activeOpacity={1}
                  onPress={() =>
                    router.push(`(user)/${params?.type!}/myListings`)
                  }
                >
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <MyText
                      text="See all postings"
                      textColor={theme.colors.secondary}
                    />
                    <Ionicons
                      name="chevron-forward"
                      color={theme.colors.secondary}
                      style={{ paddingLeft: 10, top: 1 }}
                      size={16}
                    />
                  </View>
                </TouchableOpacity>
              </View>
              <FlatList
                data={testPostingData}
                scrollEnabled={false}
                renderItem={({ item, index }) =>
                  renderPostingList({ item, index, theme, params })
                }
                showsVerticalScrollIndicator={false}
                ItemSeparatorComponent={() => <Card.Divider />}
                keyExtractor={(item) => item.id.toString()}
              />
            </Card>
          </View>
        </View>
      </ScrollView>
    </>
  );
}

export default Dashboard;

// export default Bidding;

const renderPostingList = ({
  item,
  index,
  theme,
  params,
}: {
  item: Posting;
  index: number;
  theme: MyTheme;
  params: { type?: UserType };
}) => {
  return (
    <View style={{ padding: 20 }}>
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
        <LabelValue
          label="Est. Range"
          value={"80M"}
          valueStyle={{ color: theme.colors.negative }}
        />
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
        <LabelValue label="Status" value={item.status!} />
        <LabelValue label="City" value={item.city!} />
        <LabelValue label="Area" value={item.area!} />
        <LabelValue
          label="Proposal"
          value={item.proposal!.toString() + " to 10"}
        />
      </View>
      <MyButton
        label="View Proposals"
        textColor="#ffffff"
        onPress={() =>
          router.push(`(user)/${params?.type!}/(tabs)/dashboard/proposalList`)
        }
        labelStyle={{ fontSize: 12 }}
        style={{
          marginTop: 20,
          alignSelf: "flex-start",
          paddingHorizontal: 16,
          paddingVertical: 8,
          borderRadius: 4,
        }}
        backgroundColor={theme.colors.primary}
      />
    </View>
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
  content: { flex: 1 },
  ap_top: {
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  ap_top1: {
    alignItems: "center",
    flexDirection: "row",
    marginBottom: 5,
  },
  ap_mid: {},
  ap_bot: {
    alignItems: "flex-end",
    marginBottom: 10,
  },
});
