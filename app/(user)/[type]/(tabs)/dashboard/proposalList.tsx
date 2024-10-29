import React, { useState } from "react";
import { StyleSheet, View, FlatList, ScrollView, Image } from "react-native";
import { useTheme } from "@react-navigation/native";
import { router, useLocalSearchParams } from "expo-router";

import {
  Card,
  GapView,
  LabelValue,
  MyAvatar,
  MyButton,
  MyText,
  SearchBar,
} from "@components";
import { MyTheme, UserType } from "@types";
import { MiFilter } from "@assets/images";

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

interface Proposals {
  id: number;
  name: string;
  region: string;
  price: number; // 0.00 decimals
  image: string;
  description: string;
}

const minutesAgo: number = 30;
const pastDate: Date = new Date(new Date().getTime() - minutesAgo * 60000);

const testPostingData: Posting = {
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
};
const testProposalsData: Proposals[] = [
  {
    id: 1,
    name: "John Doe",
    image: "https://picsum.photos/id/212/200",
    region: "Pakistan",
    description:
      "Enim eiusmod nisi commodo sunt officia dolore officia ut veniam elit reprehe. Exercitation quis id aliqua ullamco aute laborum cupidatat excepteur elit id",
    price: 100.0,
  },
  {
    id: 2,
    name: "John Depp",
    image: "https://picsum.photos/id/312/200",
    region: "Pakistan",
    description:
      "Enim eiusmod nisi commodo sunt officia dolore officia ut veniam elit reprehe. Exercitation quis id aliqua ullamco aute laborum cupidatat excepteur elit id",
    price: 100.0,
  },
  {
    id: 3,
    name: "John Bravo",
    image: "https://picsum.photos/id/315/200",
    region: "Pakistan",
    description:
      "Enim eiusmod nisi commodo sunt officia dolore officia ut veniam elit reprehe. Exercitation quis id aliqua ullamco aute laborum cupidatat excepteur elit id",
    price: 100.0,
  },
];

function timeAgo(date: Date, minutesAgo: number = 0): string {
  const diff: number =
    Math.floor((new Date().getTime() - date.getTime()) / 60000) - minutesAgo;
  return `${diff} mins ago`;
}

export default function ProposalsList() {
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
              text="Proposals"
              size={20}
              weight="600"
              textColor={theme.colors.negative}
            />
          </View>
          <View style={styles.content}>
            <Card>
              {renderPosting({ item: testPostingData, theme })}
              <View
                style={{
                  borderTopWidth: 1,
                  borderColor: theme.colors.border,
                }}
              >
                <FlatList
                  data={testProposalsData}
                  scrollEnabled={false}
                  renderItem={({ item, index }) =>
                    renderProposalsList({ item, index, theme, params })
                  }
                  ItemSeparatorComponent={() => (
                    <Card.Divider style={{ width: "100%" }} />
                  )}
                  keyExtractor={(item) => item.id.toString()}
                />
              </View>
            </Card>
          </View>
        </View>
      </ScrollView>
    </>
  );
}

const renderPosting = ({ item, theme }: { item: Posting; theme: MyTheme }) => {
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
    </View>
  );
};

const renderProposalsList = ({
  item,
  index,
  theme,
  params,
}: {
  item: Proposals;
  index: number;
  theme: MyTheme;
  params: { type?: UserType };
}) => {
  return (
    <View style={{ paddingHorizontal: 20, paddingVertical: 15 }}>
      <View style={styles.ap_top}>
        <View style={styles.ap_top1}>
          <MyAvatar
            imageUrl={{ uri: "https://i.pravatar.cc/150?img=68" }}
            size={40}
            status="online"
          />
          <View style={{ marginLeft: 6 }}>
            <MyText
              text={item.name}
              size={12}
              weight="600"
              textColor={theme.colors.secondary}
            />
            <MyText
              text={item.region}
              size={10}
              weight="400"
              textColor={theme.colors.text + "77"}
            />
          </View>
        </View>
        <MyText
          text={"Rs " + item.price.toString() + "M"}
          style={{ alignSelf: "flex-start", rowGap: 10 }}
          size={12}
          weight="600"
          textColor={theme.dark ? "#ffffff" : "#000000"}
        />
      </View>
      <View style={styles.ap_mid}>
        <MyText
          text={item.description}
          numberOfLines={3}
          weight="300"
          size={12}
          textColor={theme.dark ? "#ffffff" : "#000000"}
        />
      </View>
      <View style={styles.ap_bot}>
        <MyButton
          label="View"
          onPress={() =>{
            console.log("proposallsit")
            router.push(
              `(user)/${params?.type!}/(tabs)/dashboard/proposalDetails`
            )
          }
          }
          labelStyle={{
            color: "#ffffff",
            fontSize: 12,
            fontWeight: "500",
          }}
          style={{
            paddingHorizontal: 28,
            paddingVertical: 7,
            backgroundColor: theme.colors.primary,
            borderRadius: 4,
          }}
        />
      </View>
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
  },
  ap_mid: {
    marginTop: 20,
    marginBottom: 10,
  },
  ap_bot: {
    alignItems: "flex-start",
  },
});
