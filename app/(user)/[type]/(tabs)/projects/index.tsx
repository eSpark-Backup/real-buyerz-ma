import React, { useCallback, useEffect, useState } from "react";
import { FlatList, StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import { useTheme } from "@react-navigation/native";

import {
  GapView,
  MyBottomSheet,
  MyButton,
  MyDropdown,
  MyListItem,
  MyTopFilter,
  MyTopTabs,
  OverlayLoader,
  RangeSlider,
} from "@components";
import { MyTheme, UserType } from "@types";
import { useFocusEffect, useGlobalSearchParams, useLocalSearchParams, useSegments } from "expo-router";
import { RootState } from "@store";
import { PropertySliceState, setFilter } from "features/property/propertySlice";
import { useSelector } from "react-redux";
import { handleGetAllProperties, PropertyItem } from "../home/utils";
import { createUrlParams } from "@utils/functions";
import { useDispatch } from "react-redux";

interface SearchList {
  id: string;
  title: string;
  cost: string;
  address: string;
  beds: number;
  bathroom: number;
  parking: number;
  sqft: number;
  image: string;
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

const topTabsData = [
  { title: "Houses", selected: true },
  { title: "Plots", selected: false },
  { title: "Commercial", selected: false },
];

const testData: SearchList[] = [
  {
    id: "1",
    title: "Residential Plot for Sale",
    cost: "13 Lac",
    address: "Bahria Greens Bahria Town Karachi",
    beds: 5,
    bathroom: 3,
    parking: 2,
    sqft: 1080,
    image: "https://picsum.photos/id/58/200",
  },
  {
    id: "2",
    title: "Residential Plot for Sale",
    cost: "13 Lac",
    address: "Bahria Greens Bahria Town Karachi",
    beds: 5,
    bathroom: 3,
    parking: 2,
    sqft: 1080,
    image: "https://picsum.photos/id/90/200",
  },
  {
    id: "3",
    title: "Residential Plot for Sale",
    cost: "13 Lac",
    address: "Bahria Greens Bahria Town Karachi",
    beds: 5,
    bathroom: 3,
    parking: 2,
    sqft: 1080,
    image: "https://picsum.photos/id/99/200",
  },
  {
    id: "4",
    title: "Residential Plot for Sale",
    cost: "13 Lac",
    address: "Bahria Greens Bahria Town Karachi",
    beds: 5,
    bathroom: 3,
    parking: 2,
    sqft: 1080,
    image: "https://picsum.photos/id/200/200",
  },
  {
    id: "5",
    title: "Residential Plot for Sale",
    cost: "13 Lac",
    address: "Bahria Greens Bahria Town Karachi",
    beds: 5,
    bathroom: 3,
    parking: 2,
    sqft: 1080,
    image: "https://picsum.photos/id/212/200",
  },
];

// const dropdownData: DropDownList[] = [
//   {
//     data: ["Sell", "Buy", "Rent"],
//     height: 40,
//     zIndex: 4,
//     onSelect: (val: string) => {},
//     placeholder: "Purpose",
//     title: "Purpose",
//     style: { width: "100%" },
//   },
//   {
//     data: ["House", "Plot", "Commercial"],
//     height: 40,
//     zIndex: 4,
//     onSelect: (val: string) => {},
//     placeholder: "Type",
//     title: "Property Type",
//     style: { width: "100%" },
//   },
// ];

export default function Projects() {
  const theme = useTheme() as MyTheme;
  const [visible, setVisible] = useState(false);
  const [properties, setProperties] = useState<PropertyItem[]>([]);
  const params = useGlobalSearchParams<{ type: UserType }>();

  const { propertyType } = useLocalSearchParams();
  const { propertyTypes, filter } = useSelector<RootState, PropertySliceState>(
    (state) => state.property
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [unappliedFilters, setUnappliedFilters] = useState<{
    [key: string]: any;
  }>({});

  const [dropdownData, setDropDownData] = useState([
    {
      data: ["Sell", "Buy", "Rent"],
      height: 40,
      zIndex: 4,
      onSelect: (val: string) => {},
      placeholder: "Purpose",
      title: "Purpose",
      style: { width: "100%" },
      id: "purpose",
      selected: filter?.purpose ? [filter?.purpose] : null,
    },
    {
      data: propertyTypes ? propertyTypes?.map((val) => val?.typeName) : [],
      height: 40,
      zIndex: 4,
      onSelect: (val: string) => {},
      placeholder: "Type",
      title: "Property Type",
      style: { width: "100%" },
      id: "propertyType",
      selected: filter?.propertyType ? [filter?.propertyType] : null,
    },
  ]);
  const dispatch = useDispatch();
  useFocusEffect(
    useCallback(() => {
      const updatedDropdown = dropdownData.map((val) => {
        const id = Object.keys(filter).find((key) => val.id == key) as
          | "propertyType"
          | "purpose";
        return {
          ...val,
          selected: filter?.[id] ? [filter?.[id]] : null,
        };
      });
      setDropDownData(updatedDropdown);
      fetchProperties();
    }, [filter])
  );

  const fetchProperties = async () => {
    try {
      setLoading(true);
      const params = createUrlParams(filter);
      const response = await handleGetAllProperties(params);
      if (response?.data?.totalCount && response.data.totalCount > 0) {
        setProperties(response?.data.items);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const onApplyFilter = () => {
    const obj = Object.entries(unappliedFilters).reduce(
      (prev, [key, value]) => {
        prev[key] = value?.value?.[0] ?? null;
        return prev;
      },
      {} as Record<string, unknown>
    );
    dispatch(setFilter(obj));
    fetchProperties();
    setVisible(false);
  };

  return (
    <View style={{ flex: 1 }}>
      <OverlayLoader isShow={loading} />
      <MyBottomSheet.Modal
        visible={visible}
        theme={theme}
        onClose={(val) => setVisible(val)}
      >
        {dropdownData.map((item, index) => (
          <View key={index}>
            <MyDropdown
              id={item.id}
              data={item.data}
              placeholder={item.placeholder}
              onSelect={(val) => {
                unappliedFilters[val.key] = val;
                setUnappliedFilters(unappliedFilters);
              }}
              style={{ width: "100%" }}
              height={40}
              zIndex={4 - index}
              title={item.title}
              theme={theme}
              selected={item.selected}
            />
            {dropdownData.length - 1 && <GapView length={20} />}
          </View>
        ))}
        {["Price Range", "Area"].map((item, index) => (
          <View key={index}>
            <RangeSlider title={item} theme={theme} />
            {index === 1 && <GapView length={20} />}
          </View>
        ))}
        <GapView length={40} />
        <MyButton
          label={"Apply"}
          labelStyle={{
            color: "#ffffff",
            fontSize: 10,
          }}
          onPress={onApplyFilter}
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
        onPressFilter={() => setVisible(true)}
        style={styles.topFilter}
        applied={Boolean(createUrlParams(filter))}
        onReset={() => {
          dispatch(
            setFilter({
              propertyType: null,
              purpose: null,
            })
          );
          fetchProperties();
        }}
      />
      <MyTopTabs data={topTabsData} />
      <View style={styles.searchList}>
        <FlatList
          data={properties ?? []}
          renderItem={({ index, item }) => (
            <MyListItem
              item={item}
              index={index}
              theme={theme}
              params={params}
            />
          )}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => <GapView />}
          keyExtractor={(item) => item.id}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  topFilter: {
    marginTop: 27,
    marginHorizontal: 25,
    justifyContent: "flex-end",
    marginBottom: 5,
  },
  searchList: {
    flex: 1,
    paddingTop: 10,
    paddingHorizontal: 20,
  },
});
