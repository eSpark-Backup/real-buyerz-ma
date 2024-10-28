import React, { useEffect, useMemo, useRef, useState } from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { useTheme } from "@react-navigation/native";

import Card from "@components/Card";
import MyText from "@components/MyText";
import { MyTheme, SearchDataProps, SearchListProps } from "@types";
import { RentTab, SellTab } from "@assets/images";

interface TabFilterProps {
  data: SearchDataProps[];
  onSelect: (value: SearchListProps[]) => void;
  wrap?: boolean;
  isSearch?: boolean;
  multiSelect?: boolean; // New prop for multi/single select toggle
}

export default function TabFilter({
  data,
  onSelect,
  wrap,
  isSearch,
  multiSelect = true, // Default to multi-select if not provided
}: TabFilterProps) {
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
        selected: multiSelect ? (i === index ? !listItem.selected : listItem.selected) : i === index,
      }));

      if (!multiSelect) {
        setSelectedItem(updatedList[index]);
      }

      return updatedList;
    });
  };

  const handleItemSelect = (index: number) => {
    if (!selectedItem) return;
    const updatedList = selectedItem.list.map((nestedItem, i) => ({
      ...nestedItem,
      selected: multiSelect
        ? i === index
          ? !nestedItem.selected
          : nestedItem.selected
        : i === index,
    }));
    const updatedSelectedItem = { ...selectedItem, list: updatedList };
    setSelectedItem(updatedSelectedItem);
    onSelect(updatedSelectedItem?.list?.filter(val => val.selected));
  };

  useEffect(() => {
    const selected = list?.find((item) => item.selected);
    setSelectedItem(selected || null);

    if (scrollViewRef.current && selected) {
      scrollViewRef.current.scrollTo({
        x: 0,
        animated: true,
      });
    }
  }, [list]);

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
            activeOpacity={1}
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
              <MyText
                text={item.title}
                size={16}
                textColor={
                  item.selected ? theme.colors.primary : theme.colors.text
                }
              />
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
      {memoizedSelectedItem && (
        <ScrollView
          ref={scrollViewRef}
          horizontal={!wrap}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            flexGrow: 1,
            flexDirection: "row",
            rowGap: 10,
            padding: 10,
            flexWrap: "wrap",
          }}
        >
          {memoizedSelectedItem.list.map((nestedItem, nestedIndex) => (
            <TouchableOpacity
              activeOpacity={1}
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
                flexDirection: "row",
                gap: 5,
              }}
            >
              {isSearch ? null : nestedItem.selected ? (
                <SellTab />
              ) : (
                <RentTab />
              )}
              <MyText
                text={nestedItem.label}
                size={12}
                textColor={
                  nestedItem.selected ? theme.colors.primary : theme.colors.text
                }
              />
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
    </Card>
  );
}

const styles = StyleSheet.create({});
