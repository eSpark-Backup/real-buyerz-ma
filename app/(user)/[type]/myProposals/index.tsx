import React, { useState, useEffect } from "react";
import {
  FlatList,
  StyleSheet,
  View,
  StyleProp,
  ViewStyle,
  Dimensions,
} from "react-native";
import { useTheme } from "@react-navigation/native";
import { router, useGlobalSearchParams } from "expo-router";
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
import { handleDeletePropertyProposal, handleGetAllProposals, ProposalData } from "./utils";
import { PropertyItem } from "../(tabs)/home/utils";
import { showToast } from "@utils/showToast";

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const dropdownData = [
  {
    data: ["Selling", "Buying", "Rent"],
    height: 40,
    zIndex: 4,
    placeholder: "Purpose",
    title: "Purpose",
    style: {
      width: '100%' as const
    } as StyleProp<ViewStyle>,
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
    zIndex: 3,
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
    zIndex: 2,
    placeholder: "Location",
    title: "Location",
    style: { width: "100%" },
  },
  {
    data: ["House", "Plot", "Commercial"],
    height: 40,
    zIndex: 1,
    placeholder: "Property Type",
    title: "Property Type",
    style: { width: "100%" },
  },
];

export default function MyProposals() {
  const theme = useTheme() as MyTheme;
  const [visible, setVisible] = useState(false);
  const [proposalData, setProposalData] = useState<ProposalData | null>(null);
  const [activeTab, setActiveTab] = useState("Active");
  const [loading, setLoading] = useState(true);
  const params = useGlobalSearchParams<{ type: UserType }>();

  const topTabsData = [
    {
      title: `Active (${proposalData?.activeProposals.length || 0})`,
      selected: activeTab === "Active"
    },
    {
      title: `Archive (${proposalData?.archivedProposals.length || 0})`,
      selected: activeTab === "Archive"
    },
    {
      title: `Rejected (${proposalData?.rejectedProposals.length || 0})`,
      selected: activeTab === "Rejected"
    },
  ];

  useEffect(() => {
    fetchProposals();
  }, []);

  const fetchProposals = async () => {
    setLoading(true);
    try {
      const response = await handleGetAllProposals();
      setLoading(false);
      if (response.status && response.proposalData) {
        setProposalData(response.proposalData);
      }
      else {
        showToast(response.message || "Proposals not found", 'error')
      }
    } catch (error) {
      showToast('Failed to fetch Proposal', 'error')
      setLoading(false);
    }
  };

  const deleteProposal = async (proposalID: string) => {
    setLoading(true);
    try {
      const response = await handleDeletePropertyProposal(proposalID);
      if (response.status) {
        fetchProposals()
      }
      else {
        setLoading(false);
      }
    } catch (error) {
      showToast('Failed to delete proposal', 'error')
      setLoading(false);
    }
  };


  const btnsData = (item: PropertyItem) => [
    { label: "Trash", onPress: () => deleteProposal(item.id), outline: true },
    {
      label: "View", onPress: () => {
        console.log(`Type ${params.type} item ${JSON.stringify(item)}`)
        router.navigate({
          pathname: `(user)/${params.type}/(tabs)/dashboard/proposalPreview`,
          params: {
            item: JSON.stringify(item),
            redirectionFrom: 'proposal'
          }
        })
      }
    },
  ];

  const getActiveData = () => {
    if (!proposalData) return { data: [], title: "", submitted: [] };

    switch (activeTab) {
      case "Active":
        return {
          data: proposalData.activeProposals,
          title: "Active Proposals",
          submitted: proposalData.submittedProposals
        };
      case "Archive":
        return {
          data: proposalData.archivedProposals,
          title: "Archive Proposals",
          submitted: []
        };
      case "Rejected":
        return {
          data: proposalData.rejectedProposals,
          title: "Rejected Proposals",
          submitted: []
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

  const renderProposalItem = ({ item, isHorizontal = false }: { item: PropertyItem; isHorizontal?: boolean }) => (
    <View style={isHorizontal ? styles.horizontalItem : styles.verticalItem}>
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

  return (
    <View style={[styles.container, { flex: 1 }]}>
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
              onSelect={(val) => console.log("val", val)}
              style={{ width: '100%' } as StyleProp<ViewStyle>}
              height={item.height}
              zIndex={item.zIndex}
              title={item.title}
              theme={theme}
              id={`dropdown-${index}`}
            />
            {index < dropdownData.length - 1 && <GapView length={20} />}
          </View>
        ))}
        <GapView length={60} />
        <MyButton
          label="Save"
          labelStyle={styles.saveButtonLabel}
          style={[styles.saveButton, { backgroundColor: theme.colors.primary }]}
        />
      </MyBottomSheet.Modal>

      <View style={styles.headerContainer}>
        <MyButton
          leftIcon={<Feather name="plus" color="#ffffff" size={14} />}
          label="Post Listing"
          labelStyle={styles.postButtonLabel}
          style={[styles.postButton, { backgroundColor: theme.colors.primary }]}
          onPress={() => router.push("/create-proposal")}
        />
        <MyTopFilter
          theme={theme}
          onPressFilter={() => setVisible(!visible)}
          style={{ alignSelf: "flex-end" }}
        />
      </View>

      <MyTopTabs
        data={topTabsData}
        paddingH={15}
        onTabPress={(title: string) => setActiveTab(title.split(" ")[0])}
      />

      <View style={styles.content}>
        {data.length > 0 && (
          <>
            <MyText
              text={title}
              size={18}
              weight="500"
              style={{ marginBottom: 20 }}
              textColor={theme.colors.negative}
            />
            {
              <FlatList
                data={data}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => renderProposalItem({ item })}
                ItemSeparatorComponent={() => <GapView length={15} />}
                keyExtractor={(item) => item.id}
              />
            }
          </>
        )}

        {submitted.length > 0 && activeTab === "Active" && (
          <>
            <MyText
              text="Submitted Proposals"
              size={18}
              weight="500"
              style={{ marginVertical: 20 }}
              textColor={theme.colors.negative}
            />
            <FlatList
              horizontal
              data={submitted}
              showsHorizontalScrollIndicator={false}
              renderItem={({ item }) => renderProposalItem({ item, isHorizontal: true })}
              ItemSeparatorComponent={() => <GapView mode="horizontal" length={15} />}
              keyExtractor={(item) => item.id}
              snapToInterval={SCREEN_WIDTH - 40}
              decelerationRate="fast"
            />
          </>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
    width: '100%',
  },
  verticalItem: {
    width: '100%',
  }
});