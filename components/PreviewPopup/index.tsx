import React from "react";
import { View, StyleSheet, FlatList, Image, ScrollView } from "react-native";
import Modal from "react-native-modal";
import { useTheme } from "@react-navigation/native";

import MyText from "components/MyText";
import PrimaryBtn from "components/MyButton/primaryBtn";
import GapView from "components/GapView";
import { MyTheme } from "@types";

interface Preview {
  title: string;
  desc: string;
  purpose: string;
  type: string;
  location: string;
  city: string;
  size: string;
  range: number;
  installments: string;
  readyFor: string;
  map?: string;
  imageMedia?: string[];
  videoMedia?: string[];
}

export interface PreviewPopupProps {
  visible?: boolean;
  onClose: () => void;
}

function PreviewPopup({ visible, onClose }: PreviewPopupProps) {
  const theme = useTheme() as MyTheme;
  const data: Preview[] = [
    {
      title: "4 Bedrooms Apartments",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.",
      purpose: "Buying",
      type: "Apartment",
      city: "Karachi",
      location: "Gulshan-e-Iqbal",
      size: "Large",
      range: 1000000,
      installments: "Available",
      readyFor: "Possession",
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
    },
  ];

  const renderPreviewList = ({ item }: { item: Preview }) => {
    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ rowGap: 10 }}>
          <MyText text={item.title} size={14} weight="500" />
          <MyText text={item.desc} size={10} style={{ textAlign: "justify" }} />
        </View>
        <View style={styles(theme).part1}>
          <MyText text={"Location & Purpose"} size={14} weight="500" />
          <View style={styles(theme).row}>
            <MyText size={12} text="Purpose: " />
            <MyText
              text={item.purpose}
              size={12}
              weight="700"
              textColor={theme?.colors.secondary}
            />
          </View>
          <View style={styles(theme).row}>
            <MyText size={12} text="Property Type: " />
            <MyText
              text={item.type}
              size={12}
              weight="700"
              textColor={theme?.colors.secondary}
            />
          </View>
          <View style={styles(theme).row}>
            <MyText size={12} text="City: " />
            <MyText
              text={item.city}
              size={12}
              weight="700"
              textColor={theme?.colors.secondary}
            />
          </View>
          <View style={styles(theme).row}>
            <MyText size={12} text="Location: " />
            <MyText
              text={item.location}
              size={12}
              weight="700"
              textColor={theme?.colors.secondary}
            />
          </View>
          <View
            style={{
              width: 230,
              height: 116,
              backgroundColor: "#947971",
              alignSelf: "center",
            }}
          />
        </View>
        <View style={styles(theme).part1}>
          <MyText text={"Area and Amount"} size={14} weight="500" />
          <View style={styles(theme).row}>
            <MyText size={12} text="Area Size: " />
            <MyText
              text={item.size}
              size={12}
              weight="700"
              textColor={theme?.colors.secondary}
            />
          </View>
          <View style={styles(theme).row}>
            <MyText size={12} text="Range: " />
            <MyText size={12} weight="700" textColor={theme?.colors.secondary}>
              {item.range}
            </MyText>
          </View>
          <View style={styles(theme).row}>
            <MyText size={12} text="Instalment: " />
            <MyText
              text={item.installments}
              size={12}
              weight="700"
              textColor={theme?.colors.secondary}
            />
          </View>
          <View style={styles(theme).row}>
            <MyText size={12} text="Ready for: " />
            <MyText
              text={item.readyFor}
              size={12}
              weight="700"
              textColor={theme.colors.secondary}
            />
          </View>
        </View>
        <View style={styles(theme).part1}>
          <MyText text="Property Images" size={12} weight="500" />
          <MediaGallery media={item.imageMedia || []} theme={theme} />
        </View>
        <View style={styles(theme).part1}>
          <MyText text="Property Videos" size={12} weight="500" />
          <MediaGallery media={item.videoMedia || []} theme={theme} />
        </View>
      </ScrollView>
    );
  };

  return (
    <Modal
      isVisible={visible}
      animationIn={"slideInUp"}
      animationOut={"slideOutDown"}
      style={styles(theme).modal}
    >
      <View style={[styles(theme).popupStyle]}>
        <View style={styles(theme).header}>
          <MyText text="Preview" weight="600" size={16} />
        </View>

        <FlatList
          data={data}
          renderItem={renderPreviewList}
          contentContainerStyle={styles(theme).flatlist}
        />
        <View style={styles(theme).footer}>
          <PrimaryBtn
            title="Close"
            textColor="white"
            onPress={onClose}
            width={75}
          />
        </View>
      </View>
    </Modal>
  );
}

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
      style={styles(theme).temp}
      showsHorizontalScrollIndicator={false}
    >
      {media.map((url, index) => (
        <View key={index} style={styles(theme).tempImage}>
          {isVideo(url) ? (
            <View style={{ flex: 1, width: "100%", height: "100%" }} />
          ) : (
            // to be done later
            // <ExpoVideo
            //   source={{ uri: url }}
            //   style={{ flex: 1, width: "100%", height: "100%" }}

            //   shouldPlay={false}
            //   isLooping={false}
            //   useNativeControls={false}
            // />
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

const styles = (theme?: MyTheme) =>
  StyleSheet.create({
    modal: {
      margin: 0,
      justifyContent: "center",
      alignItems: "center",
      alignSelf: "center",
      width: "95%",
    },
    popupStyle: {
      alignItems: "center",
      backgroundColor: theme?.colors.background,
      height: "97%",
      borderRadius: 10,
      width: "100%",
    },
    header: {
      borderBottomWidth: 1,
      borderColor: theme?.colors.border,
      width: "100%",
      alignItems: "center",
      paddingVertical: 10,
    },
    flatlist: {
      justifyContent: "space-between",
      paddingHorizontal: "12%",
      height: "100%",
      paddingVertical: "4%",
    },
    footer: {
      borderTopWidth: 1,
      borderColor: theme?.colors.border,
      width: "100%",
      alignItems: "flex-end",
      paddingVertical: 10,
      paddingHorizontal: 40,
    },
    row: { flexDirection: "row" },
    part1: {
      marginTop: "4%",
      paddingVertical: "2%",
      rowGap: 6,
      borderTopWidth: 1,
      borderColor: theme?.colors.border,
    },

    temp: { flexDirection: "row", rowGap: 10, columnGap: 10 },
    tempImage: {
      width: 90,
      height: 72,
      backgroundColor: "#7e7575",
      marginRight: 10,
    },
  });
export default PreviewPopup;
