import React, { useState } from "react";
import Modal from "react-native-modal";
import {
  TouchableOpacity,
  View,
  StyleSheet,
  Appearance,
  ViewStyle,
} from "react-native";

import { LoginModalProps } from "../../types";
import { MyButton, MyCheckbox, MyInput, MyText } from "../index";
import { GLogo, PLogo } from "../../assets";
import { DarkTheme, LightTheme } from "../../theme";
import { Link } from "expo-router";

const colorScheme = Appearance.getColorScheme();
const theme = colorScheme === "dark" ? DarkTheme : LightTheme;

function LoginModal({ visible, onClose }: LoginModalProps) {
  const popupStyle: ViewStyle = {
    backgroundColor: theme.colors.popupbg,
    alignItems: "center",
    height: "100%",
    marginTop: "55%",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: "9%",
    paddingVertical: "6%",
  };
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <Modal
      isVisible={visible}
      backdropColor="transparent"
      onBackdropPress={onClose}
      animationIn={"slideInUp"}
      animationOut={"slideOutDown"}
      style={styles.modal}
    >
      <View style={popupStyle}>
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
          style={{
            width: "100%",
            textAlign: "right",
            marginTop: "4%",
            marginBottom: "6%",
          }}
        />
        <MyInput placeholder="Password" />
        <View
          style={{
            flexDirection: "row",
            width: "100%",
            marginTop: "2%",
            marginBottom: "6%",
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
            labelStyle={{ color: "#333333", fontSize: 14 }}
          />
          <MyText
            text="Forgot Password?"
            textColor="#2e6fac"
            size={14}
            style={{ width: "50%", textAlign: "right", marginTop: 5 }}
          />
        </View>
        <MyButton
          label="Log In"
          textColor="white"
          style={{
            width: 110,
            alignItems: "center",
            height: 35,
            justifyContent: "center",
            alignContent: "center",
            marginTop: "7%",
          }}
        />
        <MyText
          text="Or"
          size={14}
          weight="600"
          textColor={theme.colors.text}
          style={{ marginVertical: "4%" }}
        />
        <View style={{ flexDirection: "row", alignItems: "center" }}>
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
            // justifyContent: "center",
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
    // padding: "5%",
  },
});

export default LoginModal;

// const colors = {
//   light: {
//     primary: "#FB631C",
//     secondary: "#136FA9",
//     background: "#FFFFFF",
//     card: "#f5f6fa",
//     text: "#333333",
//     border: "#E9E9E9",
//     notification: "#FFFFFF", //todo: set later
//   },
//   dark: {
//     primary: "#FB631C",
//     secondary: "#136FA9",
//     background: "#101010",
//     card: "#1A1B1C",
//     text: "#FFFFFF",
//     border: "#29292E",
//     notification: "#FFFFFF", //todo: set later
//   },
// };
