import { Appearance, StyleSheet, Text, View, ScrollView } from "react-native";
import React from "react";
import { MyText, MyButton, MyCheckbox, MyInput } from "../../components/index";
import { DarkTheme, LightTheme } from "../../theme";
import { GLogo, SLogo } from "../../assets/";
import { TouchableOpacity } from "react-native-gesture-handler";
import { MaterialIcons } from "@expo/vector-icons";
import { Link } from "expo-router";

export default function signUp() {
  const colorScheme = Appearance.getColorScheme();
  const theme = colorScheme === "dark" ? DarkTheme : LightTheme;

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
      <MyText text="" size={18} />
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

          <MyInput
            placeholder="Email Address"
            style={{ width: "100%", height: "12%", marginBottom: "4%" }}
          />
          <MyInput
            placeholder="Contact Number"
            style={{ width: "100%", height: "12%", marginBottom: "4%" }}
          />

          <MyInput
            placeholder="Applicant"
            style={{ width: "100%", height: "12%", marginBottom: "4%" }}
            rightIcon={{ name: "keyboard-arrow-down", size: 24 }}
          />
          <MyInput
            placeholder="Password"
            style={{ width: "100%", height: "12%", marginBottom: "4%" }}
          />
          <MyInput
            placeholder="Confirm Password"
            password
            style={{ width: "100%", height: "12%", marginBottom: "4%" }}
          />
        </View>
      </View>
      {/* </View> */}
      <MyText text="" size={20} />
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
        <View style={{ flexDirection: "row", width: "76%", flexWrap: "wrap" }}>
          <Text style={{ color: "#FFFFFF", fontSize: 12, fontFamily: "Inter" }}>
            I have read and agree to the{" "}
          </Text>
          <Text
            style={{
              color: "#FB631C",
              fontWeight: "bold",
              textDecorationColor: "#FB631C",
              textDecorationLine: "underline",
              fontSize: 10,
              fontFamily: "Inter",
            }}
          >
            Terms and Conditions
          </Text>
          <Text style={{ color: "#FFFFFF", fontSize: 12, fontFamily: "Inter" }}>
            {" "}
            and{" "}
          </Text>
          <Text
            style={{
              color: "#FB631C",
              fontWeight: "bold",
              textDecorationColor: "#FB631C",
              textDecorationLine: "underline",
              fontSize: 10,
              fontFamily: "Inter",
            }}
          >
            Privacy Policy
          </Text>
        </View>
      </View>
      <MyText text="" size={20} />
      <MyButton
        label="Submit"
        textColor="white"
        style={{
          width: 110,
          alignItems: "center",
          height: 35,
          justifyContent: "center",
          alignContent: "center",
        }}
      />
      <MyText text="" size={10} />
      <MyText text="Or" size={14} weight="600" textColor="white" />
      <MyText text="" size={10} />
      <View style={{ flexDirection: "row" }}>
        <MyText
          text="Sign Up with  "
          size={14}
          weight="600"
          textColor="white"
        />
        <GLogo />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({});
