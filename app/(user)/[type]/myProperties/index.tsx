import React, { useCallback, useEffect, useState } from "react";
import {
  FlatList,
  ScrollView,
  StyleProp,
  StyleSheet,
  View,
  RefreshControl,
  ViewStyle,
} from "react-native";
import { useTheme } from "@react-navigation/native";
import { router, useFocusEffect, useGlobalSearchParams } from "expo-router";

import { MyTheme, UserType } from "@types";
import {
  AdBox,
  GapView,
  MyBottomSheet,
  MyButton,
  MyDropdown,
  MyText,
  MyTopFilter,
  MyTopTabs,
  OverlayLoader,
} from "@components";
import {
  handleGetAllPropertyProposals,
  ProposalData,
} from "../myProposals/utils";
import { showToast } from "@utils/showToast";
import { PropertyItem } from "../(tabs)/home/utils";
import { handleDraftProperty, ReqDraftData } from "../myListings/utils";
import { TouchableOpacity } from "react-native-gesture-handler";
import { handleGetAllProposals } from "../(tabs)/dashboard/utils";
import { formatPrice } from "app/utils/priceConverter";
import { PropertySliceState, setFilter } from "features/property/propertySlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "@store";

export default function MyProperties() {
  const theme = useTheme() as MyTheme;
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const { filter } = useSelector<RootState, PropertySliceState>(
    (state) => state.property
  );
  const [propertiesData, setPropertiesData] = useState<ProposalData | null>(
    null
  );
  const [currentTab, setCurrentTab] = useState("All");
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const params = useGlobalSearchParams<{ type: UserType }>();
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
      selected: filter.purpose ? [filter.purpose] : null,
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
      id: "propertyCity",
      selected: filter.propertyCity ? [filter.propertyCity] : null,
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
      id: "location",
      selected: filter.location ? [filter.location] : null,
    },
    {
      data: ["Residential", "Commercial"],
      height: 40,
      zIndex: 4,
      onSelect: (val: string) => {},
      placeholder: "Property Type",
      title: "Property Type",
      style: { width: "100%" },
      id: "propertyType",
      selected: filter.propertyType ? [filter.propertyType] : null,
    },
  ]);
  const [unappliedFilters, setUnappliedFilters] = useState<{
    [key: string]: any;
  }>({});
  const dispatch = useDispatch();

  useFocusEffect(
    useCallback(() => {
      const updatedDropdown = dropdownData.map((val) => {
        const id = Object.keys(filter).find((key) => val.id === key) as
          | "propertyType"
          | "purpose";
        return {
          ...val,
          selected: filter?.[id] ? [filter?.[id]] : null,
        };
      });
      setDropDownData(updatedDropdown);
      fetchProposals(1, true);
    }, [filter])
  );

  useEffect(() => {
    return () => {
      onResetFilters();
    };
  }, []);

  const topTabsData = [
    {
      title: `All (${
        (propertiesData?.active?.length || 0) +
        (propertiesData?.draft?.length || 0)
      })`,
      selected: currentTab === "All",
    },
    {
      title: `Active (${propertiesData?.active?.length || 0})`,
      selected: currentTab === "Active",
    },
    {
      title: `Drafts (${propertiesData?.draft?.length || 0})`,
      selected: currentTab === "Drafts",
    },
    ...(params?.type === "user"
      ? [
          {
            title: `Trash (${propertiesData?.trash?.length || 0})`,
            selected: currentTab === "Trash",
          },
        ]
      : []),
  ];

  const fetchProposals = async (newPage: number = 1, isRefreshing = false) => {
    if(newPage === 1) {
      setPropertiesData(null);
      setPage(1);
      setTotalPages(1);
      setCurrentTab("All");
    }
    if (newPage > totalPages) return;

    if (isRefreshing) {
      setRefreshing(true);
    } else {
      setLoading(true);
    }
    try {
      const filters = Object.fromEntries(
        Object.entries(filter).filter(([_, value]) => value !== null)
      );
      const response =
        params.type === "agent"
          ? await handleGetAllPropertyProposals(false, filters, newPage)
          : await handleGetAllProposals(newPage, filters);
      setLoading(false);
      if (response.status && response.proposalData) {
        setPropertiesData((prevData) => {
          const mergeUnique = (
            prevArray: PropertyItem[],
            newArray: PropertyItem[]
          ) => {
            const combined = [...prevArray, ...newArray];
            return combined.filter(
              (item, index, self) =>
                self.findIndex((t) => t.id === item.id) === index
            );
          };
          return {
            activeProposals: mergeUnique(
              prevData?.activeProposals || [],
              response.proposalData?.activeProposals || []
            ),
            archivedProposals: mergeUnique(
              prevData?.archivedProposals || [],
              response.proposalData?.archivedProposals || []
            ),
            rejectedProposals: mergeUnique(
              prevData?.rejectedProposals || [],
              response.proposalData?.rejectedProposals || []
            ),
            submittedProposals: mergeUnique(
              prevData?.submittedProposals || [],
              response.proposalData?.submittedProposals || []
            ),
            trashProperties: mergeUnique(
              prevData?.trashProperties || [],
              response.proposalData?.trashProperties || []
            ),
            active: mergeUnique(
              prevData?.active || [],
              response.proposalData?.active || []
            ),
            draft: mergeUnique(
              prevData?.draft || [],
              response.proposalData?.draft || []
            ),
            trash: mergeUnique(
              prevData?.trash || [],
              response.proposalData?.trash || []
            ),
            totalCount:
              response.proposalData?.totalCount ?? prevData?.totalCount ?? 0,
            currentPage:
              response.proposalData?.currentPage ?? prevData?.currentPage ?? 1,
            totalPages:
              response.proposalData?.totalPages ?? prevData?.totalPages ?? 1,
            itemsPerPage:
              response.proposalData?.itemsPerPage ??
              prevData?.itemsPerPage ??
              10,
          };
        });
        setPage(response.proposalData?.currentPage || newPage);
        setTotalPages(response.proposalData?.totalPages || 1);
      } else {
        showToast(response.message || "Proposals not found", "error");
      }
      if (isRefreshing) {
        setRefreshing(false);
      } else {
        setLoading(false);
      }
    } catch (error) {
      showToast("Failed to fetch Proposals", "error");
      if (isRefreshing) {
        setRefreshing(false);
      } else {
        setLoading(false);
      }
    }
  };

  const draftProperty = async (item: PropertyItem) => {
    setLoading(true);
    try {
      const response = await handleDraftProperty(
        item,
        mapPropertyData(item),
        params.type
      );
      if (response.status) {
        setLoading(false);
        setPropertiesData((prevData) => {
          if (!prevData) return prevData;
          const updatedActive = prevData.active.filter(
            (prop) => prop.id !== item.id
          );
          const updatedDraft = [...prevData.draft, item];

          return {
            ...prevData,
            active: updatedActive,
            draft: updatedDraft,
          };
        });
      } else {
        setLoading(false);
      }
    } catch (error) {
      showToast("Failed to delete proposal", "error");
      setLoading(false);
    }
  };

  const mapPropertyData = (property: any): ReqDraftData => {
    const propertySubTypeId = Array.isArray(property.propertyType?.subTypes)
      ? property.propertyType.subTypes.length
        ? property.propertyType.subTypes[0].id
        : ""
      : property.propertyType?.subTypes?.id || "";
    return {
      propertyID: property.id,
      propertyName: property.propertyName,
      propertySubTypeId: propertySubTypeId,
      propertyPrice: property.propertyPrice,
      propertyArea: property.propertyArea,
      purpose: property.purpose,
      propertyAddress: property.propertyAddress,
      propertyCity: property.propertyCity,
      propertyZip: property.propertyZip,
      propertyDescription: property.propertyDescription,
      longitude: property.longitude,
      latitude: property.latitude,
      image: property.PropertyData.filter((item: any) => item.type === "image")
        .map((img: any) => img.url)
        .join(","),
      imageKeys: property.PropertyData.filter(
        (item: any) => item.type === "image"
      )
        .map((img: any) => img.imageKey)
        .join(","),
      video: property.PropertyData.filter((item: any) => item.type === "video")
        .map((vid: any) => vid.url)
        .join(","),
      propertyStatus: property.propertyStatus === "true",
      amenity: property.amenity || [],
      amenities: property.amenities
        .map((item: any) => item.amenetiesName)
        .join(", "),
    };
  };

  const btnsData = (item: PropertyItem) => {
    const isInDrafts = propertiesData?.draft.some((p) => p.id === item.id);

    return [
      ...(currentTab !== "Drafts" && !isInDrafts
        ? [
            {
              label: "Draft",
              onPress: () => draftProperty(item),
              outline: true,
            },
          ]
        : []),
      {
        label: "View",
        onPress: () => {
          router.navigate({
            pathname: `(user)/${params.type}/(tabs)/dashboard/proposalPreview`,
            params: {
              item: JSON.stringify(item),
              redirectionFrom: "proposal",
            },
          });
        },
      },
    ];
  };

  const getPropertiesData = () => {
    if (!propertiesData) return { data: [], title: "", submitted: [] };

    switch (currentTab) {
      case "All":
        return {
          data: [...propertiesData.active, ...propertiesData.draft],
        };
      case "Active":
        return {
          data: propertiesData.active,
        };
      case "Drafts":
        return {
          data: propertiesData.draft,
        };
      case "Trash":
        return {
          data: propertiesData.trash,
        };
      default:
        return { data: [] };
    }
  };

  const renderPropertiesItem = ({ item }: { item: PropertyItem }) => (
    <View style={styles.verticalItem}>
      <AdBox
        title={item.propertyName}
        description={item.propertyDescription}
        btns={btnsData(item)}
        points={[
          { label: "Est. Range", value: formatPrice(item.propertyPrice || 0) },
          { label: "Purpose", value: item.purpose },
          { label: "Property Type", value: item.propertyType.typeName },
          { label: "City", value: item.propertyCity },
          { label: "Location", value: item.propertyAddress },
        ]}
      />
    </View>
  );

  const { data } = getPropertiesData();

  const onApplyFilter = () => {
    const obj: Record<string, unknown> = {};
    if (unappliedFilters.purpose) {
      obj.purpose = unappliedFilters.purpose.value.value[0];
    }
    if (unappliedFilters.propertyCity) {
      obj.propertyCity = unappliedFilters.propertyCity.value.value[0];
    }
    if (unappliedFilters.location) {
      obj.location = unappliedFilters.location.value.value[0];
    }
    if (unappliedFilters.propertyType) {
      obj.propertyType = unappliedFilters.propertyType.value.value[0];
    }
    console.log("Object " + JSON.stringify(obj));
    dispatch(setFilter(obj));
    setVisible(false);
  };

  const onRefresh = () => {
    if (page < totalPages) {
      fetchProposals(page + 1, true);
    }
  };

  const onResetFilters = () => {
    setUnappliedFilters({});
    dispatch(
      setFilter({
        propertyType: null,
        purpose: null,
        propertyCity: null,
        location: null,
      })
    );
    fetchProposals();
  };

  return (
    <View style={{ flex: 1, ...styles.container }}>
      <OverlayLoader isShow={loading} />
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
              onSelect={(val) => {
                unappliedFilters[item.id] = { value: val };
                setUnappliedFilters({ ...unappliedFilters });
              }}
              style={{ width: "100%" }}
              height={40}
              zIndex={4 - index}
              title={item.title}
              theme={theme}
              id={item.id}
              selected={item.selected}
            />
            {index < dropdownData.length - 1 && <GapView length={20} />}
          </View>
        ))}
        <GapView length={60} />
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
        onPressFilter={() => setVisible(!visible)}
        style={{
          paddingHorizontal: 20,
          alignSelf: "flex-end",
          marginBottom: 10,
        }}
        onReset={onResetFilters}
      />
      {params.type === "user" ? (
        <MyTopTabs
          data={topTabsData}
          list
          onTabPress={(title: string) => setCurrentTab(title.split(" ")[0])}
        />
      ) : (
        <MyTopTabs
          data={topTabsData}
          onTabPress={(title: string) => setCurrentTab(title.split(" ")[0])}
        />
      )}
      <View style={styles.content}>
        {data.length > 0 ? (
          <FlatList
            data={data}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => renderPropertiesItem({ item })}
            ItemSeparatorComponent={() => <GapView length={15} />}
            keyExtractor={(item) => item.id}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={fetchProposals}
                tintColor={theme?.colors.primary}
              />
            }
            onEndReached={onRefresh}
            onEndReachedThreshold={0.5}
          />
        ) : (
          <View style={styles.errorContainer}>
            <MyText text="No Data found" size={16} textColor="red" />
            <TouchableOpacity onPress={() => fetchProposals()}>
              <MyText text="Retry" size={16} textColor={theme.colors.primary} />
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 26,
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
  verticalItem: {
    width: "100%",
  },
});
