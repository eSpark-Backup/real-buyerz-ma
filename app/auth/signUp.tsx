import React from "react";
import { Appearance, StyleSheet, View, ScrollView } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { MaterialIcons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { Formik } from "formik";

import { GLogo, SLogo } from "@assets/images/svg";
import { DarkTheme, LightTheme } from "@theme";
import { MyText, MyButton, MyCheckbox, MyInput, MyDropdown } from "@components";
import { UserSignUpSchema } from "@validations/schema";

interface InputField {
  placeholder: string;
  rightIcon?: { name: string; size: number };
  password?: boolean;
  name: string;
}

export default function SignUp() {
  const colorScheme = Appearance.getColorScheme();
  const theme = colorScheme === "dark" ? DarkTheme : LightTheme;

  const inputFields: InputField[] = [
    {
      placeholder: "Email Address",
      name: "email",
    },
    {
      placeholder: "Contact Number",
      name: "phone",
    },
    {
      placeholder: "Applicant",
      name: "applicant",
    },
    {
      placeholder: "Password",
      name: "password",
    },
    {
      placeholder: "Confirm Password",
      password: true,
      name: "confirmPassword",
    },
  ];

  return (
    <Formik
      initialValues={{
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        applicant: "",
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
        touched,
        values,
        setFieldValue,
      }) => (
        <ScrollView contentContainerStyle={styles.mainContainer}>
          <View style={styles.back}>
            <Link href={"/auth/signIn"}>
              <MaterialIcons
                name="arrow-back"
                size={20}
                color={theme.colors.secondary}
              />
            </Link>
          </View>
          <View style={styles.header}>
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
          <View style={styles.form}>
            <MyText
              text="Sign Up"
              weight="700"
              size={25}
              textColor={theme.colors.secondary}
              style={styles.title}
            />
            <View style={styles.fields}>
              <View style={styles.name}>
                <MyInput
                  placeholder="First name"
                  style={styles.fname}
                  onChange={handleChange("firstName")}
                  placeholderColor="#666666"
                />
                <MyInput
                  placeholder="Last name"
                  style={styles.fname}
                  onChange={handleChange("lastName")}
                  placeholderColor="#666666"
                />
              </View>
              {inputFields.map((field, index) =>
                field.name === "applicant" ? (
                  <MyDropdown
                    key={index}
                    data={["user", "agent"]}
                    onSelect={(value) => setFieldValue("applicant", value)}
                    placeholder={field.placeholder}
                    zIndex={10}
                    style={styles.dropdown}
                    placeholderColor="#666666"
                  />
                ) : (
                  <MyInput
                    key={index}
                    placeholder={field.placeholder}
                    style={styles.input}
                    rightIcon={field?.rightIcon}
                    password={field?.password}
                    onChange={handleChange(field.name)}
                    placeholderColor="#666666"
                  />
                )
              )}
            </View>
          </View>
          <View style={styles.terms}>
            <MyCheckbox
              label=""
              onChange={() => {
                console.log("old: ", values.agreeToTerms);
                setFieldValue("agreeToTerms", !values.agreeToTerms);
              }}
              style={{
                marginRight: 5,
              }}
              checkboxStyle={styles.checkbox}
            />
            <View style={styles.termsTextContainer}>
              <MyText
                text="I have read and agree to the "
                style={styles.termsText}
              />

              <MyText text="Terms and Conditions" style={styles.termsDecText} />
              <MyText text="and " style={styles.termsText} />

              <MyText text="Privacy Policy" style={styles.termsDecText} />
            </View>
          </View>
          <MyButton
            label="Submit"
            textColor="white"
            onPress={() => {
              console.log("Form values", values);
              console.log("Form errors", errors);
              console.log("Form touched", touched);

              handleSubmit();
            }}
            style={styles.button}
          />

          <View style={styles.bottom}>
            <MyText
              text="Or"
              size={14}
              weight="600"
              textColor="white"
              style={styles.google}
            />
            <View style={styles.google}>
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

const styles = StyleSheet.create({
  mainContainer: {
    alignItems: "center",
  },
  back: {
    position: "absolute",
    left: "7%",
    flexDirection: "row",
  },
  header: {
    position: "absolute",
    top: "2%",
    right: "7%",
    flexDirection: "row",
  },
  form: {
    justifyContent: "space-around",
    alignItems: "center",
    width: "85%",
    flex: 0.9,
    borderColor: "#FFFFFF",
    borderWidth: 1,
    borderRadius: 15,
    padding: 20,
    marginTop: "6%",
  },
  fields: {
    justifyContent: "space-evenly",
    alignItems: "center",
    width: "100%",
    flex: 1,
  },
  name: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    columnGap: 15,
  },
  title: { paddingTop: "1%", paddingBottom: "8%" },
  fname: { width: "48%", height: "75%", marginBottom: "3%" },
  dropdown: {
    backgroundColor: "#f3f4f6",
    borderRadius: 5,
    elevation: 3,
    width: "100%",
    height: "12%",
    marginBottom: "4%",
  },
  input: {
    width: "100%",
    height: "12%",
    marginBottom: "4%",
  },
  terms: {
    marginTop: "6%",
    flexDirection: "row",
    width: "80%",
    justifyContent: "center",
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: "#b5b7b9",
    backgroundColor: "white",
    borderRadius: 4,
    marginRight: 5,
  },
  termsTextContainer: {
    flexDirection: "row",
    width: "85%",
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
  bottom: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  google: {
    flexDirection: "row",
    marginTop: "3%",
    alignItems: "center",
  },
});
