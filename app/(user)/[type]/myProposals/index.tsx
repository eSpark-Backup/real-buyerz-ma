import React, { useState, useEffect, useCallback } from "react";
import {
  FlatList,
  StyleSheet,
  View,
  StyleProp,
  ViewStyle,
  Dimensions,
  RefreshControl
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
import { Feather } from "@expo/vector-icons";
import {
  handleDeletePropertyProposal,
  handleGetAllPropertyProposals,
  ProposalData,
} from "./utils";
import { PropertyItem } from "../(tabs)/home/utils";
import { showToast } from "@utils/showToast";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useSelector } from "react-redux";
import { RootState } from "@store";
import { PropertySliceState, setFilter } from "features/property/propertySlice";
import { useDispatch } from "react-redux";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

export default function MyProposals() {
  const theme = useTheme() as MyTheme;
  const [visible, setVisible] = useState(false);
  const [proposalData, setProposalData] = useState<ProposalData | null>(null);
  const { filter } = useSelector<RootState, PropertySliceState>(
    (state) => state.property
  );
  const [activeTab, setActiveTab] = useState("Active");
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const params = useGlobalSearchParams<{ type: UserType }>();
  const [unappliedFilters, setUnappliedFilters] = useState<{
    [key: string]: any;
  }>({});
  const dispatch = useDispatch();
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
      fetchProposals();
    }, [filter])
  );

  useEffect(() => {
    return () => {
      onResetFilters();
    };
  }, []);

  const topTabsData = [
    {
      title: `Active (${
        (proposalData?.activeProposals?.length || 0) +
        (proposalData?.submittedProposals?.length || 0)
      })`,
      selected: activeTab === "Active",
    },
    {
      title: `Archive (${proposalData?.archivedProposals.length || 0})`,
      selected: activeTab === "Archive",
    },
    {
      title: `Rejected (${proposalData?.rejectedProposals.length || 0})`,
      selected: activeTab === "Rejected",
    },
  ];

  const fetchProposals = async (newPage: number = 1, isRefreshing = false) => {
    if(newPage === 1) {
      setProposalData(null);
      setPage(1);
      setTotalPages(1);
      setActiveTab("Active");
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
      const response = await handleGetAllPropertyProposals(
        true,
        filters,
        newPage
      );
      if (response.status && response.proposalData) {
        setProposalData((prevData) => {
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
      } else {
        showToast(response.message || "Proposals not found", "error");
      }
      setPage(response.proposalData?.currentPage || newPage);
      setTotalPages(response.proposalData?.totalPages || 1);
      if (isRefreshing) {
        setRefreshing(false);
      } else {
        setLoading(false);
      }
    } catch (error) {
      showToast("Failed to fetch Proposal", "error");
      if (isRefreshing) {
        setRefreshing(false);
      } else {
        setLoading(false);
      }
    }
  };

  const deleteProposal = async (proposalID: string) => {
    setLoading(true);
    try {
      const response = await handleDeletePropertyProposal(proposalID);
      if (response.status) {
        setProposalData((prevData) => {
          if (!prevData) return prevData;
          return {
            ...prevData,
            activeProposals: prevData.activeProposals.filter(
              (item) => item.id !== proposalID
            ),
            submittedProposals: prevData.submittedProposals.filter(
              (item) => item.id !== proposalID
            ),
            archivedProposals: prevData.archivedProposals.filter(
              (item) => item.id !== proposalID
            ),
            rejectedProposals: prevData.rejectedProposals.filter(
              (item) => item.id !== proposalID
            ),
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

  const onRefresh = () => {
    if (page < totalPages) {
      fetchProposals(page + 1, true);
    }
  };

  const btnsData = (item: PropertyItem) => [
    { label: "Trash", onPress: () => deleteProposal(item.id), outline: true },
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

  const getActiveData = () => {
    if (!proposalData) return { data: [], title: "", submitted: [] };

    switch (activeTab) {
      case "Active":
        return {
          data: proposalData.activeProposals,
          title: "Active Proposals",
          submitted: proposalData.submittedProposals,
        };
      case "Archive":
        return {
          data: proposalData.archivedProposals,
          title: "Archive Proposals",
          submitted: [],
        };
      case "Rejected":
        return {
          data: proposalData.rejectedProposals,
          title: "Rejected Proposals",
          submitted: [],
        };
      default:
        return { data: [], title: "", submitted: [] };
    }
  };

  const formatPrice = (price: string | number | null): string => {
    if (price === null) return "N/A";
    if (typeof price === "string") return price;
    return price.toLocaleString();
  };

  const renderProposalItem = ({
    item,
    isHorizontal = false,
  }: {
    item: PropertyItem;
    isHorizontal?: boolean;
  }) => (
    <View
      style={
        isHorizontal ? styles(theme).horizontalItem : styles(theme).verticalItem
      }
    >
      <AdBox
        title={item.propertyName}
        description={item.propertyDescription}
        btns={btnsData(item)}
        points={[
          { label: "Est. Range", value: formatPrice(item.propertyPrice) },
          { label: "Purpose", value: item.purpose },
          { label: "Property Type", value: item.propertyType.typeName },
          { label: "City", value: item.propertyCity },
          { label: "Location", value: item.propertyAddress },
        ]}
      />
    </View>
  );

  const { data, title, submitted } = getActiveData();

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

  const onResetFilters = () => {
    console.log("idhar reset mai aya");
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
    <View style={[styles(theme).container, { flex: 1 }]}>
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
              style={{ width: "100%" } as StyleProp<ViewStyle>}
              height={item.height}
              zIndex={item.zIndex}
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
          label="Save"
          onPress={onApplyFilter}
          labelStyle={styles(theme).saveButtonLabel}
          style={[
            styles(theme).saveButton,
            { backgroundColor: theme.colors.primary },
          ]}
        />
      </MyBottomSheet.Modal>

      <View style={styles(theme).headerContainer}>
        <MyButton
          leftIcon={<Feather name="plus" color="#ffffff" size={14} />}
          label="Post Listing"
          labelStyle={styles(theme).postButtonLabel}
          style={[
            styles(theme).postButton,
            { backgroundColor: theme.colors.primary },
          ]}
          onPress={() => router.push(`(user)/${params?.type!}/(tabs)/listings`)}
        />
        <MyTopFilter
          theme={theme}
          onPressFilter={() => setVisible(!visible)}
          style={{ alignSelf: "flex-end" }}
          onReset={onResetFilters}
        />
      </View>

      <MyTopTabs
        data={topTabsData}
        onTabPress={(title: string) => setActiveTab(title.split(" ")[0])}
      />

      <View style={styles(theme).content}>
        {activeTab === "Active" ? (
          data.length > 0 || submitted.length > 0 ? (
            <>
              {data.length > 0 && (
                <>
                  <MyText
                    text={title}
                    size={18}
                    weight="500"
                    style={{ marginBottom: 20 }}
                    textColor={theme.colors.negative}
                  />
                  <FlatList
                    data={data}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item }) => renderProposalItem({ item })}
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
                </>
              )}

              {submitted.length > 0 && (
                <>
                  <MyText
                    text="Submitted Proposals"
                    size={18}
                    weight="500"
                    style={{ marginVertical: 20 }}
                    textColor={theme.colors.negative}
                  />
                  <FlatList
                    data={submitted}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item }) => renderProposalItem({ item })}
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
                </>
              )}
            </>
          ) : (
            <View style={styles(theme).errorContainer}>
              <MyText text="No Data found" size={16} textColor="red" />
              <TouchableOpacity onPress={() => fetchProposals()}>
                <MyText
                  text="Retry"
                  size={16}
                  textColor={theme.colors.primary}
                />
              </TouchableOpacity>
            </View>
          )
        ) : activeTab === "Archive" || activeTab === "Rejected" ? (
          data.length > 0 ? (
            <>
              <MyText
                text={title}
                size={18}
                weight="500"
                style={{ marginBottom: 20 }}
                textColor={theme.colors.negative}
              />
              <FlatList
                data={data}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => renderProposalItem({ item })}
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
            </>
          ) : (
            <View style={styles(theme).errorContainer}>
              <MyText text="No Data found" size={16} textColor="red" />
              <TouchableOpacity onPress={() => fetchProposals()}>
                <MyText
                  text="Retry"
                  size={16}
                  textColor={theme.colors.primary}
                />
              </TouchableOpacity>
            </View>
          )
        ) : null}
      </View>
    </View>
  );
}

const styles = (theme?: MyTheme) =>
  StyleSheet.create({
    container: {
      paddingTop: 26,
    },
    headerContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 10,
      paddingHorizontal: 20,
    },
    postButton: {
      width: 120,
      height: 35,
      borderRadius: 4,
      justifyContent: "space-evenly",
      paddingHorizontal: 5,
      alignItems: "center",
    },
    postButtonLabel: {
      color: "#ffffff",
      fontSize: 12,
      fontWeight: "500",
    },
    saveButton: {
      alignSelf: "flex-end",
      width: 100,
      height: 30,
      borderRadius: 4,
    },
    errorContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    saveButtonLabel: {
      color: "#ffffff",
      fontSize: 10,
    },
    content: {
      flex: 1,
      marginTop: 18,
      paddingHorizontal: 20,
    },
    horizontalItem: {
      width: "100%",
    },
    verticalItem: {
      width: "100%",
    },
  });
