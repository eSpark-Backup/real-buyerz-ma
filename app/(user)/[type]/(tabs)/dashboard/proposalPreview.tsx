import React, { useEffect, useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { useTheme } from "@react-navigation/native";

import { Card, GapView, LabelValue, MyAvatar, MyText } from "@components";
import { MyTheme } from "@types";
import { LocationIcon } from "@assets/images";
import { useSelector } from "react-redux";
import { RootState } from "@store";
import { UserState } from "features/user/userSlice";
import dayjs from "dayjs";
import { useLocalSearchParams } from "expo-router";
import { PropertySliceState } from "features/property/propertySlice";

interface Preview {
    propertyName: string,
    propertySubTypeId: string,
    propertyPrice: string,
    propertyArea: string,
    purpose: string,
    propertyAddress: string,
    propertyCity: string,
    propertyZip: string,
    propertyDescription: string,
    longitude: string,
    latitude: string,
    amenities: any,
    propertyStatus: string,
}

const AvatarContainer = () => {
  const theme = useTheme() as MyTheme;
  const { userData } = useSelector<RootState, UserState>(state => state.user)

  return (
    <View
      style={{
        marginVertical: 30,
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      <MyAvatar
        imageUrl={{ uri: "https://i.pravatar.cc/150?img=68" }}
        size={45}
        status="online"
      />
      <View style={{ marginLeft: 13 }}>
        <MyText
          text={userData?.firstName ? (userData?.firstName + " " + userData?.lastName) : "Anon"}
          size={14}
          weight="500"
          textColor={theme.colors.secondary}
        />
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <LocationIcon />
          <GapView mode="horizontal" length={5} />
          <MyText
            text={`${userData?.city}, ${userData?.country} - ${dayjs().format('h:mma')} local time`}
            weight="500"
            textColor="#757474"
            size={12}
          />
        </View>
      </View>
    </View>
  );
};

function ProposalPreview() {
  const theme = useTheme() as MyTheme;
  const { propertyTypes } = useSelector<RootState, PropertySliceState>(state => state.property)
  const { data: propertyData }: any = useLocalSearchParams();

  const [data, setData] = useState<Preview[]>([JSON.parse(propertyData ?? {}) ?? {}])
  const [propertyType, setPropertyType] = useState("N/A")

  useEffect(() => {
    setData([JSON.parse(propertyData ?? {}) ?? {}])
    propertyTypes?.forEach(val => {
      if(val?.id == data?.[0].propertySubTypeId) {
        setPropertyType(val.typeName)
      }else {
        val.subTypes?.forEach(e => {
          if(e.id == data?.[0].propertySubTypeId) {
            setPropertyType(e.typeName);
          }
        })
      }
    })
  }, [propertyData])

  
  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: theme?.colors.background }}
      contentContainerStyle={[styles(theme).container]}
    >
      <AvatarContainer />
      <Card style={{ flex: 1, elevation: 0 }}>
        {data.map((item, index) => {
          return (
            <View key={index}>
              <View style={[styles(theme).part1, { borderTopWidth: 0 }]}>
                <MyText text={item.propertyName} size={16} weight="500" />
                <MyText
                  text={item.propertyDescription}
                  size={12}
                  style={{ textAlign: "justify" }}
                />
              </View>
              <View style={styles(theme).part1}>
                <MyText text={"Location & Purpose"} size={16} weight="500" />
                <LabelValue label="Purpose" value={item.purpose} />
                <LabelValue label="Property Type" value={propertyType} />
                <LabelValue label="City" value={item.propertyCity} />
                <LabelValue label="Location" value={item.propertyAddress} />
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
                <LabelValue label="Range" value={item?.propertyPrice} />
              </View>
              <View style={styles(theme).part1}>
                <MyText text="Features & Amenities" size={16} weight="500" />
                {item?.amenities?.map((val: { name: string, count: string}) => <LabelValue label={val?.name} value={val.count} />)}
              </View>
            </View>
          );
        })}
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
