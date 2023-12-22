import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useTheme } from "@react-navigation/native";

import { GapView, MyAvatar, MyButton, MyText } from "@components";
import { MyTheme } from "@types";
import { LocationIcon } from "@assets/images";

export default function ProposalDetails() {
  const theme = useTheme() as MyTheme;

  return (
    <View style={{ paddingHorizontal: 20, paddingTop: 26 }}>
      <MyText
        size={20}
        text="Proposal Details"
        textColor={theme.dark ? "#ffffff" : "#000000"}
        weight="600"
      />
      <View
        style={{
          marginTop: 20,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <MyAvatar
          imageUrl="https://i.pravatar.cc/150?img=68"
          size={45}
          status="online"
        />
        <View style={{ marginLeft: 7 }}>
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
      <View
        style={{
          flexDirection: "row",
          marginTop: 10,
          justifyContent: "flex-end",
        }}
      >
        <MyButton
          backgroundColor={theme.colors.background}
          label="Reject"
          textColor={theme.colors.primary}
          style={{
            borderWidth: 1,
            borderColor: theme.colors.primary,
            borderRadius: 4,
            paddingVertical: 8,
            paddingHorizontal: 27,
          }}
        />
        <GapView mode="horizontal" />
        <MyButton
          backgroundColor={theme.colors.primary}
          label="Connect"
          textColor={theme.colors.background}
          style={{
            borderRadius: 4,
            paddingVertical: 8,
            paddingHorizontal: 27,
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
