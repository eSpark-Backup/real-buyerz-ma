import React from "react";
import { StyleSheet, View } from "react-native";
import { useTheme } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";

import { MyTheme } from "@types";
import { Card, GapView, MyButton, MyDropdown, MyText } from "@components";
import { WINDOW_WIDTH } from "@constants";
import { PDollar_Green, PFire_Orange, PFire_Red } from "@assets/images";

interface ConnectsData {
  label: string;
  value: string;
  type: "input" | "dropdown";
  items?: string[];
}

const connectsData: ConnectsData[] = [
  { label: "Your available connects", value: "0", type: "input" },
  {
    label: "Select the amount to buy",
    value: "0",
    items: [
      "10 for $1.50",
      "20 for $3.00",
      "40 for $6.00",
      "60 for $9.00",
      "80 for $12.00",
      "100 for $15.00",
      "150 for $22.50",
      "200 for $30.0",
      "250 for $37.50",
      "300 for $45.00",
    ],
    type: "dropdown",
  },
  { label: "Your account will be charged", value: "0", type: "input" },
  { label: "Your new connects balance will be", value: "0", type: "input" },
  { label: "These connects will expire on", value: "0", type: "input" },
];

export default function Shop() {
  const theme = useTheme() as MyTheme;
  return (
    <View style={styles.container}>
      <ScrollView
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        <Card plain>
          <View
            style={{
              flexDirection: "row",
              paddingVertical: 17,
              paddingHorizontal: 20,
              justifyContent: "space-between",
            }}
          >
            <MyText
              text="Package"
              textColor={theme.colors.negative}
              weight="700"
              size={14}
            />
            <MyText
              text="Price"
              textColor={theme.colors.negative}
              weight="700"
              size={14}
            />
          </View>
          <Card.Divider />
          <View
            style={{
              paddingVertical: 22,
              paddingHorizontal: 10,
              justifyContent: "space-between",
            }}
          >
            <Package
              icon={<PDollar_Green />}
              label="Basic"
              text="Get a slot for 4 listing with initial 60 connection"
              price="2500"
              theme={theme}
            />
            <GapView length={20} />
            <Package
              icon={<PFire_Orange />}
              label="Hot"
              text="Get a slot for 8 listing with initial 80 connection"
              price="65000"
              theme={theme}
            />
            <GapView length={20} />
            <Package
              icon={<PFire_Red />}
              label="Super"
              text="Get a slot for 12 listing with initial 100 connection"
              price="17500"
              theme={theme}
            />
          </View>
        </Card>
        <GapView length={20} />
        <Card plain style={{ marginBottom: 20 }}>
          <View
            style={{
              flexDirection: "row",
              paddingVertical: 17,
              paddingHorizontal: 20,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <MyText
              text="Buy Connects"
              textColor={theme.colors.negative}
              weight="700"
              size={14}
            />
            <MyText
              text=" (Only applicable if you buy a subscription)"
              textColor={theme.colors.negative}
              style={{ top: 1 }}
              size={10}
            />
          </View>
          <Card.Divider />
          <View
            style={{
              paddingVertical: 24,
              paddingHorizontal: 30,
              justifyContent: "space-between",
            }}
          >
            {connectsData.map((item, index) => renderItem(item, index, theme))}
          </View>
        </Card>
      </ScrollView>
      <View
        style={[
          styles.footerContainer,
          {
            borderColor: theme.colors.border,
            backgroundColor: theme.colors.background,
          },
        ]}
      >
        <MyButton
          label="Buy"
          textColor={"#ffffff"}
          backgroundColor={theme.colors.primary}
          onPress={() => {}}
          style={{ borderRadius: 5.73, paddingVertical: 10 }}
          labelStyle={{ fontSize: 15, fontWeight: "700" }}
        />
      </View>
    </View>
  );
}

function Package({
  icon,
  label,
  text,
  price,
  theme,
}: {
  icon: React.ReactNode;
  label: string;
  text: string;
  price: string;
  theme: MyTheme;
}) {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >
      <View style={{ flexDirection: "row", flexShrink: 1 }}>
        {icon}
        <View style={{ marginLeft: 10 }}>
          <MyText
            text={label}
            textColor={theme.colors.negative}
            size={14}
            weight="500"
          />
          <MyText
            text={text}
            size={12}
            weight="500"
            style={{ opacity: 0.6, marginTop: 5 }}
          />
        </View>
      </View>
      <View style={{ alignItems: "flex-end" }}>
        <MyText
          text={"Rs." + price}
          style={{ opacity: 0.6, paddingRight: 10 }}
          size={12}
          weight="700"
        />
        <MyButton
          label="Add to cart"
          textColor={"#ffffff"}
          backgroundColor={theme.colors.primary}
          onPress={() => {}}
          style={{
            borderRadius: 4,
            paddingHorizontal: 10,
            paddingVertical: 7,
            marginTop: 5,
          }}
          labelStyle={{ fontSize: 12, fontWeight: "500" }}
        />
      </View>
    </View>
  );
}

function renderItem(item: ConnectsData, index: number, theme: MyTheme) {
  return (
    <View style={{ marginBottom: index < connectsData.length - 1 ? 10 : 0 }}>
      <MyText text={item.label} />
      <GapView length={12} />
      {item.type === "input" && (
        <View
          style={{
            borderRadius: 4,
            paddingLeft: 14,
            paddingVertical: 8,
            borderWidth: 1,
            borderColor: theme.colors.border,
            width: "100%",
          }}
        >
          <MyText text={item.value} size={12} style={{ opacity: 0.6 }} />
        </View>
      )}
      {item.type === "dropdown" && (
        <MyDropdown
          zIndex={8}
          placeholder="0"
          style={{ width: "auto" }}
          data={item?.items!}
          onSelect={(value) => {
            console.log("data", value);
          }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContainer: {
    flexGrow: 1,
    paddingTop: 26,
    paddingHorizontal: 20,
  },
  footerContainer: {
    width: WINDOW_WIDTH,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderTopWidth: 2,
    borderStartWidth: 2,
    borderEndWidth: 2,
    paddingHorizontal: 58,
    paddingVertical: 33,
  },
});
