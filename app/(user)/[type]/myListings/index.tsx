import React, { useState } from "react";
import {
  FlatList,
  ScrollView,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from "react-native";
import { useTheme } from "@react-navigation/native";
import { router } from "expo-router";

import { MyTheme } from "@types";
import {
  AdBox,
  Card,
  GapView,
  LabelValue,
  MyBottomSheet,
  MyButton,
  MyDropdown,
  MyText,
  MyTopFilter,
  MyTopTabs,
} from "@components";

interface FilterBtn {
  id: number;
  label: string;
  count: number;
  selected: boolean;
}

interface ContentData {
  title: string;
  description: string;
  purpose: "Buying" | "Selling";
  type: "Commercial" | "Residential";
  city: string;
  location: string;
  amount: string;
}

interface DropDownList {
  data: string[];
  placeholder: string;
  title: string;
  height: number;
  zIndex: number;
  style?: StyleProp<ViewStyle>;
  onSelect: (val: string) => void;
}

const filterBtns: FilterBtn[] = [
  { id: 1, label: "All", count: 0, selected: true },
  { id: 2, label: "Active", count: 0, selected: false },
  { id: 3, label: "Request", count: 0, selected: false },
  { id: 4, label: "Reject", count: 0, selected: false },
  { id: 5, label: "Trash", count: 0, selected: false },
];

const testContentData: ContentData[] = [
  {
    title: "Need 4 Room Apartments",
    description:
      "Ad voluptate magna id officia deserunt amet aliquip excepteur officia Lorem. Mollit quis sint ut ut est officia.",
    purpose: "Buying",
    type: "Commercial",
    city: "Karachi",
    location: "Gulshan-e-Iqbal",
    amount: "80M",
  },
  {
    title: "Need 4 Room Apartments",
    description:
      "Ad voluptate magna id officia deserunt amet aliquip excepteur officia Lorem. Mollit quis sint ut ut est officia.",
    purpose: "Buying",
    type: "Commercial",
    city: "Karachi",
    location: "Gulshan-e-Iqbal",
    amount: "80M",
  },
  {
    title: "Need 4 Room Apartments",
    description:
      "Ad voluptate magna id officia deserunt amet aliquip excepteur officia Lorem. Mollit quis sint ut ut est officia.",
    purpose: "Buying",
    type: "Commercial",
    city: "Karachi",
    location: "Gulshan-e-Iqbal",
    amount: "80M",
  },
  {
    title: "Need 4 Room Apartments",
    description:
      "Ad voluptate magna id officia deserunt amet aliquip excepteur officia Lorem. Mollit quis sint ut ut est officia.",
    purpose: "Buying",
    type: "Commercial",
    city: "Karachi",
    location: "Gulshan-e-Iqbal",
    amount: "80M",
  },
];

const dropdownData: DropDownList[] = [
  {
    data: ["Selling", "Buying", "Rent"],
    height: 40,
    zIndex: 4,
    onSelect: (val: string) => {},
    placeholder: "Purpose",
    title: "Purpose",
    style: { width: "100%" },
  },
  {
    data: [
      "Karachi",
      "Lahore",
      "Islamabad",
      "Faisalabad",
      "Quetta",
      "Peshawar",
      "Sialkot",
    ],
    height: 40,
    zIndex: 4,
    onSelect: (val: string) => {},
    placeholder: "City",
    title: "City",
    style: { width: "100%" },
  },
  {
    data: [
      "Gulshan-e-Iqbal",
      "Gulistan-e-Johar",
      "Liaquatabad",
      "Gulberg",
      "Malir",
      "Shar-e-Faisal",
      "Karimabad",
    ],
    height: 40,
    zIndex: 4,
    onSelect: (val: string) => {},
    placeholder: "Location",
    title: "Location",
    style: { width: "100%" },
  },
  {
    data: ["House", "Plot", "Commercial"],
    height: 40,
    zIndex: 4,
    onSelect: (val: string) => {},
    placeholder: "Purpose",
    title: "Purpose",
    style: { width: "100%" },
  },
];

const topTabsData = [
  { title: "All (0)", selected: true },
  { title: "Active (0)", selected: false },
  { title: "Draft (0)", selected: false },
  { title: "Trash (0)", selected: false },
];

export default function MyListings() {
  const theme = useTheme() as MyTheme;
  const [visible, setVisible] = useState(false);

  return (
    <View style={{ flex: 1, ...styles.container }}>
      <MyBottomSheet.Modal
        visible={visible}
        theme={theme}
        onClose={(val) => setVisible(val)}
      >
        {dropdownData.map((item, index) => (
          <View key={index}>
            <MyDropdown
              data={item.data}
              placeholder={item.placeholder}
              onSelect={(val) => console.log("val", val)}
              style={{ width: "100%" }}
              height={40}
              zIndex={4 - index}
              title={item.title}
            />
            {index < dropdownData.length - 1 && <GapView length={20} />}
          </View>
        ))}
        <GapView length={60} />
        <MyButton
          label={"Save"}
          labelStyle={{
            color: "#ffffff",
            fontSize: 10,
          }}
          style={{
            alignSelf: "flex-end",
            width: 100,
            height: 30,
            borderRadius: 4,
            backgroundColor: theme.colors.primary,
          }}
        />
      </MyBottomSheet.Modal>
      <MyTopFilter
        theme={theme}
        onPressFilter={() => setVisible(!visible)}
        style={{
          paddingHorizontal: 20,
          alignSelf: "flex-end",
          marginBottom: 10,
        }}
      />
      <MyTopTabs data={topTabsData} list />
      <View style={styles.content}>
        <FlatList
          data={testContentData}
          showsVerticalScrollIndicator={false}
          nestedScrollEnabled
          renderItem={({ item, index }) => (
            <AdBox
              title={item.title}
              description={item.description}
              btns={btnsData}
              points={[
                { label: "Est. Range", value: item?.amount },
                { label: "Purpose", value: item?.purpose },
                { label: "Property Type", value: item?.type },
                { label: "City", value: item?.city },
                { label: "Location", value: item?.location },
              ]}
            />
          )}
          ItemSeparatorComponent={() => <GapView />}
        />
      </View>
    </View>
  );
}

const btnsData = [
  { label: "Trash", onPress: () => console.log("trash"), outline: true },
  { label: "View", onPress: () => console.log("view") },
];

const FilterBtnComp = ({
  item,
  index,
  theme,
}: {
  item: FilterBtn;
  index: number;
  theme: MyTheme;
}) => {
  return (
    <MyButton
      key={item.id.toString()}
      label={`${item.label} (${item.count.toString()})`}
      labelStyle={{
        color: item.selected ? "#ffffff" : theme.colors.primary,
        fontSize: 10,
      }}
      style={{
        width: 90,
        height: 30,
        marginVertical: 10,
        marginHorizontal: 5,
        borderWidth: 1,
        borderRadius: 4,
        backgroundColor: item.selected ? theme.colors.primary : "transparent",
        borderColor: theme.colors.primary,
      }}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 26,
  },
  top_filter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  top_selection_btns: {
    marginTop: 25,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    flex: 1,
    marginTop: 10,
    paddingHorizontal: 20,
  },
});
