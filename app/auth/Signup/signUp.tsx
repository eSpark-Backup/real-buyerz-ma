import React, { useState } from "react";
import { Appearance, StyleSheet, View, ScrollView, Text, KeyboardTypeOptions } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { MaterialIcons } from "@expo/vector-icons";
import { Link, router } from "expo-router";
import { Formik } from "formik";
import { Back, GLogo, SLogo } from "@assets/images/svg";
import { DarkTheme, LightTheme } from "@theme";
import {
  MyText,
  MyButton,
  MyCheckbox,
  MyInput,
  OverlayLoader,
} from "@components";
import { UserSignUpSchema } from "@validations/schema";
import useSessionManagement from "hooks/useSessionManagement";
import { UserObject, handleSignUpUser } from "./utils";
import { useDispatch } from "react-redux";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { setUserData, setUserToken } from "../../../features/user/userSlice";
import {
  handleGetUserProfile,
  UserProfileData,
} from "app/(user)/[type]/(tabs)/profile/utils";
import { showToast } from "@utils/showToast";
import {
  handleSavePreferences,
  PreferencesData,
} from "app/(user)/[type]/preferences/utils";
import { api } from "api";

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
  const { updateUserInSession, updateUserIsLoggedInSession } =
    useSessionManagement();
  const dispatch = useDispatch();

  const mergeUserRoleWithProfile = (
    profileData: UserProfileData,
    role: string
  ): UserProfileData => {
    return { ...profileData, role };
  };
  const [preferences, setPreferences] = useState<PreferencesData>({
    emailNotification: false,
    newsLetter: false,
    automatedReport: false,
    currency: "PKR",
    areaUnit: "Sq. Ft",
  });

  const inputFields = [
    { placeholder: "First Name", name: "firstName", secureTextEntry: false },
    { placeholder: "Last Name", name: "lastName", secureTextEntry: false },
    { placeholder: "Email Address", name: "email", secureTextEntry: false  },
    { placeholder: "Contact Number", name: "phone", keyboardType: "numeric", secureTextEntry: false }, 
    { placeholder: "Password", name: "password", secureTextEntry: true },
    {
      placeholder: "Confirm Password",
      name: "confirmPassword",
      secureTextEntry: true,
    },
  ];

  const callApiSignUp = async (values: SignUpFormValues) => {
    setLoading(true);
    const response = await handleSignUpUser(
      {
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        mobileNumber: values.phone,
        password: values.password,
        role: "user",
        profileImage: "",
        socialId: "",
      },
      false
    );
    if (response.status) {
      const userInfo = response.userInfo;
      if (userInfo) {
        api.setHeader("Authorization", `Bearer ${userInfo?.token as string}`);
        savePreferences(userInfo);
      } else {
        setLoading(false);
        showToast("User info not available", "error");
      }
    } else {
      setLoading(false);
      showToast(response.message || "Sign up failed", "error");
    }
  };

  const savePreferences = async (userInfo: UserObject) => {
    const response = await handleSavePreferences(preferences);
    if (response.status && response.preferencesResponse) {
      fetchAllUserProfileData(userInfo);
    } else {
      showToast(response.message || "Failed to save preferences", "error");
      setLoading(false);
    }
  };

  const fetchAllUserProfileData = async (userInfo: UserObject) => {
    try {
      const response = await handleGetUserProfile();
      setLoading(false);
      if (response.data) {
        showToast("User Created Successfully", "success");
        savingDataToSessionStorage(userInfo, response.data);
        router.push(`/(user)/${userInfo.user.role}/home`);
      } else {
        showToast(
          response.message || "Failed to fetch user profile data",
          "error"
        );
      }
    } catch (error) {
      showToast("Something went wrong while fetching user profile", "error");
      setLoading(false);
    }
  };

  const savingDataToSessionStorage = (
    userInfo: UserObject,
    userProfileData: UserProfileData
  ) => {
    let userProfileInfo = mergeUserRoleWithProfile(
      userProfileData,
      userInfo.user.role || "user"
    );
    updateUserInSession(userProfileInfo, userInfo?.token as string);
    updateUserIsLoggedInSession(false);
    dispatch(setUserToken(userInfo?.token));
    dispatch(setUserData(userProfileInfo));
  };

  const handleGoogleSignUp = async () => {
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
            role: "user",
            socialId: response.data?.user.id || "",
            profileImage: response.data?.user.photo || "",
          },
          true
        );
        console.log("Latest one" + JSON.stringify(userResp.userInfo?.token));
        if (userResp.status && userResp.userInfo) {
          api.setHeader("Authorization", `Bearer ${userResp.userInfo.token}`);
          savePreferences(userResp.userInfo);
        } else {
          setLoading(false);
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
          showToast("You must agree to the Terms and Conditions!", "error");
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
              <MaterialIcons
                name="keyboard-arrow-right"
                size={24}
                color="black"
              />
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
                    value={
                      values[field.name as keyof SignUpFormValues] as string
                    }
                    placeholderColor="#666666"
                    password={field.secureTextEntry}
                    keyboardType={field.keyboardType as KeyboardTypeOptions} />
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
              onChange={() =>
                setFieldValue("agreeToTerms", !values.agreeToTerms)
              }
              style={{ marginRight: 5 }}
              checkboxStyle={styles.checkbox}
              isAuth
            />
            <View style={styles.termsTextContainer}>
              <MyText
                text="I have read and agree to the "
                style={styles.termsText}
              />
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
              <MyText
                text="Sign Up with  "
                size={14}
                weight="600"
                textColor="white"
              />
              <TouchableOpacity onPress={handleGoogleSignUp}>
                <GLogo />
              </TouchableOpacity>
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
    color: "red",
    fontSize: 12,
    marginTop: 5,
    rowGap: 15,
    width: "90%",
  },
});
