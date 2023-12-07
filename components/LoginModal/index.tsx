import React from "react";
import Modal from "react-native-modal";
import { Link } from "expo-router";
import { View, StyleSheet, Appearance, ViewStyle } from "react-native";

import MyText from "../MyText";
import MyButton from "../MyButton";
import MyCheckbox from "../MyCheckbox";
import MyInput from "../MyInput";
import { LoginModalProps } from "@types";
import { GLogo, PLogo } from "@assets/images";
import { DarkTheme, LightTheme } from "@theme";

const colorScheme = Appearance.getColorScheme();
const theme = colorScheme === "dark" ? DarkTheme : LightTheme;

function LoginModal({ visible, onClose }: LoginModalProps) {
  return (
    <Modal
      isVisible={visible}
      backdropColor="transparent"
      onBackdropPress={onClose}
      animationIn={"slideInUp"}
      animationOut={"slideOutDown"}
      style={styles.modal}
    >
      <View style={styles.popupStyle}>
        <PLogo />
        <MyText
          text="Log In to Continue"
          textColor={theme.colors.secondary}
          weight="700"
          size={16}
          style={{ paddingVertical: "4%" }}
        />
        <MyInput placeholder="Username" style={{ marginTop: "8%" }} />
        <MyText
          text="Forgot Username?"
          textColor="#2e6fac"
          size={14}
          style={styles.frg_un}
        />
        <MyInput placeholder="Password" password />
        <View style={styles.coupleContainer}>
          <MyCheckbox
            label="Remember"
            onChange={(value) => {
              console.log("Remember checked !");
            }}
            style={{
              width: "50%",
            }}
            labelStyle={styles.label}
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
    backgroundColor: theme.colors.popupbg,
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
