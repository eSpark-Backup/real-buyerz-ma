import React, { useState, useEffect } from "react";
import Modal from "react-native-modal";
import { Link, useRouter } from "expo-router";
import { View, StyleSheet, ScrollView, KeyboardAvoidingView, Platform } from "react-native";
import { useTheme } from "@react-navigation/native";
import Toast from "react-native-toast-message";

import MyText from "../MyText";
import MyButton from "../MyButton";
import MyCheckbox from "../MyCheckbox";
import MyInput from "../MyInput";
import { LoginModalProps, MyTheme } from "@types";
import { GLogo, PLogo } from "@assets/images";
import { useDispatch } from 'react-redux';
import { storage } from 'app/redux/mmkv';
import { handleLoginUser, UserObject } from 'app/auth/SignIn/utils';
import OverlayLoader from "@components/OverlayLoader";
import { setUserData, setUserToken } from "features/user/userSlice";

function LoginModal({ visible, onClose, lastRoute }: LoginModalProps) {
  const theme = useTheme() as MyTheme;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");


  const onLoginPress = async () => {
    setEmailError("");
    setPasswordError("");
    if (!email) {
      setEmailError("Email is required");
    }
    if (!password) {
      setPasswordError("Password is required");
    }

    if (!email || !password) {
      return;
    }

    setLoading(true)
    const response = await handleLoginUser({ email, password });
    if (response.status) {
      setLoading(false)
      const userInfo = response.userInfo;
      if (userInfo) {
        savingDataToSessionStorage(userInfo);
        onClose();
        router.replace(`/${response.userInfo?.user.role}/${lastRoute}`);
      } else {
        showToast('User info not available', 'error');
      }
    } else {
      setLoading(false)
      showToast(
        response.message || 'Sign in failed',
        'error',
      )
    };
  };

  const savingDataToSessionStorage = (userInfo: UserObject) => {
    storage.set('userToken', userInfo?.token as string);
    storage.set('userData', JSON.stringify(userInfo?.user));
    dispatch(setUserToken(userInfo?.token));
    dispatch(setUserData(userInfo?.user));
    const userDataString = storage.getString('userData');
    const userData = userDataString ? JSON.parse(userDataString) : null; // Parse JSON if available
  }

  const showToast = (message: string, type?: 'success' | 'error') => {
    Toast.show({
      type: type,
      position: 'top',
      text1: message,
      topOffset: 0,
    });
  };

  return (
    <Modal
      isVisible={visible}
      backdropColor="#00000080"
      onBackdropPress={onClose}
      animationIn={"slideInUp"}
      animationOut={"slideOutDown"}
      style={styles.modal}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardAvoidingView}
      >
        <ScrollView contentContainerStyle={styles.scrollView}>
          <OverlayLoader isShow={loading} />
          <View
            style={[
              styles.popupStyle,
              {
                backgroundColor: theme.dark
                  ? theme.colors.verificationBg
                  : theme.colors.popupbg,
              },
            ]}
          >
            <PLogo />
            <MyText
              text="Log In to Continue"
              textColor={theme.colors.secondary}
              weight="700"
              size={16}
              style={{ paddingVertical: "4%" }}
            />
            <View
              style={{
                flex: 1,
                alignItems: "flex-start", // Align items to the start
                justifyContent: "center",
                width: "100%",
              }}
            >
              <MyInput
                placeholder="Email Address"
                value={email}
                onChange={(text) => {
                  setEmail(text);
                  setEmailError("");
                }}
                style={{
                  flex: 0,
                  backgroundColor: theme.colors.inputBg,
                  borderWidth: 1,
                  borderColor: theme.colors.border,
                  elevation: 1,
                }}
                placeholderColor={theme.colors.placeholderText}
              />
              <View style={styles.errorContainer}>
                {emailError ? (
                  <MyText text={emailError} style={styles.errorText} />
                ) : null}
              </View>

              <MyInput
                placeholder="Password"
                password
                value={password}
                onChange={(text) => {
                  setPassword(text);
                  setPasswordError("");
                }}
                style={{
                  flex: 0,
                  backgroundColor: theme.colors.inputBg,
                  marginTop: 20,
                  borderWidth: 1,
                  borderColor: theme.colors.border,
                  elevation: 1,
                }}
                placeholderColor={theme.colors.placeholderText}
              />
              <View style={styles.errorContainer}>
                {passwordError ? (
                  <MyText text={passwordError} style={styles.errorText} />
                ) : null}
              </View>

              <View style={styles.coupleContainer}>
                <MyCheckbox
                  label="Remember"
                  onChange={(value) => {
                    console.log("Remember checked !");
                  }}
                  style={{
                    flexGrow: 1, // Allow checkbox to grow and take available space
                  }}
                  labelStyle={[styles.label, { color: theme.colors.text }]}
                />
                <Link href={"/auth/ForgotPassword/ForgotPassword"}>
                  <MyText
                    text="Forgot Password?"
                    textColor={theme.colors.secondary}
                    size={14}
                    style={styles.forgotPass}
                  />
                </Link>
              </View>
            </View>

            <MyButton label="Log In" textColor="white" style={styles.button} onPress={onLoginPress} />
            <MyText
              text="Or"
              size={14}
              weight="600"
              textColor={theme.colors.text}
              style={{ marginVertical: "4%" }}
            />
            <View style={styles.google}>
              <MyText
                text="Login with "
                size={14}
                weight="600"
                textColor={theme.colors.text}
              />
              <GLogo />
            </View>
            <View
              style={{
                flexDirection: "row",
                marginTop: "30%",
              }}
            >
              <MyText
                text="Don't have an account?"
                size={14}
                weight="700"
                textColor={theme.colors.text}
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
        </ScrollView>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modal: {
    margin: 0,
    justifyContent: "center",
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollView: {
    flexGrow: 1,
    justifyContent: "center",
  },
  popupStyle: {
    alignItems: "center",
    flex: 1,
    marginTop: "30%",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: "9%",
    paddingVertical: "6%",
  },
  coupleContainer: {
    flexDirection: "row",
    marginTop: 5,
    width: "100%",
    alignItems: "center", // Align items in the center vertically
  },
  forgotPass: { 
    textAlign: "right", 
    marginLeft: "auto", // This ensures the text is pushed to the right
    marginTop: 5,
  },
  errorContainer: {
    alignItems: 'flex-start',
    marginTop: 5
  },
  errorText: {
    color: 'red',
    fontSize: 14,
  },
  label: { color: "#333333", fontSize: 14 },
  button: {
    width: 110,
    alignItems: "center",
    height: 35,
    justifyContent: "center",
    alignContent: "center",
    marginTop: "7%",
  },
  google: { flexDirection: "row", alignItems: "center" },
});

export default LoginModal;