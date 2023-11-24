import { StyleSheet, Text, View } from "react-native";
import React from "react";
import MyText from "components/MyText";
import MyAvatar from "components/MyAvatar";

export interface IList {
  id?: number;
  title: string;
  subTitle: string;
  time: string;
  count?: string;
  avatarUrl: string;
}

export default function InboxList({
  id,
  title,
  subTitle,
  time,
  count,
  avatarUrl,
}: IList) {
  return (
    <View style={styles.wrapper}>
      <View style={[styles.dflex, count ? styles.countStyle : null]}>
        <View style={styles.avatarStyle}>
          <MyAvatar size={50} imageUrl={avatarUrl} />
        </View>
        <View style={styles.textStyle}>
          <MyText text={title} size={16} weight="500" />
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
      <View style={styles.divider} />
    </View>
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
    paddingRight: 20,
    height: 95,
  },
  avatarStyle: {
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    flex: 1,
  },
  textStyle: {
    flex: 3,
  },
  dateTimeStyle: {
    flex: 1,
    height: "100%",
    alignItems: "center",
    justifyContent: "space-around",
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
  countStyle: {
    backgroundColor: "#FFF9F6",
    paddingHorizontal: 10,
    paddingVertical: 15,
  },
  divider: {
    borderBottomColor: "#E9E9E9",
    borderBottomWidth: 1,
    width: "85%",
    margin: "auto",
  },
});
