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
interface MyComponentProps {
  children: ReactNode;
}

const Inbox: React.FC<MyComponentProps> = ({ children }) => {
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
        <View style={styles.tabsStyle}>
          <TouchableOpacity>
            <ReloadIcon />
          </TouchableOpacity>
          <TouchableOpacity
            style={tab === "inbox" ? styles.selectedTab : null}
            onPress={() => handleTab("inbox")}
          >
            <MyText
              text="Inbox"
              size={16}
              textColor={tab === "inbox" ? colors.dark.primary : "#000000"}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleTab("archieve")}
            style={tab === "archieve" ? styles.selectedTab : null}
          >
            <MyText
              text="Archive"
              size={16}
              textColor={tab === "archieve" ? colors.dark.primary : "#000000"}
            />
          </TouchableOpacity>
        </View>
        {tab === "inbox" && (
          <FlatList
            data={listData}
            showsHorizontalScrollIndicator={false}
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
        {tab === "archive" && <View>{children}</View>}
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
    height: 650,
    borderWidth: 1,
  },
  tabsStyle: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    padding: 15,
    width: "60%",
  },
  selectedTab: {
    borderBottomColor: "#FB631C",
    color: "#FB631C",
    borderBottomWidth: 2,
  },
});
