import React, { useState } from "react";
import { ScrollView, View, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { Formik } from "formik";
import ExpoStatusBar from "expo-status-bar/build/ExpoStatusBar";

import { MyButton, MyInput, MyText, MyVerificationModal } from "@components";
import { OnRadioBtn, OffRadioBtn } from "@assets/images/svg";
import { ForgorPasswordSchema } from "@validations/schema";

type InputType = "email" | "phone number";

export default function ForgotPassword() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [inputType, setInputType] = useState<InputType>("email");
  const [isModalVisible, setIsModalVisible] = useState(false);

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  return (
    <>
      {/* there is some space coming in between status bar and scroll view
          needs to be edited
          temporarily adjusted by negative margin */}
      <ExpoStatusBar backgroundColor="white" />
      <MyVerificationModal
        visible={isModalVisible}
        onClose={toggleModal}
        type={inputType}
        value={inputValue}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.wrapper}
        contentContainerStyle={{ flex: 1 }}
      >
        <Link href={"/auth/signIn"} style={styles.link}>
          <MaterialIcons name="arrow-back" size={20} color="#136FA9" />
        </Link>

        {formSubmitted ? (
          <View style={styles.box}>
            <MyText size={16} weight="600" style={styles.title}>
              Verify Identity
            </MyText>
            <MyText style={[styles.title, { color: "#666666" }]}>
              We’ll send you a verification code to confirm your identity. How
              should we reach you?
            </MyText>
            <>
              <View style={styles.row}>
                <OnRadioBtn />
                <MyText style={styles.plain}>Via text message</MyText>
              </View>
              <MyText style={styles.text}>03*******07</MyText>
            </>
            <>
              <View style={styles.row}>
                <OffRadioBtn />
                <MyText style={styles.plain}>Via email</MyText>
              </View>
              <MyText style={styles.text}>Du******65@gmail.com</MyText>
            </>
            <MyButton
              label="Send Code"
              style={styles.sendButton}
              labelStyle={styles.label}
              onPress={toggleModal}
            />
          </View>
        ) : (
          <Formik
            initialValues={{
              input: "",
            }}
            onSubmit={async (values, { resetForm }) => {
              console.log("Validation Success", values);
              setInputValue(values.input);
              setInputType(
                values.input.includes("@") ? "email" : "phone number"
              );
              setFormSubmitted(true);
            }}
            validationSchema={ForgorPasswordSchema.ForgotPasswordForm}
          >
            {({ handleChange, handleSubmit, touched, errors, values }) => (
              <View style={styles.box}>
                <MyText size={16} weight="600" style={styles.title}>
                  Forgot Password
                </MyText>
                <MyText textColor="#383838">Enter email or phone number</MyText>

                <MyInput
                  placeholder="Email or Phone number"
                  width="90%"
                  style={styles.input}
                  onChange={handleChange("input")}
                />
                <View style={styles.errorBox}>
                  {touched.input && errors.input ? (
                    <MyText size={10} style={styles.error}>
                      Enter a valid email or phone number
                    </MyText>
                  ) : null}
                </View>
                <MyButton
                  label="Continue"
                  style={styles.button}
                  labelStyle={styles.label}
                  onPress={() => {
                    handleSubmit();
                  }}
                />
              </View>
            )}
          </Formik>
        )}
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: "white",
    marginTop: -5,
  },
  link: { top: "2%", left: 21 },
  label: { color: "white" },
  box: {
    width: "76%",
    height: 600,
    alignSelf: "center",
    marginTop: "20%",
    // backgroundColor: "pink",
  },
  title: {
    marginBottom: "5%",
    textAlign: "center",
    color: "#333333",
  },
  input: {
    marginTop: "3%",
    backgroundColor: "white",
    elevation: 1.5,
  },
  errorBox: {
    height: 30,
    paddingTop: 5,
  },
  error: {
    color: "red",
  },
  button: {
    width: 110,
    height: 35,
    alignSelf: "center",
  },
  row: {
    flexDirection: "row",
    columnGap: 8,
    marginTop: 20,
  },
  text: {
    color: "#333333",
    marginLeft: 29,
    marginTop: 0,
  },
  sendButton: {
    width: 110,
    height: 35,
    alignSelf: "center",
    marginTop: "14%",
  },
  plain: { color: "#666666" },
});
