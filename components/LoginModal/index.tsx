import React, { useState } from "react";
import Modal from "react-native-modal";

import { LoginModalProps } from "../../types";
import { TouchableOpacity, View } from "react-native";
import MyText from "../MyText";
import { PLogo } from "../../assets/images/svg";

function LoginModal({ visible, onClose }: LoginModalProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <Modal
      isVisible={visible}
      backdropColor="transparent"
      onBackdropPress={onClose}
      animationIn={"slideInUp"}
      animationOut={"slideOutDown"}
      style={{
        // flex: 1,
        // justifyContent: "center",
        // alignItems: "center",
        // backgroundColor: "pink",
        margin: 0,
        padding: 0,
      }}
    >
      <View style={{ height: "80%", backgroundColor: "grey", margin: 0 }}>
        <PLogo />
      </View>
    </Modal>
  );
}

export default LoginModal;
