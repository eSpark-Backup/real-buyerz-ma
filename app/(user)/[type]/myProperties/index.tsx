import React, { useEffect, useState } from "react";
import {
  FlatList,
  ScrollView,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
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
import { handleGetAllPropertyProposals, ProposalData } from "../myProposals/utils";
import { showToast } from "@utils/showToast";
import { PropertyItem } from "../(tabs)/home/utils";
import { handleDraftProperty  } from "../myListings/utils";
import { TouchableOpacity } from "react-native-gesture-handler";

interface DropDownList {
  data: string[];
  placeholder: string;
  title: string;
  height: number;
  zIndex: number;
  style?: StyleProp<ViewStyle>;
  onSelect: (val: string) => void;
}

const dropdownData: DropDownList[] = [
  {
    data: ["Selling", "Buying", "Rent"],
    height: 40,
    zIndex: 4,
    onSelect: (val: string) => { },
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
    onSelect: (val: string) => { },
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
    onSelect: (val: string) => { },
    placeholder: "Location",
    title: "Location",
    style: { width: "100%" },
  },
  {
    data: ["House", "Plot", "Commercial"],
    height: 40,
    zIndex: 4,
    onSelect: (val: string) => { },
    placeholder: "Purpose",
    title: "Purpose",
    style: { width: "100%" },
  },
];

export default function MyProperties() {
  const theme = useTheme() as MyTheme;
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [propertiesData, setPropertiesData] = useState<ProposalData | null>(null);
  const [currentTab, setCurrentTab] = useState("All");
  const params = useGlobalSearchParams<{ type: UserType }>();

  useEffect(() => {
    fetchProperties();
  }, []);

  const topTabsData = [
    {
      title: `All (${(propertiesData?.active?.length || 0) + (propertiesData?.draft?.length || 0)})`,
      selected: currentTab === "All"
    },
    {
      title: `Active (${propertiesData?.active?.length || 0})`,
      selected: currentTab === "Active"
    },
    {
      title: `Drafts (${propertiesData?.draft?.length || 0})`,
      selected: currentTab === "Drafts"
    },
            //// It will show for user
    // {
    //   title: `Trash (${propertiesData?.trash?.length || 0})`,
    //   selected: currentTab === "Trash"
    // },
  ];

  const fetchProperties = async () => {
    setLoading(true);
    try {
      const response = await handleGetAllPropertyProposals(false);
      setLoading(false);
      if (response.status && response.proposalData) {
        setPropertiesData(response.proposalData);
      }
      else {
        showToast(response.message || "Properties not found", 'error')
      }
    } catch (error) {
      showToast('Failed to fetch Properties', 'error')
      setLoading(false);
    }
  };

  const draftProperty = async (item: PropertyItem) => {
    setLoading(true);
    try {
      const response = await handleDraftProperty(item.id);
      if (response.status) {
        fetchProperties()
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
    ...(currentTab !== 'Drafts'
      ? [{ label: "Draft", onPress: () => draftProperty(item), outline: true }]
      : []),
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

        //// It will show for user

      // case "Trash":
      //   return {
      //     data: propertiesData.draft,
      //   };
      default:
        return { data: [] };
    }
  };

  const formatPrice = (price: string | number | null): string => {
    if (price === null) return "N/A";
    if (typeof price === "string") return price;
    return price.toLocaleString();
  };

  const renderPropertiesItem = ({ item }: { item: PropertyItem }) => (
    <View style={styles.verticalItem}>
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

  const { data } = getPropertiesData();

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
              onSelect={(val) => console.log("val", val)}
              style={{ width: "100%" }}
              height={40}
              zIndex={4 - index}
              title={item.title}
              theme={theme}
              id={`dropdown-${index}`}
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
      <MyTopTabs
        data={topTabsData}
        onTabPress={(title: string) => setCurrentTab(title.split(" ")[0])}
      />

      <View style={styles.content}>
        {data.length > 0 ? (
          <FlatList
            data={data}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => renderPropertiesItem({ item })}
            ItemSeparatorComponent={() => <GapView length={15} />}
            keyExtractor={(item) => item.id}
          />
        ) : (
          <View style={styles.errorContainer}>
            <MyText text="No Data found" size={16} textColor="red" />
            <TouchableOpacity onPress={fetchProperties}>
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
    justifyContent: 'center',
    alignItems: 'center',
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
    width: '100%',
  }
});
