import React from "react";
import { ScrollView, Text, StyleSheet, View, ViewStyle } from "react-native";
import { useTheme } from "@react-navigation/native";

import { GapView, MyText } from "@components";
import { MyTheme } from "@types";

export default function TermsAndConditions() {
  const theme = useTheme() as MyTheme;

  return (
    <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.container}>
      <BgCard bgColor={"#F2F2F2"} style={{ paddingRight: 53 }}>
        <MyText
          text="11th January | the “ Effective Date”"
          size={12}
          style={{ lineHeight: 14, opacity: 0.6, marginBottom: 5 }}
        />
        <MyText
          text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed venenatis gravida lectus nec sodales. Vivamus bibendum ex sodales"
          size={10}
          weight="300"
          style={{ lineHeight: 20 }}
        />
      </BgCard>
      <GapView length={26} />
      <BgCard
        bgColor={"#DCE9F2"}
        style={{
          padding: 20,
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "space-between",
        }}
      >
        <View>
          <BulletPoint label="Definitions" color={theme.colors.primary} />
          <BulletPoint label="General Terms" />
          <BulletPoint label="Paid Postings" />
          <BulletPoint label="Posting Agents" />
          <BulletPoint label="No Spam Policy" style={{ marginBottom: 0 }} />
        </View>
        <View>
          <BulletPoint
            label="Limitations of Liability"
            style={{ marginRight: 0 }}
          />
          <BulletPoint label="Indemnity" style={{ marginRight: 0 }} />
          <BulletPoint label="Property" style={{ marginRight: 0 }} />
          <BulletPoint label="General" style={{ marginRight: 0 }} />
        </View>
      </BgCard>
      <GapView length={30} />
      <MyText
        text="The following capitalized terms shall have the following meaning, except where the context otherwise requires:"
        size={14}
        style={{ lineHeight: 25 }}
      />
      <LabelText
        label="Advertising Agreement"
        text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
      />
      <LabelText
        label="Ad Services Package"
        text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
      />
      <LabelText
        label="Client"
        text="the client entity that is party to the Advertising Agreement."
      />
      <LabelText
        label="Effective Date"
        text="the date set out at the top of these Terms."
      />
      <LabelText
        label="Intellectual Property Rights"
        text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
      />
      <LabelText
        label="Service"
        text="the provision of the Website and the Product."
      />
      <LabelText
        label="User Material"
        text="material and content posted on the Website by a User or otherwise provided to the Dubizzle Group by a User in connection"
      />
    </ScrollView>
  );
}

function BgCard({
  bgColor,
  children,
  style,
}: {
  bgColor: string;
  children: React.ReactNode;
  style?: ViewStyle;
}) {
  return (
    <View style={{ ...styles.card, backgroundColor: bgColor, ...style }}>
      {children}
    </View>
  );
}

function BulletPoint({
  color,
  label,
  style,
}: {
  color?: string;
  label: string;
  style?: ViewStyle;
}) {
  return (
    <View
      style={{ flexWrap: "wrap", marginRight: 30, marginBottom: 20, ...style }}
    >
      <MyText
        text={"\u2022 " + label}
        textColor={color}
        style={{ lineHeight: 14, opacity: 0.9 }}
        size={14}
      />
    </View>
  );
}

function LabelText({
  label,
  text,
  style,
}: {
  label: string;
  text: string;
  style?: ViewStyle;
}) {
  return (
    <View
      style={{
        flexDirection: "row",
        marginVertical: 20,
        ...style,
      }}
    >
      <Text>
        <MyText
          text={`"${label}"`}
          weight="700"
          style={{ lineHeight: 25 }}
          size={14}
        />
        <MyText text={" – "} size={14} style={{ lineHeight: 25 }} />
        <MyText text={text} size={12} style={{ lineHeight: 25 }} />
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 22,
    paddingTop: 11,
  },
  card: {
    borderRadius: 10,
    padding: 15,
  },
});
