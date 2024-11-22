import React, { useCallback, useEffect, useState } from "react";
import { FlatList, StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import { useTheme } from "@react-navigation/native";

import {
  GapView,
  MyBottomSheet,
  MyButton,
  MyDropdown,
  MyListItem,
  MyText,
  MyTopFilter,
  MyTopTabs,
  OverlayLoader,
  RangeSlider,
} from "@components";
import { MyTheme, UserType } from "@types";
import { useFocusEffect, useGlobalSearchParams } from "expo-router";
import { RootState } from "@store";
import { PropertySliceState, setFilter } from "features/property/propertySlice";
import { useSelector } from "react-redux";
import { handleGetAllProperties, PropertyItem, PropertySubType } from "../home/utils";
import { createUrlParams } from "@utils/functions";
import { useDispatch } from "react-redux";

export default function Projects() {
  const theme = useTheme() as MyTheme;
  const [visible, setVisible] = useState(false);
  const [properties, setProperties] = useState<PropertyItem[]>([]);
  const params = useGlobalSearchParams<{ type: UserType }>();
  const { propertyTypes, filter } = useSelector<RootState, PropertySliceState>(
    (state) => state.property
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [unappliedFilters, setUnappliedFilters] = useState<{ [key: string]: any }>({});
  const [dropdownData, setDropDownData] = useState([
    {
      data: ["Sell", "Buy", "Rent"],
      height: 40,
      zIndex: 4,
      onSelect: (val: string) => { },
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
      onSelect: (val: string) => { },
      placeholder: "Type",
      title: "Property Type",
      style: { width: "100%" },
      id: "propertyType",
      selected: filter?.propertyType ? [filter?.propertyType] : null,
    },
  ]);
  const [tabsData, setTabsData] = useState<{ title: string; selected: boolean }[]>([]);
  const [selectedTab, setSelectedTab] = useState<string>("");
  const dispatch = useDispatch();

  useFocusEffect(
    useCallback(() => {
      const updatedDropdown = dropdownData.map((val) => {
        const id = Object.keys(filter).find((key) => val.id === key) as "propertyType" | "purpose";
        return {
          ...val,
          selected: filter?.[id] ? [filter?.[id]] : null,
        };
      });
      setDropDownData(updatedDropdown);
      fetchProperties();
    }, [filter])
  );

  useEffect(() => {
    return () => {
      onResetFilters()
    };
  }, []);

  const fetchProperties = async () => {
    try {
      setLoading(true);
      const param = createUrlParams(filter);

      const filters = Object.fromEntries(
        Object.entries(filter).filter(([_, value]) => value !== null)
      );

      const response = await handleGetAllProperties(param, filters);
      if (response?.data) {
        console.log("data " + JSON.stringify(response.data));
        setProperties(response?.data.items);
        updateTabs(response.data.items);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching properties:", error);
      setLoading(false);
    }
  };

  const updateTabs = (items: PropertyItem[]) => {
    const uniqueTabs = new Set<string>();

    items.forEach(item => {
      const propertyType = item.propertyType?.typeName;

      if (propertyType === "Residential" && item.propertyType.subTypes) {
        if (Array.isArray(item.propertyType.subTypes)) {
          item.propertyType.subTypes.forEach((subType) => {
            if (subType.typeName) {
              uniqueTabs.add(subType.typeName);
            }
          });
        }
        else {
          const subType = item.propertyType.subTypes as PropertySubType;
          if (subType && subType.typeName) {
            uniqueTabs.add(subType.typeName);
          }
        }
      }
      if (propertyType === "Commercial") {
        uniqueTabs.add(propertyType);
      }
    });

    const newTabsData: { title: string; selected: boolean }[] = Array.from(uniqueTabs)
      .filter(tab => tab !== "Commercial")
      .map(type => ({ title: type, selected: false }))
      .concat(
        Array.from(uniqueTabs)
          .filter(tab => tab === "Commercial")
          .map(type => ({ title: type, selected: false }))
      );

    setTabsData(newTabsData);
    if (newTabsData.length > 0) {
      setSelectedTab(newTabsData[0].title);
    }
  };

  const renderTabContent = () => {
    const filteredProperties = properties.filter(item => {
      if (selectedTab === "Commercial") {
        return item.propertyType.typeName === "Commercial";
      }
      const isResidential = item.propertyType.typeName === "Residential" && item.propertyType.subTypes?.typeName === selectedTab;
      return isResidential;
    });

    return (
      <FlatList
        data={filteredProperties}
        renderItem={({ index, item }) => (
          <MyListItem
            item={item}
            index={index}
            theme={theme}
            onFavClicked={fetchProperties}
            fav={item.isFavourite}
            isFavRed={false}
            params={params}
          />
        )}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <GapView />}
        keyExtractor={(item) => item.id}
      />
    );
  };

  const onApplyFilter = () => {
    const obj: Record<string, unknown> = {};
    if (unappliedFilters.propertyType) {
      obj.propertyType = unappliedFilters.propertyType.value.value[0];
    }
    if (unappliedFilters.purpose) {
      obj.purpose = unappliedFilters.purpose.value.value[0];
    }
    if (unappliedFilters.priceRange) {
      obj.price1 = unappliedFilters.priceRange.value[0];
      obj.price2 = unappliedFilters.priceRange.value[1];
    }
    if (unappliedFilters.area) {
      obj.area1 = unappliedFilters.area.value[0];
      obj.area2 = unappliedFilters.area.value[1];
    }
    console.log("purpose1 " + JSON.stringify(obj))
    dispatch(setFilter(obj));
    setVisible(false);
  };

  const onResetFilters = () => {
    console.log("idhar reset mai aya")
    setUnappliedFilters({});
    dispatch(setFilter({
      propertyType: null,
      purpose: null,
      price1: null,
      price2: null,
      area1: null,
      area2: null
    }));
    fetchProperties();
  };

  const handleRangeChange = (low: string, high: string, filterType: string) => {
    setUnappliedFilters((prev) => ({
      ...prev,
      [filterType]: { value: [low, high] },
    }));
  };

  return (
    <View style={{ flex: 1 }}>
      <OverlayLoader isShow={loading} />
      <MyBottomSheet.Modal
        visible={visible}
        theme={theme}
        onClose={(val) => {
          setVisible(val);
        }}
      >
        {dropdownData.map((item, index) => {
          console.log("unappliedFilters" + JSON.stringify(unappliedFilters))
          return <View key={index}>
            <MyDropdown
              id={item.id}
              data={item.data}
              placeholder={item.placeholder}
              onSelect={(val) => {
                unappliedFilters[item.id] = { value: val };
                setUnappliedFilters({ ...unappliedFilters });
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
        }

        )}
        <View>
          <RangeSlider
            title="Price Range"
            theme={theme}
            initialValLow={unappliedFilters.priceRange?.value[0] || "0"}
            initialValHigh={unappliedFilters.priceRange?.value[1] || "10000000"}
            onChangeVal={(low, high) => handleRangeChange(low, high, 'priceRange')}
          />
          <GapView length={20} />
          <RangeSlider
            title="Area"
            theme={theme}
            initialValLow={unappliedFilters.area?.value[0] || "0"}
            initialValHigh={unappliedFilters.area?.value[1] || "100"}
            onChangeVal={(low, high) => handleRangeChange(low, high, 'area')}
          />
        </View>
        <GapView length={10} />
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
        onReset={onResetFilters}
      />
      <MyTopTabs
        data={tabsData.map((tab) => ({
          ...tab,
          selected: tab.title === selectedTab,
        }))}
        onTabPress={(title) => {
          setSelectedTab(title);
          const updatedTabs = tabsData.map(t => ({ ...t, selected: t.title === title }));
          setTabsData(updatedTabs);
        }}
      />
      <View style={styles.searchList}>
        {properties.length === 0 ? (
          <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
            <MyText>No Properties Found</MyText>
          </View>
        ) : (
          renderTabContent()
        )}
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