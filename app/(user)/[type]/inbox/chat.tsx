import React, { useState } from "react";
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
import { DarkTheme } from "@theme";

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
    sender: { tag: "other", image: "https://i.pravatar.cc/300?img=47" },
  },
  {
    message: "Will you?",
    timestamp: date,
    sender: { tag: "other", image: "https://i.pravatar.cc/300?img=47" },
  },
  {
    message: "Hi, sure!",
    timestamp: date,
    sender: { tag: "me", image: "https://i.pravatar.cc/300?img=47" },
  },
  {
    message: "Call?",
    timestamp: date,
    sender: { tag: "other", image: "https://i.pravatar.cc/300?img=47" },
  },
  {
    message:
      "You can directly liaise with me about the range. We want to negotiate a settlement that is fair to both sides. Lorem Ipsum,",
    timestamp: date,
    sender: { tag: "me", image: "https://i.pravatar.cc/300?img=47" },
  },
];

export default function ChatScreen() {
  const theme = useTheme() as MyTheme;
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  return (
    <View style={{ paddingHorizontal: 10 }}>
      <Card radius={9} style={{ height: "100%" }}>
        {renderHeader(toggleDropdown, theme)}
        <FlatList
          data={testData}
          showsVerticalScrollIndicator={false}
          renderItem={renderList}
        />
        {renderFooter(theme)}
        {isDropdownVisible && renderDropdown(theme)}
      </Card>
    </View>
  );
}

const renderDropdown = (theme?: MyTheme) => {
  return (
    <View style={styles(theme).dropdown}>
      <TouchableOpacity style={styles(theme).dropdownItem}>
        <MyText size={12} text="Mark as Unread"></MyText>
      </TouchableOpacity>
      <TouchableOpacity style={styles(theme).dropdownItem}>
        <MyText size={12} text="Block" />
      </TouchableOpacity>
      <TouchableOpacity style={styles(theme).dropdownItem}>
        <MyText size={12} text="Delete" />
      </TouchableOpacity>
      <TouchableOpacity style={styles(theme).dropdownItem}>
        <MyText size={12} text="Archive">
          Archive
        </MyText>
      </TouchableOpacity>
    </View>
  );
};

const renderHeader = (toggleDropdown: () => void, theme?: MyTheme) => {
  return (
    <View style={styles(theme).header}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Image
          source={{ uri: "https://i.pravatar.cc/300?img=47" }}
          style={{ width: 35, height: 35, borderRadius: 35, marginRight: 20 }}
        />
        <MyText
          text="Jane Doe"
          size={18}
          weight="400"
          textColor={theme?.colors.negative}
        />
      </View>
      <TouchableOpacity onPress={toggleDropdown}>
        <Entypo
          name="dots-three-vertical"
          size={18}
          color={theme?.colors.negative}
        />
      </TouchableOpacity>
    </View>
  );
};

const renderList = ({
  item,
  index,
  theme,
}: {
  item: Chat;
  index: number;
  theme?: MyTheme;
}) => {
  console.log("tag", testData[index - 1]?.sender?.tag === item.sender.tag);
  const isPreviousMsgSame =
    testData[index - 1]?.sender?.tag === item.sender.tag;
  return (
    <>
      <View
        style={[
          styles(theme).content,
          {
            paddingVertical: isPreviousMsgSame ? 0 : undefined,
          },
        ]}
      >
        {item.sender.tag == "other" && !isPreviousMsgSame ? (
          <Image
            source={{ uri: item.sender.image }}
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
            style={
              item.sender.tag == "other"
                ? styles(theme).incoming
                : styles(theme).outgoing
            }
          >
            <MyText
              text={item.message}
              weight="400"
              size={12}
              style={{
                textAlign: item.sender.tag == "other" ? "left" : "right",
              }}
              textColor={DarkTheme.colors.chat}
            />
          </View>
        </View>
      </View>
      {index == testData.length - 2 && (
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
          }}
        >
          <Card.Divider />
          <MyText
            text="2 days ago"
            textColor="#969696"
            size={10}
            style={{ paddingHorizontal: 10 }}
          />
          <Card.Divider />
        </View>
      )}
    </>
  );
};

const renderFooter = (theme?: MyTheme) => {
  return (
    <View style={styles(theme).footer}>
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
          style={styles(theme).inputContainer}
          inputStyle={styles(theme).inputStyle}
          placeholderColor={theme?.colors.placeholderText}
        />
      </View>
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => console.log("send message")}
        style={{ flex: 0.1, marginLeft: 12 }}
      >
        <SendFlag />
      </TouchableOpacity>
    </View>
  );
};

const styles = (theme?: MyTheme) =>
  StyleSheet.create({
    header: {
      paddingVertical: 12,
      paddingHorizontal: 20,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      borderBottomWidth: 1,
      borderBottomColor: theme?.colors.border,
    },
    content: {
      width: "100%",
      flexDirection: "row",
      padding: 20,
      // paddingBottom: 5,
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
      marginVertical: 12,
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
      color: theme?.colors.placeholderText,
      padding: 0,
      fontSize: 14,
      fontWeight: "300",
      fontFamily: "Inter",
      height: 20,
    },
    dropdown: {
      position: "absolute",
      top: 48,
      right: 10,
      backgroundColor: theme?.colors.background,
      borderRadius: 5,
      elevation: 3,
    },
    dropdownItem: {
      padding: 10,
      borderBottomWidth: 1,
      borderColor: theme?.colors.border,
    },
  });
