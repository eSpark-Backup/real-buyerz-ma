import React, { useEffect, useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Modal,
  TouchableOpacity,
  ImageSourcePropType,
} from "react-native";
import { useTheme } from "@react-navigation/native";

import MyText from "@components/MyText";
import MyButton from "@components/MyButton";
import {
  CloseBtn,
  Confirmation,
  StarDisabled,
  StarEnabled,
  AddImage,
} from "@assets/images";
import { MyTheme } from "@types";
import MyAvatar from "components/MyAvatar";
import MyInput from "components/MyInput";
import GapView from "@components/GapView";

interface MyPopupModalProps {
  bgDim?: boolean;
  visible?: boolean;
  children?: React.ReactNode;
}

export default function MyPopupModal({
  bgDim,
  visible,
  children,
}: MyPopupModalProps) {
  const theme = useTheme() as MyTheme;

  return (
    <Modal visible={visible} transparent>
      <View
        style={[
          styles(theme).popupStyle,
          { backgroundColor: bgDim ? "#00000088" : "transparent" },
        ]}
      >
        {children}
      </View>
    </Modal>
  );
}

function Custom({ children }: { children: React.ReactNode }) {
  const theme = useTheme() as MyTheme;
  <View style={styles(theme).fbBox}>{children}</View>;
}

function Success({ message, onPress }: { message: string; onPress(): void }) {
  const theme = useTheme() as MyTheme;
  return (
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
  );
}

function Verify({
  type,
  onClose,
  onPress,
}: {
  type?: "email" | "phone number";
  onClose(): void;
  onPress(): void;
}) {
  const theme = useTheme() as MyTheme;
  return (
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
  );
}

function Alert({
  message,
  onClose,
  onPress,
  confirmLabel = "Yes",
}: {
  confirmLabel?: string;
  message: string;
  onClose(): void;
  onPress(): void;
}) {
  const theme = useTheme() as MyTheme;
  return (
    <View style={styles(theme).confirmationBox}>
      <Confirmation />
      <MyText text={message} style={{ textAlign: "center" }} />
      <View style={styles(theme).buttonContainer}>
        <MyButton
          label="Cancel"
          style={[
            styles(theme).actionButton,
            { elevation: theme.dark ? 0 : 5, backgroundColor: "white" },
          ]}
          textColor="#000000"
          onPress={onClose}
        />
        <MyButton
          label={confirmLabel}
          style={[
            styles(theme).actionButton,
            {
              elevation: theme.dark ? 0 : 5,
              backgroundColor: "#FD0D1B",
            },
          ]}
          labelStyle={{ color: "white" }}
          onPress={onPress}
        />
      </View>
    </View>
  );
}

function Feedback({
  message,
  avatarUrl,
}: {
  message: string;
  avatarUrl?: ImageSourcePropType;
}) {
  const theme = useTheme() as MyTheme;
  return (
    <View style={styles(theme).fbBox}>
      <View
        style={{
          flexDirection: "row",
          gap: 10,
          width: 240,
        }}
      >
        <View style={{ paddingTop: 3 }}>
          <MyAvatar
            size={32}
            imageUrl={avatarUrl ?? require("@assets/icon.png")}
          />
        </View>
        <View>
          <MyText
            text={message}
            size={12}
            weight="600"
            textColor={theme.colors.negative}
          />
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
      <MyInput
        style={styles(theme).fbInput}
        inputStyle={styles(theme).fbInputText}
        placeholder="Describe your experience."
        placeholderColor={theme.dark ? theme.colors.listText : "#E7E7E7"}
      />
      <TouchableOpacity style={styles(theme).cameraIcon}>
        <AddImage />
      </TouchableOpacity>
      <View style={{ flexDirection: "row", gap: 11, top: 5, left: 88 }}>
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
  );
}

function OrderSummary({
  items,
  total,
  onPress,
}: {
  items: { name: string; qty: string; amount: string }[];
  total: string;
  onPress(): void;
}) {
  const theme = useTheme() as MyTheme;

  const renderItem = (
    item: { name: string; qty: string; amount: string },
    index: number
  ) => {
    return (
      <View
        key={index}
        style={{
          borderTopWidth: 1,
          borderBottomWidth: 1,
          borderColor: theme.colors.secondary + "30",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingVertical: 15,
        }}
      >
        <View style={{ flexDirection: "row" }}>
          <MyText text={item.name} size={12} weight="500" />
          <GapView mode="horizontal" length={5} />
          <MyText
            text={`(${item.qty}x)`}
            size={10}
            weight="500"
            style={{ textAlignVertical: "center" }}
          />
        </View>
        <MyText text={"Rs " + item.amount} size={10} />
      </View>
    );
  };

  return (
    <View style={[styles(theme).orderSummaryBox]}>
      <MyText
        text="Order Summary"
        weight="700"
        size={16}
        style={{ marginBottom: 15, alignSelf: "center" }}
      />

      {items.map((item, index) => renderItem(item, index))}
      <View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingVertical: 12,
          }}
        >
          <MyText text="Total:" weight="700" size={12} />
          <MyText
            text={"Rs " + total}
            textColor={theme.colors.secondary}
            weight="600"
            size={12}
          />
        </View>
        <MyButton
          label={"Proceed to Payment"}
          style={{
            borderRadius: 5.73,
            width: "100%",
            marginTop: 5,
            paddingVertical: 10,
            backgroundColor: theme.colors.primary,
          }}
          labelStyle={{
            color: "white",
            fontWeight: "700",
            fontSize: 14,
            textAlign: "center",
          }}
          onPress={onPress}
        />
      </View>
    </View>
  );
}

MyPopupModal.Custom = Custom;
MyPopupModal.Success = Success;
MyPopupModal.Verify = Verify;
MyPopupModal.Alert = Alert;
MyPopupModal.Feedback = Feedback;
MyPopupModal.OrderSummary = OrderSummary;

/**
 * For the verification Code Input (Otp)
 * @returns JSX.Element
 */
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
      justifyContent: "center",
      height: "100%",
    },
    orderSummaryBox: {
      width: 290,
      height: 190,
      backgroundColor: theme?.colors.background,
      borderRadius: 5,
      padding: 15,
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
    sLabel: { color: "white", fontSize: 12 },
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
      width: 256,
      height: 149,
      alignItems: "center",
      backgroundColor: theme?.colors.background,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: theme?.colors.border,
      shadowColor: "#00000040",
      elevation: 4,
      shadowOffset: { width: 0, height: 4 },
      marginTop: 30,
      paddingVertical: 18,
      paddingHorizontal: 10,
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
      width: 100,
      height: 28,
      alignSelf: "center",
      borderRadius: 3.13,
      borderColor: "#1176AD",
      borderWidth: 2,
      marginTop: 10,
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
      paddingVertical: 20,
      paddingHorizontal: 23,
    },
    fbInput: {
      width: 200,
      alignSelf: "flex-start",
      marginLeft: 40,
      borderBottomColor: theme?.colors.primary,
      borderBottomWidth: 1,
      backgroundColor: "transparent",
      elevation: 0,
    },
    fbInputText: {
      fontSize: 10,
      textAlign: "left",
      padding: 0,
      marginLeft: -6,
    },
    cameraIcon: {
      width: 47,
      height: 38,
      backgroundColor: theme?.dark ? theme.colors.background : "#F9F9F9",
      alignItems: "center",
      justifyContent: "center",
      borderWidth: 1,
      borderColor: theme?.dark ? theme.colors.border : "#EDECED",
      borderRadius: 2,
      alignSelf: "flex-start",
      marginLeft: 42,
      marginTop: 15,
    },
  });
