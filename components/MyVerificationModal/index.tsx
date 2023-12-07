import React, { useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Modal,
  TouchableOpacity,
} from "react-native";
import MyText from "../MyText";
import MyButton from "../MyButton";

import { CloseBtn } from "@assets/images/svg";
import { MyVerificationModalProps } from "@types";

const MyVerificationModal = ({
  type,
  value,
  visible,
  onClose,
  onPress,
}: MyVerificationModalProps) => {
  return (
    <Modal visible={visible} transparent>
      <View style={styles.popupStyle}>
        <View style={styles.box}>
          <View style={styles.closebtn}>
            <TouchableOpacity onPress={onClose}>
              <CloseBtn />
            </TouchableOpacity>
          </View>
          <MyText size={20}>Verification Code</MyText>
          <MyText size={12} textColor="#666666" style={styles.text}>
            Please enter the code we have sent to the {""}
            {type}{" "}
            <MyText size={14}>
              {type == "email" ? "Du******65@gmail.com" : "03******163"}
            </MyText>
          </MyText>
          <View style={styles.boxes}>
            <BoxInput />
            <BoxInput />
            <BoxInput />
            <BoxInput />
          </View>
          <MyButton
            label="Confirm"
            labelStyle={styles.label}
            style={styles.button}
            onPress={onPress}
          />
          <MyText textColor="#666666" size={10} style={styles.resendText}>
            Resend Code
          </MyText>
        </View>
      </View>
    </Modal>
  );
};

const BoxInput = () => {
  const [inputValue, setInputValue] = useState(""); //to be used later
  return (
    <View style={styles.container}>
      <TextInput
        placeholder="-"
        placeholderTextColor={"#126FAA"}
        style={styles.input}
        keyboardType="numeric"
        textContentType="oneTimeCode"
        maxLength={1}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  popupStyle: {
    alignItems: "center",
    height: "100%",
    marginTop: "55%",
  },
  box: {
    width: 296,
    height: 290,
    backgroundColor: "#EBF7FF",
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#E3E8E3",
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
    paddingVertical: 5,
  },
  label: { color: "white" },
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
});

export default MyVerificationModal;
