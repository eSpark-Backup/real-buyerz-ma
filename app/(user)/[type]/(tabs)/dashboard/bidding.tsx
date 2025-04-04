import React, { useEffect, useMemo, useState } from "react";
import {
  FlatList,
  ScrollView,
  StyleSheet,
  View,
  ActivityIndicator,
  RefreshControl,
  Text,
} from "react-native";
import { useTheme } from "@react-navigation/native";
import {
  router,
  useGlobalSearchParams,
  useLocalSearchParams,
} from "expo-router";
import { useDispatch, useSelector } from "react-redux";

import { MyTheme, UserType } from "@types";
import { AdBox, GapView, MyText, MyTopTabs, OverlayLoader } from "@components";
import {
  handleGetAllProperties,
  PropertyItem,
  AllPropertiesData,
} from "../home/utils";
import {
  PropertySliceState,
  setAllProperties,
} from "features/property/propertySlice";
import { AppDispatch, RootState } from "@store";
import { dateConverter } from "app/utils/dateConverter";
import { priceConversion } from "app/utils/priceConverter";
import { handleDeletePropertyProposal } from "../../myProposals/utils";
import { showToast } from "@utils/showToast";

export default function Bidding() {
  const theme = useTheme() as MyTheme;
  const params = useGlobalSearchParams<{ type?: UserType }>();
  const dispatch: AppDispatch = useDispatch();
  const { allProperties } = useSelector<RootState, PropertySliceState>(
    (state) => state.property
  );
  const [isLoading, setIsLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [error, setError] = useState<string | null>(null);
  const [selectedTab, setSelectedTab] = useState("Best Matches");

  useEffect(() => {
    fetchAllProperties();
  }, []);

  const fetchAllProperties = async (
    newPage: number = 1,
    isRefreshing = false
  ) => {
    if (newPage > totalPages) return;
    if (isRefreshing) {
      setRefreshing(true);
    } else {
      setIsLoading(true);
    }
    try {
      const response = await handleGetAllProperties(params.type, newPage);
      if (response.data) {
        dispatch((dispatch, getState) => {
          const prevState = getState().property.allProperties || {
            items: [],
            savedLeadItems: [],
            totalCount: 0,
            currentPage: 1,
            totalPages: 1,
            itemsPerPage: 3,
          };

          const existingIds = new Set(
            prevState.items.map((item: PropertyItem) => item.id)
          );
          const newItems = response?.data?.items.filter(
            (item: PropertyItem) => !existingIds.has(item.id)
          );

          dispatch(
            setAllProperties({
              ...prevState,
              items: [...prevState.items, ...(newItems || [])],
              currentPage: response?.data?.currentPage || prevState.currentPage,
              totalPages: response?.data?.totalPages || prevState.totalPages,
            })
          );
        });
      }
      setPage(response.data?.currentPage || newPage);
      setTotalPages(response.data?.totalPages || 1);
      if (isRefreshing) {
        setRefreshing(false);
      } else {
        setIsLoading(false);
      }
    } catch (error) {
      setError("Failed to load properties.");
    } finally {
      if (isRefreshing) {
        setRefreshing(false);
      } else {
        setIsLoading(false);
      }
    }
  };

  const topTabsData = [
    { title: "Best Matches", selected: selectedTab === "Best Matches" },
    { title: "Saved Leads", selected: selectedTab === "Saved Leads" },
  ];

  const btnsData = (item: any) => [
    // { label: "Trash", onPress: () => {
    //   console.log(`item ${JSON.stringify(item)}`)
    //   deleteProperties(item.id)
    // }, outline: true },
    {
      label: "View",
      onPress: () => {
        router.navigate({
          pathname: `(user)/${params.type}/(tabs)/dashboard/proposalPreview`,
          params: {
            item: JSON.stringify(item),
            redirectionFrom: "dashboard",
          },
        });
      },
    },
  ];

  const handleTabPress = (title: string) => {
    setSelectedTab(title);
  };

  if (error) {
    return <Text style={{ color: "red" }}>{error}</Text>;
  }

  const transformedData =
    selectedTab === "Best Matches"
      ? allProperties?.items || []
      : allProperties?.savedLeadItems?.map((item) => ({
          ...item.property,
          id: item.id,
        })) || [];

  const onRefresh = () => {
    if (page < totalPages) {
      fetchAllProperties(page + 1, true);
    }
  };

  return (
    <FlatList
      ListHeaderComponent={
        <>
          <OverlayLoader isShow={isLoading} />
          <View style={styles.top}>
            <MyText
              text="Bidding"
              size={20}
              weight="600"
              textColor={theme.colors.negative}
            />
            <GapView />
            <MyText
              text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed venenatis gravida lectus nec sodales."
              size={12}
              textColor={theme.colors.text}
            />
          </View>
          <MyTopTabs data={topTabsData} onTabPress={handleTabPress} />
        </>
      }
      data={transformedData as PropertyItem[]}
      keyExtractor={(item) => item.id.toString()}
      showsVerticalScrollIndicator={false}
      renderItem={({ item }) => (
        <AdBox
          title={item.propertyName || "Unknown Title"}
          description={item.propertyDescription || "No description available."}
          botPost
          btns={btnsData(item)}
          botPostText={dateConverter(item.createdAt)}
          points={[
            {
              label: "Est. Range",
              value: priceConversion(item.propertyPrice || "") + " PKR",
            },
            { label: "Purpose", value: item.purpose || "Buying" },
            {
              label: "Property Type",
              value: item.propertyType?.typeName || "Commercial",
            },
            { label: "City", value: item.propertyCity || "Unknown City" },
            {
              label: "Location",
              value: item.propertyAddress || "Unknown Location",
            },
          ]}
        />
      )}
      ItemSeparatorComponent={() => <GapView />}
      contentContainerStyle={{ paddingHorizontal: 20 }}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={fetchAllProperties}
          tintColor={theme?.colors.primary}
        />
      }
      onEndReached={onRefresh}
      onEndReachedThreshold={0.5}
    />
  );
}

const styles = StyleSheet.create({
  header: {},
  HomeHeader: { position: "absolute", top: 0, width: "100%", zIndex: 1 },
  container: {
    paddingTop: 26,
  },
  top: {
    justifyContent: "space-between",
    marginBottom: 10,
    marginTop: 27,
    paddingHorizontal: 20,
  },
  content: {
    flex: 1,
    marginTop: 10,
    paddingHorizontal: 20,
  },
});
