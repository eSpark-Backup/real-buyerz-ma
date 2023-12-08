import React from "react";
import { StyleSheet, View } from "react-native";
import { useTheme } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";

import { Card, MyButton, MyText } from "@components";
import { MyTheme } from "@types";

export default function Listings() {
  const theme = useTheme() as MyTheme;

  return (
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
          <View style={{ paddingVertical: 17, paddingHorizontal: 11 }}>
            <Card></Card>
          </View>
        </Card>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 26,
    paddingHorizontal: 22,
  },
  top: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "pink",
    marginBottom: 17,
  },
  content: {},
});
