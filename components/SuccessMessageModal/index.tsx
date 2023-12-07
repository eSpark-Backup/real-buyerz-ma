import React from "react";
import { View, StyleSheet, Modal } from "react-native";
import MyText from "../MyText";
import MyButton from "../MyButton";
import { LinearGradient } from "expo-linear-gradient";

import { SuccessMessageModalProps } from "@types";

const SuccessMessageModal = ({
  message,
  visible,
  onPress,
}: SuccessMessageModalProps) => {
  return (
    <Modal visible={visible} transparent>
      <View style={styles.popupStyle}>
        <LinearGradient colors={["#38B2FF", "#FFFFFF"]} style={styles.box}>
          <MyText style={styles.message} size={20} weight="500">
            {message}
          </MyText>
          <MyButton
            label="OK"
            labelStyle={styles.label}
            style={styles.button}
            onPress={onPress}
          />
        </LinearGradient>
      </View>
    </Modal>
  );
};

export default SuccessMessageModal;

const styles = StyleSheet.create({
  popupStyle: {
    alignItems: "center",
    height: "100%",
    marginTop: "55%",
  },
  box: {
    width: 296,
    height: 250,
    alignItems: "center",
    backgroundColor: "#EBF7FF",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#E3E8E3",
    shadowColor: "#00000040",
    elevation: 4,
    shadowOffset: { width: 0, height: 4 },
    paddingHorizontal: 20,
    paddingTop: 70,
    paddingBottom: 30,
    justifyContent: "space-around",
  },
  message: { textAlign: "center" },
  button: {
    width: 100.66,
    height: 38.7,
    alignSelf: "center",
    borderRadius: 10,
    borderColor: "#1176AD",
    borderWidth: 2,
  },

  label: { color: "white", fontSize: 20 },
});
