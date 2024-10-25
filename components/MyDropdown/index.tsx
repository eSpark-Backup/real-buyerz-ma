import React, { useState } from "react";
import {
  Pressable,
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import { Entypo, Feather } from "@expo/vector-icons";
import { ScrollView } from "react-native-gesture-handler"; //? for scrolling inside a absolute view

import MyText from "@components/MyText";
import { MyTheme } from "@types";

interface DropdownProps {
  data: string[];
  placeholder?: string;
  multiSelect?: boolean;
  zIndex?: number;
  onSelect: ({ key, value }: { key: string; value: string | string[] }) => void;
  style?: StyleProp<ViewStyle>;
  placeholderColor?: string;
  containerStyle?: ViewStyle;
  height?: number;
  title?: string;
  bgColor?: string;
  theme: MyTheme;
  id: string;
  selected?: string[] | null
}

export default function MyDropdown({
  data,
  onSelect,
  placeholder = "",
  zIndex = 10,
  multiSelect = false,
  style,
  placeholderColor,
  containerStyle,
  height = 30,
  title,
  bgColor,
  theme,
  id,
  selected
}: DropdownProps) {
  const [show, setShow] = useState(false);
  const [selectedItems, setSelectedItems] = useState<string[]>(selected ?? []);
  const [label, setLabel] = useState(selected ?? "");
  const listData = multiSelect ? ["All", ...data] : data;


  const handleSelection = (item: string) => {
    let updatedSelection: string[] = [...selectedItems];

    if (item === "All") {
      updatedSelection =
        updatedSelection.length === data.length ? [] : [...data];
    } else {
      const index = updatedSelection.indexOf(item);
      if (index === -1) {
        if (multiSelect) {
          updatedSelection.push(item);
        } else {
          updatedSelection = [item];
        }
      } else {
        updatedSelection.splice(index, 1);
      }

      const allIndex = updatedSelection.indexOf("All");
      if (allIndex !== -1) {
        updatedSelection.splice(allIndex, 1);
      }
    }

    setSelectedItems(updatedSelection);
    onSelect({key: id, value: updatedSelection});

    if (!multiSelect && updatedSelection.length > 0) {
      setLabel(item);
    } else if (updatedSelection.length === data.length) {
      setLabel("All");
    } else {
      setLabel(
        updatedSelection.length > 0
          ? `${updatedSelection.length}+ ${placeholder}`
          : `Select ${placeholder}`
      );
    }
  };

  const isSelected = (item: string) => {
    return (
      (item === "All" && selectedItems.length === data.length) ||
      (item !== "All" && selectedItems.includes(item))
    );
  };

  return (
    <View>
      {title && (
        <MyText
          text={title}
          style={{ alignSelf: "flex-start", paddingBottom: 10 }}
          size={15}
          weight="400"
          textColor={theme.colors.text}
        />
      )}

      <View
        style={[
          style,
          { height },
        ]}
      >
        <Pressable
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            height: "100%",
            paddingHorizontal: 15,
            borderColor: theme.colors.border,
            borderWidth: 1,
            borderBottomRightRadius: 5,
            borderBottomLeftRadius: 5,
          }}
          onPress={() => setShow(!show)}
        >
          <MyText
            text={label ? label?.toString() : `${placeholder}`}
            textColor={placeholderColor ? placeholderColor : "#969696"}
          />
          <Entypo
            name={!show ? "chevron-down" : "chevron-up"}
            color={"#66666666"}
            size={16}
          />
        </Pressable>

        {show && (
          <Pressable
            style={{
              position: "absolute",
              width: "100%",
              zIndex: 1,
              borderColor: theme.colors.border,
              borderWidth: 1,
              borderBottomRightRadius: 5,
              borderBottomLeftRadius: 5,
            }}
            onPress={() => setShow(!show)}
          >
            <ScrollView
              removeClippedSubviews
              keyboardShouldPersistTaps="handled"
              style={{
                overflow: "hidden",
                top: height - 2,
                backgroundColor: bgColor ? bgColor : theme.colors.background,
                borderColor: theme.colors.border,
                borderWidth: 1,
                borderBottomRightRadius: 5,
                borderBottomLeftRadius: 5,
                height: listData.length > 3 ? 120 : "auto",
              }}
              contentContainerStyle={{
                flexGrow: 1,
                justifyContent: "space-between",
                overflow: "hidden",
                zIndex: zIndex + 200,
              }}
            >
              {listData.map((item, index) =>
                renderList({
                  item,
                  index,
                  handleSelection,
                  height,
                  isSelected,
                  multiSelect,
                  setShow,
                  theme,
                })
              )}
            </ScrollView>
          </Pressable>
        )}
      </View>
    </View>
  );
}

const renderList = ({
  item,
  index,
  multiSelect,
  height,
  handleSelection,
  isSelected,
  setShow,
  theme,
}: {
  item: string;
  index: number;
  multiSelect: boolean;
  height: number;
  handleSelection: (val: string) => void;
  isSelected: (val: string) => boolean;
  setShow: (val: boolean) => void;
  theme: MyTheme;
}) => {
  return (
    <TouchableOpacity
      activeOpacity={1}
      key={index}
      style={{
        overflow: "hidden",
        height: height,
        borderTopWidth: index > 0 ? 1 : 0,
        justifyContent: "space-between",
        borderColor: theme.colors.border,
        paddingHorizontal: 15,
        flexDirection: "row",
        alignItems: "center",
        zIndex: 100,
        width: '100%'
      }}
      onPress={() => {
        if (!multiSelect) {
          setShow(false);
        }
        handleSelection(item);
      }}
    >
      <MyText text={item} textColor={theme.colors.text} />
      {isSelected(item) && <Feather name="check" size={16} color="#34e145" />}
    </TouchableOpacity>
  );
};

const styles = (theme?: MyTheme) =>
  StyleSheet.create({
    container: {
      width: 150,
      // height: 30,
      borderWidth: 1,
      borderRadius: 5,
      borderColor: theme?.colors.border,
      alignItems: "center",
    },
  });