import React, { useState } from "react";
import { Appearance, StyleSheet, View, ScrollView, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { MaterialIcons } from "@expo/vector-icons";
import { Link, router } from "expo-router";
import { Formik } from "formik";
import { Back, GLogo, SLogo } from "@assets/images/svg";
import { DarkTheme, LightTheme } from "@theme";
import { MyText, MyButton, MyCheckbox, MyInput, OverlayLoader } from "@components";
import { UserSignUpSchema } from "@validations/schema";
import useSessionManagement from "hooks/useSessionManagement";
import { UserObject, handleSignUpUser } from "./utils";
import { useDispatch } from 'react-redux';

import { setUserData, setUserToken } from '../../../features/user/userSlice';
import { handleGetUserProfile, UserProfileData } from "app/(user)/[type]/(tabs)/profile/utils";
import { showToast } from "@utils/showToast";

interface SignUpFormValues {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  agreeToTerms: boolean;
}

export default function SignUp() {
  const colorScheme = Appearance.getColorScheme();
  const theme = colorScheme === "dark" ? DarkTheme : LightTheme;
  const [loading, setLoading] = useState(false);
  const { updateUserInSession,updateUserIsLoggedInSession } = useSessionManagement();
  const dispatch = useDispatch();
  const mergeUserRoleWithProfile = (profileData: UserProfileData, role: string): UserProfileData => {
    return { ...profileData, role };
  };

  const inputFields = [
    { placeholder: "First Name", name: "firstName" },
    { placeholder: "Last Name", name: "lastName" },
    { placeholder: "Email Address", name: "email" },
    { placeholder: "Contact Number", name: "phone", keyboardType: "numeric" }, // Set keyboardType to "numeric"
    { placeholder: "Password", name: "password", secureTextEntry: true },
    { placeholder: "Confirm Password", name: "confirmPassword", secureTextEntry: true },
  ];

  const callApiSignUp = async (values: SignUpFormValues) => {
    setLoading(true);
    const response = await handleSignUpUser({
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      mobileNumber: values.phone,
      password: values.password,
      role: 'user',
    });
    setLoading(false);
    if (response.status) {
      setLoading(false)
      const userInfo = response.userInfo;
      if (userInfo) {
        fetchAllUserProfileData(userInfo)
        router.push(`/(user)/${userInfo.user.role}/home`);
      } else {
        showToast('User info not available', 'error');
      }
    } else {
      showToast(response.message || 'Sign in failed', 'error');
    }
  };

  const fetchAllUserProfileData = async (userInfo: UserObject) => {
    try {
      const response = await handleGetUserProfile()
      if (response.data) {
        setLoading(false)
        savingDataToSessionStorage(userInfo, response.data);
        router.push(`/(user)/${userInfo.user.role}/home`);
      }
    } catch (error) {
      setLoading(false)
    }
  }

  const savingDataToSessionStorage = (userInfo: UserObject, userProfileData: UserProfileData) => {
    let userProfileInfo= mergeUserRoleWithProfile(userProfileData, userInfo.user.role || "user");
    updateUserInSession(userProfileInfo, userInfo?.token as string);
    updateUserIsLoggedInSession(false);
    dispatch(setUserToken(userInfo?.token));
    dispatch(setUserData(userProfileInfo));
  }

  return (
    <Formik<SignUpFormValues>
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
        if (values.agreeToTerms) {
          await callApiSignUp(values);
        } else {
          showToast('You must agree to the Terms and Conditions!', 'error');
        }
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
          <OverlayLoader isShow={loading} />
          <View style={styles.header}>
            <View style={{ flex: 20 }}>
              <Link href="/auth/SignIn/signIn">
                <Back />
              </Link>
            </View>
            <View style={{ flex: 70, alignItems: "center" }}>
              <SLogo />
            </View>
            <TouchableOpacity
              activeOpacity={1}
              style={{ flex: 10, flexDirection: "row", alignItems: "center" }}
            >
              <MyText
                text="Skip"
                style={{ textDecorationLine: "underline" }}
                size={16}
                weight="500"
                textColor="black"
              />
              <MaterialIcons name="keyboard-arrow-right" size={24} color="black" />
            </TouchableOpacity>
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
              {inputFields.map((field, index) => (
                <View key={index} style={{ width: "100%" }}>
                  <MyInput
                    placeholder={field.placeholder}
                    onChange={handleChange(field.name)}
                    value={values[field.name as keyof SignUpFormValues] as string}
                    placeholderColor="#666666"
                    password={field.secureTextEntry} 
                    secureTextEntry={field.secureTextEntry}
                    keyboardType={field.keyboardType} />
                  {errors[field.name as keyof SignUpFormValues] && touched[field.name as keyof SignUpFormValues] && (
                    <Text style={styles.errorText}>{errors[field.name as keyof SignUpFormValues]}</Text>
                  )}
                </View>
              ))}
            </View>
          </View>
          <View style={styles.terms}>
            <MyCheckbox
              label=""
              onChange={() => setFieldValue("agreeToTerms", !values.agreeToTerms)}
              style={{ marginRight: 5 }}
              checkboxStyle={styles.checkbox}
              isAuth
            />
            <View style={styles.termsTextContainer}>
              <MyText text="I have read and agree to the " style={styles.termsText} />
              <MyText text="Terms and Conditions" style={styles.termsDecText} />
              <MyText text=" and " style={styles.termsText} />
              <MyText text="Privacy Policy" style={styles.termsDecText} />
            </View>
          </View>
          <MyButton
            label="Submit"
            textColor="white"
            onPress={handleSubmit}
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
              <MyText text="Sign Up with  " size={14} weight="600" textColor="white" />
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
  header: {
    paddingHorizontal: 20,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
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
    gap: 10,
  },
  fields: {
    justifyContent: "space-evenly",
    alignItems: "center",
    width: "100%",
    flex: 1,
    gap: 20,
  },
  title: { paddingTop: "1%", paddingBottom: "8%" },
  terms: {
    marginTop: "10%",
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
    textDecorationLine: "underline",
    fontSize: 10,
  },
  button: {
    width: 110,
    alignItems: "center",
    height: 35,
    justifyContent: "center",
    marginTop: "9%",
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
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 5,
    rowGap: 15,
    width: '90%',
  },
});