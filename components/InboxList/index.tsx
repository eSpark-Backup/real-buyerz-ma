import React from "react";
import { Appearance, StyleSheet, View, TouchableOpacity } from "react-native";
import { useTheme } from "@react-navigation/native";

import MyText from "@components/MyText";
import MyAvatar from "@components/MyAvatar";
import { MyTheme } from "@types";

export interface IList {
  title: string;
  subTitle: string;
  time: string;
  count?: string;
  avatarUrl: string;
  onPress?: () => void;
}

export default function InboxList({
  title,
  subTitle,
  time,
  count,
  avatarUrl,
  onPress,
}: IList) {
  const theme = useTheme() as MyTheme;

  return (
    <TouchableOpacity
      activeOpacity={1}
      style={styles(theme).wrapper}
      onPress={onPress}
    >
      <View
        style={[styles(theme).dflex, count ? styles(theme).countStyle : null]}
      >
        <View style={styles(theme).avatarStyle}>
          <MyAvatar size={50} imageUrl={{ uri: avatarUrl }} />
        </View>
        <View style={styles(theme).textStyle}>
          <MyText
            text={title}
            size={15}
            weight="500"
            textColor={theme.colors.text}
          />
          <MyText
            text={subTitle}
            size={12}
            weight="400"
            textColor={theme.colors.dimText}
            numberOfLines={2}
          />
        </View>
        <View style={styles(theme).dateTimeStyle}>
          <MyText text={time} size={10} textColor={theme.colors.dimText} />
          {count && (
            <View style={styles(theme).circle}>
              <MyText text={count} size={12} textColor="#ffffff" />
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = (theme?: MyTheme) =>
  StyleSheet.create({
    wrapper: {
      alignItems: "center",
    },
    dflex: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      height: 95,
      paddingHorizontal: 10,
      paddingVertical: 15,
    },
    countStyle: {
      backgroundColor: theme?.colors.primary + "11",
      paddingHorizontal: 10,
      paddingVertical: 15,
      overflow: "hidden",
    },
    avatarStyle: {
      flex: 1,
      justifyContent: "center",
      alignContent: "center",
      alignItems: "center",
    },
    textStyle: {
      flex: 3,
    },
    dateTimeStyle: {
      flex: 1,
      height: "100%",
      alignItems: "center",
      paddingVertical: 5,
      gap: 5,
    },
    circle: {
      backgroundColor: "#126FAAd9",
      borderRadius: 50,
      borderWidth: 1,
      borderColor: "#126FAA",
      justifyContent: "center",
      alignItems: "center",
      width: 25,
      height: 25,
      marginTop: 3,
    },
    divider: {
      borderBottomColor: "#E9E9E9",
      borderBottomWidth: 1,
      width: "85%",
      margin: "auto",
    },
  });
