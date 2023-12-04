import React, { useRef, useEffect } from "react";
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
import { Image as EImage } from "expo-image";

import { Card, MyText, MyAppBar, GapView } from "@components";
import { AgentHome } from "@assets/images";
import { WINDOW_WIDTH } from "@constants";

export default function Home() {
  return (
    <ScrollView style={styles.wrapper}>
      <MyAppBar />
      <View style={{ alignItems: "center", marginBottom: 35 }}>
        <AdCard
          label="View Your listings or post your ad to rent or sell your house"
          btnLabel="Go to Dashboard"
        />
        <GapView length={30} />
        <Title text="Browse Properties" />
        <View
          style={{
            marginTop: 10,
            width: "100%",
            backgroundColor: "#F5F6FB",
            borderWidth: 0.9,
            borderColor: "#E9E9E9",
            paddingVertical: 15,
            paddingHorizontal: 11,
            alignItems: "center",
            flexDirection: "row",
          }}
        >
          <MyText text="0" style={{ marginRight: 10 }} />
          <BrowseProps />
          <MyText text="0" style={{ marginLeft: 10 }} />
        </View>
        <PropertyListing title="Featured Properties" />
        <ImageCard />
        <AdCard
          label="Looking to sell or rent out your property?"
          btnLabel="Post an Ad"
        />
        <PropertyListing title="Newly Listed Properties" />
        <GapView length={30} />
        <Title text="Our Home Partners" />
        <MarqueeScrollView />
      </View>
    </ScrollView>
  );
}

const Title = ({ text }: { text?: string }) => {
  return (
    <MyText
      text={text}
      style={{ fontSize: 16, fontWeight: "700", color: "#000000" }}
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
          // zIndex
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
          style={{
            backgroundColor: "#FF631C",
            alignItems: "center",
            justifyContent: "center",
            paddingVertical: 7,
            paddingHorizontal: 10,
            borderRadius: 3,
          }}
          onPress={() => console.log("asd")}
        >
          <MyText textColor="#ffffff" size={10} style={{ fontWeight: "600" }}>
            View Dashboard
          </MyText>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const AdCard = ({ label, btnLabel }: { label?: string; btnLabel?: string }) => {
  return (
    <Card style={{ width: "90%", marginTop: 30 }}>
      <View style={{ paddingHorizontal: 20, paddingVertical: 12 }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-around",
          }}
        >
          <AgentHome />
          <MyText style={{ width: "70%" }}>{label}</MyText>
        </View>
        <GapView length={15} />
        <View
          style={{
            backgroundColor: "#FB631C33",
            alignItems: "center",
            justifyContent: "center",
            paddingVertical: 7,
            borderRadius: 2,
          }}
        >
          <MyText textColor="#FB631C">{btnLabel}</MyText>
        </View>
      </View>
    </Card>
  );
};

const BrowseProps = () => {
  function renderList({ item, index }: { item: any; index: number }) {
    return (
      <Card
        style={{
          height: 90,
          width: WINDOW_WIDTH / 3.9,
          borderWidth: 1,
          borderColor: "#E9E9E9",
          borderRadius: 5,
          padding: 17,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <MyText>Icon</MyText>
        <GapView />
        <MyText size={10} textColor="#838383" style={{ textAlign: "center" }}>
          Residential House
        </MyText>
      </Card>
    );
  }

  return (
    <FlatList
      horizontal
      data={[0, 1, 2, 3, 4]}
      renderItem={renderList}
      showsHorizontalScrollIndicator={false}
      ItemSeparatorComponent={() => <GapView mode="horizontal" length={15} />}
      keyExtractor={(item) => item.toString()}
    />
  );
};

const PropertyListing = ({ title }: { title?: string }) => {
  const data = [
    {
      id: 0,
      name: "Mount Khalid",
      location: "Gulberg",
      image: "https://picsum.photos/id/151/130",
      size: "1155 sqft to 2684 sqft",
    },
    {
      id: 1,
      name: "Mount Khalid",
      location: "Gulberg",
      image: "https://picsum.photos/id/153/130",
      size: "1155 sqft to 2684 sqft",
    },
    {
      id: 2,
      name: "Mount Khalid",
      location: "Gulberg",
      image: "https://picsum.photos/id/162/130",
      size: "1155 sqft to 2684 sqft",
    },
  ];

  function renderList({ item, index }: { item: any; index: number }) {
    return (
      <Card radius={2} style={{ height: 180, width: 130 }}>
        <Image
          source={{
            uri: item?.image,
          }}
          style={{ height: 80, borderRadius: 2 }}
          onLoadStart={() => console.log("start")}
          onLoadEnd={() => console.log("end")}
        />
        <View style={{ padding: 8 }}>
          <MyText
            text="Contact for price"
            size={10}
            textColor="#000000"
            style={{ fontWeight: "500", marginBottom: 10 }}
          />
          <MyText
            text={item.name}
            size={10}
            textColor="#000000"
            style={{ fontWeight: "400", marginBottom: 10 }}
          />
          <MyText
            text={item.location}
            size={10}
            textColor="#898989"
            style={{ fontWeight: "400", marginBottom: 10 }}
          />
          <MyText
            text={item.size}
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
        <MyText textColor="#FB631C" style={{ marginBottom: 25 }}>
          Find your dream projects from our latest projects
        </MyText>
        <FlatList
          data={data}
          showsHorizontalScrollIndicator={false}
          horizontal
          renderItem={renderList}
          ItemSeparatorComponent={() => <GapView mode="horizontal" />}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
});
