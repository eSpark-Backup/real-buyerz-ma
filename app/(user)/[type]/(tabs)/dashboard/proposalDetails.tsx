import React from "react";
import { Image, ScrollView, StyleSheet, View } from "react-native";
import { useTheme } from "@react-navigation/native";

import {
  Card,
  GapView,
  LabelValue,
  MyAvatar,
  MyButton,
  MyText,
} from "@components";
import { MyTheme } from "@types";
import { LocationIcon } from "@assets/images";

interface MediaGalleryProps {
  media: string[]; // Array of image or video URLs
  theme?: MyTheme;
}

const MediaGallery: React.FC<MediaGalleryProps> = ({ media, theme }) => {
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
            <Image
              source={{ uri: url }}
              style={{ flex: 1, width: "100%", height: "100%" }}
            />
          )}
        </View>
      ))}
    </ScrollView>
  );
};

const data = {
  imageMedia: [
    "https://picsum.photos/90/72",
    "https://picsum.photos/90/72",
    "https://picsum.photos/90/72",
    "https://picsum.photos/90/72",
    // Add more URLs as needed
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

  return (
    <ScrollView
      style={{
        flex: 1,
        paddingHorizontal: 20,
      }}
      contentContainerStyle={{ paddingTop: 20 }}
    >
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
          imageUrl="https://i.pravatar.cc/150?img=68"
          size={45}
          status="online"
        />
        <View style={{ marginLeft: 7 }}>
          <MyText
            text="John Doe"
            size={14}
            weight="500"
            textColor={theme.colors.secondary}
          />
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <LocationIcon />
            <GapView mode="horizontal" length={5} />
            <MyText
              text="Lahore, Pakistan - 3:16pm local time"
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
        />
      </View>
      <View style={{ marginTop: 7 }}>
        <Card radius={10}>
          <Card.Title
            weight="500"
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
              text="John has applied to or been invited to your or your company’s job need experience custom template designers for custom posts archive creation"
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
              text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip."
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
            <LabelValue label="Purpose" value="Buying" />
            <LabelValue label="Property Type" value="Apartment" />
            <LabelValue label="City" value="Karachi" />
            <LabelValue label="Location" value="Gulshen-e-Iqbal" />
            <View
              style={{
                width: "100%",
                height: 150,
                backgroundColor: "pink",
                marginTop: 25,
              }}
            >
              {/** //FIXME: Insert Mapbox */}
            </View>
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
            <LabelValue label="Area Size" value="Large" />
            <LabelValue label="Range" value="1000000" />
            <LabelValue label="Instalment" value="Available" />
            <LabelValue label="Ready for" value="Possession" />
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
              <MediaGallery media={data.imageMedia} theme={theme} />
            </View>
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
              text="Property Videos"
              weight="500"
              size={16}
              style={{ marginBottom: 15 }}
            />
            <View>
              <MediaGallery media={data.videoMedia} theme={theme} />
            </View>
          </View>
        </Card>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  temp: { flexDirection: "row", rowGap: 10, columnGap: 10 },
  tempImage: {
    width: 90,
    height: 72,
    backgroundColor: "#7e7575",
    marginRight: 10,
  },
});
