import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useTheme } from "@react-navigation/native";

import { MyText } from "@components";
import { MyTheme } from "@types";

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
    </View>
  );
}

const styles = StyleSheet.create({});
