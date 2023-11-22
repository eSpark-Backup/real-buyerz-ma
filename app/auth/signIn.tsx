import React, { useState } from "react";
import { Appearance, StyleSheet, Text, View, ScrollView } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { MaterialIcons } from "@expo/vector-icons";
import { Link, router } from "expo-router";
import { Formik } from "formik";

import { GLogo, RLogo } from "../../assets";
import { UserSignInSchema } from "../../constants/validations/schema";
import { DarkTheme, LightTheme } from "../../theme";

import { MyText, MyButton, MyCheckbox, MyInput } from "../../components";
import Toast from "react-native-toast-message";

export default function signIn() {
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
      <View style={{ marginTop: "4%" }}>
        <RLogo />
      </View>

      <Formik
        initialValues={{
          username: "",
          password: "",
          agreeToTerms: false,
        }}
        onSubmit={async (values, { resetForm }) => {
          console.log("Sign Up success", values);
        }}
        validationSchema={UserSignInSchema.signInForm}
      >
        {({
          handleChange,
          handleSubmit,
          errors,
          setFieldTouched,
          touched,
          values,
          setFieldValue,
        }) => (
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              width: "90%",
              marginTop: "18%",
              flex: 1,
            }}
          >
            <MyInput
              placeholder="Username"
              onChange={handleChange("username")}
              style={[
                { width: "90%", height: "10%" },
                touched.username && errors.username
                  ? { borderColor: "red", borderWidth: 1 } // Add red border if there's an error
                  : null,
              ]}
            />

            <MyText
              text="Forgot Username?"
              textColor="#2e6fac"
              size={14}
              style={{
                width: "90%",
                textAlign: "right",
                marginTop: 5,
                marginBottom: "7%",
              }}
            />

            <MyInput
              placeholder="Password"
              onChange={handleChange("password")}
              style={[
                { width: "90%", height: "10%" },
                touched.password && errors.password
                  ? { borderColor: "red", borderWidth: 1 } // Add red border if there's an error
                  : null,
              ]}
              password
            />

            <View
              style={{
                flexDirection: "row",
                width: "90%",
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

            <View
              style={{
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
                marginTop: "11%",
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  width: "105%",
                  justifyContent: "center",
                }}
              >
                <MyCheckbox
                  label=""
                  onChange={() => {
                    setFieldValue("agreeToTerms", !values.agreeToTerms);
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
                    width: "72%",
                    flexWrap: "wrap",
                    alignItems: "center",
                  }}
                >
                  <MyText
                    text="I have read and agree to the "
                    style={{
                      color: "#FFFFFF",
                      fontSize: 12,
                    }}
                  />

                  <MyText
                    text="Terms and Conditions"
                    style={{
                      color: "#FB631C",
                      textDecorationColor: "#FB631C",
                      textDecorationLine: "underline",
                      fontSize: 10,
                    }}
                  />
                  <MyText
                    text="and "
                    style={{
                      color: "#FFFFFF",
                      fontSize: 12,
                    }}
                  />

                  <MyText
                    text="Privacy Policy"
                    style={{
                      color: "#FB631C",
                      textDecorationColor: "#FB631C",
                      textDecorationLine: "underline",
                      fontSize: 10,
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
                onPress={() => {
                  handleSubmit();
                }}
              />
              <MyText
                text="Or"
                size={14}
                weight="600"
                textColor="white"
                style={{ marginTop: "4%" }}
              />
              <View
                style={{
                  flexDirection: "row",
                  marginTop: "4%",
                  alignItems: "center",
                }}
              >
                <MyText
                  text="Login with  "
                  size={14}
                  weight="600"
                  textColor="white"
                />
                <GLogo />
              </View>
            </View>

            <View style={{ flexDirection: "row", marginTop: "22%" }}>
              <MyText
                text="Don't have an account?"
                size={14}
                weight="700"
                textColor="white"
              />
              <Link href={"/auth/signUp"}>
                <MyText
                  text=" Sign Up"
                  size={14}
                  weight="700"
                  textColor={theme.colors.primary}
                />
              </Link>
            </View>
          </View>
        )}
      </Formik>
    </ScrollView>
  );
}

const styles = StyleSheet.create({});

// for login popup

// {
//   /* <MyButton
//           label="PopUp"
//           onPress={toggleModal}
//           style={{
//             width: 110,
//             alignItems: "center",
//             height: 35,
//             justifyContent: "center",
//             alignContent: "center",
//             marginTop: "1%",
//           }}
//           labelStyle={{ color: "white" }}
//         />
//         <LoginModal visible={isModalVisible} onClose={toggleModal} /> */
// }
