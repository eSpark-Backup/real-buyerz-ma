import React from "react";
import { StyleSheet, View, ScrollView } from "react-native";

import {
  MyText,
  MyAvatar,
  MyClickableCard,
  AddCard,
  SettingList,
} from "@components";
import { HeartIcon, ProfileIcon } from "@assets/images";

export default function Settings() {
  const listData = [
    {
      title: "Notifications",
      indexIcon: 0,
    },
    {
      title: "Preferences",
      indexIcon: 1,
    },
    {
      title: "Feedback",
      indexIcon: 2,
    },
    {
      title: "Privacy Policy",
      indexIcon: 3,
    },
    {
      title: "Terms and Conditions",
      indexIcon: 4,
    },
    {
      title: "Logout",
      indexIcon: 5,
    },
  ];

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.wrapper}>
        <MyText text="Settings" weight="600" size={20} />
        <MyText
          size={12}
          style={styles.mt5}
          text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed venenatis gravida lectus nec sodales."
        />
        <View style={styles.dflexCenter}>
          <MyAvatar
            size={65}
            imageUrl={"https://mui.com/static/images/avatar/1.jpg"}
          />
          <MyText
            style={{ marginTop: 10 }}
            weight="600"
            size={16}
            text="Bilal Ahmed Khan"
          />
        </View>
        <View style={styles.dFlexJustify}>
          <MyClickableCard
            onPress={() => console.log("profile")}
            title="Profile Settings"
          >
            <ProfileIcon />
          </MyClickableCard>
          <MyClickableCard
            onPress={() => console.log("Favourites")}
            title="Favourites"
          >
            <HeartIcon />
          </MyClickableCard>
        </View>
        <AddCard
          label="Looking to sell or rent out your property?"
          btnLabel="Post an Ad"
        />
        <View style={styles.ListItemWrapper}>
          {listData.map((item, index) => (
            <SettingList
              title={item.title}
              key={index}
              indexIcon={item.indexIcon}
            />
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  dflexCenter: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 20,
  },
  dFlexJustify: {
    justifyContent: "space-between",
    flexDirection: "row",
    marginTop: 4,
  },
  ListItemWrapper: {
    marginTop: 15,
  },
  mt5: { marginTop: 5 },
});
