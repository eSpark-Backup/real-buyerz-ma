import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { MyField, MyText, Variants } from "@components";
import { useTheme } from "@react-navigation/native";
import { MyTheme } from "@types";
const passList = [
  {
    variant: Variants.SINGLE,
    list: {
      title: "Enter Old Password",
      inputs: [
        {
          placeholder: "Old Password",
        },
      ],
    },
  },
  {
    variant: Variants.SINGLE,
    list: {
      title: "Enter New Password",
      inputs: [
        {
          placeholder: "New Password",
        },
      ],
    },
  },
  {
    variant: Variants.SINGLE,
    list: {
      title: "Confirm Password",
      inputs: [
        {
          placeholder: "Confirm Password",
        },
      ],
    },
  },
  {
    variant: Variants.CHECK_BOX,
  },
  {
    variant: Variants.PRIMARY,
    title: "Verify",
    onPress: () => {
      console.log("text");
    },
  },
];

export default function Listing() {
  const theme = useTheme() as MyTheme;
  return (
    <ScrollView
      style={{ paddingVertical: 20 }}
      contentContainerStyle={{ alignItems: "center" }}
    >
      <MyText
        text="Reach Millions of Buyers on our Platforms"
        textColor={theme.colors.negative}
        weight="500"
        size={16}
      />
      <MyText
        text="In a few simple steps!"
        size={15}
        textColor={theme.colors.placeholderText}
      />
      <View style={styles(theme).passListWrapper}>
        <View>
          <View style={styles(theme).headingStyle}>
            <MyText
              text="Information"
              size={16}
              weight="600"
              textColor={theme.colors.negative}
            />
          </View>
          <View style={styles(theme).formWrapper}>
            {passList.map((item, index) => (
              <View key={index}>
                <MyField
                  key={index}
                  variant={item.variant}
                  list={item.list}
                  title={item.title}
                />
              </View>
            ))}
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = (theme?: MyTheme) =>
  StyleSheet.create({
    headingStyle: {
      justifyContent: "center",
      alignContent: "center",
      alignItems: "center",
      padding: 10,
      borderBottomWidth: 1, // Set the width of the bottom border
      borderBottomColor: theme?.colors.border, // Set the color of the bottom border
      borderBottomStyle: "solid", // Se
    },
    formWrapper: {
      paddingHorizontal: 12,
      paddingVertical: 8,
    },
    passListWrapper: {
      marginHorizontal: 10,

      borderColor: theme?.colors.border,
      borderWidth: 1,
      borderRadius: 9,
    },
  });
