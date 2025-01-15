import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ViewStyle,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";

import {
  Card,
  GapView,
  MyAvatar,
  MyButton,
  MyText,
  OverlayLoader,
  PropertyList,
} from "@components";
import {
  HomeOutline,
  HomeSmall,
  KeySmallIcon,
  MiniArrow,
} from "@assets/images";
import { MyTheme, PropertyDetailScreenParams } from "@types";
import {
  AgentData,
  handleGetAdminProfile,
  OrganizedProperties,
  PropertyItem,
} from "./utils";
import { useLocalSearchParams } from "expo-router";

interface PropertriesCardProps {
  sale?: boolean;
  categories: { [key: string]: number };
  totalCount: number;
  style?: ViewStyle;
}

const AgentProfile = () => {
  const theme = useTheme() as MyTheme;
  const [title, setTitle] = useState("Recent Properties");
  const { item } = useLocalSearchParams<PropertyDetailScreenParams>();
  const [agentData, setAgentData] = useState<AgentData | null>();
  const [organizedProperties, setOrganizedProperties] =
    useState<OrganizedProperties | null>(null);
  const [recentProperties, setRecentProperties] = useState<
    PropertyItem[] | null
  >(null);
  const agencyID: string = JSON.parse(item ?? "");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAgentProfile();
  }, []);

  const fetchAgentProfile = async () => {
    setLoading(true);
    const response = await handleGetAdminProfile(agencyID);
    if (response.status && response.data) {
      const { agent, organizedProperties, recentProperties } =
        response.data.response.data;
      setAgentData(agent);
      setOrganizedProperties(organizedProperties);
      setRecentProperties(recentProperties);
      setTitle("Recent Properties By " + agent?.firstName);
    }
    setLoading(false);
  };

  const processCategories = (type: "Sale" | "Rent") => {
    if (!organizedProperties || !organizedProperties[type])
      return { categories: {}, total: 0 };

    const categories: { [key: string]: number } = {};
    let total = 0;

    Object.entries(organizedProperties[type]).forEach(([category, data]) => {
      if (category !== "count") {
        Object.entries(data).forEach(([subType, subData]) => {
          if (subType !== "count") {
            categories[subType] = subData.count;
            total += subData.count;
          }
        });
      }
    });

    return { categories, total };
  };

  const saleData = processCategories("Sale");
  const rentData = processCategories("Rent");
  return (
    <ScrollView contentContainerStyle={styles(theme).main}>
      <OverlayLoader isShow={loading} />
      <MyAvatar
        imageUrl={{
          uri: agentData?.profileImage || "https://picsum.photos/id/151/130",
        }}
        size={100}
      />
      <MyText
        size={16}
        weight="500"
        text={`${agentData?.firstName || ""} ${agentData?.lastName || ""}`}
        textColor={theme.colors.secondary}
        style={{ paddingVertical: 10 }}
      />
      <MyButton
        label="Lets talk"
        style={styles(theme).button}
        labelStyle={styles(theme).label}
      />
      <CustomCard
        location={agentData?.address || "Karachi"}
        forSale={saleData.total}
        forRent={rentData.total}
      />
      <MyText size={16} weight="500" style={styles(theme).name}>
        Properties By {agentData?.firstName}
      </MyText>

      <PropertriesCard
        categories={saleData.categories}
        totalCount={saleData.total}
        sale
      />
      <GapView length={10} />
      <PropertriesCard
        categories={rentData.categories}
        totalCount={rentData.total}
      />
      <MyText size={16} weight="500" style={styles(theme).about}>
        About {agentData?.firstName}
      </MyText>
      <MyText size={12} textColor={theme.colors.listText}>
        {agentData?.bio || ""}
      </MyText>
      <View style={{ width: "100%" }}>
        <View style={{ width: "100%" }}>
          <PropertyList theme={theme} data={recentProperties} title={title} />
          {!loading && recentProperties == null && (
            <MyText
              size={14}
              weight="500"
              text="No Properties Found"
              textColor={theme.colors.listText}
              style={{ textAlign: "center", marginVertical: 20 }}
            />
          )}
        </View>
      </View>
      <GapView length={20} />
    </ScrollView>
  );
};

const PropertriesCard = ({
  categories,
  totalCount,
  sale,
  style,
}: PropertriesCardProps) => {
  const theme = useTheme() as MyTheme;
  return (
    <>
      <View
        style={[styles(theme).cardContainer, { paddingVertical: 10 }, style]}
      >
        <View style={styles(theme).viewAll}>
          <HomeSmall />
          <GapView mode="horizontal" length={5} />
          <MyText size={12}>
            {totalCount} Properties for {sale ? "sale" : "rent"}
          </MyText>
        </View>
        <TouchableOpacity activeOpacity={1} style={styles(theme).viewAllRight}>
          <MyText size={12} textColor={theme.colors.primary} text="View All" />
          <MiniArrow />
        </TouchableOpacity>
      </View>
      <View style={styles(theme).cardContainer}>
        {Object.entries(categories).map(([type, count], index) => (
          <Card key={index} style={styles(theme).card}>
            <MyText size={16} textColor={theme.colors.secondary} weight="700">
              {count}
            </MyText>
            <MyText>{type}</MyText>
          </Card>
        ))}
      </View>
    </>
  );
};

interface CustomCardProps {
  location?: string;
  forSale?: number;
  forRent?: number;
}

const CustomCard = ({ location, forSale, forRent }: CustomCardProps) => {
  const theme = useTheme() as MyTheme;

  return (
    <Card style={styles(theme).customCardContainer}>
      <View style={styles(theme).box}>
        <Ionicons
          name="location-outline"
          size={14}
          color={theme.colors.primary}
        />
        <MyText
          size={12}
          weight="500"
          textColor={theme.dark ? theme.colors.text : theme.colors.listText}
        >
          {location}
        </MyText>
      </View>
      <View style={styles(theme).box}>
        <HomeOutline />
        <MyText
          size={12}
          weight="500"
          textColor={theme.dark ? theme.colors.text : theme.colors.listText}
        >
          {forSale} For Sale
        </MyText>
      </View>
      <View style={styles(theme).lastBox}>
        <KeySmallIcon />
        <MyText
          size={12}
          weight="500"
          textColor={theme.dark ? theme.colors.text : theme.colors.listText}
        >
          {forRent} For Rent
        </MyText>
      </View>
    </Card>
  );
};

const styles = (theme?: MyTheme) =>
  StyleSheet.create({
    main: {
      alignItems: "center",
      width: "90%",
      alignSelf: "center",
      paddingTop: "2%",
    },
    cardContainer: {
      flexDirection: "row",
      width: "100%",
      alignItems: "center",
      justifyContent: "flex-start",
      flexWrap: "wrap",
    },
    card: {
      width: "30%",
      height: 55,
      alignItems: "center",
      justifyContent: "center",
      marginRight: "5%",
      marginBottom: 10,
    },
    button: {
      backgroundColor: theme?.colors.background,
      width: 90,
      height: 35,
      elevation: 4,
      borderRadius: 17,
      marginBottom: 15,
    },
    label: {
      color: theme?.dark ? theme?.colors.text : theme?.colors.secondary,
    },
    name: { alignSelf: "flex-start", paddingTop: 53, paddingBottom: 5 },
    about: { alignSelf: "flex-start", marginTop: 25, paddingBottom: 15 },
    viewAll: {
      flexDirection: "row",
      alignItems: "center",
    },
    viewAllRight: {
      position: "absolute",
      right: 0,
      flexDirection: "row",
      alignItems: "center",
    },
    customCardContainer: {
      flexDirection: "row",
      backgroundColor: theme?.dark ? theme.colors.card : "#F6F6F6",
      height: 60,
      alignItems: "center",
      justifyContent: "space-between",
    },
    box: {
      width: "33.33%",
      alignItems: "center",
      borderRightWidth: 1,
      borderRightColor: theme?.colors.border,
      gap: 4,
    },
    lastBox: {
      width: "33.33%",
      gap: 4,
      alignItems: "center",
    },
  });

export default AgentProfile;
