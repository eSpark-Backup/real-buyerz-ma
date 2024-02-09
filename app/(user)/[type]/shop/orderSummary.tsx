import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useTheme } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";

import { Card, GapView, MyButton, MyInput, MyText } from "@components";
import { WINDOW_WIDTH } from "@constants";
import { MyTheme } from "@types";
import { CardPayment } from "@assets/images";

export default function OrderSummary() {
  const theme = useTheme() as MyTheme;

  function Summary({
    items,
    total,
  }: {
    items: { name: string; qty: string; amount: string }[];
    total: string;
  }) {
    const theme = useTheme() as MyTheme;

    const renderItem = (
      item: { name: string; qty: string; amount: string },
      index: number
    ) => {
      return (
        <View
          key={index}
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View style={{ flexDirection: "row" }}>
            <MyText text={item.name} size={12} weight="500" />
            <GapView mode="horizontal" length={5} />
            <MyText
              text={`(${item.qty}x)`}
              size={10.5}
              weight="500"
              style={{ textAlignVertical: "center" }}
            />
          </View>
          <MyText text={"Rs " + item.amount} size={10.5} />
        </View>
      );
    };

    return (
      <View>
        {items.map((item, index) => renderItem(item, index))}
        <View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              paddingTop: 26,
            }}
          >
            <MyText
              text="Total:"
              weight="700"
              size={13}
              style={{ textAlignVertical: "center" }}
            />
            <MyText
              text={"Rs " + total}
              textColor={theme.colors.secondary}
              weight="700"
              size={13}
              style={{ textAlignVertical: "center" }}
            />
          </View>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        <MyText
          text="Order Summary"
          size={16}
          weight="700"
          textColor={theme.colors.negative}
          style={{ marginBottom: 20 }}
        />
        <Card plain>
          <View
            style={{
              paddingVertical: 27,
              paddingHorizontal: 10,
              justifyContent: "space-between",
            }}
          >
            <Summary
              items={[{ amount: "2500", name: "Refresh Credits", qty: "1" }]}
              total="2500"
            />
          </View>
        </Card>
        <GapView length={30} />
        <MyText
          text="Payment Method"
          size={16}
          weight="700"
          textColor={theme.colors.negative}
          style={{ marginBottom: 20 }}
        />
        <Card plain style={{ marginBottom: 20 }}>
          <View
            style={{
              flexDirection: "row",
              paddingVertical: 15,
              paddingHorizontal: 10,
              justifyContent: "space-between",
            }}
          >
            <MyText
              text="Credit Card"
              textColor={theme.colors.negative}
              weight="600"
              size={14}
            />
            <CardPayment />
          </View>
          <Card.Divider />
          <View
            style={{
              paddingBottom: 25,
              paddingHorizontal: 10,
              justifyContent: "space-between",
            }}
          >
            <MyInput
              style={{
                backgroundColor: "transparent",
                elevation: 0,
              }}
              placeholderColor="#888888"
              placeholder="Name on card"
              inputStyle={{
                borderBottomWidth: 1,
                borderColor: theme.colors.border,
                paddingHorizontal: 10,
                paddingVertical: 15,
              }}
            />
            <MyInput
              style={{ backgroundColor: "transparent", elevation: 0 }}
              placeholderColor="#888888"
              placeholder="Card Number"
              inputStyle={{
                borderBottomWidth: 1,
                borderColor: theme.colors.border,
                paddingHorizontal: 10,
                paddingVertical: 15,
              }}
            />
            <View style={{ flexDirection: "row" }}>
              <MyInput
                style={{
                  backgroundColor: "transparent",
                  elevation: 0,
                  width: "auto",
                  flexShrink: 3,
                }}
                placeholderColor="#888888"
                placeholder="CVV/CVC"
                inputStyle={{
                  borderBottomWidth: 1,
                  borderColor: theme.colors.border,
                  paddingHorizontal: 10,
                  paddingVertical: 15,
                }}
              />
              <MyInput
                style={{
                  backgroundColor: "transparent",
                  elevation: 0,
                  width: "auto",
                  flexShrink: 2,
                }}
                placeholderColor="#888888"
                placeholder="Expiry date"
                inputStyle={{
                  borderBottomWidth: 1,
                  borderColor: theme.colors.border,
                  paddingHorizontal: 10,
                  paddingVertical: 15,
                }}
              />
            </View>
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
          label="Submit Order"
          textColor={"#ffffff"}
          backgroundColor={"grey"}
          onPress={() => {}}
          style={{ borderRadius: 5.73, paddingVertical: 10 }}
          labelStyle={{ fontSize: 15, fontWeight: "700" }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContainer: {
    flexGrow: 1,
    paddingTop: 30,
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
