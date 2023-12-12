import React from "react";
import { StyleSheet, Text, View, FlatList, Image } from "react-native";
import { Entypo } from "@expo/vector-icons";

import { Card, MyText } from "@components";

interface Chat {
  message: string;
  timestamp: Date;
  sender: Sender;
}

interface Sender {
  tag: "me" | "other";
  image: string;
}

const date = new Date();

const testData: Chat[] = [
  {
    message:
      "Hello, finally i found time to text you please help in finding the right home for me. Lorem ipsum.",
    timestamp: date,
    sender: { tag: "other", image: "https://i.pravatar.cc/300" },
  },
  {
    message: "Will you?",
    timestamp: date,
    sender: { tag: "other", image: "https://i.pravatar.cc/300" },
  },
  {
    message: "Hi, sure!",
    timestamp: date,
    sender: { tag: "me", image: "https://i.pravatar.cc/300" },
  },
  {
    message: "Call?",
    timestamp: date,
    sender: { tag: "other", image: "https://i.pravatar.cc/300" },
  },
  {
    message:
      "You can directly liaise with me about the range. We want to negotiate a settlement that is fair to both sides. Lorem Ipsum,",
    timestamp: date,
    sender: { tag: "me", image: "https://i.pravatar.cc/300" },
  },
];

export default function ChatScreen() {
  return (
    <View style={{ paddingHorizontal: 10, marginBottom: 40 }}>
      <Card radius={9} style={{ height: "100%" }}>
        <FlatList
          data={testData}
          renderItem={renderList}
          ListHeaderComponent={renderHeader}
          ListFooterComponent={renderFooter}
        />
      </Card>
    </View>
  );
}

const renderHeader = () => {
  return (
    <View style={styles.header}>
      <Image
        source={{ uri: "https://i.pravatar.cc/300" }}
        style={{ width: 35, height: 35, borderRadius: 35 }}
      />
      <Entypo name="dots-three-vertical" size={18} color="black" />
    </View>
  );
};

const renderList = ({ item, index }: { item: Chat; index: number }) => {
  return (
    <View style={styles.content}>
      {item.sender.tag == "other" ? (
        <Image
          source={{ uri: "https://i.pravatar.cc/300" }}
          style={{ width: 25, height: 25, borderRadius: 25, marginRight: 10 }}
        />
      ) : (
        <View
          style={{ width: 25, height: 25, borderRadius: 25, marginRight: 10 }}
        />
      )}
      <View
        style={
          item.sender.tag == "other"
            ? {
                backgroundColor: "pink",
              }
            : {
                backgroundColor: "pink",
                width: "100%",
                flexDirection: "row-reverse",
              }
        }
      >
        <View
          style={item.sender.tag == "other" ? styles.incoming : styles.outgoing}
        >
          <MyText
            text={item.message}
            weight="400"
            size={12}
            style={{ textAlign: item.sender.tag == "other" ? "left" : "right" }}
          />
        </View>
      </View>
    </View>
  );
};

const renderFooter = () => {
  return <View style={styles.footer}></View>;
};

const styles = StyleSheet.create({
  header: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#e9e9e9",
  },
  content: {
    width: "100%",
    flexDirection: "row",
    padding: 20,
    backgroundColor: "yellow",
  },
  incoming: {
    padding: 10,
    borderRadius: 10,
    borderTopLeftRadius: 0,
    backgroundColor: "#F1F1F1",
  },
  outgoing: {
    alignSelf: "flex-end",
    padding: 10,
    borderRadius: 10,
    borderBottomRightRadius: 0,
    backgroundColor: "#FFEEE7",
    marginRight: 25,
  },
  footer: {},
});
