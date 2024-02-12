import React, { useEffect, useMemo, useRef, useState } from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { useTheme } from "@react-navigation/native";

import Card from "@components/Card";
import MyText from "@components/MyText";
import { MyTheme, SearchDataProps } from "@types";
import { RentTab, SellTab } from "@assets/images";

interface TabFilterProps {
  data: SearchDataProps[];
  onSelect: (value: object) => void;
  wrap?: boolean;
}

export default function TabFilter({ data, onSelect, wrap }: TabFilterProps) {
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
              {nestedItem.selected ? <SellTab /> : <RentTab />}
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
