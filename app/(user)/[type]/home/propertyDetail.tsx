import React from "react";
import { StyleSheet, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

import {
  Card,
  MyText,
  PropertyList,
  MyAvatar,
  CustomSlider,
  PrimaryBtn,
} from "@components";
import { LocationIcon } from "@assets/images/svg";

const PropertyDetail = () => {
  const images = [
    "https://picsum.photos/id/299/620",
    "https://picsum.photos/id/400/620",
    "https://picsum.photos/id/500/620",
  ];

  const tableList = [
    {
      title: "Type",
      value: "Residential Plot",
    },
    {
      title: "Location",
      value: "Scheme 33, Karachi, Sindh",
    },
    {
      title: "Price",
      value: "1.5 Crore",
    },
    {
      title: "Purpose",
      value: "For Sale",
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
    "Plot For sale Zeenatabad Society Scheme 33, Sector 19a",
    "120 Sqyd West open corner 24 Feet road (Leased)",
    "Corner Boundary Wall Society 150 Feet Road",
    "All Utilities Available",
    "K - Electric",
    "Water Sewerage System",
  ];

  const amentiesList = [
    "Park",
    "Masjid",
    "Playground",
    "24 Hours CCTV Security Camera",
    "24 Hour Water Supply",
  ];

  const colorDetector = (value: number) => {
    if (value % 2 === 0) {
      return "#ffffff";
    } else {
      return "#F4F4F4";
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
      <View style={styles.wrapper}>
        <CustomSlider images={images} title={"4 BEDROOMS APARTMENT"} />
        <Card style={styles.cardWrapper}>
          <View>
            <MyAvatar size={70} imageUrl="https://picsum.photos/id/151/130" />
          </View>
          <View style={styles.textWrapper}>
            <MyText
              text="Moin khan"
              size={16}
              weight="600"
              textColor="#696969"
            />
            <View style={styles.dFlex}>
              <LocationIcon />
              <MyText
                text="Lahore-Pakistan"
                size={12}
                textColor="#696969"
                weight="600"
              />
            </View>
            <View style={styles.btnWrapper}>
              <PrimaryBtn
                title="View"
                textColor="#ffffff"
                width={100}
                onPress={() => console.log("asd")}
                btnStyle={{
                  paddingVertical: 10,
                }}
              />
              <PrimaryBtn
                width={100}
                title="Contact"
                textColor="#ffffff"
                onPress={() => console.log("asd")}
                btnStyle={{
                  marginStart: 15,
                  paddingVertical: 10,
                }}
              />
            </View>
          </View>
        </Card>
        <Card style={styles.overViewCard}>
          <View style={styles.headingStyle}>
            <MyText
              text="Overview"
              size={16}
              weight="600"
              textColor="#000000"
            />
          </View>
          <View style={styles.detailsWrapper}>
            <MyText text="Details" size={16} weight="600" textColor="#000000" />
            <Card style={styles.table}>
              {tableList.map((item, index) => (
                <View
                  key={index}
                  style={[
                    styles.row,
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
                    textColor="#696969"
                    style={styles.columnOne}
                  />
                  <MyText
                    text={item.value}
                    size={13}
                    weight="400"
                    textColor="#333333"
                    style={styles.columnTwo}
                  />
                </View>
              ))}
            </Card>
            <View style={styles.mt5}>
              <MyText
                text="Description"
                size={16}
                weight="600"
                textColor="#000000"
              />
              <View style={styles.descriptionWrapper}>
                {description.map((item, index) => (
                  <MyText
                    key={index}
                    textColor="#333333"
                    text={item}
                    size={14}
                    weight="400"
                  />
                ))}
              </View>
            </View>
            <View style={styles.mt5}>
              <MyText text="Nearby Locations" size={16} weight="600" />
              <MyText text="Amenities" size={16} weight="600" />
              {amentiesList.map((item, index) => (
                <MyText key={index} text={item} size={14} weight="400" />
              ))}
            </View>
            <View style={styles.mt5}>
              <MyText text="Area" size={16} weight="600" />
              <MyText text={"250000 sq.m"} size={14} weight="400" />
            </View>
            <View style={styles.mt5}>
              <MyText text="Demand" size={16} weight="600" />
              <MyText text={"1 Crore 50 lac"} size={14} weight="400" />
            </View>
          </View>
        </Card>
        <PropertyList title="Similar Projects" />
      </View>
    </ScrollView>
  );
};

export default PropertyDetail;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    padding: 25,
    paddingBottom: 40,
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
  },
  headingStyle: {
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1, // Set the width of the bottom border
    borderBottomColor: "#E9E9E9", // Set the color of the bottom border
    borderBottomStyle: "solid", // Se
  },
  detailsWrapper: {
    padding: 15,
  },
  table: {
    borderRadius: 10,
    marginTop: 10,
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
    height: 165,
    justifyContent: "space-between",
  },
  mt5: {
    marginTop: 15,
  },
});
