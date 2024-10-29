import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { MyTheme, PropertyDetailScreenParams } from "@types";
import { useTheme } from "@react-navigation/native";

import {
  Card,
  MyText,
  PropertyList,
  MyAvatar,
  CustomSlider,
  PrimaryBtn,
  MyPopupModal,
} from "@components";
import { LocationIcon } from "@assets/images/svg";
import { router, useLocalSearchParams } from "expo-router";
import { PropertyItem } from "./utils";
import { isImageUrl } from "@utils/functions";

const PropertyDetail = () => {
  const theme = useTheme() as MyTheme;
  const [isVisble, setIsVisible] = useState(false);

  const { item, type } = useLocalSearchParams<PropertyDetailScreenParams>();

  const productDetail: PropertyItem = JSON.parse(item ?? "{}");

  const images = [
    "https://picsum.photos/id/299/620",
    "https://picsum.photos/id/400/620",
    "https://picsum.photos/id/500/620",
  ];

  const tableList = [
    {
      title: "Type",
      value: productDetail?.propertyType.typeName,
    },
    {
      title: "Location",
      value: productDetail?.propertyAddress,
    },
    {
      title: "Price",
      value: productDetail?.propertyPrice,
    },
    {
      title: "Purpose",
      value: productDetail.purpose,
    },
    {
      title: "Bedroom",
      value: "03",
    },
    {
      title: "Bath",
      value: "05",
    },
    {
      title: "Parking",
      value: "02",
    },
  ];

  const description = [
    // "Plot For sale Zeenatabad Society Scheme 33, Sector 19a",
    // "120 Sqyd West open corner 24 Feet road (Leased)",
    // "Corner Boundary Wall Society 150 Feet Road",
    // "All Utilities Available",
    // "K - Electric",
    // "Water Sewerage System",
    productDetail?.propertyDescription,
  ];

  const amentiesList = productDetail?.amenities?.map(
    (val) => val?.amenetiesName
  );

  const colorDetector = (value: number) => {
    if (value % 2 === 0) {
      return theme.colors.background;
    } else {
      return theme.colors.popupbg;
    }
  };
  const borderRadiusDetector = (index: number, count: number) => {
    if (index === 0 || index === count) {
      return 10;
    }
    return 0;
  };

  return (
    <ScrollView>
      <View style={styles(theme).wrapper}>
        <CustomSlider
          images={images}
          title={productDetail?.propertyName ?? "4 BEDROOMS APARTMENT"}
        />
        <Card style={styles(theme).cardWrapper}>
          <View>
            <MyAvatar
              size={70}
              imageUrl={{
                uri:
                  productDetail.user?.profileImage &&
                  isImageUrl(productDetail.user?.profileImage ?? "")
                    ? productDetail.user?.profileImage
                    : "https://picsum.photos/id/151/130",
              }}
            />
          </View>
          <View style={styles(theme).textWrapper}>
            <MyText
              text={
                productDetail.user?.firstName +
                " " +
                productDetail.user?.lastName
              }
              size={16}
              weight="600"
              textColor={theme.colors.listText}
            />
            <View style={styles(theme).dFlex}>
              <LocationIcon />
              <MyText
                text={productDetail.user?.address ?? "N/A"}
                size={12}
                textColor={theme.colors.listText}
                weight="600"
                style={{ marginHorizontal: 4 }}
              />
            </View>
            <View style={styles(theme).btnWrapper}>
              <PrimaryBtn
                title="View"
                weight="600"
                textColor="#ffffff"
                width={100}
                onPress={() =>
                  router.push(`(user)/${type!}/(tabs)/home/AgentProfile`)
                }
                btnStyle={{
                  paddingVertical: 10,
                }}
              />
              <PrimaryBtn
                width={100}
                weight="600"
                title="Contact"
                textColor="#ffffff"
                onPress={() => setIsVisible(true)}
                btnStyle={{
                  marginStart: 15,
                  paddingVertical: 10,
                }}
              />
            </View>
          </View>
        </Card>
        <Card style={styles(theme).overViewCard}>
          <View style={styles(theme).headingStyle}>
            <MyText
              text="Overview"
              size={16}
              weight="600"
              textColor={theme.colors.negative}
            />
          </View>
          <View style={styles(theme).detailsWrapper}>
            <MyText
              text="Details"
              size={16}
              weight="600"
              textColor={theme.colors.negative}
            />
            <Card style={styles(theme).table}>
              {tableList.map((item, index) => (
                <View
                  key={index}
                  style={[
                    styles(theme).row,
                    { backgroundColor: colorDetector(index) },
                    {
                      borderRadius: borderRadiusDetector(
                        index,
                        tableList.length - 1
                      ),
                    },
                  ]}
                >
                  <MyText
                    text={item.title}
                    size={13}
                    weight="400"
                    textColor={theme.colors.listText}
                    style={styles(theme).columnOne}
                  />
                  <MyText
                    text={item.value?.toString()}
                    size={13}
                    weight="400"
                    textColor={theme.colors.text}
                    style={styles(theme).columnTwo}
                  />
                </View>
              ))}
            </Card>
            <View style={styles(theme).mt5}>
              <MyText
                text="Description"
                size={16}
                weight="600"
                textColor={theme.colors.negative}
              />
              <View style={styles(theme).descriptionWrapper}>
                {description.map((item, index) => (
                  <MyText
                    key={index}
                    textColor={theme.colors.text}
                    text={item}
                    size={14}
                    weight="400"
                  />
                ))}
              </View>
            </View>
            <View style={styles(theme).mt5}>
              <MyText text="Nearby Locations" size={16} weight="600" />
              <MyText text="Amenities" size={16} weight="600" />
              {amentiesList.map((item, index) => (
                <MyText key={index} text={item} size={14} weight="400" />
              ))}
            </View>
            <View style={styles(theme).mt5}>
              <MyText text="Area" size={16} weight="600" />
              <MyText
                text={(productDetail?.propertyArea ?? "250000") + " sq.m"}
                size={14}
                weight="400"
              />
            </View>
            <View style={styles(theme).mt5}>
              <MyText text="Demand" size={16} weight="600" />
              <MyText
                text={
                  productDetail?.propertyPrice?.toString() ?? "1 Crore 50 lac"
                }
                size={14}
                weight="400"
              />
            </View>
          </View>
        </Card>
        <PropertyList title="Similar Projects" theme={theme} />
      </View>
      {/* temporarily */}
      <MyPopupModal visible={isVisble} bgDim>
        <MyPopupModal.Feedback
          message="Moin Khan"
          avatarUrl={{ uri: "https://i.pravatar.cc/300?img=68" }}
          onClose={() => setIsVisible(false)}
        />
      </MyPopupModal>
    </ScrollView>
  );
};

export default PropertyDetail;

const styles = (theme?: MyTheme) =>
  StyleSheet.create({
    wrapper: {
      flex: 1,
      paddingHorizontal: 25,
      paddingTop: 25,
      paddingBottom: 20,
    },
    cardWrapper: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      paddingVertical: 15,
      paddingHorizontal: 10,
      marginTop: 25,
      borderRadius: 10,
      justifyContent: "space-around",
      backgroundColor: theme?.colors.background,
      borderColor: theme?.colors.border,
    },

    dFlex: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      marginTop: 5,
    },
    textWrapper: {
      marginTop: 5,
    },
    btnWrapper: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginTop: 15,
    },
    overViewCard: {
      marginTop: 30,
      backgroundColor: theme?.colors.background,
      borderColor: theme?.colors.border,
    },
    headingStyle: {
      justifyContent: "center",
      alignContent: "center",
      alignItems: "center",
      padding: 10,
      borderBottomWidth: 1, // Set the width of the bottom border
      borderBottomColor: theme?.colors.border, // Set the color of the bottom border
    },
    detailsWrapper: {
      padding: 15,
    },
    table: {
      borderRadius: 10,
      marginTop: 10,
      backgroundColor: theme?.colors.background,
      borderColor: theme?.colors.border,
    },
    row: {
      flexDirection: "row",
      paddingVertical: 10,
      paddingHorizontal: 10,
    },
    columnOne: {
      flex: 1,
    },
    columnTwo: {
      flex: 3,
    },
    descriptionWrapper: {
      marginTop: 10,
      // height: 165,
      justifyContent: "space-between",
    },
    mt5: {
      marginTop: 15,
    },
  });
