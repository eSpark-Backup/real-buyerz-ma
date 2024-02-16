import React from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import { useTheme } from "@react-navigation/native";

import { MyText, MyAvatar, MyField, Variants } from "@components";
import { MyTheme } from "@types";

const infoList = [
  {
    variant: Variants.DUAL,
    list: {
      title: "Full Name",
      inputs: [
        {
          placeholder: "Moin",
          label: "First Name",
        },
        {
          placeholder: "Khan",
          label: "Last Name",
        },
      ],
    },
  },
  {
    variant: Variants.SINGLE,
    list: {
      title: "Email",
      inputs: [
        {
          placeholder: "moin@eSpark.com",
        },
      ],
    },
  },
  {
    variant: Variants.SELECT,
    list: {
      title: "Mobile",
      inputs: [
        {
          placeholder: "+92",
        },
      ],
    },
  },
  {
    variant: Variants.PRIMARY,
    title: "Verify",
    onPress: () => {
      console.log("text");
    },
  },
  {
    variant: Variants.SINGLE,
    list: {
      title: "Landline",
      inputs: [
        {
          placeholder: "moin@eSpark.com",
        },
      ],
    },
  },
  {
    variant: Variants.SELECT,
    list: {
      title: "Whatsapp",
      inputs: [
        {
          placeholder: "+92",
        },
      ],
    },
  },
  {
    variant: Variants.SINGLE,
    list: {
      title: "Country",
      inputs: [
        {
          placeholder: "Enter Country",
        },
      ],
    },
  },
  {
    variant: Variants.SINGLE,
    list: {
      title: "City",
      inputs: [
        {
          placeholder: "Enter City",
        },
      ],
    },
  },
  {
    variant: Variants.SINGLE,
    list: {
      title: "Address",
      inputs: [
        {
          placeholder: "Add Address",
        },
      ],
    },
  },
  {
    variant: Variants.MULTI_LINE,
    list: {
      title: "Bio",
      inputs: [
        {
          placeholder: "Add Bio",
        },
      ],
    },
  },
  {
    variant: Variants.PRIMARY,
    title: "Save Changes",
    onPress: () => {
      console.log("Save Button");
    },
  },
];

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

export default function ProfileSettings() {
  const theme = useTheme() as MyTheme;

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles(theme).container}>
        <View style={styles(theme).avatarWrapper}>
          <MyAvatar
            imageUrl={{ uri: "https://i.pravatar.cc/300?img=68" }}
            size={85}
            edit={true}
          />
        </View>
        <View style={styles(theme).infoListWrapper}>
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
              {infoList.map((item, index) => (
                <View style={{ marginTop: 3 }} key={index}>
                  <MyField
                    key={index}
                    variant={item.variant}
                    list={item.list}
                    onPress={item.onPress}
                    title={item.title}
                  />
                </View>
              ))}
            </View>
          </View>
        </View>
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
      </View>
    </ScrollView>
  );
}

const styles = (theme?: MyTheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: 26,
      paddingHorizontal: 20,
    },
    avatarWrapper: {
      justifyContent: "center",
      alignItems: "center",
    },
    infoListWrapper: {
      marginTop: 20,
      borderColor: theme?.colors.border,
      borderWidth: 1,
      borderRadius: 9,
    },
    passListWrapper: {
      marginTop: 30,
      borderColor: theme?.colors.border,
      borderWidth: 1,
      borderRadius: 9,
    },
    headingStyle: {
      justifyContent: "center",
      alignContent: "center",
      alignItems: "center",
      padding: 10,
      borderBottomWidth: 1, // Set the width of the bottom border
      borderBottomColor: theme?.colors.border, // Set the color of the bottom border
      borderBottomStyle: "solid", // Se
    },
    cardWrapper: {
      marginTop: 25,
      padding: 5,
      height: "100%",
    },
    formWrapper: {
      paddingHorizontal: 12,
      paddingVertical: 8,
    },
  });
