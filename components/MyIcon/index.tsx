import { AdInfo, Description, Title } from "@assets/images";
import {
  AddIcon,
  AmenitiesBed,
  AmenitiesParking,
  AmenitiesTub,
  EyePrimary,
  FilmIcon,
  HomeAmenities,
  HomeFeature,
  InstalmentAvailable1,
  InstalmentAvailable2,
  Lpurpose,
  SelectCity,
  SelectLocation,
  SelectProperty,
  SelectPurpose,
  SizeAndPricing,
  TickPrimary,
} from "@assets/images/svg";
import { useTheme } from "@react-navigation/native";
import { MyTheme } from "@types";
import React from "react";
import { DimensionValue, StyleSheet, View } from "react-native";

interface SvgIcon {
  [key: number]: any;
}

const svgIcons: SvgIcon = {
  0: <AdInfo />,
  1: <Title />,
  2: <Description />,
  3: <Lpurpose />,
  4: <SelectPurpose />,
  5: <SelectProperty />,
  6: <SelectCity />,
  7: <SelectLocation />,
  8: <SizeAndPricing />,
  9: <InstalmentAvailable1 />,
  10: <InstalmentAvailable2 />,
  11: <HomeFeature />,
  12: <HomeAmenities />,
  13: <AmenitiesBed />,
  14: <AmenitiesTub />,
  15: <AmenitiesParking />,
  16: <FilmIcon />,
};

interface MyIconProps {
  square?: boolean;
  iconIndex: number;
  width?: DimensionValue;
  height?: DimensionValue;
}
export default function MyIcon({
  iconIndex,
  square,
  height,
  width,
}: MyIconProps) {
  const theme = useTheme() as MyTheme;
  return (
    <View
      style={[
        styles(theme).container,
        {
          borderRadius: square ? 4.75 : 50,
          width: width ? width : 36,
          height: height ? height : 36,
        },
      ]}
    >
      {svgIcons[iconIndex]}
    </View>
  );
}

const styles = (theme?: MyTheme) =>
  StyleSheet.create({
    container: {
      backgroundColor: "#F4F5F7",

      alignItems: "center",
      justifyContent: "center",
    },
  });
