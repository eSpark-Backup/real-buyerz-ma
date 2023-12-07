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
import { Feather } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";

import { Card, MyText, MyAppBar, GapView } from "@components";
import { AgentHome } from "@assets/images";
import { WINDOW_WIDTH } from "@constants";
import { MyTheme } from "@types";

export default function Home() {
  const theme = useTheme() as MyTheme;

  return (
    <ScrollView style={styles.wrapper}>
      <MyAppBar />
      <View style={{ alignItems: "center", marginBottom: 35 }}>
        <AdCard
          label="View Your listings or post your ad to rent or sell your house"
          btnLabel="Go to Dashboard"
          theme={theme}
        />
        <GapView length={30} />
        <Title text="Browse Properties" theme={theme} />
        <View
          style={{
            marginTop: 10,
            width: "100%",
            backgroundColor: theme.colors.card,
            borderWidth: 0.9,
            borderColor: theme.colors.border,
            paddingVertical: 15,
            paddingHorizontal: 11,
            alignItems: "center",
            flexDirection: "row",
          }}
        >
          <Feather
            name="chevron-left"
            size={18}
            color={theme.colors.text + "77"}
            style={{ right: 5 }}
          />
          <BrowseProps theme={theme} />
          <Feather
            name="chevron-right"
            size={18}
            color={theme.colors.text + "77"}
            style={{ left: 5 }}
          />
        </View>
        <PropertyListing title="Featured Properties" theme={theme} />
        <ImageCard />
        <AdCard
          label="Looking to sell or rent out your property?"
          btnLabel="Post an Ad"
          theme={theme}
        />
        <PropertyListing title="Newly Listed Properties" theme={theme} />
        <GapView length={30} />
        <Title text="Our Home Partners" theme={theme} />
        <MarqueeScrollView />
      </View>
    </ScrollView>
  );
}

const Title = ({ text, theme }: { text?: string; theme?: MyTheme }) => {
  return (
    <MyText
      text={text}
      style={{ fontSize: 16, fontWeight: "700", color: theme?.colors.text }}
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

const AdCard = ({
  label,
  btnLabel,
  theme,
}: {
  label?: string;
  btnLabel?: string;
  theme?: MyTheme;
}) => {
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
            backgroundColor: theme?.colors.primary + "33",
            alignItems: "center",
            justifyContent: "center",
            paddingVertical: 7,
            borderRadius: 2,
          }}
        >
          <MyText textColor={theme?.colors.primary}>{btnLabel}</MyText>
        </View>
      </View>
    </Card>
  );
};

const BrowseProps = ({ theme }: { theme?: MyTheme }) => {
  function renderList({ item, index }: { item: any; index: number }) {
    return (
      <Card
        style={{
          height: 90,
          width: WINDOW_WIDTH / 3.9,
          borderWidth: 1,
          borderColor: theme?.colors.border,
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

const PropertyListing = ({
  title,
  theme,
}: {
  title?: string;
  theme?: MyTheme;
}) => {
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
            textColor={theme?.colors.text}
            style={{ fontWeight: "500", marginBottom: 10 }}
          />
          <MyText
            text={item.name}
            size={10}
            textColor={theme?.colors.text}
            style={{ fontWeight: "400", marginBottom: 10 }}
          />
          <MyText
            text={item.location}
            size={10}
            textColor={theme?.colors.text + "77"}
            style={{ fontWeight: "400", marginBottom: 10 }}
          />
          <MyText
            text={item.size}
            size={8}
            textColor={theme?.colors.text + "77"}
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
