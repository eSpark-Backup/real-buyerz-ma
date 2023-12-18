import React, { useState } from "react";
import { StyleSheet, View, FlatList, ScrollView, Image } from "react-native";
import { useTheme } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";

import {
  Card,
  GapView,
  MyButton,
  MyText,
  PreviewPopup,
  SearchBar,
} from "@components";
import { MyTheme } from "@types";
import { MiFilter } from "@assets/images";
import { TouchableOpacity } from "react-native-gesture-handler";

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

export default function Listings() {
  const theme = useTheme() as MyTheme;
  const [visible, setVisible] = useState(false);

  const handlepress = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };
  return (
    <>
      <PreviewPopup onClose={onClose} visible={visible} />
      <ScrollView
        style={{ flex: 1 }}
        nestedScrollEnabled
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.container}>
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
              onPress={handlepress}
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
                <MyText text="Your Posting" weight="600" size={16} />
                <TouchableOpacity
                  activeOpacity={1}
                  onPress={() => router.push("(user)/anon/listings/allposting")}
                >
                  <MyText
                    text="see all postings"
                    textColor={theme.colors.secondary}
                    style={{ textDecorationLine: "underline" }}
                  />
                </TouchableOpacity>
              </View>
              <View
                style={{
                  paddingVertical: 17,
                  paddingHorizontal: 11,
                  height: 410,
                }}
              >
                <FlatList
                  data={testPostingData}
                  nestedScrollEnabled
                  renderItem={({ item, index }) =>
                    renderPostingList({ item, index, theme })
                  }
                  showsVerticalScrollIndicator={false}
                  ItemSeparatorComponent={() => <GapView length={20} />}
                  keyExtractor={(item) => item.id.toString()}
                />
              </View>
            </Card>
            <Card style={{ marginTop: 17 }}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  padding: 12,
                  borderBottomWidth: 1,
                  borderColor: theme.colors.border,
                }}
              >
                <MyText text="All Proposals (1)" weight="600" size={16} />
              </View>
              <View
                style={{
                  paddingVertical: 17,
                  height: 410,
                }}
              >
                <FlatList
                  data={testProposalsData}
                  nestedScrollEnabled
                  ListHeaderComponentStyle={{ paddingHorizontal: 11 }}
                  ListHeaderComponent={() => (
                    <View>
                      <View style={{ height: 35 }}>
                        <SearchBar
                          button
                          placeholder="Search by name"
                          searchBtnColor={theme.colors.secondary}
                        />
                      </View>
                      <View style={{ alignItems: "flex-end" }}>
                        <MyButton
                          label="Filter"
                          labelStyle={{
                            color: theme.colors.primary,
                            marginLeft: 5,
                          }}
                          leftIcon={<MiFilter />}
                          style={{
                            paddingHorizontal: 15,
                            paddingVertical: 5,
                            backgroundColor: "transparent",
                            borderWidth: 1,
                            borderColor: theme.colors.primary,
                            borderRadius: 4,
                            marginVertical: 10,
                          }}
                        />
                      </View>
                    </View>
                  )}
                  renderItem={({ item, index }) =>
                    renderProposalsList({ item, index, theme })
                  }
                  showsVerticalScrollIndicator={false}
                  ItemSeparatorComponent={() => (
                    <View style={{ marginVertical: 10 }}>
                      <Card.Divider style={{ width: "100%" }} />
                    </View>
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

const renderProposalsList = ({
  item,
  index,
  theme,
}: {
  item: Proposals;
  index: number;
  theme: MyTheme;
}) => {
  return (
    <View style={{ paddingHorizontal: 11 }}>
      <View style={styles.ap_top}>
        <View style={styles.ap_top1}>
          <Image
            source={{ uri: item.image }}
            style={{ height: 40, borderRadius: 40, width: 40, marginRight: 5 }}
            resizeMode="contain"
          />
          <View>
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
          text={"$" + item.price.toFixed(2).toString()}
          size={12}
          weight="500"
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
          labelStyle={{
            color: theme.colors.primary,
            fontSize: 10,
          }}
          style={{
            paddingHorizontal: 19,
            paddingVertical: 3,
            backgroundColor: "transparent",
            borderWidth: 1,
            borderColor: theme.colors.primary,
            borderRadius: 100,
            marginTop: 10,
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 40,
    paddingTop: 26,
    paddingHorizontal: 22,
  },
  top: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 17,
  },
  content: {},
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
