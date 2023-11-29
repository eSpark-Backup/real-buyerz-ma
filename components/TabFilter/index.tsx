import React, { useEffect, useRef, useState } from "react";
import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import Card from "components/Card";
import MyText from "components/MyText";
import { SearchDataProps } from "@types";

interface TabFilterProps {
  data: SearchDataProps[];
  onSelect: (value: object) => void;
}

export default function TabFilter({ data, onSelect }: TabFilterProps) {
  const [list, setList] = useState<SearchDataProps[] | null>(data);
  const [selectedItem, setSelectedItem] = useState<SearchDataProps | null>(
    null
  );
  const scrollViewRef = useRef<ScrollView>(null);
  const savedScrollPosition = useRef<number>(0);

  const handleSelect = (index: number) => {
    setList((prevList): SearchDataProps[] =>
      (prevList || []).map(
        (listItem, i): SearchDataProps => ({
          ...listItem,
          selected: i === index, // Set only the clicked item's selected property to true
        })
      )
    );
  };

  useEffect(() => {
    // Use the last item in the updated 'list' as the selected item
    const selectedItem = list?.find((item) => item.selected);
    if (selectedItem) {
      setSelectedItem(selectedItem);
    }
  }, [list]);

  useEffect(() => {
    if (scrollViewRef.current && selectedItem) {
      scrollViewRef.current.scrollTo({
        x: savedScrollPosition.current,
        animated: false,
      });
    }
    onSelect(selectedItem!);
  }, [selectedItem]);

  const handleScroll = (event: any) => {
    if (scrollViewRef.current) {
      savedScrollPosition.current = event.nativeEvent.contentOffset.x;
    }
  };

  const handleItemSelect = (index: number) => {
    const data = [...selectedItem?.list!];
    data[index].selected = !data[index].selected;
    setSelectedItem((state) => ({ ...state, list: data } as SearchDataProps));
  };

  return (
    <Card
      style={{
        width: "100%",
        elevation: 0,
      }}
    >
      <ScrollView
        ref={scrollViewRef}
        onScroll={handleScroll}
        key={Math.random().toString(36).substring(2) + "_s1"}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: "space-around",
          alignItems: "center",
        }}
        style={{ borderBottomWidth: 1, borderColor: "#E9E9E9" }}
      >
        {list?.map((item, index) => (
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
      {selectedItem && (
        <ScrollView
          key={Math.random().toString(36).substring(2) + "_s2"}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            flexGrow: 1,
            padding: 10,
          }}
        >
          {selectedItem.list.map((nestedItem, nestedIndex) => (
            <TouchableOpacity
              key={nestedIndex.toString()}
              onPress={() => handleItemSelect(nestedIndex)}
              style={{
                padding: 8,
                borderWidth: 1,
                borderColor: "#e9e9e9",
                borderRadius: 4,
                backgroundColor: nestedItem.selected ? "#EDF7FF" : "#FFFFFF",
                marginRight:
                  nestedIndex !== selectedItem.list.length - 1 ? 10 : 0,
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
