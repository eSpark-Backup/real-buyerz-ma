import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useTheme } from "@react-navigation/native";

import MyText from "@components/MyText";
import { MyTheme } from "@types";

interface TopTabsProps {
  data: { title: string; selected: boolean }[];
}

export default function MyTopTabs({ data }: TopTabsProps) {
  const theme = useTheme() as MyTheme;

  const Tab = ({ label, selected }: { label: string; selected: boolean }) => {
    return (
      <View
        style={{
          height: "100%",
          borderBottomWidth: selected ? 2 : 0,
          paddingHorizontal: 25,
          paddingVertical: 15,
          borderColor: theme.colors.primary,
        }}
      >
        <MyText text={label} size={16} textColor={theme.colors.negative} />
      </View>
    );
  };

  return (
    <View
      style={{
        ...styles(theme).container,
        paddingHorizontal: data.length % 2 ? 25 : 75,
      }}
    >
      {data.map((item, index) => (
        <Tab key={index} label={item.title} selected={item.selected} />
      ))}
    </View>
  );
}

const styles = (theme: MyTheme) =>
  StyleSheet.create({
    container: {
      flexDirection: "row",
      width: "100%",
      justifyContent: "space-between",
      borderBottomWidth: 1,
      borderColor: theme.colors.border,
    },
  });
