import React, { useState, useEffect } from "react";
import { Appearance, StyleSheet, View, ScrollView } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { MaterialIcons } from "@expo/vector-icons";
import { Link, router } from "expo-router";
import { Formik } from "formik";
import { useDispatch } from "react-redux";
import { GLogo, RLogo } from "@assets/images";
import { DarkTheme, LightTheme } from "@theme";
import {
  MyText,
  MyButton,
  MyCheckbox,
  MyInput,
  GapView,
  OverlayLoader,
} from "@components";
import { UserSignInSchema } from "@validations/schema";
import useSessionManagement from "hooks/useSessionManagement";
import { api } from "api";

import { setUserData, setUserToken } from "../../../features/user/userSlice";
import { UserObject, handleLoginUser } from "../SignIn/utils";
import {
  handleGetUserProfile,
  UserProfileData,
} from "app/(user)/[type]/(tabs)/profile/utils";
import { showToast } from "@utils/showToast";

import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { handleSignUpUser } from "../Signup/utils";
import {
  handleSavePreferences,
  PreferencesData,
} from "app/(user)/[type]/preferences/utils";

export default function SignIn() {
  const colorScheme = Appearance.getColorScheme();
  const theme = colorScheme === "dark" ? DarkTheme : LightTheme;
  const [loading, setLoading] = useState(false);
  const [isRememberedMe, setRememberedMe] = useState(false);
  const { updateUserInSession, updateUserIsLoggedInSession } =
    useSessionManagement();
  const mergeUserRoleWithProfile = (
    profileData: UserProfileData,
    role: string
  ): UserProfileData => {
    return { ...profileData, role };
  };
  const dispatch = useDispatch();

  const [preferences, setPreferences] = useState<PreferencesData>({
    emailNotification: false,
    newsLetter: false,
    automatedReport: false,
    currency: "PKR",
    areaUnit: "Sq. Ft",
  });

  const signInUser = async (values: { email: string; password: string }) => {
    setLoading(true);

    const { email, password } = values;
    const response = await handleLoginUser({ email, password });
    if (response.status) {
      const userInfo = response.userInfo;
      if (userInfo) {
        api.setHeader("Authorization", `Bearer ${userInfo?.token as string}`);
        fetchAllUserProfileData(userInfo, isRememberedMe);
      } else {
        showToast("User info not available", "error");
      }
    } else {
      setLoading(false);
      showToast(response.message || "Sign in failed", "error");
    }
  };

  const fetchAllUserProfileData = async (
    userInfo: UserObject,
    isRememberMe: boolean
  ) => {
    try {
      const response = await handleGetUserProfile();
      if (response.data) {
        setLoading(false);
        showToast("Login successful", "success");
        savingDataToSessionStorage(userInfo, response.data, isRememberMe);
        router.push(`/(user)/${userInfo.user.role}/(tabs)/home`);
      }
    } catch (error) {
      showToast("User info not available", "error");
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const response = await GoogleSignin.signIn();
      console.log("Google Sign In Success:", JSON.stringify(response));

      if (response) {
          setLoading(true);
        const userResp = await handleSignUpUser(
          {
            firstName: response?.data?.user.givenName || "",
            lastName: response.data?.user.familyName || "",
            email: response.data?.user.email || "",
            mobileNumber: "",
            password: "",
            role: "user",
            socialId: response.data?.user.id || "",
            profileImage: response.data?.user.photo || "",
          },
          true
        );
        if (userResp.status && userResp.userInfo) {
          api.setHeader("Authorization", `Bearer ${userResp.userInfo.token}`);
          fetchAllUserProfileData(userResp.userInfo, true);
        } else {
          showToast("Sign up failed", "error");
        }
      }
    } catch (error) {
      setLoading(false);
      if (error instanceof Error) {
        console.error("Detailed error:", error.message);
        showToast(`Google sign-in error: ${error.message}`, "error");
      } else {
        console.error("Unknown error occurred");
        showToast("An unknown error occurred during Google sign-in", "error");
      }
    }
  };

  const savingDataToSessionStorage = (
    userInfo: UserObject,
    userProfileData: UserProfileData,
    isRememberMe: boolean
  ) => {
    let userProfileInfo = mergeUserRoleWithProfile(
      userProfileData,
      userInfo.user.role || "user"
    );
    updateUserInSession(userProfileInfo, userInfo?.token as string);
    updateUserIsLoggedInSession(isRememberMe);
    dispatch(setUserToken(userInfo?.token));
    dispatch(setUserData(userProfileInfo));
  };

  return (
    <ScrollView contentContainerStyle={styles.main}>
      <OverlayLoader isShow={loading} />
      <View style={styles.top}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => router.push("(user)/anon/home")}
        >
          <MyText
            text="Skip"
            style={{ textDecorationLine: "underline" }}
            size={16}
            weight="500"
            textColor="black"
          />
        </TouchableOpacity>
        <MaterialIcons name="keyboard-arrow-right" size={24} color="black" />
      </View>
      <View style={styles.logo}>
        <RLogo />
      </View>

      <Formik
        initialValues={{
          email: "",
          password: "",
          agreeToTerms: false,
        }}
        onSubmit={async (values, { resetForm }) => {
          if (values.agreeToTerms) {
            await signInUser(values);
          } else {
            showToast("You must agree to the Terms and Conditions!", "error");
          }
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
              placeholder="Email address"
              onChange={handleChange("email")}
              onBlur={() => setFieldTouched("email")}
              value={values.email}
              style={styles.input}
              placeholderColor="#666666"
            />
            {errors.email && touched.email && (
              <MyText style={styles.errorText}>{errors.email}</MyText>
            )}
            <GapView length={25} />

            <MyInput
              placeholder="Password"
              onChange={handleChange("password")}
              onBlur={() => setFieldTouched("password")}
              value={values.password}
              style={styles.input}
              password
              placeholderColor="#666666"
            />
            {errors.password && touched.password && (
              <MyText style={styles.errorText}>{errors.password}</MyText>
            )}

            <View style={styles.coupleContainer}>
              <MyCheckbox
                label="Remember"
                onChange={(value) => {
                  setRememberedMe(value);
                }}
                style={styles.rememberCont}
                labelStyle={styles.label}
                isAuth
              />
              <Link
                href={"/auth/ForgotPassword/forgotPassword"}
                style={styles.forgotPass}
              >
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
                  isAuth
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
                  <MyText text=" and " style={styles.termsText} />
                  <MyText text="Privacy Policy" style={styles.termsDecText} />
                </View>
              </View>
              <MyButton
                label="Submit"
                textColor="white"
                style={styles.button}
                onPress={handleSubmit}
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
                <TouchableOpacity onPress={handleGoogleSignIn}>
                  <GLogo />
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.bottom}>
              <MyText
                text="Don't have an account?"
                size={14}
                weight="700"
                textColor="white"
              />
              <Link href={"/auth/Signup/signUp"}>
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
    right: "8%",
    flexDirection: "row",
  },
  form: {
    justifyContent: "center",
    alignItems: "center",
    width: "90%",
    marginTop: "18%",
    flex: 1,
  },
  coupleContainer: {
    flexDirection: "row",
    width: "90%",
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
  forgotPass: {
    marginTop: 5,
    width: "50%",
    textAlign: "right",
  },
  logo: { marginTop: "4%" },
  input: { width: "90%", height: 45, backgroundColor: "#f3f4f6" },
  rememberCont: { width: "50%" },
  label: { color: "#FFFFFF", fontSize: 14 },
  bottom: { flexDirection: "row", marginTop: "22%" },
  errorText: {
    color: "red",
    fontSize: 12,
    marginTop: 5,
    marginLeft: "5%",
    width: "90%",
  },
});
