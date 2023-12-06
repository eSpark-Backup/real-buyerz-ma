import React, { useState } from "react";
import { ScrollView, View, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { Formik } from "formik";
import ExpoStatusBar from "expo-status-bar/build/ExpoStatusBar";

import { MyButton, MyInput, MyText, MyVerificationModal } from "@components";
import { OnRadioBtn, OffRadioBtn } from "@assets/images/svg";
import { ForgotPasswordSchema, ResetPasswordSchema } from "@validations/schema";

type InputType = "email" | "phone number";

export default function ForgotPassword() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [inputType, setInputType] = useState<InputType>("email");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [emailIsOn, setEmailIsOn] = useState(false);
  const [phoneIsOn, setPhoneIsOn] = useState(true);
  const [isConfirm, setIsConfirm] = useState(false);

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const handleConfirm = () => {
    setIsConfirm(true);
    setIsModalVisible(false);
  };
  return (
    <>
      <ExpoStatusBar backgroundColor="white" />
      {/* there is some space coming in between status bar and scroll view
          needs to be edited
          temporarily adjusted by negative margin */}
      <MyVerificationModal
        visible={isModalVisible}
        onClose={toggleModal}
        type={emailIsOn ? "email" : "phone number"}
        value={inputValue}
        onPress={handleConfirm}
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
          isConfirm ? (
            <Formik
              initialValues={{
                password: "",
                confirmPassword: "",
              }}
              onSubmit={async (values, { resetForm }) => {
                console.log("Validation Success", values);
                setFormSubmitted(true);
              }}
              validationSchema={ResetPasswordSchema.resetForm}
            >
              {({ handleChange, handleSubmit, touched, errors }) => (
                <View style={styles.box}>
                  <MyText size={16} weight="600" style={styles.title}>
                    Reset Password
                  </MyText>
                  <MyText textColor="#383838">
                    Please create a new password
                  </MyText>

                  <MyInput
                    placeholder="New password"
                    password
                    width="90%"
                    style={styles.input}
                    onChange={handleChange("password")}
                  />
                  <View style={styles.errorBox}>
                    {touched.password && errors.password ? (
                      <MyText size={10} style={styles.error}>
                        Password must contain at least one uppercase letter, one
                        lowercase letter, and one number
                      </MyText>
                    ) : null}
                  </View>
                  <MyInput
                    placeholder="Confirm new password"
                    password
                    width="90%"
                    style={styles.rst_input}
                    onChange={handleChange("confirmPassword")}
                  />
                  <View style={styles.errorBox}>
                    {touched.confirmPassword && errors.confirmPassword ? (
                      <MyText size={10} style={styles.error}>
                        Passwords must match
                      </MyText>
                    ) : null}
                  </View>
                  <MyButton
                    label="Continue"
                    style={styles.rst_button}
                    labelStyle={styles.label}
                    onPress={() => {
                      handleSubmit();
                      console.log(errors);
                    }}
                  />
                </View>
              )}
            </Formik>
          ) : (
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
                  <TouchableOpacity
                    onPress={() => {
                      setPhoneIsOn(!phoneIsOn);
                      setEmailIsOn(!emailIsOn);
                    }}
                  >
                    {phoneIsOn ? <OnRadioBtn /> : <OffRadioBtn />}
                  </TouchableOpacity>

                  <MyText style={styles.plain}>Via text message</MyText>
                </View>
                <MyText style={styles.text}>03*******07</MyText>
              </>
              <>
                <View style={styles.row}>
                  <TouchableOpacity
                    onPress={() => {
                      setEmailIsOn(!emailIsOn);
                      setPhoneIsOn(!phoneIsOn);
                    }}
                  >
                    {emailIsOn ? <OnRadioBtn /> : <OffRadioBtn />}
                  </TouchableOpacity>
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
          )
        ) : (
          <Formik
            initialValues={{
              input: "",
              type: "",
            }}
            onSubmit={async (values, { resetForm }) => {
              console.log("Validation Success", values);
              setInputValue(values.input);
              setInputType(
                values.input.includes("@") ? "email" : "phone number"
              );
              setFormSubmitted(true);
            }}
            validationSchema={ForgotPasswordSchema}
          >
            {({
              handleChange,
              handleSubmit,
              setFieldValue,
              touched,
              errors,
              values,
            }) => (
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
                    setFieldValue(
                      "type",
                      (values.input as string).includes("@") ? "email" : "phone"
                    );
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
  rst_input: {
    backgroundColor: "white",
    elevation: 1.5,
  },
  rst_button: {
    width: 110,
    height: 35,
    alignSelf: "center",
    marginTop: "20%",
  },
});
