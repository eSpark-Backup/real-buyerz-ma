import { Appearance, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useTheme } from "@react-navigation/native";
import MyText from "../../components/MyText";
import MyInput from "../../components/MyInput";
import MyCheckbox from "../../components/MyCheckbox";
import { DarkTheme, LightTheme } from "../../theme";
import MyButton from "../../components/MyButton";
import { GLogo, RLogo, SLogo } from "../../assets";
import { TouchableOpacity } from "react-native-gesture-handler";
import { MaterialIcons } from "@expo/vector-icons";
import { Link, router } from "expo-router";
import { Feather } from "@expo/vector-icons";

export default function signUp() {
  const colorScheme = Appearance.getColorScheme();
  const theme = colorScheme === "dark" ? DarkTheme : LightTheme;

  return (
    <View style={{ alignItems: "center", width: "100%", height: "100%" }}>
      <View
        style={{
          position: "absolute",
          top: "1%",
          left: "7%",
          flexDirection: "row",
        }}
      >
        <Link href={"/auth/signIn"}>
          <MaterialIcons
            name="arrow-back"
            size={24}
            color={theme.colors.secondary}
          />
        </Link>
      </View>
      <View
        style={{
          position: "absolute",
          top: "3%",
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
        <View style={{ backgroundColor: "pink", width: 99, height: 61.35 }}>
          {/* <RLogo  /> */}
        </View>
      </View>
      <MyText text="" size={18} />
      <View
        style={{
          justifyContent: "space-evenly",
          alignItems: "center",
          width: "85%",
          flex: 1,
          //   backgroundColor: "yellow",
          borderColor: "#FFFFFF",
          borderWidth: 1,
          borderRadius: 15,
          padding: 0,
        }}
      >
        <MyText
          text="Sign Up"
          weight="700"
          size={25}
          textColor={theme.colors.secondary}
          //   style={{ paddingBottom: 20 }}
        />
        <View
          style={{
            flexDirection: "row",
            width: "100%",
            // backgroundColor: "yellow",
            justifyContent: "center",
            alignItems: "center",
            columnGap: 15,
          }}
        >
          <MyInput
            placeholder="First name"
            style={{ width: "38%", height: "82%" }}
          />
          <MyInput
            placeholder="Last name"
            style={{ width: "38%", height: "82%" }}
          />
        </View>
        <MyInput
          placeholder="Email Address"
          style={{ width: "80%", height: "8.15%" }}
        />
        <MyInput
          placeholder="Contact Number"
          style={{ width: "80%", height: "8.15%" }}
        />
        <MyInput
          placeholder="Applicant"
          style={{ width: "80%", height: "8.15%" }}
        />
        <MyInput
          placeholder="Password"
          style={{ width: "80%", height: "8.15%" }}
        />
        <MyInput
          placeholder="Confirm Password"
          style={{ width: "80%", height: "8.15%" }}
        />
      </View>
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
      {/* <View style={{ flexDirection: "row" }}>
        <MyText
          text="Already have an account?"
          size={14}
          weight="700"
          textColor="white"
        />
        <Link href={"/auth/signIn"}>
          <MyText
            text="Sign In"
            size={14}
            weight="700"
            textColor={theme.colors.primary}
          />
        </Link>
      </View> */}
    </View>
  );
}

const styles = StyleSheet.create({});
