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
import {
  CloseBtn,
  Confirmation,
  ConfirmationGrey,
  StarDisabled,
  StarEnabled,
} from "@assets/images";
import { MyTheme } from "@types";
import MyAvatar from "components/MyAvatar";
import MyInput from "components/MyInput";

interface MyPopupModalProps {
  successMessage?: boolean;
  verificationModal?: boolean;
  confirmation?: boolean;
  logout?: boolean;
  congratulations?: boolean;
  feedback?: boolean;
  type?: "email" | "phone number";
  value?: string;
  visible?: boolean;
  message?: string;
  avatarUrl?: string;
  onClose?: () => void;
  onPress?: () => void;
  children?: React.ReactNode;
}

const MyPopupModal = ({
  successMessage,
  verificationModal,
  confirmation,
  logout,
  congratulations,
  feedback,
  type,
  message,
  value,
  avatarUrl,
  visible,
  onClose,
  onPress,
  children,
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
            {logout ? <ConfirmationGrey /> : <Confirmation />}

            <MyText text={message} style={{ textAlign: "center" }} />
            <View style={styles(theme).buttonContainer}>
              <MyButton
                label="Cancel"
                style={[
                  styles(theme).actionButton,
                  { elevation: theme.dark ? 0 : 5, backgroundColor: "white" },
                ]}
                onPress={onClose}
              />
              <MyButton
                label="Delete"
                style={[
                  styles(theme).actionButton,
                  {
                    elevation: theme.dark ? 0 : 5,
                    backgroundColor: logout ? "white" : "#FD0D1B",
                  },
                ]}
                labelStyle={{ color: logout ? "#333333" : "white" }}
                onPress={onPress}
              />
            </View>
          </View>
        ) : feedback ? (
          <View style={styles(theme).fbBox}>
            <View
              style={{
                flexDirection: "row",
                gap: 10,
                width: 240,
              }}
            >
              <View style={{ paddingTop: 3 }}>
                <MyAvatar size={32} imageUrl={avatarUrl} />
              </View>
              <View>
                <MyText text={message} size={12} weight="600" />
                <MyText
                  text="Your review will be posted publicly on the web."
                  size={10}
                  style={{ width: "90%" }}
                />
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                gap: 10,
                alignSelf: "flex-start",
                marginLeft: 40,
                marginVertical: 15,
              }}
            >
              <StarEnabled />
              <StarDisabled />
              <StarDisabled />
              <StarDisabled />
              <StarDisabled />
            </View>
            <MyText
              text="Describe your experience."
              size={10}
              textColor={theme.dark ? theme.colors.listText : "#E7E7E7"}
              style={{ alignSelf: "flex-start", marginLeft: 40 }}
            />
            <TextInput
              style={{
                width: 200,
                alignSelf: "flex-start",
                marginLeft: 40,
                borderBottomColor: theme.colors.primary,
                borderBottomWidth: 1,
                marginTop: 25,
              }}
            />
            <View style={{ flexDirection: "row", gap: 11, top: 16, left: 88 }}>
              <MyText
                text="Cancel"
                size={10}
                textColor={theme.colors.primary}
                weight="500"
              />
              <MyText
                text="Post"
                size={10}
                textColor={theme.colors.primary}
                weight="500"
              />
            </View>
          </View>
        ) : (
          <View style={styles(theme).fbBox}>{children}</View>
        )}
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
      backgroundColor: theme?.colors.background,
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
      backgroundColor: "#fff",
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
    actionButton: {
      width: 100,
      height: 28,
      borderRadius: 3,
    },

    cButton: {
      width: 110,
      height: 35,
      marginTop: 4,
    },
    fbBox: {
      width: 285,
      height: 227,
      backgroundColor: theme?.colors.background,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: theme?.colors.border,
      shadowColor: "#00000040",
      elevation: 4,
      shadowOffset: { width: 0, height: 4 },
      alignItems: "center",
      padding: 23,
    },
  });

export default MyPopupModal;
