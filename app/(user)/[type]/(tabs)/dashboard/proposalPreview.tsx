import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { useTheme } from "@react-navigation/native";

import { Card, GapView, LabelValue, MyAvatar, MyText } from "@components";
import { MyTheme } from "@types";
import { LocationIcon } from "@assets/images";

interface Preview {
  title: string;
  desc: string;
  purpose: string;
  type: string;
  location: string;
  city: string;
  size: string;
  range: number;
  installments: string;
  readyFor: string;
  map?: string;
  imageMedia?: string[];
  videoMedia?: string[];
}

const AvatarContainer = () => {
  const theme = useTheme() as MyTheme;
  return (
    <View
      style={{
        marginVertical: 30,
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      <MyAvatar
        imageUrl="https://i.pravatar.cc/150?img=68"
        size={45}
        status="online"
      />
      <View style={{ marginLeft: 13 }}>
        <MyText
          text="John Doe"
          size={14}
          weight="500"
          textColor={theme.colors.secondary}
        />
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <LocationIcon />
          <GapView mode="horizontal" length={5} />
          <MyText
            text="Lahore, Pakistan - 3:16pm local time"
            weight="500"
            textColor="#757474"
            size={12}
          />
        </View>
      </View>
    </View>
  );
};

function ProposalPreview() {
  const theme = useTheme() as MyTheme;
  const data: Preview[] = [
    {
      title: "Need 4 Bedrooms Apartments",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.",
      purpose: "Buying",
      type: "Apartment",
      city: "Karachi",
      location: "Gulshan-e-Iqbal",
      size: "Large",
      range: 1000000,
      installments: "Available",
      readyFor: "Possession",
    },
  ];

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: theme?.colors.background }}
      contentContainerStyle={[styles(theme).container]}
    >
      <AvatarContainer />
      <Card style={{ flex: 1, elevation: 0 }}>
        {data.map((item, index) => {
          return (
            <View key={index}>
              <View style={[styles(theme).part1, { borderTopWidth: 0 }]}>
                <MyText text={item.title} size={16} weight="500" />
                <MyText
                  text={item.desc}
                  size={12}
                  style={{ textAlign: "justify" }}
                />
              </View>
              <View style={styles(theme).part1}>
                <MyText text={"Location & Purpose"} size={16} weight="500" />
                <LabelValue label="Purpose" value={item.purpose} />
                <LabelValue label="Property Type" value={item.type} />
                <LabelValue label="City" value={item.city} />
                <LabelValue label="Location" value={item.location} />
                <View
                  style={{
                    width: "100%",
                    height: 116,
                    backgroundColor: "#947971",
                    alignSelf: "center",
                  }}
                />
              </View>
              <View style={styles(theme).part1}>
                <MyText text={"Amount"} size={16} weight="500" />
                <LabelValue label="Range" value={"80M"} />
              </View>
              <View style={styles(theme).part1}>
                <MyText text="Features & Amenities" size={16} weight="500" />
                <LabelValue label="Bedrooms" value={"04"} />
                <LabelValue label="Bathrooms" value={"02"} />
              </View>
            </View>
          );
        })}
      </Card>
    </ScrollView>
  );
}

export default ProposalPreview;

const styles = (theme?: MyTheme) =>
  StyleSheet.create({
    container: {
      paddingHorizontal: 20,
    },
    header: {
      borderBottomWidth: 1,
      borderColor: theme?.colors.border,
      width: "100%",
      alignItems: "center",
      paddingVertical: 10,
    },

    row: { flexDirection: "row" },
    part1: {
      paddingVertical: "4%",
      paddingHorizontal: 15,
      rowGap: 6,
      borderTopWidth: 1,
      borderColor: theme?.colors.border,
    },
  });
