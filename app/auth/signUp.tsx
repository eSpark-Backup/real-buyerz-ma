import React from "react";
import { Appearance, StyleSheet, View, ScrollView } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { MaterialIcons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { DimensionValue } from "react-native";
import { Formik, FormikHelpers } from "formik";

import { UserSignUpSchema } from "../../constants/validations/schema";
import { GLogo, SLogo } from "../../assets/";
import { DarkTheme, LightTheme } from "../../theme";
import { MyText, MyButton, MyCheckbox, MyInput } from "../../components";

interface InputField {
  placeholder: string;
  width: DimensionValue;
  marginBottom: DimensionValue;
  rightIcon?: { name: string; size: number };
  password?: boolean;
  name: string;
  handleChange: (value: string, formikHelpers?: FormikHelpers<any>) => void;
}

export default function SignUp() {
  const colorScheme = Appearance.getColorScheme();
  const theme = colorScheme === "dark" ? DarkTheme : LightTheme;

  const inputFields: InputField[] = [
    {
      placeholder: "Email Address",
      width: "100%",
      marginBottom: "4%",
      name: "email",
      handleChange: (value, formikHelpers) =>
        formikHelpers?.setFieldValue("email", value),
    },
    {
      placeholder: "Contact Number",
      width: "100%",
      marginBottom: "4%",
      name: "phone",
      handleChange: (value, formikHelpers) =>
        formikHelpers?.setFieldValue("phone", value),
    },
    {
      placeholder: "Applicant",
      width: "100%",
      marginBottom: "4%",
      rightIcon: { name: "keyboard-arrow-down", size: 24 },
      name: "applicant",
      handleChange: (value, formikHelpers) =>
        formikHelpers?.setFieldValue("applicant", value),
    },
    {
      placeholder: "Password",
      width: "100%",
      marginBottom: "4%",
      name: "password",
      handleChange: (value, formikHelpers) =>
        formikHelpers?.setFieldValue("password", value),
    },
    {
      placeholder: "Confirm Password",
      width: "100%",
      marginBottom: "4%",
      password: true,
      name: "confirmPassword",
      handleChange: (value, formikHelpers) =>
        formikHelpers?.setFieldValue("confirmPassword", value),
    },
  ];

  return (
    <Formik
      initialValues={{
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
        agreeToTerms: false,
      }}
      onSubmit={async (values, { resetForm }) => {
        console.log("Sign Up success", values);
      }}
      validationSchema={UserSignUpSchema.signUpForm}
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
            <MaterialIcons
              name="keyboard-arrow-right"
              size={24}
              color="black"
            />
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
                  // style={{ width: "48%", height: "75%", marginBottom: "3%" }}
                  onChange={handleChange("firstName")}
                  style={[
                    { width: "48%", height: "75%", marginBottom: "3%" },
                    touched.firstName && errors.firstName
                      ? { borderColor: "red", borderWidth: 1 } // Add red border if there's an error
                      : null,
                  ]}
                />
                <MyInput
                  placeholder="Last name"
                  // style={{ width: "48%", height: "75%", marginBottom: "3%" }}
                  style={[
                    { width: "48%", height: "75%", marginBottom: "3%" },
                    touched.firstName && errors.firstName
                      ? { borderColor: "red", borderWidth: 1 } // Add red border if there's an error
                      : null,
                  ]}
                  onChange={handleChange("lastName")}
                />
              </View>
              {inputFields.map((field, index) => (
                <MyInput
                  key={index}
                  placeholder={field.placeholder}
                  style={[
                    {
                      width: field.width,
                      height: "12%",
                      marginBottom: field.marginBottom,
                    },
                    errors[field.name as keyof typeof values] &&
                    touched[field.name as keyof typeof values]
                      ? {
                          borderColor: "red",
                          borderWidth: 1,
                        }
                      : null,
                  ]}
                  rightIcon={field?.rightIcon}
                  password={field?.password}
                  onChange={handleChange(field.name)}
                />
              ))}
            </View>
          </View>
          <View
            style={{
              marginTop: "6%",
              flexDirection: "row",
              width: "80%",
              justifyContent: "center",
            }}
          >
            <MyCheckbox
              label=""
              onChange={() => {
                console.log("old: ", values.agreeToTerms);
                setFieldValue("agreeToTerms", !values.agreeToTerms);
                // console.log("new: ", values.agreeToTerms);
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
                style={{
                  color: "#FFFFFF",
                  fontSize: 12,
                  fontFamily: "Inter",
                }}
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
            onPress={handleSubmit}
            style={{
              width: 110,
              alignItems: "center",
              height: 35,
              justifyContent: "center",
              alignContent: "center",
              marginTop: "6%",
            }}
          />

          <View
            style={{
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
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
      )}
    </Formik>
  );
}

const styles = StyleSheet.create({});
