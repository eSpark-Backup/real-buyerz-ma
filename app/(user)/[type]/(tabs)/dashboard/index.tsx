import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  FlatList,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
} from "react-native";
import { useTheme } from "@react-navigation/native";
import { router, useGlobalSearchParams } from "expo-router";

import {
  Card,
  GapView,
  LabelValue,
  MyButton,
  MyText,
  OverlayLoader,
} from "@components";
import { MyTheme, UserType } from "@types";
import { Ionicons } from "@expo/vector-icons";
import Bidding from "./bidding";
import { ProposalData } from "../../myProposals/utils";
import { handleGetAllProposals } from "./utils";
import { showToast } from "@utils/showToast";
import { PropertyItem } from "../home/utils";
import { formatPrice } from "app/utils/priceConverter";

const minutesAgo: number = 30;

function timeAgo(date: string): string {
  const dateObj = new Date(date);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - dateObj.getTime()) / 1000);

  const minutes = Math.floor(diffInSeconds / 60);
  const hours = Math.floor(diffInSeconds / 3600);
  const days = Math.floor(diffInSeconds / 86400);

  if (days > 0) {
    return `${days} day${days > 1 ? "s" : ""} ago`;
  } else if (hours > 0) {
    return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  } else if (minutes > 0) {
    return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
  } else {
    return "just now";
  }
}

function Dashboard() {
  const theme = useTheme() as MyTheme;
  const params = useGlobalSearchParams<{ type: UserType }>();
  const [propertiesData, setPropertiesData] = useState<ProposalData | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchAllProposals();
  }, []);

  const fetchAllProposals = async (
    newPage: number = 1,
    isRefreshing = false
  ) => {
    if (newPage > totalPages) return;

    if (isRefreshing) {
      setRefreshing(true);
    } else {
      setLoading(true);
    }
    try {
      const response = await handleGetAllProposals(newPage);
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

  const onRefresh = () => {
    if (page < totalPages) {
      fetchAllProposals(page + 1, true);
    }
  };

  const getProposalData = () => {
    if (!propertiesData) return { data: [], title: "", submitted: [] };
    const filteredData = propertiesData.active.filter(
      (item) => item.proposalCount > 0
    );
    return {
      data: filteredData,
    };
  };

  const { data } = getProposalData();

  return (
    <>
      <OverlayLoader isShow={loading} />
      <View style={styles.container}>
        <View style={styles.top}>
          <MyText
            text="Dashboard"
            size={20}
            weight="600"
            textColor={theme.colors.negative}
          />
        </View>
        <View style={styles.content}>
          <Card style={{ flex: 1 }}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                padding: 12,
                borderBottomWidth: 1,
                borderColor: theme.colors.border,
              }}
            >
              <MyText
                text="Your Posting"
                weight="600"
                size={16}
                textColor={theme.colors.negative}
              />
              <TouchableOpacity
                activeOpacity={1}
                onPress={() =>
                  router.push(`(user)/${params?.type!}/myProperties`)
                }
              >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <MyText
                    text="See all postings"
                    textColor={theme.colors.secondary}
                  />
                  <Ionicons
                    name="chevron-forward"
                    color={theme.colors.secondary}
                    style={{ paddingLeft: 10, top: 1 }}
                    size={16}
                  />
                </View>
              </TouchableOpacity>
            </View>
            {data.length > 0 ? (
              <FlatList
                data={data}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) =>
                  renderPostingList({ item, theme, params })
                }
                ItemSeparatorComponent={() => <Card.Divider />}
                keyExtractor={(item) => item.id}
                refreshControl={
                  <RefreshControl
                    refreshing={refreshing}
                    onRefresh={fetchAllProposals}
                    tintColor={theme?.colors.primary}
                  />
                }
                onEndReached={onRefresh}
                onEndReachedThreshold={0.5}
                contentContainerStyle={{ flexGrow: 1 }}
              />
            ) : !loading ? (
              <View style={styles.errorContainer}>
                <MyText
                  text="No Proposal Data found"
                  size={16}
                  textColor="red"
                />
                <TouchableOpacity onPress={() => fetchAllProposals()}>
                  <MyText
                    text="Retry"
                    size={16}
                    textColor={theme.colors.primary}
                  />
                </TouchableOpacity>
              </View>
            ) : null}
          </Card>
        </View>
      </View>
    </>
  );
}

const renderPostingList = ({
  item,
  theme,
  params,
}: {
  item: PropertyItem;
  theme: MyTheme;
  params: { type?: UserType };
}) => (
  <View style={{ padding: 20 }}>
    <View>
      <MyText text={item.propertyName} weight="500" size={16} />
    </View>
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 6,
        marginTop: 10,
      }}
    >
      <LabelValue
        label="Est. Range"
        value={formatPrice(item.propertyPrice || 0)}
        valueStyle={{ color: theme.colors.negative }}
      />
      <MyText
        text={`Posted ${timeAgo(item.createdAt)}`}
        weight="400"
        size={12}
      />
    </View>
    <View style={{ marginBottom: 16 }}>
      <MyText
        text={item.propertyDescription}
        numberOfLines={3}
        size={12}
        weight="300"
      />
    </View>
    <View>
      <LabelValue label="Status" value={item.purpose!} />
      <LabelValue label="City" value={item.propertyCity!} />
      <LabelValue label="Area" value={item.propertyAddress!} />
      <LabelValue label="Proposal" value={item.proposalCount!.toString()} />
    </View>
    <MyButton
      label="View Proposals"
      textColor="#ffffff"
      onPress={() =>
        router.navigate({
          pathname: `(user)/${params?.type}/(tabs)/dashboard/proposalList`,
          params: {
            item: JSON.stringify(item),
          },
        })
      }
      labelStyle={{ fontSize: 12 }}
      style={{
        marginTop: 20,
        alignSelf: "flex-start",
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 4,
      }}
      backgroundColor={theme.colors.primary}
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 26,
    paddingHorizontal: 22,
  },
  top: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 17,
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  content: { flex: 1 },
  ap_top: {
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  ap_top1: {
    alignItems: "center",
    flexDirection: "row",
    marginBottom: 5,
  },
  ap_mid: {},
  ap_bot: {
    alignItems: "flex-end",
    marginBottom: 10,
  },
});

export default function App() {
  const params = useGlobalSearchParams<{ type: UserType }>();
  return params?.type === "agent" ? <Bidding /> : <Dashboard />;
}
