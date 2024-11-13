import React, { useState } from "react";
import { Image, View, StyleSheet, ScrollView } from "react-native";
import { useTheme } from "@react-navigation/native";

import { Card, GapView, LabelValue, MyAvatar, MyText, OverlayLoader } from "@components";
import { MyTheme, PropertyDetailScreenParams, UserType } from "@types";
import { LocationIcon } from "@assets/images";
import { NormalBtn } from "@components/AdBox";
import { Amenity, PropertyDataItem, PropertyItem, SavedLeadsItem } from "../home/utils";
import { router, useGlobalSearchParams, useLocalSearchParams } from "expo-router";
import { isSavedLeadsItem } from "@utils/functions";
import { formatPrice } from "app/utils/priceConverter";
import { handleSaveFavoriteProperty} from "../../favourites/utils";
import { showToast } from "@utils/showToast";
import MapView, { Marker, PROVIDER_GOOGLE, Region } from 'react-native-maps';
import { ImageFile } from "../../myListings/utils";
import { FlatList } from "react-native-gesture-handler";

interface Preview {
  title: string;
  desc: string;
  purpose: string;
  type: string;
  location: string;
  city: string;
  size: string;
  range: number | string;
  latitude: number;
  longitude: number;
  installments: string;
  readyFor: string;
  map?: string;
  image?: ImageFile[];
  video?: string[];
  amenities?: Amenity[]
}


function ProposalPreview() {
  const theme = useTheme() as MyTheme;
  const { item, redirectionFrom } = useLocalSearchParams<PropertyDetailScreenParams>();
  const params = useGlobalSearchParams<{ type?: UserType, redirectionFrom: string }>();
  const productDetail: PropertyItem | SavedLeadsItem = JSON.parse(item ?? "{}");
  const [isLoading, setIsLoading] = useState(false);

  const AvatarContainer = () => {
    const buttons = [
      ...(params.type === 'agent' ? [
        {
          label: "Apply Now", outline: false, onPress: () => {
            router.push({
              pathname: `(user)/${params.type}/(tabs)/listings`,
              params: {
                item: item,
                redirectionFrom: 'proposalPreview'
              }
            });
          }
        }
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
    }) : "Unknown Time";


    const handleSaveLeads = async () => {
      setIsLoading(true);
      try {
        const response = await handleSaveFavoriteProperty(productDetail.id, params.type)
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
            {redirectionFrom === 'dashboard' && buttons.map((bitem, bindex) => (
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
        latitude: parseFloat(detail.property.latitude),
        longitude: parseFloat(detail.property.longitude),
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
        latitude: parseFloat(detail.latitude),
        longitude: parseFloat(detail.longitude),
        size: "N/A",
        range: detail.propertyPrice || 0,
        installments: "N/A",
        readyFor: "N/A",
        amenities: detail.amenities,
        image: detail.image ? detail.image : getImageFromPropertyData(detail.PropertyData)
      };
    }
  };

  function getImageFromPropertyData(propertyData: PropertyDataItem[]): ImageFile[] {
    const imageItem = propertyData?.find(item => item.type === "image");
    if (imageItem) {
      const blob = new Blob();

      return [{
        uri: imageItem.url,
        type: "image/jpeg",
        name: imageItem.imageKey,
        size: blob.size,
        arrayBuffer: async () => new ArrayBuffer(0),
        slice: () => new Blob(),
        stream: () => new ReadableStream(),
        text: async () => '',
      }];
    }
    return [];
  }

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
              {item.latitude && item.longitude ? (
                <MapView
                  provider={PROVIDER_GOOGLE}
                  style={{ width: "100%", height: 150 }}
                  initialRegion={{
                    latitude: item.latitude,
                    longitude: item.longitude,
                    latitudeDelta: 0.005,
                    longitudeDelta: 0.005,
                  }}
                >
                  <Marker
                    identifier="mainMarker"
                    coordinate={{
                      latitude: item.latitude,
                      longitude: item.longitude,
                    }}
                  />
                </MapView>
              ) : (
                <View style={{ width: "90%", height: 150, justifyContent: 'center', alignItems: 'center' }}>
                  <MyText text="Loading map..." textColor={theme.colors.placeholderText} />
                </View>
              )}
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
                  label={amenity.name ?? amenity.amenetiesName ?? "N/M"}
                  value={amenity.count?.toString() || "0"}
                />
              ))}
            </View>
            {redirectionFrom !== "dashboard" && item.image && item.image.length > 0 && (
              <>
                <View style={styles(theme).part1}>
                  <MyText text="Property Images" size={16} weight="500" />
                  <FlatList
                    data={item.image}
                    renderItem={({ item, index }) => {
                      return (
                        <Image
                          key={index}
                          source={{ uri: item.uri }}
                          style={{ height: 80, width: 100, borderRadius: 2, marginRight: 5 }}
                        />
                      );
                    }}
                    keyExtractor={(item, index) => index.toString()}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                  />
                </View>
                {/* <View style={styles(theme).part1}>
                <MyText text="Property Videos" size={16} weight="500" />
                <FlatList
                  data={item.image}
                  renderItem={({ item, index }) => {
                    return (
                      <Image
                        key={index}
                        source={{ uri: item.uri }}
                        style={{ height: 80, width: 100, borderRadius: 2, marginRight: 5 }}
                      />
                    );
                  }}
                  keyExtractor={(item, index) => index.toString()}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                />
              </View> */}
              </>
            )}
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