import React, { useEffect, useMemo, useRef, useState } from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";

import Card from "../Card";
import MyText from "../MyText";
import { MyTheme, SearchDataProps } from "@types";
import { useTheme } from "@react-navigation/native";

interface TabFilterProps {
  data: SearchDataProps[];
  onSelect: (value: object) => void;
}

export default function TabFilter({ data, onSelect }: TabFilterProps) {
  const theme = useTheme() as MyTheme;
  const [list, setList] = useState<SearchDataProps[] | null>(data);
  const [selectedItem, setSelectedItem] = useState<SearchDataProps | null>(
    data[0]
  );
  const scrollViewRef = useRef<ScrollView>(null);

  const handleSelect = (index: number) => {
    setList((prevList) => {
      if (!prevList) return prevList;
      const updatedList = prevList.map((listItem, i) => ({
        ...listItem,
        selected: i === index ? true : false,
      }));

      return updatedList;
    });
  };

  const handleItemSelect = (index: number) => {
    setSelectedItem((prevState) => {
      if (!prevState) return prevState;

      const updatedList = [...prevState.list];
      updatedList[index].selected = !updatedList[index].selected;

      return { ...prevState, list: updatedList };
    });
  };

  useEffect(() => {
    // Use the last item in the updated 'list' as the selected item
    const selectedItem = list?.find((item) => item.selected);
    console.log(
      "🚀 ~ file: index.tsx:36 ~ useEffect ~ selectedItem:",
      selectedItem
    );
    setSelectedItem(selectedItem!);

    if (scrollViewRef.current && selectedItem) {
      scrollViewRef.current.scrollTo({
        x: 0,
        animated: true,
      });
    }
  }, [list]);

  useEffect(() => {
    onSelect(selectedItem!);
  }, [selectedItem, onSelect]);

  const memoizedList = useMemo((): SearchDataProps[] | null => list, [list]);
  const memoizedSelectedItem = useMemo(
    (): SearchDataProps | null => selectedItem,
    [selectedItem]
  );

  return (
    <Card
      style={{
        width: "100%",
        elevation: 0,
      }}
    >
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: "space-around",
          alignItems: "center",
        }}
        style={{ borderBottomWidth: 1, borderColor: theme.colors.border }}
      >
        {memoizedList?.map((item, index) => (
          <TouchableOpacity
            key={index.toString()}
            onPress={() => handleSelect(index)}
          >
            <View
              style={
                item.selected
                  ? {
                      borderBottomWidth: 2,
                      borderColor: "#FB631C",
                      padding: 15,
                    }
                  : { padding: 15 }
              }
            >
              <MyText text={item.title} size={16} />
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
      {memoizedSelectedItem && (
        <ScrollView
          ref={scrollViewRef}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            flexGrow: 1,
            padding: 10,
          }}
        >
          {memoizedSelectedItem.list.map((nestedItem, nestedIndex) => (
            <TouchableOpacity
              key={nestedIndex.toString()}
              onPress={() => handleItemSelect(nestedIndex)}
              style={{
                padding: 8,
                borderWidth: 1,
                borderColor: theme.colors.border,
                borderRadius: 4,
                backgroundColor: nestedItem.selected
                  ? theme.colors.selected
                  : theme.colors.cardBg,
                marginRight:
                  nestedIndex !== selectedItem?.list?.length! - 1 ? 10 : 0,
              }}
            >
              <MyText text={nestedItem.label} size={12} />
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
    </Card>
  );
}

const styles = StyleSheet.create({});
