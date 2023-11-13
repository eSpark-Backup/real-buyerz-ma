import { Appearance, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useTheme } from "@react-navigation/native";
import MyText from "../../components/MyText";
import MyInput from "../../components/MyInput";
import MyCheckbox from "../../components/MyCheckbox";
import { DarkTheme, LightTheme } from "../../theme";
import MyButton from "../../components/MyButton";
import { GLogo, RLogo } from "../../assets";

export default function App() {
  // const { dark, colors } = useTheme() as MyTheme;

  const colorScheme = Appearance.getColorScheme();
  const theme = colorScheme === "dark" ? DarkTheme : LightTheme;
  return (
    
    <View
      style={{
        // justifyContent: "space-between",
        alignItems: "center",
        // backgroundColor: "pink",
        width: "100%",
        height: "100%",
      }}
    > 
      <View style={{marginTop: "7%"}}>
      <RLogo />
      </View>
      
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          width: "90%",
          // backgroundColor: "yellow",
          flex: 1,
        }}
      >
        <MyInput placeholder="Username" />
        <MyText
          text="Forgot Username?"
          textColor="#2e6fac"
          size={14}
          style={{
            width: "80%",
            textAlign: "right",
            marginTop: 5,
          }}
        />
        <MyText text="" size={20} />
        <MyInput placeholder="Password" />

        <View
          style={{
            flexDirection: "row",
            width: "80%",
            // backgroundColor: "red",
          }}
        >
          <MyCheckbox
            label="Remember"
            onChange={(value) => {
              console.log("Remember checked !");
            }}
            style={{
              width: "50%",
            }}
            labelStyle={{ color: "#FFFFFF", fontSize: 14 }}
          />
          <MyText
            text="Forgot Password?"
            textColor="#2e6fac"
            size={14}
            style={{ width: "50%", textAlign: "right", marginTop: 5 }}
          />
        </View>

        <MyText text="" size={30} />
        <View
          style={{
            flexDirection: "row",
            // backgroundColor: "yellow",
            width: "95%",
            justifyContent: "center",
          }}
        >
          <MyCheckbox
            label=""
            onChange={(value) => {
              console.log("Agree checked !");
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
            style={{ flexDirection: "row", width: "76%", flexWrap: "wrap" }}
          >
            <Text style={{ color: "#FFFFFF", fontSize: 12 }}>
              I have read and agree the{" "}
            </Text>
            <Text
              style={{
                color: "#FB631C",
                fontWeight: "bold",
                textDecorationColor: "#FB631C",
                textDecorationLine: "underline",
                fontSize: 10,
              }}
            >
              Terms and Conditions
            </Text>
            <Text style={{ color: "#FFFFFF", fontSize: 12 }}> and </Text>
            <Text
              style={{
                color: "#FB631C",
                fontWeight: "bold",
                textDecorationColor: "#FB631C",
                textDecorationLine: "underline",
                fontSize: 10,
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
          <MyText text="Login with  " size={14} weight="600" textColor="white" />
          <GLogo/>

          {/* <MyIcon
            source={require("../../assets/images/google-logo.png")}
            iconSize={82}
          /> */}
        </View>
        <MyText text="" size={50} />
        <View style={{ flexDirection: "row" }}>
          <MyText
            text="Don't have an account?"
            size={14}
            weight="700"
            textColor="white"
          />
          <MyText
            text="Sign Up"
            size={14}
            weight="700"
            textColor={theme.colors.primary}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});

{
  /* <Text style={{ color: colors.text }}>App {dark ? "true" : "false"}</Text> */
}
