import React, { useRef, useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { useTheme } from "@react-navigation/native";
import ImageView from "react-native-image-viewing";

import {
  Card,
  GapView,
  LabelValue,
  MyAvatar,
  MyButton,
  MyText,
  OverlayLoader,
} from "@components";
import { MyTheme, PropertyDetailScreenParams, UserType } from "@types";
import { LocationIcon } from "@assets/images";
import { handleAcceptProposal, handleRejectProposal, ProposalDataItem } from "./utils";
import { showToast } from "@utils/showToast";
import { router, useGlobalSearchParams, useLocalSearchParams } from "expo-router";
import { PropertyDataItem } from "../home/utils";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { formatPrice } from "app/utils/priceConverter";

interface MediaGalleryProps {
  media: string[]; // Array of image or video URLs
  theme?: MyTheme;
  onSelect?(index: number): void;
}

const MediaGallery: React.FC<MediaGalleryProps> = ({
  media,
  theme,
  onSelect,
}) => {
  const isVideo = (url: string) => {
    return url.toLowerCase().endsWith(".mp4");
  };

  return (
    <ScrollView
      horizontal
      style={styles.temp}
      showsHorizontalScrollIndicator={false}
    >
      {media.map((url, index) => (
        <View key={index} style={styles.tempImage}>
          {isVideo(url) ? (
            <View style={{ flex: 1, width: "100%", height: "100%" }} />
          ) : (
            <TouchableWithoutFeedback onPress={() => onSelect?.(index)}>
              <Image
                source={{ uri: url }}
                style={{ flex: 1, width: "100%", height: "100%" }}
                onError={() => console.log('Image loading error for URL:', url)}
              />
            </TouchableWithoutFeedback>
          )}
        </View>
      ))}
    </ScrollView>
  );
};

const data = {
  imageMedia: [
    "https://picsum.photos/91/130",
    "https://picsum.photos/90/130",
    "https://picsum.photos/89/130",
    "https://picsum.photos/77/130",
  ],
  videoMedia: [
    "https://picsum.photos/id/151/130",
    "https://picsum.photos/id/151/130",
    "https://picsum.photos/id/151/130",
    "https://picsum.photos/id/151/130",
    // Add more URLs as needed
  ],
};

export default function ProposalDetails() {
  const theme = useTheme() as MyTheme;
  const [visibleImg, setVisibleImg] = useState(false);
  const [visibleVid, setVisibleVid] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const { item } = useLocalSearchParams<PropertyDetailScreenParams>();
  const params = useGlobalSearchParams<{ type: UserType }>();
  const proposalItem: ProposalDataItem = JSON.parse(item ?? "{}");

  console.log("Data Idhar Agaya "+JSON.stringify(proposalItem))
 
  const onAcceptProposal = async () => {
    setLoading(true)
    try {
      const response = await handleAcceptProposal(proposalItem.id)
      setLoading(false);
      if (response.status) {
        showToast("Proposal accepted")
        router.push(`(user)/${params?.type!}/inbox/chat`)
      }
      else {
        showToast(response.message || "Proposals not found", 'error')
      }
    } catch (error) {
      showToast('Failed to fetch Proposals', 'error')
      setLoading(false);
    }
  };

  const onRejectProposal = async () => {
    setLoading(true)
    const response = await handleRejectProposal(proposalItem.id)
    setLoading(false);
    try {
      if (response.status) {
        showToast("Proposal Rejected")
        router.back();
      }
      else {
        showToast(response.message || "Proposals not found", 'error')
      }
    } catch (error) {
      showToast('Failed to fetch Proposals', 'error')
      setLoading(false);
    }
  }

  return (
    <ScrollView
      style={{
        flex: 1,
        paddingHorizontal: 20,
      }}
      contentContainerStyle={{ paddingTop: 20 }}
    >
      <OverlayLoader isShow={loading} />
      <ImageView
        images={data.imageMedia.map((item) => {
          return { uri: item };
        })}
        imageIndex={selectedIndex}
        visible={visibleImg}
        onRequestClose={() => setVisibleImg(false)}
      />
      <MyText
        size={20}
        text="Proposal Details"
        textColor={theme.dark ? "#ffffff" : "#000000"}
        weight="600"
      />
      <View
        style={{
          marginTop: 20,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <MyAvatar
          imageUrl={{ uri: proposalItem.agentProperty.user?.profileImage || "https://i.pravatar.cc/150?img=68" }} // Use profile image from proposalItem
          size={45}
          status="online"
        />
        <View style={{ marginLeft: 7 }}>
          <MyText
            text={`${proposalItem.agentProperty.user?.firstName || "John"} ${proposalItem.agentProperty.user?.lastName || "Doe"}`} // Use user's name
            size={14}
            weight="500"
            textColor={theme.colors.secondary}
          />
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <LocationIcon />
            <GapView mode="horizontal" length={5} />
            <MyText
              text={`${proposalItem.agentProperty.propertyAddress}, ${proposalItem.agentProperty.propertyCity} - ${new Date(proposalItem.agentProperty.createdAt).toLocaleTimeString()}`} // Use address and time
              weight="500"
              textColor="#757474"
              size={12}
            />
          </View>
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          marginTop: 10,
          justifyContent: "flex-end",
        }}
      >
        <MyButton
          backgroundColor={theme.colors.background}
          label="Reject"
          textColor={theme.colors.primary}
          style={{
            borderWidth: 1,
            borderColor: theme.colors.primary,
            borderRadius: 4,
            paddingVertical: 8,
            width: 85,
          }}
          onPress={() => onRejectProposal()}
        />
        <GapView mode="horizontal" />
        <MyButton
          backgroundColor={theme.colors.primary}
          label="Connect"
          textColor={theme.colors.background}
          style={{
            borderRadius: 4,
            paddingVertical: 8,
            width: 85,
          }}
          onPress={() => onAcceptProposal()}
        />
      </View>
      <View style={{ marginTop: 7 }}>
        <Card radius={10}>
          <Card.Title
            weight="600"
            titleStyle={{
              fontSize: 16,
              color: theme.colors.text,
            }}
          >
            Project Information
          </Card.Title>
          <Card.Divider />
          <View style={{ paddingHorizontal: 15, paddingVertical: 12 }}>
            <MyText
              text="Applicant"
              weight="500"
              size={16}
              style={{ marginBottom: 5 }}
            />
            <MyText
              text={`${proposalItem.agentProperty.user?.firstName || "John"} has applied to or been invited to your or your company’s job need experience custom template designers for custom posts archive creation`}
              weight="400"
              size={12}
            />
          </View>
          <Card.Divider />
          <View
            style={{ paddingHorizontal: 15, paddingTop: 23, paddingBottom: 12 }}
          >
            <MyText
              text="Proposal Detail"
              weight="500"
              size={16}
              style={{ marginBottom: 10 }}
            />
            <MyText
              text={proposalItem.agentProperty.propertyDescription || "No description available."}
              weight="400"
              size={12}
            />
          </View>
          <Card.Divider />
          <View
            style={{
              paddingTop: 10,
              paddingHorizontal: 15,
              paddingBottom: 21,
            }}
          >
            <MyText
              text="Location & Purpose"
              weight="500"
              size={16}
              style={{ marginBottom: 10 }}
            />
            <LabelValue label="Purpose" value={proposalItem.agentProperty.purpose || "N/A"} />
            <LabelValue label="Property Type" value={proposalItem.agentProperty.propertyType?.subTypeName || "N/A"} />
            <LabelValue label="City" value={proposalItem.agentProperty.propertyCity || "N/A"} />
            <LabelValue label="Location" value={proposalItem.agentProperty.propertyAddress || "N/A"} />
            {proposalItem.agentProperty.latitude && proposalItem.agentProperty.longitude ? (
                <MapView
                  provider={PROVIDER_GOOGLE}
                  style={{ width: "100%", height: 150 }}
                  initialRegion={{
                    latitude: parseFloat(proposalItem.agentProperty.latitude),
                    longitude: parseFloat(proposalItem.agentProperty.longitude),
                    latitudeDelta: 0.005,
                    longitudeDelta: 0.005,
                  }}
                >
                  <Marker
                    identifier="mainMarker"
                    coordinate={{
                      latitude: parseFloat(proposalItem.agentProperty.latitude),
                      longitude: parseFloat(proposalItem.agentProperty.longitude),
                    }}
                  />
                </MapView>
              ) : (
                <View style={{ width: "90%", height: 150, justifyContent: 'center', alignItems: 'center' }}>
                  <MyText text="Loading map..." textColor={theme.colors.placeholderText} />
                </View>
              )}
          </View>
          <Card.Divider />
          <View
            style={{
              paddingTop: 14,
              paddingHorizontal: 15,
              paddingBottom: 20,
            }}
          >
            <MyText
              text="Area & Amount"
              weight="500"
              size={16}
              style={{ marginBottom: 10 }}
            />
            <LabelValue label="Area Size" value={proposalItem.agentProperty.propertyArea+" Sq. ft" || "N/A"} />
            <LabelValue label="Range" value={formatPrice(proposalItem.agentProperty.propertyPrice || 0) || "N/A"} />
            <LabelValue label="Installment" value="Not Available" />
            <LabelValue label="Ready for" value={proposalItem.agentProperty.propertyStatus ? "Possession" : "Not Ready"} />
          </View>
          <Card.Divider />
          <View
            style={{
              paddingTop: 10,
              paddingHorizontal: 15,
              paddingBottom: 20,
            }}
          >
            <MyText
              text="Project Images"
              style={{ marginBottom: 15 }}
              weight="500"
              size={16}
            />
            <View>
              <MediaGallery
                media={proposalItem.agentProperty.PropertyData.filter(item => item.type === "image").map(image => image.url) || []}
                theme={theme}
                onSelect={(index: number) => {
                  setVisibleImg(true);
                  setSelectedIndex(index);
                }}
              />
            </View>
          </View>
          <Card.Divider />
          {/* <View
            style={{
              paddingTop: 10,
              paddingHorizontal: 15,
              paddingBottom: 20,
            }}
          >
            <MyText
              text="Property Videos"
              weight="500"
              size={16}
              style={{ marginBottom: 15 }}
            />
            <View>
              <MediaGallery
                media={proposalItem.agentProperty.PropertyData.filter(item => item.type === "video").map(video => video.url) || []}
                theme={theme}
                onSelect={(index) => setVisibleVid(true)}
              />
            </View>
          </View> */}
        </Card>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  temp: { flexDirection: "row", rowGap: 10, columnGap: 10 },
  tempImage: {
    width: 130,
    height: 80,
    backgroundColor: "#7e7575",
    marginRight: 10,
  },
});
