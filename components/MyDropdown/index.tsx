import React, { useState } from "react";
import {
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import { Entypo, Feather } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";

import MyText from "../MyText";
import { MyTheme } from "@types";
import { ScrollView } from "react-native-gesture-handler";
import { colors } from "@theme";

interface DropdownProps {
  data: string[];
  placeholder?: string;
  multiSelect?: boolean;
  zIndex?: number;
  onSelect: (value: string | string[]) => void;
  style?: StyleProp<ViewStyle>;
  placeholderColor?: string;
  containerStyle?: ViewStyle;
  height?: number;
  title?: string;
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
}: DropdownProps) {
  const theme = useTheme() as MyTheme;
  const [show, setShow] = useState(false);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [label, setLabel] = useState("");
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
    onSelect(updatedSelection);

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
    <>
      {title && (
        <MyText
          text={title}
          style={{ alignSelf: "flex-start", paddingBottom: 10 }}
          size={15}
          weight="400"
        />
      )}
      <View
        style={[
          styles(theme).container,

          { zIndex: zIndex },
          show ? { borderBottomRightRadius: 0, borderBottomLeftRadius: 0 } : {},
          style,
          { height },
        ]}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            height: "100%",
            paddingHorizontal: 15,
            zIndex: zIndex - 2,
            ...containerStyle,
          }}
        >
          <MyText
            text={label ? label : `Select ${placeholder}`}
            textColor={placeholderColor ? placeholderColor : "#969696"}
          />
          <Entypo
            name={!show ? "chevron-down" : "chevron-up"}
            color={"#66666666"}
            size={16}
            onPress={() => {
              setShow(!show);
            }}
          />
        </View>
        {show && (
          <View
            style={{
              position: "absolute",
              width: "100.5%",
            }}
          >
            <ScrollView
              nestedScrollEnabled
              removeClippedSubviews
              keyboardShouldPersistTaps="handled"
              style={{
                zIndex: zIndex + 2,
                overflow: "hidden",
                top: height - 2,
                backgroundColor: theme.dark
                  ? colors.dark.background
                  : colors.light.background,
                borderColor: theme.colors.border,
                borderWidth: 1,
                borderBottomRightRadius: 5,
                borderBottomLeftRadius: 5,
                height: listData.length > 3 ? 120 : "auto",
              }}
              contentContainerStyle={{
                justifyContent: "space-between",
                overflow: "hidden",
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
          </View>
        )}
      </View>
    </>
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
      style={{
        overflow: "hidden",
        height: height,
        borderTopWidth: index > 0 ? 1 : 0,
        justifyContent: "space-between",
        borderColor: "#E7E7E7",
        paddingHorizontal: 15,
        flexDirection: "row",
        alignItems: "center",
        // backgroundColor: "#ffffff",
      }}
      // key={item}
      onPress={() => {
        if (!multiSelect) {
          setShow(false);
        }
        handleSelection(item);
      }}
    >
      <MyText text={item} />
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
      zIndex: 10,
    },
  });
