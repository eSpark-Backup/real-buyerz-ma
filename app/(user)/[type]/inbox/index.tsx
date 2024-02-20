import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, View, FlatList } from "react-native";
import { useTheme } from "@react-navigation/native";
import { router, useLocalSearchParams } from "expo-router";

import { ReloadIcon } from "@assets/images";
import { MyText, InboxList, Card } from "@components";
import { MyTheme, UserType } from "@types";

const Inbox: React.FC = () => {
  const theme = useTheme() as MyTheme;
  const [tab, setTab] = useState("inbox");
  const params = useLocalSearchParams<{ type: UserType }>();

  const handleTab = (buttonName: string) => {
    if (tab !== buttonName) {
      setTab(buttonName);
    }
  };

  const listData = [
    {
      title: "John Doe",
      subTitle: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
      time: "10:00 AM",
      count: "1",
      avatarUrl: "https://picsum.photos/id/151/130",
    },
    {
      title: "John Doe",
      subTitle: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
      time: "10:00 AM",
      avatarUrl: "https://mui.com/static/images/avatar/2.jpg",
    },
    {
      title: "John Doe",
      subTitle: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
      time: "10:00 AM",
      count: "3",
      avatarUrl: "https://mui.com/static/images/avatar/1.jpg",
    },
    {
      title: "John Doe",
      subTitle: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
      time: "10:00 AM",
      avatarUrl: "https://mui.com/static/images/avatar/3.jpg",
    },
    {
      title: "John Doe",
      subTitle: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
      time: "10:00 AM",
      count: "5",
      avatarUrl: "https://picsum.photos/id/151/130",
    },
    {
      title: "John Doe",
      subTitle: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
      time: "10:00 AM",
      count: "2",
      avatarUrl: "https://picsum.photos/id/151/130",
    },
    {
      title: "John Doe",
      subTitle: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
      time: "10:00 AM",
      avatarUrl: "https://picsum.photos/id/151/130",
    },
  ];

  return (
    <View style={styles(theme).wrapper}>
      <View style={styles(theme).card}>
        <View style={styles(theme).tabRow}>
          <View style={styles(theme).tabsStyle}>
            <TouchableOpacity activeOpacity={1}>
              <ReloadIcon />
            </TouchableOpacity>
            <View>
              <TouchableOpacity
                activeOpacity={1}
                style={[
                  styles(theme).singleTab,
                  tab === "inbox" ? styles(theme).selectedTab : null,
                ]}
                onPress={() => handleTab("inbox")}
              >
                <MyText
                  text="Inbox"
                  size={17}
                  textColor={
                    tab === "inbox" ? theme.colors.primary : theme.colors.text
                  }
                />
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => handleTab("archieve")}
              style={[
                styles(theme).singleTab,
                tab === "archieve" ? styles(theme).selectedTab : null,
              ]}
            >
              <MyText
                text="Archive"
                size={17}
                textColor={
                  tab === "archieve" ? theme.colors.primary : theme.colors.text
                }
              />
            </TouchableOpacity>
          </View>
        </View>
        {tab === "inbox" && (
          <FlatList
            data={listData}
            showsVerticalScrollIndicator={false}
            renderItem={({ item, index }) => (
              <InboxList
                key={index}
                title={item.title}
                subTitle={item.subTitle}
                time={item.time}
                count={item.count}
                avatarUrl={item.avatarUrl}
                onPress={() =>
                  router.push(`(user)/${params?.type!}/inbox/chat`)
                }
              />
            )}
            ItemSeparatorComponent={() => (
              <Card.Divider style={{ width: "85%", alignSelf: "center" }} />
            )}
          />
        )}
        {tab === "archive" && <MyText text="Archive" />}
      </View>
    </View>
  );
};
export default Inbox;

const styles = (theme?: MyTheme) =>
  StyleSheet.create({
    wrapper: {
      flex: 1,
      paddingHorizontal: 20,
      paddingTop: 20,
      height: "100%",
    },
    card: {
      borderRadius: 15,
      borderColor: theme?.colors.border,
      height: "100%",
      borderWidth: 1,
      padding: 0,
      overflow: "hidden",
    },
    tabRow: {
      paddingTop: 8,
      paddingStart: 4,
      borderBottomColor: theme?.colors.border,
      borderBottomWidth: 1,
    },
    tabsStyle: {
      justifyContent: "space-between",
      alignItems: "center",
      flexDirection: "row",
      width: "60%",
      paddingHorizontal: 15,
    },
    singleTab: {
      height: 40,
      justifyContent: "center",
    },
    selectedTab: {
      borderBottomColor: theme?.colors.primary,
      borderBottomWidth: 2,
      paddingBottom: 4,
    },
    tabColor: {
      color: theme?.colors.primary,
    },
  });
