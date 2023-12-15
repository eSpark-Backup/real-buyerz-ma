import React, { useEffect } from "react";
import {
  Appearance,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import { useTheme } from "@react-navigation/native";

import MyText from "../MyText";
import MyAvatar from "../MyAvatar";
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
  const colorScheme = Appearance.getColorScheme();

  return (
    <TouchableOpacity style={styles.wrapper} onPress={onPress}>
      <View style={[styles.dflex, count ? styles.countStyle : null]}>
        <View style={styles.avatarStyle}>
          <MyAvatar size={50} imageUrl={avatarUrl} />
        </View>
        <View style={styles.textStyle}>
          <MyText
            text={title}
            size={16}
            weight="500"
            textColor={colorScheme === "dark" ? "#919090" : theme.colors.text}
          />
          <MyText text={subTitle} textColor="#909394" />
        </View>
        <View style={styles.dateTimeStyle}>
          <MyText text={time} size={13} textColor="#898989" />
          {count && (
            <View style={styles.circle}>
              <MyText text={count} textColor="#ffffff" />
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
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
    backgroundColor: "#FFF9F6",
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
    justifyContent: "space-around",
    paddingEnd: 4,
  },
  circle: {
    backgroundColor: "#126FAA",
    borderRadius: 25,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    width: 35,
    height: 35,
    marginTop: 3,
  },
  divider: {
    borderBottomColor: "#E9E9E9",
    borderBottomWidth: 1,
    width: "85%",
    margin: "auto",
  },
});
