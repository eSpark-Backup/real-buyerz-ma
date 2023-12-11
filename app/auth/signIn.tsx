import React, { useState } from "react";
import { Appearance, StyleSheet, Text, View, ScrollView } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { MaterialIcons } from "@expo/vector-icons";
import { Link, router } from "expo-router";
import { Formik } from "formik";

import { GLogo, RLogo } from "@assets/images";
import { DarkTheme, LightTheme } from "@theme";
import { MyText, MyButton, MyCheckbox, MyInput, LoginModal } from "@components";
import { UserSignInSchema } from "@validations/schema";
import SuccessMessageModal from "components/SuccessMessageModal";

export default function signIn() {
  const colorScheme = Appearance.getColorScheme();
  const theme = colorScheme === "dark" ? DarkTheme : LightTheme;

  return (
    <ScrollView contentContainerStyle={styles.main}>
      <View style={styles.top}>
        <TouchableOpacity onPress={() => router.push("(user)/anon/home")}>
          <MyText
            text="Skip"
            style={{ textDecorationLine: "underline" }}
            size={16}
            weight="500"
          />
        </TouchableOpacity>
        <MaterialIcons name="keyboard-arrow-right" size={24} color="black" />
      </View>
      <View style={styles.logo}>
        <RLogo />
      </View>

      <Formik
        initialValues={{
          username: "",
          password: "",
          agreeToTerms: false,
        }}
        onSubmit={async (values, { resetForm }) => {
          console.log("Sign In success", values);
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
          <View style={styles.form}>
            <MyInput
              placeholder="Username"
              onChange={handleChange("username")}
              style={styles.input}
              placeholderColor="#666666"
            />

            <MyText
              text="Forgot Username?"
              textColor="#2e6fac"
              size={14}
              style={styles.forgotUN}
            />

            <MyInput
              placeholder="Password"
              onChange={handleChange("password")}
              style={styles.input}
              password
              placeholderColor="#666666"
            />

            <View style={styles.coupleConatiner}>
              <MyCheckbox
                label="Remember"
                onChange={(value) => {
                  console.log("Remember checked !");
                }}
                style={styles.rememberCont}
                labelStyle={styles.label}
              />
              <Link href={"/auth/ForgotPassword"} style={styles.forgotPass}>
                <MyText text="Forgot Password?" textColor="#2e6fac" size={14} />
              </Link>
            </View>

            <View style={styles.box}>
              <View style={styles.terms}>
                <MyCheckbox
                  label=""
                  onChange={() => {
                    setFieldValue("agreeToTerms", !values.agreeToTerms);
                  }}
                  checkboxStyle={styles.checkbox}
                />
                <View style={styles.termsTextContainer}>
                  <MyText
                    text="I have read and agree to the "
                    style={styles.termsText}
                  />
                  <MyText
                    text="Terms and Conditions"
                    style={styles.termsDecText}
                  />
                  <MyText text="and " style={styles.termsText} />
                  <MyText text="Privacy Policy" style={styles.termsDecText} />
                </View>
              </View>
              <MyButton
                label="Submit"
                textColor="white"
                style={styles.button}
                onPress={() => {
                  handleSubmit();
                }}
              />
              <MyText
                text="Or"
                size={14}
                weight="600"
                textColor="white"
                style={styles.logo}
              />
              <View style={styles.google}>
                <MyText
                  text="Login with  "
                  size={14}
                  weight="600"
                  textColor="white"
                />
                <GLogo />
              </View>
            </View>

            <View style={styles.bottom}>
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

const styles = StyleSheet.create({
  main: { alignItems: "center" },
  top: {
    position: "absolute",
    top: "3%",
    right: "7%",
    flexDirection: "row",
  },
  form: {
    justifyContent: "center",
    alignItems: "center",
    width: "90%",
    marginTop: "18%",
    flex: 1,
  },
  forgotUN: {
    width: "90%",
    textAlign: "right",
    marginTop: 5,
    marginBottom: "7%",
  },
  coupleConatiner: {
    flexDirection: "row",
    width: "90%",
  },
  forgotPass: {
    marginTop: 5,
    width: "50%",
    textAlign: "right",
  },
  box: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "11%",
  },
  terms: {
    flexDirection: "row",
    width: "105%",
    justifyContent: "center",
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: "#b5b7b9",
    backgroundColor: "white",
    borderRadius: 4,
    marginRight: 10,
  },
  termsTextContainer: {
    flexDirection: "row",
    width: "72%",
    flexWrap: "wrap",
    alignItems: "center",
  },
  termsText: {
    color: "#FFFFFF",
    fontSize: 12,
  },
  termsDecText: {
    color: "#FB631C",
    textDecorationColor: "#FB631C",
    textDecorationLine: "underline",
    fontSize: 10,
  },
  button: {
    width: 110,
    alignItems: "center",
    height: 35,
    justifyContent: "center",
    alignContent: "center",
    marginTop: "6%",
  },
  google: {
    flexDirection: "row",
    marginTop: "4%",
    alignItems: "center",
  },
  logo: { marginTop: "4%" },
  input: { width: "90%", height: "10%" },
  rememberCont: { width: "50%" },
  label: { color: "#FFFFFF", fontSize: 14 },
  bottom: { flexDirection: "row", marginTop: "22%" },
});
