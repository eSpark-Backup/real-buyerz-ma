import React from "react";
import Modal from "react-native-modal";
import { Link } from "expo-router";
import { View, StyleSheet, Appearance, ViewStyle } from "react-native";
import { useTheme } from "@react-navigation/native";

import MyText from "../MyText";
import MyButton from "../MyButton";
import MyCheckbox from "../MyCheckbox";
import MyInput from "../MyInput";
import { LoginModalProps, MyTheme } from "@types";
import { GLogo, PLogo } from "@assets/images";

function LoginModal({ visible, onClose }: LoginModalProps) {
  const theme = useTheme() as MyTheme;

  return (
    <Modal
      isVisible={visible}
      backdropColor="transparent"
      onBackdropPress={onClose}
      animationIn={"slideInUp"}
      animationOut={"slideOutDown"}
      style={styles.modal}
    >
      <View
        style={[styles.popupStyle, { backgroundColor: theme.colors.popupbg }]}
      >
        <PLogo />
        <MyText
          text="Log In to Continue"
          textColor={theme.colors.secondary}
          weight="700"
          size={16}
          style={{ paddingVertical: "4%" }}
        />
        <MyInput
          placeholder="Email Address"
          style={{ marginVertical: "8%", backgroundColor: "#29292E" }}
          placeholderColor={theme.colors.placeholderText}
        />

        <MyInput
          placeholder="Password"
          password
          style={{
            backgroundColor: "#29292E",
          }}
          placeholderColor={theme.colors.placeholderText}
        />
        <View style={styles.coupleContainer}>
          <MyCheckbox
            label="Remember"
            onChange={(value) => {
              console.log("Remember checked !");
            }}
            style={{
              width: "50%",
            }}
            labelStyle={[styles.label, { color: theme.colors.text }]}
          />
          <MyText
            text="Forgot Password?"
            textColor="#2e6fac"
            size={14}
            style={styles.forgotPass}
          />
        </View>
        <MyButton label="Log In" textColor="white" style={styles.button} />
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
    </Modal>
  );
}

const styles = StyleSheet.create({
  modal: {
    margin: 0,
    justifyContent: "center",
  },

  popupStyle: {
    alignItems: "center",
    height: "100%",
    marginTop: "55%",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: "9%",
    paddingVertical: "6%",
  },
  frg_un: {
    width: "100%",
    textAlign: "right",
    marginTop: "4%",
    marginBottom: "6%",
  },
  coupleContainer: {
    flexDirection: "row",
    width: "100%",
    marginTop: "2%",
    marginBottom: "6%",
  },
  label: { color: "#333333", fontSize: 14 },
  forgotPass: { width: "50%", textAlign: "right", marginTop: 5 },
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
