import React, { useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { useTheme } from "@react-navigation/native";

import { Card, GapView, LabelValue, MyAvatar, MyText, OverlayLoader } from "@components";
import { MyTheme, PropertyDetailScreenParams, UserType } from "@types";
import { LocationIcon } from "@assets/images";
import { NormalBtn } from "@components/AdBox";
import { Amenity, PropertyItem, SavedLeadsItem } from "../home/utils";
import { useGlobalSearchParams, useLocalSearchParams } from "expo-router";
import { isSavedLeadsItem } from "@utils/functions";
import { formatPrice } from "app/utils/priceConverter";
import { handleSaveFavoriteProperty, handleSavePropertyAgent } from "../../favourites/utils";
import { showToast } from "@utils/showToast";

interface Preview {
  title: string;
  desc: string;
  purpose: string;
  type: string;
  location: string;
  city: string;
  size: string;
  range: number | string;
  installments: string;
  readyFor: string;
  map?: string;
  imageMedia?: string[];
  videoMedia?: string[];
  amenities?: Amenity[]
}


function ProposalPreview() {
  const theme = useTheme() as MyTheme;
  const { item } = useLocalSearchParams<PropertyDetailScreenParams>();
  const params = useGlobalSearchParams<{ type?: UserType }>();
  const productDetail: PropertyItem | SavedLeadsItem = JSON.parse(item ?? "{}");
  const [isLoading, setIsLoading] = useState(false);

  const AvatarContainer = () => {
    const buttons = [
      ...(params.type === 'agent' ? [
        { label: "Apply Now", outline: false, onPress: () => console.log("Apply clicked") }
      ] : []),
      ...(isSavedLeadsItem(productDetail) ? [] : [
        { label: "Save", outline: true, onPress: () => handleSaveLeads() }
      ]),
    ];

    const user = isSavedLeadsItem(productDetail) ? productDetail.property.user : productDetail.user;

    const createdAtLocal = productDetail.createdAt ? new Date(productDetail.createdAt).toLocaleString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    }): "Unknown Time";


    const handleSaveLeads = async () => {
      setIsLoading(true);
      try {
        const response = await (params.type === "user" ? handleSaveFavoriteProperty(productDetail.id) : handleSavePropertyAgent(productDetail.id));
        setIsLoading(false);
        if (response.properties?.response) {
          showToast("Successfully Saved Leads", 'success')
        }
        else {
          showToast("Failed to save leads", 'error')
        }
      } catch (error) {
        setIsLoading(false);
      }
    };

    return (
      <View style={{ marginVertical: 30 }}>
        <OverlayLoader isShow={isLoading} />
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <MyAvatar
            imageUrl={{ uri: user?.profileImage || "https://i.pravatar.cc/150?img=68" }}
            size={45}
            status="online"
          />
          <View style={{ marginLeft: 13 }}>
            <MyText
              text={`${user?.firstName || ""} ${user?.lastName || "N/M"}`}
              size={14}
              weight="500"
              textColor={theme.colors.secondary}
            />
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <LocationIcon />
              <GapView mode="horizontal" length={5} />
              <MyText
                text={`${user?.address || "N/M"} ${createdAtLocal} Local Time`}
                weight="500"
                textColor="#757474"
                size={12}
              />
            </View>
          </View>
        </View>
          <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 10, marginEnd: 10 }}>
            <View style={{ flex: 1 }} />
            <View style={{ flexDirection: "row" }}>
              {buttons.map((bitem, bindex) => (
                <NormalBtn
                  key={bindex}
                  label={bitem.label}
                  theme={theme}
                  outline={bitem.outline}
                  onPress={bitem.onPress}
                />
              ))}
            </View>
          </View>
      </View>
    );
  };

  const getPropertyData = (detail: PropertyItem | SavedLeadsItem): Preview => {
    if (isSavedLeadsItem(detail)) {
      return {
        title: detail.property.propertyName || "Unknown Property",
        desc: detail.property.propertyDescription || "No description available.",
        purpose: detail.property.purpose || "Buying",
        type: detail.propertyType?.typeName || "Commercial",
        city: detail.property.propertyCity || "Unknown City",
        location: detail.property.propertyAddress || "Unknown Location",
        size: "N/A",
        range: detail.property.propertyPrice || 0,
        installments: "N/A",
        readyFor: "N/A",
        amenities: detail.property.amenities,
      };
    } else {
      return {
        title: detail.propertyName || "Unknown Property",
        desc: detail.propertyDescription || "No description available.",
        purpose: detail.purpose || "Buying",
        type: detail.propertyType?.typeName || "Commercial",
        city: detail.propertyCity || "Unknown City",
        location: detail.propertyAddress || "Unknown Location",
        size: "N/A",
        range: detail.propertyPrice || 0,
        installments: "N/A",
        readyFor: "N/A",
        amenities: detail.amenities,
      };
    }
  };

  const data = [getPropertyData(productDetail)];
  
  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: theme?.colors.background }}
      contentContainerStyle={[styles(theme).container]}
    >
      <AvatarContainer />
      <Card style={{ flex: 1, elevation: 0 }}>
        {data.map((item, index) => (
          <View key={index}>
            <View style={[styles(theme).part1, { borderTopWidth: 0 }]}>
              <MyText text={item.title} size={16} weight="500" />
              <MyText text={item.desc} size={12} style={{ textAlign: "justify" }} />
            </View>
            <View style={styles(theme).part1}>
              <MyText text={"Location & Purpose"} size={16} weight="500" />
              <LabelValue label="Purpose" value={item.purpose} />
              <LabelValue label="Property Type" value={item.type} />
              <LabelValue label="City" value={item.city} />
              <LabelValue label="Location" value={item.location} />
              <View
                style={{
                  width: "100%",
                  height: 116,
                  backgroundColor: "#947971",
                  alignSelf: "center",
                }}
              />
            </View>
            <View style={styles(theme).part1}>
              <MyText text={"Amount"} size={16} weight="500" />
              <LabelValue label="Range" value={formatPrice(item.range) + " PKR"} />
            </View>
            <View style={styles(theme).part1}>
              <MyText text="Features & Amenities" size={16} weight="500" />
              {item.amenities?.map((amenity, index) => (
                <LabelValue
                  key={index}
                  label={amenity.amenetiesName || "N/M"}
                  value={amenity.count?.toString() || "0"}
                />
              ))}
            </View>
          </View>
        ))}
      </Card>
    </ScrollView>
  );
}

export default ProposalPreview;

const styles = (theme?: MyTheme) =>
  StyleSheet.create({
    container: {
      paddingHorizontal: 20,
    },
    header: {
      borderBottomWidth: 1,
      borderColor: theme?.colors.border,
      width: "100%",
      alignItems: "center",
      paddingVertical: 10,
    },

    row: { flexDirection: "row" },
    part1: {
      paddingVertical: "4%",
      paddingHorizontal: 15,
      rowGap: 6,
      borderTopWidth: 1,
      borderColor: theme?.colors.border,
    },
  });