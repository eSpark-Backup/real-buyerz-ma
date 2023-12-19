import React, { useState } from "react";
import {
  FlatList,
  ScrollView,
  StyleProp,
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";

import { MyTheme } from "@types";
import {
  Card,
  GapView,
  MyBottomSheet,
  MyButton,
  MyDropdown,
  MyText,
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

export default function AllPosting() {
  const theme = useTheme() as MyTheme;
  const [visible, setVisible] = useState(false);

  const toggleModal = () => {
    setVisible(!visible);
  };

  return (
    <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={styles.container}
      nestedScrollEnabled
      showsVerticalScrollIndicator={false}
    >
      <MyBottomSheet
        isVisible={visible}
        onClose={toggleModal}
        bottomSheetStyles={{
          paddingHorizontal: 30,
          paddingTop: 25,
          paddingBottom: 102,
          alignItems: "center",
        }}
      >
        {dropdownData.map((item, index) => (
          <>
            <MyDropdown
              key={index}
              data={item.data}
              placeholder={item.placeholder}
              onSelect={(val) => console.log("val", val)}
              style={{ width: "100%" }}
              height={40}
              zIndex={4 - index}
              title={item.title}
            />
            {index < dropdownData.length - 1 && <GapView length={20} />}
          </>
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
      </MyBottomSheet>
      <View style={styles.top_filter}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => setVisible(true)}
          style={{
            backgroundColor: theme.colors.secondary,
            padding: 10,
            borderRadius: 5,
          }}
        >
          <FontAwesome name="filter" size={15} color="#ffffff" />
        </TouchableOpacity>
        <MyText
          text="Reset"
          textColor={theme.colors.secondary}
          size={14}
          style={{ marginLeft: 10, textDecorationLine: "underline" }}
        />
      </View>
      <View style={styles.top_selection_btns}>
        {filterBtns.map((item, index) => (
          <FilterBtnComp
            item={item}
            index={index}
            theme={theme}
            key={item.id.toString()}
          />
        ))}
      </View>
      <View style={styles.content}>
        <Card style={styles.contentCard}>
          <FlatList
            data={testContentData}
            showsVerticalScrollIndicator={false}
            nestedScrollEnabled
            renderItem={({ item, index }) => renderList({ item, index, theme })}
            ItemSeparatorComponent={() => <GapView />}
          />
        </Card>
      </View>
    </ScrollView>
  );
}

const renderList = ({
  item,
  index,
  theme,
}: {
  item?: ContentData;
  index: number;
  theme: MyTheme;
}) => {
  return (
    <Card
      style={{
        paddingHorizontal: 15,
        paddingVertical: 26,
        backgroundColor: "#F5F6FA",
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          paddingBottom: 8,
          borderBottomWidth: 1,
          borderColor: theme.colors.border,
        }}
      >
        <MyText text={item?.title} size={14} weight="500" />
        <MyButton
          label={`Trash`}
          labelStyle={{
            color: "#ffffff",
            fontSize: 10,
          }}
          style={{
            width: 58,
            height: 20,
            borderRadius: 2,
            backgroundColor: theme.colors.primary,
          }}
        />
      </View>
      <MyText
        style={{ marginVertical: 8 }}
        size={12}
        text={item?.description}
      />
      <View>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <LabelValue
            label="Purpose"
            value={item?.purpose!}
            labelStyle={{ color: "#636363" }}
            valueStyle={{ color: "#126FAA" }}
          />
          <LabelValue
            label="Amount"
            value={item?.amount!}
            labelStyle={{ color: theme.colors.text }}
            valueStyle={{ color: theme.colors.text }}
            valueWeight="bold"
          />
        </View>
        <LabelValue
          label="Property Type"
          value={item?.type!}
          labelStyle={{ color: "#636363" }}
          valueStyle={{ color: "#126FAA" }}
        />
        <LabelValue
          label="City"
          value={item?.city!}
          labelStyle={{ color: "#636363" }}
          valueStyle={{ color: "#126FAA" }}
        />
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <LabelValue
            label="Location"
            value={item?.location!}
            labelStyle={{ color: "#636363" }}
            valueStyle={{ color: "#126FAA" }}
          />
          <MyButton
            label={`View`}
            labelStyle={{
              color: theme.colors.primary,
              fontSize: 8,
            }}
            style={{
              width: 58,
              height: 20,
              borderWidth: 1,
              borderRadius: 20,
              backgroundColor: theme.colors.background,
              borderColor: theme.colors.primary,
            }}
          />
        </View>
      </View>
    </Card>
  );
};

const LabelValue = ({
  label,
  value,
  labelStyle,
  valueStyle,
  labelWeight,
  valueWeight,
}: {
  label: string;
  value: string;
  labelStyle?: TextStyle;
  valueStyle?: TextStyle;
  labelWeight?: TextStyle["fontWeight"];
  valueWeight?: TextStyle["fontWeight"];
}) => {
  return (
    <View style={{ flexDirection: "row" }}>
      <MyText text={`${label}: `} style={labelStyle} weight={labelWeight} />
      <MyText text={`${value}`} style={valueStyle} weight={valueWeight} />
    </View>
  );
};

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
        marginHorizontal: 10,
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
    paddingHorizontal: 30,
    paddingTop: 26,
    paddingBottom: 40,
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
    marginTop: 25,
  },
  contentCard: {
    height: 553,
    paddingHorizontal: 10,
    paddingVertical: 18,
  },
});
