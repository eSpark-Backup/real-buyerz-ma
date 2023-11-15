import React from "react";
import { Appearance, StyleSheet, View, ScrollView } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { MaterialIcons } from "@expo/vector-icons";
import { Link } from "expo-router";

import { GLogo, SLogo } from "../../assets/";
import { DarkTheme, LightTheme } from "../../theme";
import { MyText, MyButton, MyCheckbox, MyInput } from "../../components/index";

export default function signUp() {
  const colorScheme = Appearance.getColorScheme();
  const theme = colorScheme === "dark" ? DarkTheme : LightTheme;

  const inputFields = [
    { placeholder: "Email Address", width: "100%", marginBottom: "4%" },
    { placeholder: "Contact Number", width: "100%", marginBottom: "4%" },
    {
      placeholder: "Applicant",
      width: "100%",
      marginBottom: "4%",
      rightIcon: { name: "keyboard-arrow-down", size: 24 },
    },
    { placeholder: "Password", width: "100%", marginBottom: "4%" },
    {
      placeholder: "Confirm Password",
      width: "100%",
      marginBottom: "4%",
      password: true,
    },
  ];

  return (
    <ScrollView
      contentContainerStyle={{
        alignItems: "center",
      }}
    >
      <View
        style={{
          position: "absolute",
          left: "7%",
          flexDirection: "row",
        }}
      >
        <Link href={"/auth/signIn"}>
          <MaterialIcons
            name="arrow-back"
            size={20}
            color={theme.colors.secondary}
          />
        </Link>
      </View>
      <View
        style={{
          position: "absolute",
          top: "2%",
          right: "7%",
          flexDirection: "row",
        }}
      >
        <TouchableOpacity>
          <MyText
            text="Skip"
            style={{ textDecorationLine: "underline" }}
            size={16}
            weight="500"
          />
        </TouchableOpacity>
        <MaterialIcons name="keyboard-arrow-right" size={24} color="black" />
      </View>
      <View>
        <SLogo />
      </View>
      <View
        style={{
          justifyContent: "space-around",
          alignItems: "center",
          width: "85%",
          flex: 0.9,
          borderColor: "#FFFFFF",
          borderWidth: 1,
          borderRadius: 15,
          padding: 20,
          marginTop: "6%",
        }}
      >
        <MyText
          text="Sign Up"
          weight="700"
          size={25}
          textColor={theme.colors.secondary}
          style={{ paddingTop: "1%", paddingBottom: "8%" }}
        />
        <View
          style={{
            justifyContent: "space-evenly",
            alignItems: "center",
            width: "100%",
            flex: 1,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
              columnGap: 15,
            }}
          >
            <MyInput
              placeholder="First name"
              style={{ width: "48%", height: "75%", marginBottom: "3%" }}
            />
            <MyInput
              placeholder="Last name"
              style={{ width: "48%", height: "75%", marginBottom: "3%" }}
            />
          </View>
          {inputFields.map((field, index) => (
            <MyInput
              key={index}
              placeholder={field.placeholder}
              style={{
                width: field.width,
                height: "12%",
                marginBottom: field.marginBottom,
              }}
              rightIcon={field?.rightIcon}
              password={field?.password}
            />
          ))}
        </View>
      </View>
      <View
        style={{
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "6%",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            width: "80%",
            justifyContent: "center",
          }}
        >
          <MyCheckbox
            label=""
            onChange={(value) => {
              console.log("Agree checked!");
            }}
            style={{
              marginRight: 5,
            }}
            checkboxStyle={{
              width: 20,
              height: 20,
              borderWidth: 1,
              borderColor: "#b5b7b9",
              backgroundColor: "white",
              borderRadius: 4,
              marginRight: 5,
            }}
          />
          <View
            style={{
              flexDirection: "row",
              width: "77%",
              flexWrap: "wrap",
              alignItems: "center",
            }}
          >
            <MyText
              text="I have read and agree to the "
              style={{
                color: "#FFFFFF",
                fontSize: 12,
                fontFamily: "Inter",
              }}
            />

            <MyText
              text="Terms and Conditions"
              style={{
                color: "#FB631C",
                fontWeight: "bold",
                textDecorationColor: "#FB631C",
                textDecorationLine: "underline",
                fontSize: 10,
                fontFamily: "Inter",
              }}
            />
            <MyText
              text="and "
              style={{ color: "#FFFFFF", fontSize: 12, fontFamily: "Inter" }}
            />

            <MyText
              text="Privacy Policy"
              style={{
                color: "#FB631C",
                fontWeight: "bold",
                textDecorationColor: "#FB631C",
                textDecorationLine: "underline",
                fontSize: 10,
                fontFamily: "Inter",
              }}
            />
          </View>
        </View>
        <MyButton
          label="Submit"
          textColor="white"
          style={{
            width: 110,
            alignItems: "center",
            height: 35,
            justifyContent: "center",
            alignContent: "center",
            marginTop: "6%",
          }}
        />
        <MyText
          text="Or"
          size={14}
          weight="600"
          textColor="white"
          style={{ marginTop: "3%" }}
        />
        <View style={{ flexDirection: "row", marginTop: "3%" }}>
          <MyText
            text="Sign Up with  "
            size={14}
            weight="600"
            textColor="white"
          />
          <GLogo />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({});
