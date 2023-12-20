import React, { useEffect, useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Modal,
  TouchableOpacity,
} from "react-native";
import { useTheme } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";

import MyText from "../MyText";
import MyButton from "../MyButton";
import { CloseBtn, Confirmation } from "@assets/images";
import { MyTheme } from "@types";

interface MyPopupModalProps {
  successMessage?: boolean;
  verificationModal?: boolean;
  confirmation?: boolean;
  congratulations?: boolean;
  type?: "email" | "phone number";
  value?: string;
  visible?: boolean;
  message?: string;
  onClose?: () => void;
  onPress: () => void;
}

const MyPopupModal = ({
  successMessage,
  verificationModal,
  confirmation,
  congratulations,
  type,
  message,
  value,
  visible,
  onClose,
  onPress,
}: MyPopupModalProps) => {
  const theme = useTheme() as MyTheme;
  return (
    <Modal visible={visible} transparent>
      <View style={styles(theme).popupStyle}>
        {verificationModal ? (
          congratulations ? (
            <View style={[styles(theme).box, { height: 238 }]}>
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginTop: 80,
                  gap: 7,
                }}
              >
                <MyText size={20}>Congratulations</MyText>
                <MyText size={12} textColor={theme.colors.verificationText}>
                  {message}
                </MyText>

                <MyButton
                  label="Continue"
                  labelStyle={styles(theme).label}
                  style={styles(theme).cButton}
                  onPress={onPress}
                />
              </View>
            </View>
          ) : (
            <View style={styles(theme).box}>
              <View style={styles(theme).closebtn}>
                <TouchableOpacity onPress={onClose}>
                  <CloseBtn />
                </TouchableOpacity>
              </View>
              <MyText size={20}>Verification Code</MyText>
              <MyText
                size={12}
                textColor={theme.colors.verificationText}
                style={styles(theme).text}
              >
                Please enter the code we have sent to the {""}
                {type}{" "}
                <MyText size={14} textColor={theme.colors.verificationText}>
                  {type === "email" ? "Du******65@gmail.com" : "03******163"}
                </MyText>
              </MyText>
              <View style={styles(theme).boxes}>
                <BoxInput />
                <BoxInput />
                <BoxInput />
                <BoxInput />
              </View>
              <MyButton
                label="Confirm"
                labelStyle={styles(theme).label}
                style={styles(theme).button}
                onPress={onPress}
              />
              <MyText
                textColor={theme.colors.verificationText}
                size={10}
                style={styles(theme).resendText}
              >
                Resend Code
              </MyText>
            </View>
          )
        ) : successMessage ? (
          <LinearGradient
            start={{ x: 0.5, y: -0.9 }}
            end={{ x: 0.5, y: 0.9 }}
            colors={[theme.colors.gradient, theme.colors.positive]}
            style={styles(theme).box2}
          >
            <MyText
              style={styles(theme).message}
              textColor={theme.colors.negative}
              size={20}
              weight="500"
            >
              {message}
            </MyText>
            <MyButton
              label="OK"
              labelStyle={styles(theme).sLabel}
              style={styles(theme).sButton}
              onPress={onClose}
            />
          </LinearGradient>
        ) : confirmation ? (
          <View style={styles(theme).confirmationBox}>
            <Confirmation />
            <MyText text={message} style={{ textAlign: "center" }} />
            <View style={styles(theme).buttonContainer}>
              <MyButton
                label="Cancel"
                style={[
                  styles(theme).actionButton1,
                  { elevation: theme.dark ? 0 : 5 },
                ]}
                onPress={onClose}
              />
              <MyButton
                label="Delete"
                style={[
                  styles(theme).actionButton2,
                  { elevation: theme.dark ? 0 : 5 },
                ]}
                labelStyle={{ color: "white" }}
                onPress={onPress}
              />
            </View>
          </View>
        ) : null}
      </View>
    </Modal>
  );
};

const BoxInput = () => {
  const [inputValue, setInputValue] = useState(""); //to be used later
  const theme = useTheme() as MyTheme;
  return (
    <View style={styles(theme).container}>
      <TextInput
        placeholder="-"
        placeholderTextColor={"#126FAA"}
        style={styles(theme).input}
        keyboardType="numeric"
        textContentType="oneTimeCode"
        maxLength={1}
      />
    </View>
  );
};

const styles = (theme?: MyTheme) =>
  StyleSheet.create({
    popupStyle: {
      alignItems: "center",
      height: "100%",
      marginTop: "55%",
    },
    box: {
      width: 296,
      height: 290,
      backgroundColor: theme?.colors.verificationBg,
      borderRadius: 15,
      borderWidth: 1,
      borderColor: theme?.colors.border,
      shadowColor: "#00000040",
      elevation: 4,
      shadowOffset: { width: 0, height: 4 },
      alignItems: "center",
      padding: 27,
    },
    closebtn: {
      position: "absolute",
      top: 9,
      left: 265,
    },
    text: {
      paddingVertical: 20,
    },
    boxes: { flexDirection: "row", columnGap: 15, paddingTop: 5 },
    button: {
      width: 110,
      height: 35,
      alignSelf: "center",
      marginTop: 30,
    },
    resendText: {
      paddingVertical: 10,
    },
    label: { color: "white" },
    sLabel: { color: "white", fontSize: 20 },
    container: {
      borderWidth: 1,
      borderColor: "#126FAA",
      borderRadius: 5,
      width: 45,
      height: 45,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#D1EDFF",
      shadowColor: "#00000040",
      shadowOffset: { width: 1, height: 2 },
      elevation: 5,
    },
    input: {
      fontSize: 20,
      textAlign: "center",
      color: "#126FAA",
    },
    message: { textAlign: "center" },
    box2: {
      width: 296,
      height: 250,
      alignItems: "center",
      backgroundColor: theme?.colors.verificationBg,
      borderRadius: 5,
      borderWidth: 1,
      borderColor: theme?.colors.border,
      shadowColor: "#00000040",
      elevation: 4,
      shadowOffset: { width: 0, height: 4 },
      paddingHorizontal: 20,
      paddingTop: 70,
      paddingBottom: 30,
      justifyContent: "space-around",
    },
    button2: {
      width: 100.66,
      height: 38.7,
      alignSelf: "center",
      borderRadius: 10,
      borderColor: "#1176AD",
      borderWidth: 2,
    },
    sButton: {
      width: 105,
      height: 43,
      alignSelf: "center",
      borderRadius: 10,
      borderColor: "#1176AD",
      borderWidth: 2,
    },
    label2: { color: "white", fontSize: 20 },
    confirmationBox: {
      width: 256,
      height: 149,
      backgroundColor: theme?.colors.background,
      borderRadius: 10,
      elevation: 1,
      alignItems: "center",
      padding: 19,
      justifyContent: "space-between",
    },
    buttonContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginTop: 10,
      gap: 10,
    },
    actionButton1: {
      width: 100,
      height: 28,
      borderRadius: 3,
      backgroundColor: "white",
    },
    actionButton2: {
      width: 100,
      height: 28,
      borderRadius: 3,
      backgroundColor: "#FD0D1B",
    },
    cButton: {
      width: 110,
      height: 35,
      marginTop: 4,
    },
  });

export default MyPopupModal;
