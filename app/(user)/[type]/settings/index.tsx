import React from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import { router } from "expo-router";

import {
  MyText,
  MyAvatar,
  MyClickableCard,
  SettingList,
  AdCard,
} from "@components";
import { HeartIcon, ProfileIcon } from "@assets/images";
import { useTheme } from "@react-navigation/native";
import { MyTheme } from "@types";

export default function Settings() {
  const theme = useTheme() as MyTheme;
  const handlePrefernecesPress = () => {
    console.log("Preferences");
    router.push("(user)/anon/settings/preferences");
  };

  const handleAnyPress = () => {
    console.log("static");
  };

  const listData = [
    {
      title: "Notifications",
      indexIcon: 0,
    },
    {
      title: "Preferences",
      indexIcon: 1,
      handlePress: handlePrefernecesPress,
    },
    {
      title: "Feedback",
      indexIcon: 2,
      handlePress: handleAnyPress,
    },
    {
      title: "Privacy Policy",
      indexIcon: 3,
      handlePress: handleAnyPress,
    },
    {
      title: "Terms and Conditions",
      indexIcon: 4,
      handlePress: handleAnyPress,
    },
    {
      title: "Logout",
      indexIcon: 5,
      handlePress: handleAnyPress,
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
          <View style={styles.cards}>
            <MyClickableCard
              onPress={() => {
                router.push("(user)/anon/settings/profileSettings");

                console.log("profile");
              }}
              title="Profile Settings"
            >
              <ProfileIcon />
            </MyClickableCard>
          </View>
          <View style={styles.cards}>
            <MyClickableCard
              onPress={() => {
                console.log("Favourites");
                router.push("(user)/anon/settings/favoritesList");
              }}
              title="Favourites"
            >
              <HeartIcon />
            </MyClickableCard>
          </View>
        </View>
        <AdCard
          label="Looking to sell or rent out your property?"
          btnLabel="Post an Ad"
          theme={theme}
        />
        <View style={styles.ListItemWrapper}>
          {listData.map((item, index) => (
            <SettingList
              title={item.title}
              key={index}
              indexIcon={item.indexIcon}
              onPress={item?.handlePress}
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
    paddingTop: 15,
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
    width: "100%",
    gap: 30,
  },
  ListItemWrapper: {
    marginTop: 15,
  },
  mt5: { marginTop: 5 },
  cards: {
    flex: 1,
  },
});
