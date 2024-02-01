import { ScrollView, StyleSheet, Text, View, Image } from "react-native";
import React, { ReactNode } from "react";
import {
  GapView,
  MyField,
  MyIcon,
  MyInput,
  MyText,
  Variants,
} from "@components";
import { useTheme } from "@react-navigation/native";
import { MyTheme } from "@types";
import { AdInfo } from "@assets/images";

export default function Listing() {
  const theme = useTheme() as MyTheme;
  return (
    <ScrollView
      style={{ paddingVertical: 27, paddingHorizontal: 20 }}
      contentContainerStyle={{ alignItems: "center" }}
    >
      <MyText
        text="Reach Millions of Buyers on our Platforms"
        textColor={theme.colors.negative}
        weight="500"
        size={16}
      />
      <MyText
        text="In a few simple steps!"
        size={15}
        textColor={theme.colors.placeholderText}
      />
      <GapView length={20} />
      <AdInformation />
      <GapView length={20} />
      <LocationAndPrurpose />
      <GapView length={20} />
      <PropertySizeandPricing />
      <GapView length={20} />
      <FeaturesAndAmenities />
      <GapView length={20} />
      <PropertyImagesAndVideo />
    </ScrollView>
  );
}
//todo: make comp for required, optimize this code
interface CustomTableProps {
  children?: React.ReactNode;
  title?: string;
  indexIcon: number;
}
interface SvgIcon {
  [key: number]: any;
}

function CustomTable({ title, indexIcon, children }: CustomTableProps) {
  const theme = useTheme() as MyTheme;

  return (
    <View style={styles(theme).passListWrapper}>
      <View>
        <View style={styles(theme).headingStyle}>
          <View style={styles(theme).titleContainer}>
            <MyIcon iconIndex={indexIcon} square width={33} height={33} />
            <MyText
              text={title}
              size={16}
              weight="600"
              textColor={theme.colors.negative}
            />
          </View>
        </View>
        <View style={{ paddingHorizontal: 15, paddingVertical: 20 }}>
          {children}
        </View>
      </View>
    </View>
  );
}

function AdInformation() {
  const theme = useTheme() as MyTheme;
  return (
    <CustomTable title="Ad Information" indexIcon={0}>
      <View style={{ flexDirection: "row", flex: 1, gap: 10 }}>
        <MyIcon iconIndex={1} />
        <View style={{ flex: 1, paddingTop: 10, gap: 10 }}>
          <MyText textColor={theme.colors.negative}>Title</MyText>
          <MyInput
            placeholder={
              "Enter property title e.g. Beautiful House in DHA Phase 5"
            }
            style={styles(theme).titleInputStyle}
            inputStyle={styles(theme).inputInnerStyle}
            placeholderColor={theme.colors.placeholderText}
            multiline
          />
        </View>
      </View>
      <View style={{ flexDirection: "row", flex: 1, gap: 10, marginTop: 10 }}>
        <MyIcon iconIndex={2} />
        <View style={{ flex: 1, paddingTop: 10, gap: 10 }}>
          <MyText textColor={theme.colors.negative}>Desription</MyText>
          <MyInput
            placeholder={
              "Describe your property, it’s features, & your area it is in etc."
            }
            style={[styles(theme).titleInputStyle, { height: 83 }]}
            inputStyle={styles(theme).inputInnerStyle}
            placeholderColor={theme.colors.placeholderText}
            multiline
          />
        </View>
      </View>
    </CustomTable>
  );
}
function LocationAndPrurpose() {
  const theme = useTheme() as MyTheme;
  return (
    <CustomTable title="Location & Purpose" indexIcon={3}>
      <View style={{ flexDirection: "row", flex: 1, gap: 10 }}>
        <MyIcon iconIndex={4} />
        <View style={{ flex: 1, paddingTop: 10, gap: 10 }}>
          <MyText textColor={theme.colors.negative}>Select Purpose</MyText>
        </View>
      </View>
      <View style={{ flexDirection: "row", flex: 1, gap: 10, marginTop: 10 }}>
        <MyIcon iconIndex={5} />
        <View style={{ flex: 1, paddingTop: 10, gap: 10 }}>
          <MyText textColor={theme.colors.negative}>
            Select Property Type
          </MyText>
        </View>
      </View>
      <View style={{ flexDirection: "row", flex: 1, gap: 10, marginTop: 10 }}>
        <MyIcon iconIndex={6} />
        <View style={{ flex: 1, paddingTop: 10, gap: 10 }}>
          <MyText textColor={theme.colors.negative}>
            Select Property Type
          </MyText>
        </View>
      </View>
      <View style={{ flexDirection: "row", flex: 1, gap: 10, marginTop: 10 }}>
        <MyIcon iconIndex={7} />
        <View style={{ flex: 1, paddingTop: 10, gap: 10 }}>
          <MyText textColor={theme.colors.negative}>Select Location *</MyText>
        </View>
      </View>
    </CustomTable>
  );
}
function PropertySizeandPricing() {
  const theme = useTheme() as MyTheme;
  return (
    <CustomTable title="Property Size and Pricing" indexIcon={8}>
      <View style={{ flexDirection: "row", flex: 1, gap: 10 }}>
        <MyIcon iconIndex={1} />
        <View style={{ flex: 1, paddingTop: 10, gap: 10 }}>
          <MyText textColor={theme.colors.negative}>Select Purpose</MyText>
        </View>
      </View>
      <View style={{ flexDirection: "row", flex: 1, gap: 10, marginTop: 10 }}>
        <MyIcon iconIndex={2} />
        <View style={{ flex: 1, paddingTop: 10, gap: 10 }}>
          <MyText textColor={theme.colors.negative}>Amount</MyText>
        </View>
      </View>
      <View style={{ flexDirection: "row", flex: 1, gap: 10, marginTop: 10 }}>
        <MyIcon iconIndex={9} />
        <View style={{ flex: 1, paddingTop: 10, gap: 10 }}>
          <MyText textColor={theme.colors.negative}>
            Instalment available
          </MyText>
        </View>
      </View>
      <View style={{ flexDirection: "row", flex: 1, gap: 10, marginTop: 10 }}>
        <MyIcon iconIndex={10} />
        <View style={{ flex: 1, paddingTop: 10, gap: 10 }}>
          <MyText textColor={theme.colors.negative}>
            Instalment available
          </MyText>
        </View>
      </View>
    </CustomTable>
  );
}

function FeaturesAndAmenities() {
  const theme = useTheme() as MyTheme;
  return (
    <CustomTable title="Features and Amenities" indexIcon={0}>
      <View style={{ flexDirection: "row", flex: 1, gap: 10 }}>
        <MyIcon iconIndex={1} />
        <View style={{ flex: 1, paddingTop: 10, gap: 10 }}>
          <MyText textColor={theme.colors.negative}>Feature & Amenities</MyText>
        </View>
      </View>
    </CustomTable>
  );
}
function PropertyImagesAndVideo() {
  const theme = useTheme() as MyTheme;
  return (
    <CustomTable title="Property Images and Video" indexIcon={0}>
      <View style={{ flexDirection: "row", flex: 1, gap: 10 }}>
        <MyIcon iconIndex={1} />
        <View style={{ flex: 1, paddingTop: 10, gap: 10 }}>
          <MyText textColor={theme.colors.negative}>
            Upload Images of your Property *
          </MyText>
        </View>
      </View>
    </CustomTable>
  );
}

const styles = (theme?: MyTheme) =>
  StyleSheet.create({
    headingStyle: {
      justifyContent: "center",
      alignContent: "center",
      alignItems: "center",
      padding: 10,
      borderBottomWidth: 1, // Set the width of the bottom border
      borderBottomColor: theme?.colors.border, // Set the color of the bottom border
    },
    formWrapper: {
      paddingHorizontal: 12,
      paddingVertical: 8,
    },
    passListWrapper: {
      marginHorizontal: 10,
      width: "100%",
      borderColor: theme?.colors.border,
      borderWidth: 1,
      borderRadius: 9,
    },
    titleContainer: {
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
    },
    inputInnerStyle: {
      height: 45,
      padding: 0,
      color: theme?.colors.text,
    },
    titleInputStyle: {
      backgroundColor: theme?.colors.background,
      width: "100%",
      height: 55,
      borderColor: theme?.colors.dropdownBorder,
      borderWidth: 1,
      elevation: 0,
      padding: 5,
    },
  });
