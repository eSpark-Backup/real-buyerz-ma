import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
} from "react-native";
import React, { useState, ReactNode } from "react";
import { ReloadIcon } from "@assets/images/svg";
import { MyText } from "@components";
import InboxList from "components/InboxList";
import { colors } from "@theme";
import { IList } from "components/InboxList";

const Inbox: React.FC = () => {
  const [tab, setTab] = useState("inbox");
  const handleTab = (buttonName: string) => {
    if (tab !== buttonName) {
      setTab(buttonName);
    }
  };

  const listData: IList[] = [
    {
      id: 0,
      title: "John Doe",
      subTitle: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
      time: "10:00 AM",
      count: "1",
      avatarUrl: "https://picsum.photos/id/151/130",
    },
    {
      id: 1,
      title: "John Doe",
      subTitle: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
      time: "10:00 AM",
      avatarUrl: "https://picsum.photos/id/151/130",
    },
    {
      id: 2,
      title: "John Doe",
      subTitle: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
      time: "10:00 AM",
      count: "1",
      avatarUrl: "https://picsum.photos/id/151/130",
    },
    {
      id: 3,
      title: "John Doe",
      subTitle: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
      time: "10:00 AM",
      avatarUrl: "https://picsum.photos/id/151/130",
    },
    {
      id: 4,
      title: "John Doe",
      subTitle: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
      time: "10:00 AM",
      count: "1",
      avatarUrl: "https://picsum.photos/id/151/130",
    },
    {
      id: 5,
      title: "John Doe",
      subTitle: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
      time: "10:00 AM",
      count: "1",
      avatarUrl: "https://picsum.photos/id/151/130",
    },
  ];
  return (
    <View style={styles.wrapper}>
      <View style={styles.card}>
        <View style={styles.tabRow}>
          <View style={styles.tabsStyle}>
            <TouchableOpacity>
              <ReloadIcon />
            </TouchableOpacity>
            <View>
              <TouchableOpacity
                style={[
                  styles.singleTab,
                  tab === "inbox" ? styles.selectedTab : null,
                ]}
                onPress={() => handleTab("inbox")}
              >
                <MyText
                  text="Inbox"
                  size={17}
                  textColor={tab === "inbox" ? colors.dark.primary : "#000000"}
                />
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              onPress={() => handleTab("archieve")}
              style={[
                styles.singleTab,
                tab === "archieve" ? styles.selectedTab : null,
              ]}
            >
              <MyText
                text="Archive"
                size={17}
                textColor={tab === "archieve" ? colors.dark.primary : "#000000"}
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
              />
            )}
          />
        )}
        {tab === "archive" && (
          <View>
            <MyText text="Archive" />
          </View>
        )}
      </View>
    </View>
  );
};
export default Inbox;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    padding: 20,
  },
  card: {
    borderRadius: 15,
    borderColor: "#E9E9E9",
    height: 580,
    borderWidth: 1,
    padding: 0,
  },
  tabRow: {
    paddingTop: 8,
    paddingStart: 4,
    borderBottomColor: "#E9E9E9",
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
    borderBottomColor: "#FB631C",
    borderBottomWidth: 2,
    paddingBottom: 4,
  },
  tabColor: {
    color: "#FB631C",
  },
});
