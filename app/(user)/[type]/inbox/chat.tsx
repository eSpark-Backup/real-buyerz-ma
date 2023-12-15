import React from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import { useTheme } from "@react-navigation/native";
import { Entypo } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { Card, MyFab, MyInput, MyText } from "@components";
import { MyTheme } from "@types";
import { SendFlag } from "@assets/images";

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
  const theme = useTheme() as MyTheme;
  return (
    <View style={{ paddingHorizontal: 10, marginBottom: 40 }}>
      <Card radius={9} style={{ height: "100%" }}>
        {renderHeader(theme)}
        <FlatList
          data={testData}
          showsVerticalScrollIndicator={false}
          renderItem={renderList}
        />
        {renderFooter(theme)}
      </Card>
    </View>
  );
}

const renderHeader = (theme?: MyTheme) => {
  return (
    <View style={styles.header}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Image
          source={{ uri: "https://i.pravatar.cc/300" }}
          style={{ width: 35, height: 35, borderRadius: 35, marginRight: 20 }}
        />
        <MyText
          text="Jane Doe"
          size={18}
          weight="400"
          textColor={theme?.dark ? "#ffffff" : "#000000"}
        />
      </View>
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
            ? { flex: 1, alignItems: "flex-start" }
            : {
                flex: 1,
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

const renderFooter = (theme?: MyTheme) => {
  return (
    <View style={styles.footer}>
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          alignItems: "center",
          borderWidth: 1,
          paddingVertical: 10,
          paddingHorizontal: 15,
          borderRadius: 50,
          borderColor: theme?.colors.border,
        }}
      >
        <MyFab
          items={[
            {
              key: "1",
              icon: "image-area",
              onPress: () => console.log("hello"),
            },
            { key: "2", icon: "paperclip" },
            { key: "3", icon: "microphone" },
          ]}
        />
        <MyInput
          placeholder="Write Message"
          style={styles.inputContainer}
          inputStyle={styles.inputStyle}
        />
      </View>
      <TouchableOpacity
        onPress={() => console.log("send message")}
        style={{ flex: 0.1, marginLeft: 12 }}
      >
        <SendFlag />
      </TouchableOpacity>
    </View>
  );
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
    paddingBottom: 5,
  },
  incoming: {
    padding: 10,
    borderRadius: 10,
    borderTopLeftRadius: 0,
    backgroundColor: "#F1F1F1",
  },
  outgoing: {
    padding: 10,
    borderRadius: 10,
    borderBottomRightRadius: 0,
    backgroundColor: "#FFEEE7",
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    height: 60,
    // flex: 1,
  },
  inputContainer: {
    flexDirection: "row",
    backgroundColor: "transparent",
    paddingHorizontal: 0,
    borderRadius: 0,
    alignItems: "flex-start",
    elevation: 0,
    flex: 1,
  },
  inputStyle: {
    padding: 0,
    fontSize: 14,
    fontWeight: "300",
    fontFamily: "Inter",
  },
});
