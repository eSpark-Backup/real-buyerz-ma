import React, { useEffect, useState } from "react";
import {
  Platform,
  Pressable,
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import { Entypo, Feather } from "@expo/vector-icons";
import { ScrollView } from "react-native-gesture-handler";
import ActionSheet, { ActionSheetRef } from "react-native-actions-sheet";
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import MyText from "@components/MyText";
import { MyTheme } from "@types";

let activeDropdownId: string | null = null;

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
  selected?: string[] | null;
}

export default function MyDropdown({
  data,
  onSelect,
  placeholder = "",
  multiSelect = false,
  style,
  placeholderColor,
  containerStyle,
  height = 30,
  title,
  bgColor,
  theme,
  id,
  selected,
}: DropdownProps) {
  const [show, setShow] = useState(false);
  const [selectedItems, setSelectedItems] = useState<string[]>(selected ?? []);
  const [label, setLabel] = useState(selected?.toString() ?? "");
  const listData = multiSelect ? ["All", ...data] : data;
  const actionSheetRef = React.useRef<ActionSheetRef>(null);
  const insets = useSafeAreaInsets();

  useEffect(() => {
      setLabel(selected?.toString() ?? "");
  }, [label, selected]);

  useEffect(() => {
    return () => {
      if (activeDropdownId === id) {
        activeDropdownId = null;
      }
    };
  }, [id]);

  useEffect(() => {
    if (activeDropdownId !== id && show) {
      setShow(false);
    }
  }, [activeDropdownId, id, show]);

  const handleSelection = (item: string) => {
    let updatedSelection: string[] = [...selectedItems];

    if (item === "All") {
      updatedSelection = updatedSelection.length === data.length ? [] : [...data];
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
    onSelect({ key: id, value: updatedSelection });

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

    if (!multiSelect) {
      if (Platform.OS === "ios") {
        actionSheetRef.current?.hide();
      } else {
        setShow(false);
        activeDropdownId = null;
      }
    }
  };

  const isSelected = (item: string) => {
    return (
      (item === "All" && selectedItems.length === data.length) ||
      (item !== "All" && selectedItems.includes(item))
    );
  };

  const renderAndroidDropdown = () => {
    return show ? (
      <View 
        style={[
          styles.dropdownContainer,
          { zIndex: show ? 1000 : 0 }
        ]}
      >
        <ScrollView
          style={[
            styles.dropdownList,
            {
              maxHeight: Math.min(listData.length * height, 200),
              backgroundColor: bgColor || theme.colors.background,
              borderColor: theme.colors.border,
            },
          ]}
          bounces={false}
          showsVerticalScrollIndicator={true}
        >
          {listData.map((item, index) => (
            <TouchableOpacity
              key={index}
              activeOpacity={0.7}
              style={[
                styles.dropdownItem,
                {
                  height,
                  borderTopWidth: index > 0 ? 1 : 0,
                  borderColor: theme.colors.border,
                },
              ]}
              onPress={() => handleSelection(item)}
            >
              <MyText text={item} textColor={theme.colors.text} />
              {isSelected(item) && (
                <Feather name="check" size={16} color="#34e145" />
              )}
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    ) : null;
  };

  const handlePress = () => {
    if (Platform.OS === "ios") {
      actionSheetRef.current?.show();
    } else {
      if (activeDropdownId && activeDropdownId !== id) {
        activeDropdownId = null;
      }
      
      const newShowState = !show;
      setShow(newShowState);
      activeDropdownId = newShowState ? id : null;
    }
  };

  return (
    <View 
      style={[
        containerStyle,
        { 
          zIndex: Platform.OS === "ios" ? 0 : (show ? 1000 : 1),
          position: 'relative'
        }
      ]}
    >
      {title && (
        <MyText
          text={title}
          style={{ alignSelf: "flex-start", paddingBottom: 10 }}
          size={15}
          weight="400"
          textColor={theme.colors.text}
        />
      )}

      <View style={[style, { height }]}>
        <Pressable
          style={[
            styles.trigger,
            {
              borderColor: theme.colors.border,
            },
          ]}
          onPress={handlePress}
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

        {Platform.OS === "android" && renderAndroidDropdown()}

        {Platform.OS === "ios" && (
          <ActionSheet
            ref={actionSheetRef}
            containerStyle={{
              ...styles.actionSheet,
              paddingBottom: insets.bottom,
            }}
            indicatorStyle={styles.indicator}
            gestureEnabled={true}
          >
            <View style={styles.actionSheetHeader}>
              <MyText
                text={title || placeholder}
                size={18}
                weight="600"
                textColor={theme.colors.text}
              />
              {multiSelect && (
                <TouchableOpacity
                  onPress={() => actionSheetRef.current?.hide()}
                  style={styles.doneButton}
                >
                  <MyText
                    text="Done"
                    size={16}
                    weight="600"
                    textColor="#007AFF"
                  />
                </TouchableOpacity>
              )}
            </View>
            <ScrollView
              style={[
                styles.actionSheetContent,
                {
                  maxHeight: Platform.OS === "ios" ? 
                    Math.min(listData.length * 50, (insets.bottom > 0 ? 400 : 300)) : 
                    undefined
                }
              ]}
              bounces={false}
              showsVerticalScrollIndicator={true}
            >
              {listData.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.actionSheetItem}
                  onPress={() => handleSelection(item)}
                >
                  <MyText
                    text={item}
                    size={16}
                    textColor={theme.colors.text}
                  />
                  {isSelected(item) && (
                    <Feather name="check" size={20} color="#34e145" />
                  )}
                </TouchableOpacity>
              ))}
            </ScrollView>
          </ActionSheet>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  trigger: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    height: "100%",
    paddingHorizontal: 15,
    borderWidth: 1,
    borderRadius: 5,
  },
  dropdownContainer: {
    position: "absolute",
    top: "100%",
    left: 0,
    right: 0,
    marginTop: 1,
  },
  dropdownList: {
    borderWidth: 1,
    borderRadius: 5,
    elevation: 5,
  },
  dropdownItem: {
    paddingHorizontal: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  actionSheet: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  indicator: {
    backgroundColor: "#DEDEDE",
    width: 60,
  },
  actionSheetHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#DEDEDE",
    backgroundColor: "#FFFFFF",
  },
  doneButton: {
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  actionSheetContent: {
    backgroundColor: "#FFFFFF",
  },
  actionSheetItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#DEDEDE",
    minHeight: 50,
  },
});