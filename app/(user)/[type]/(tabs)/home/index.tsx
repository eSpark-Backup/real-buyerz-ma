import React, { useRef, useEffect, useState } from "react";
import {
  FlatList,
  StyleSheet,
  View,
  Image,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
  Animated,
  Easing,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { useRoute, useTheme } from "@react-navigation/native";
import { router, useLocalSearchParams } from "expo-router";

import { Card, MyText, GapView, AdCard, LoginModal } from "@components";
import { dummyImage, WINDOW_WIDTH } from "@constants";
import { MyTheme, UserType } from "@types";
import {
  ComShop,
  FarmHouse,
  LowPortion,
  PentHouse,
  ResApartment,
  ResHouse,
  ResPlot,
  UpPortion,
} from "@assets/images";
import { checkLoggedInUser } from "app/auth/utils/authUtils";
import { AllPropertiesData, handleGetAllProperties, handleGetAllPropertType, PropertyItem, PropertyType } from "./utils";
import { useDispatch } from "react-redux";
import { PropertySliceState, setAllProperties, setFilter, setPropertyType } from "features/property/propertySlice";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "@store";
import { UserState } from "features/user/userSlice";
import { isImageUrl } from "@utils/functions";

interface BrowseProps {
  onPress: () => void;
  icon: React.ReactNode;
  label: string;
}

export default function Home() {
  const theme = useTheme() as MyTheme;
  const params = useLocalSearchParams<{ type: UserType }>();
  const route = useRoute()
  const isLoggedIn = checkLoggedInUser();
  const dispatch: AppDispatch = useDispatch();
  const [visible, setVisible] = useState<boolean>(false)
  const { allProperties, propertyTypes } = useSelector<RootState, PropertySliceState>((state) => state.property);
  const { userData } = useSelector<RootState, UserState>((state) => state.user);
  
  useEffect(() => {
    fetchAllProperties()
    fetchAllPropertyTypes()
  }, []);

  const fetchAllProperties = async () => {
    try {
      const response = await handleGetAllProperties()
      if(response.data) {
        dispatch(setAllProperties(response.data))
      }
    } catch (error) {
    }
  }

  const fetchAllPropertyTypes = async () => {
    try {
      const response = await handleGetAllPropertType()
      if(response.status) {
        dispatch(setPropertyType(response.data))
      }
    } catch (error) {
    }
  }
  const PropertiesData = [
    {
      icon: <ResHouse />,
      label: "Residential House",
      onPress: () => router.push(`(user)/${params?.type!}/(tabs)/projects`),
    },
    {
      icon: <ResApartment />,
      label: "Residential Apartment",
      onPress: () => router.push(`(user)/${params?.type!}/(tabs)/projects`),
    },
    {
      icon: <UpPortion />,
      label: "Upper Portion",
      onPress: () => router.push(`(user)/${params?.type!}/(tabs)/projects`),
    },
    {
      icon: <LowPortion />,
      label: "Lower Portion",
      onPress: () => router.push(`(user)/${params?.type!}/(tabs)/projects`),
    },
    {
      icon: <PentHouse />,
      label: "Pent House",
      onPress: () => router.push(`(user)/${params?.type!}/(tabs)/projects`),
    },
    {
      icon: <FarmHouse />,
      label: "Farm House",
      onPress: () => router.push(`(user)/${params?.type!}/(tabs)/projects`),
    },
    {
      icon: <ResPlot />,
      label: "Residential Plot",
      onPress: () => router.push(`(user)/${params?.type!}/(tabs)/projects`),
    },
    {
      icon: <ComShop />,
      label: "Commercial Shops",
      onPress: () => router.push(`(user)/${params?.type!}/(tabs)/projects`),
    },
  ];

  return (
    <>
      <ScrollView style={[styles(theme).wrapper]}>
        <View style={styles(theme).container}>
          <AdCard
            label="View Your listings or post your ad to rent or sell your house"
            btnLabel="Go to Dashboard"
            theme={theme}
            onPress={() =>
              Boolean(userData) ? router.push(`(user)/${params?.type!}/(tabs)/dashboard`) : setVisible(true)
            }
          />
          <GapView length={30} />
          <Title text="Browse Properties" theme={theme} />
          <View style={styles(theme).carousel}>
            <Feather
              name="chevron-left"
              size={18}
              color={theme.colors.text + "77"}
              style={{ right: 5 }}
            />
            <BrowseProps theme={theme} data={propertyTypes ?? []} type={params.type} />
            <Feather
              name="chevron-right"
              size={18}
              color={theme.colors.text + "77"}
              style={{ left: 5 }}
            />
          </View>
          <PropertyListing
            title="Featured Properties"
            theme={theme}
            params={params}
            data={allProperties}
          />
          <ImageCard />
          <AdCard
            label="Looking to sell or rent out your property?"
            btnLabel="Post an Ad"
            theme={theme}
            onPress={() =>
              Boolean(userData) ? router.push(`(user)/${params?.type!}/(tabs)/listings`) : setVisible(true)
            }
          />
          <PropertyListing
            title="Newly Listed Properties"
            theme={theme}
            params={params}
            data={allProperties}
          />
        </View>
      </ScrollView>
      <LoginModal visible={visible} onClose={() => setVisible(false)} lastRoute={`home`} />
    </>
  );
}

const Title = ({ text, theme }: { text?: string; theme?: MyTheme }) => {
  return (
    <MyText
      text={text}
      weight="700"
      style={{ fontSize: 16, color: theme?.colors.text }}
    />
  );
};

const MarqueeScrollView = () => {
  const data = [
    "one",
    "two",
    "three",
    "four",
    "one",
    "two",
    "three",
    "four",
    "one",
    "two",
    "three",
    "four",
  ];
  const scrollViewRef = useRef(null);
  const translateValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const itemWidth = 100; // Adjust the item width based on your content
    const totalWidth = itemWidth * data.length;
    const duration = 20000; // Duration for the marquee effect

    Animated.loop(
      Animated.timing(translateValue, {
        toValue: -totalWidth,
        duration,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();

    return () => {
      translateValue.setValue(0);
    };
  }, [data]);

  return (
    <ScrollView
      horizontal
      bounces={false}
      contentContainerStyle={{ marginTop: 20, height: 50, width: "90%" }}
      showsHorizontalScrollIndicator={false}
      ref={scrollViewRef}
    >
      <Animated.View
        style={{
          flexDirection: "row",
          transform: [{ translateX: translateValue }],
        }}
      >
        {data.map((item, index) => (
          <Card
            style={{ padding: 14, width: 100, marginRight: 5 }}
            radius={10}
            key={index}
          >
            <MyText text={item} />
          </Card>
        ))}
        {/* Repeat items for continuous loop */}
        {data.map((item, index) => (
          <Card
            style={{ padding: 14, width: 100, marginRight: 5 }}
            radius={10}
            key={`extra_${index}`}
          >
            <MyText text={item} />
          </Card>
        ))}
      </Animated.View>
    </ScrollView>
  );
};

const ImageCard = () => {
  const params = useLocalSearchParams<{ type: UserType }>();
  return (
    <ImageBackground
      source={{ uri: "https://picsum.photos/id/299/620" }}
      resizeMode="cover"
      borderRadius={10}
      style={{
        width: WINDOW_WIDTH * 0.9,
        marginTop: 30,
        height: 115,
      }}
    >
      <View
        style={{
          flex: 1,
          height: "100%",
          width: "100%",
          position: "absolute",
          backgroundColor: "#00000033",
          borderRadius: 10,
        }}
      />
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <MyText
          style={{ width: "70%", textAlign: "center", fontWeight: "700" }}
          textColor="#ffffff"
          size={16}
        >
          Live Properties Buying & Selling
        </MyText>
        <GapView length={5} />
        <TouchableOpacity
          activeOpacity={1}
          style={{
            backgroundColor: "#FF631C",
            alignItems: "center",
            justifyContent: "center",
            paddingVertical: 7,
            paddingHorizontal: 10,
            borderRadius: 3,
          }}
          onPress={() =>
            router.push(`(user)/${params?.type!}/(tabs)/dashboard`)
          }
        >
          <MyText textColor="#ffffff" size={10} weight="600">
            View Dashboard
          </MyText>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const BrowseProps = ({
  data,
  theme,
  type
}: {
  data: PropertyType[];
  theme?: MyTheme;
  type: UserType;
}) => {
  const dispatch = useDispatch();

  function renderList({ item, index }: { item: PropertyType; index: number }) {
    return (
      <Card onPress={() => {
        router.push({
          pathname: `(user)/${type!}/(tabs)/projects`,
        });
        dispatch(setFilter({
          propertyType: item.typeName
        }))
      }} style={styles(theme).bCard}>
        <Image source={{uri: isImageUrl(item?.url) ? item?.url : dummyImage}} style={{ height: 40, width: 40 }} />
        <GapView />
        <MyText
          size={10}
          textColor={theme?.colors.dimText}
          style={styles(theme).bText}
        >
          {item?.typeName}
        </MyText>
      </Card>
    );
  }

  return (
    <FlatList
      horizontal
      data={data ?? []}
      renderItem={renderList}
      showsHorizontalScrollIndicator={false}
      ItemSeparatorComponent={() => <GapView mode="horizontal" length={15} />}
      keyExtractor={(item, index) => item.toString() + index}
    />
  );
};

export const PropertyListing = ({
  title,
  theme,
  params,
  data
}: {
  title?: string;
  theme?: MyTheme;
  params: { type?: UserType };
  data: AllPropertiesData | null
}) => {

  function renderList({
    item,
    index,
    params,
  }: {
    item: PropertyItem;
    index: number;
    params: { type?: UserType };
  }) {
    const images = item?.PropertyData?.filter(val => val.type == "image")
    return (
      <Card
        onPress={() => {
          router.navigate({
            pathname: `(user)/${params?.type!}/(tabs)/home/propertyDetail`,
            params: {
              item: JSON.stringify(item)
            }
          });
        }}
      radius={2}
      style={{ height: 180, width: 130 }}
    >
      <Image
        source={{ uri: isImageUrl(images?.[0]?.url) ? images?.[0]?.url : dummyImage}}
        style={{ height: 80, borderRadius: 2 }}
      />
      <View style={{ padding: 8 }}>
        <MyText
          text="Contact for price"
          size={10}
          textColor={theme?.colors.text}
          style={{ fontWeight: "500", marginBottom: 10 }}
        />
        <MyText
          text={item.propertyName}
          size={10}
          textColor={theme?.colors.text}
          style={{ fontWeight: "400", marginBottom: 10 }}
        />
        <MyText
          text={item.propertyAddress}
          size={10}
          textColor="#898989"
          style={{ fontWeight: "400", marginBottom: 10 }}
        />
        <MyText
          text={item.propertyArea}
          size={8}
          textColor="#898989"
          style={{ fontWeight: "400", marginBottom: 10 }}
        />
      </View>
    </Card>
    );
  }

  return (
    <Card style={{ width: "90%", marginTop: 30 }} radius={10}>
      <Card.Title>{title}</Card.Title>
      <Card.Divider />
      <View
        style={{
          paddingVertical: 15,
          paddingHorizontal: 5,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <MyText textColor={theme?.colors.primary} style={{ marginBottom: 25 }}>
          Find your dream projects from our latest projects
        </MyText>
        <FlatList
          data={data?.items ?? []}
          showsHorizontalScrollIndicator={false}
          horizontal
          renderItem={({ item, index }) => renderList({ item, index, params })}
          ItemSeparatorComponent={() => <GapView mode="horizontal" />}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>
    </Card>
  );
};

const styles = (theme?: MyTheme) =>
  StyleSheet.create({
    wrapper: {
      flex: 1,
    },
    header: {},
    HomeHeader: { position: "absolute", top: 0, width: "100%", zIndex: 1 },
    carousel: {
      marginTop: 10,
      width: "100%",
      backgroundColor: theme?.colors.card,
      borderWidth: 0.9,
      borderColor: theme?.colors.border,
      paddingVertical: 15,
      paddingHorizontal: 11,
      alignItems: "center",
      flexDirection: "row",
    },
    container: { alignItems: "center" },

    bCard: {
      height: 90,
      width: WINDOW_WIDTH / 3.9,
      borderWidth: 1,
      borderColor: theme?.colors.border,
      borderRadius: 5,
      padding: 17,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: theme?.colors.background,
    },
    bText: { textAlign: "center" },
  });
