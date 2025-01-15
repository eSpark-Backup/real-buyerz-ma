import React, { useEffect, useMemo, useState } from "react";
import {
  FlatList,
  ScrollView,
  StyleSheet,
  View,
  ActivityIndicator,
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
import { handleGetAllProperties } from "../home/utils";
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
  const [error, setError] = useState<string | null>(null);
  const [selectedTab, setSelectedTab] = useState("Best Matches");

  useEffect(() => {
    fetchAllProperties();
  }, []);

  const fetchAllProperties = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await handleGetAllProperties(params.type);
      if (response.data) {
        dispatch(setAllProperties(response.data));
      }
    } catch (error) {
      setError("Failed to load properties.");
    } finally {
      setIsLoading(false);
    }
  };

  const deleteProperties = async (proposalID: string) => {
    setIsLoading(true);
    try {
      const response = await handleDeletePropertyProposal(proposalID);
      if (response.status) {
        fetchAllProperties();
      } else {
        setIsLoading(false);
      }
    } catch (error) {
      showToast("Failed to delete proposal", "error");
      setIsLoading(false);
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

  return (
    <ScrollView nestedScrollEnabled showsVerticalScrollIndicator={false}>
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
      <View style={styles.content}>
        {selectedTab === "Best Matches" && allProperties?.items && (
          <FlatList
            data={allProperties.items}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <AdBox
                title={item.propertyName || "Unknown Title"}
                description={
                  item.propertyDescription || "No description available."
                }
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
          />
        )}
        {selectedTab === "Saved Leads" && allProperties?.savedLeadItems && (
          <FlatList
            data={allProperties.savedLeadItems}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <AdBox
                title={item.property.propertyName || "Unknown Title"}
                description={
                  item.property.propertyDescription ||
                  "No description available."
                }
                botPost
                btns={btnsData(item)}
                botPostText={dateConverter(item.createdAt)}
                points={[
                  {
                    label: "Est. Range",
                    value:
                      priceConversion(item.property.propertyPrice || "") +
                      " PKR",
                  },
                  {
                    label: "Purpose",
                    value: item.property.purpose || "Buying",
                  },
                  {
                    label: "Property Type",
                    value: item.propertyType?.typeName || "Commercial",
                  },
                  {
                    label: "City",
                    value: item.property.propertyCity || "Unknown City",
                  },
                  {
                    label: "Location",
                    value: item.property.propertyAddress || "Unknown Location",
                  },
                ]}
              />
            )}
            ItemSeparatorComponent={() => <GapView />}
          />
        )}
      </View>
    </ScrollView>
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
