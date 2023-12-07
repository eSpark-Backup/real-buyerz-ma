import React, { useState } from "react";
import {
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import { Entypo } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";

import MyText from "components/MyText";

interface DropdownProps {
  data: string[];
  placeholder?: string;
  multiSelect?: boolean;
  zIndex?: number;
  onSelect: (value: string | string[]) => void;
  style?: StyleProp<ViewStyle>;
  placeholderColor?: string;
}

export default function MyDropdown({
  data,
  onSelect,
  placeholder = "",
  zIndex = 10,
  multiSelect = false,
  style,
  placeholderColor,
}: DropdownProps) {
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
    <View
      style={[
        styles.container,
        { zIndex: zIndex },
        show ? { borderBottomRightRadius: 0, borderBottomLeftRadius: 0 } : {},
        style,
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
            zIndex: zIndex + 2,
            width: "101.5%",
            position: "absolute",
            overflow: "hidden",
            top: 28,
            justifyContent: "space-between",
            backgroundColor: "#ffffff",
            borderColor: "#E7E7E7",
            borderWidth: 1,
            borderBottomRightRadius: 5,
            borderBottomLeftRadius: 5,
          }}
        >
          {listData.map((item, index) => (
            <TouchableOpacity
              activeOpacity={1}
              style={{
                height: 30,
                borderTopWidth: index > 0 ? 1 : 0,
                justifyContent: "space-between",
                borderColor: "#E7E7E7",
                paddingHorizontal: 15,
                flexDirection: "row",
                alignItems: "center",
              }}
              key={item}
              onPress={() => {
                if (!multiSelect) {
                  setShow(false);
                }
                handleSelection(item);
              }}
            >
              <MyText text={item} />
              {isSelected(item) && (
                <Feather name="check" size={16} color="#34e145" />
              )}
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 150,
    height: 30,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#E7E7E7",
    alignItems: "center",
    zIndex: 10,
  },
});
