import React, { useState } from "react";
import { ScrollView, View, StyleSheet, TouchableOpacity } from "react-native";
import { Link, useNavigation } from "expo-router";
import { Formik } from "formik";
import { StatusBar } from "expo-status-bar";
import { useTheme } from "@react-navigation/native";

import { MyButton, MyInput, MyText, MyPopupModal, OverlayLoader } from "@components";
import { OnRadioBtn, OffRadioBtn } from "@assets/images";
import { ForgotPasswordSchema, ResetPasswordSchema } from "@validations/schema";
import { MyTheme } from "@types";
import { Back } from "@assets/images/svg";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { showToast } from "@utils/showToast";
import { handlePasswordResetEmail, handleVerifyOTP, ReqVerifyOTP } from "./utils";
import ToastConfig from "app/utils/toastConfig";

type InputType = "email" | "phone number";

export default function ForgotPassword() {
  const { colors, dark } = useTheme() as MyTheme;
  const insets = useSafeAreaInsets();
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [inputType, setInputType] = useState<InputType>("email");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [resetReq, setResetReq] = useState<ReqVerifyOTP>({ emailPhone: "", otp: "", hash: "", password: "" });
  const [emailIsOn, setEmailIsOn] = useState(true);
  const [phoneIsOn, setPhoneIsOn] = useState(false);
  const [isConfirm, setIsConfirm] = useState(false);
  const navigation = useNavigation();

  const toggleModal = () => {
    if (!emailIsOn) {
      showToast("Please select an option", 'error')
      console.log("Please select an option")
      return;
    }
    setIsModalVisible(!isModalVisible);
    sendOtpToEmail()
  };


  const sendOtpToEmail = async () => {
    setLoading(true)
    try {
      let email = inputValue
      const response = await handlePasswordResetEmail({ email });
      setLoading(false)
      if (response.data) {
        showToast("OTP sent, Please check your email", 'success')
        setResetReq((prev) => ({
          ...prev,
          emailPhone: email,
          hash: response.data?.otphash || "",
        }));
        console.log("Reset Req " + JSON.stringify(resetReq))
      }
      console.log(`${JSON.stringify(response)}`)
    } catch (error) {
      setLoading(false)
    }
  };

  const verifyOTP = async (password: String) => {
    setLoading(true)
    try {
      const { emailPhone, otp, hash } = resetReq;
      const response = await handleVerifyOTP({ emailPhone, otp, hash, password });
      setLoading(false)
      if (response.status) {
        showToast("Reset Password successfully", 'success')
        navigation.goBack();
      }
      else if (response.message == "Invalid OTP") {
        showToast("Please enter correct OTP", 'success')
        setIsModalVisible(!isModalVisible);
      }
      else {
        showToast(response.message, 'success')
      }
      console.log(`${JSON.stringify(response)}`)
    } catch (error) {
      setLoading(false)
    }
  };

  const handleConfirm = (otp: string) => {
    setResetReq((prev) => ({
      ...prev,
      otp: otp
    }));
    console.log("Reset Req " + JSON.stringify(resetReq))
    setIsConfirm(true);
    setIsModalVisible(false);
  };
  return (
    <>
      <View
        style={{
          height: insets.top,
          backgroundColor: colors.secondary,
          position: "absolute",
          width: "100%",
          top: -insets.top,
        }}
      />
      <StatusBar backgroundColor={colors.secondary} style="light" />
      <MyPopupModal bgDim visible={isModalVisible}>
        <MyPopupModal.Verify
          onClose={() => { setIsModalVisible(!isModalVisible) }}
          onPress={handleConfirm}
          resendCode={sendOtpToEmail}
          type={emailIsOn ? "email" : "phone number"}
          inputValue={inputValue}
          isAuth
        />
      </MyPopupModal>

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.wrapper}
        contentContainerStyle={{ flex: 1 }}
      >
        <OverlayLoader isShow={loading} />
        <Link href={"/auth/SignIn/signIn"} style={styles.link}>
          <Back />
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
                setResetReq((prev) => ({
                  ...prev,
                  password: values.confirmPassword,
                }));
                verifyOTP(values.password)
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
                  <View style={{ flexDirection: "row" }}>
                    <MyInput
                      placeholder="New password"
                      password
                      width="90%"
                      style={styles.input}
                      onChange={handleChange("password")}
                    />
                  </View>
                  <View style={styles.errorBox}>
                    {touched.password && errors.password ? (
                      <MyText size={10} style={styles.error}>
                        Password must contain at least one uppercase letter, one
                        lowercase letter, and one number
                      </MyText>
                    ) : null}
                  </View>
                  <View style={{ flexDirection: "row" }}>
                    <MyInput
                      placeholder="Confirm new password"
                      password
                      width="90%"
                      style={styles.rst_input}
                      onChange={handleChange("confirmPassword")}
                    />
                  </View>
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
                {/*    <View style={styles.row}>
                  <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => {
                      setPhoneIsOn(!phoneIsOn);
                      setEmailIsOn(!emailIsOn);
                    }}
                  >
                    {phoneIsOn ? <OnRadioBtn /> : <OffRadioBtn />}
                  </TouchableOpacity>

                  <MyText style={styles.plain}>Via text message</MyText>
                </View>
                <MyText style={styles.text}>03*******07</MyText> */}
              </>
              <>
                <View style={styles.row}>
                  <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => {
                      setEmailIsOn(!emailIsOn);
                      setPhoneIsOn(!phoneIsOn);
                    }}
                  >
                    {emailIsOn ? <OnRadioBtn /> : <OffRadioBtn />}
                  </TouchableOpacity>
                  <MyText style={styles.plain}>Via email</MyText>
                </View>
                <MyText style={styles.text}>{inputValue}</MyText>
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
                <MyText textColor="#383838">Enter your email</MyText>
                <View style={{ flexDirection: "row" }}>
                  <MyInput
                    placeholder="Enter an email"
                    width="90%"
                    style={styles.input}
                    onChange={handleChange("input")}
                  />
                </View>
                <View style={styles.errorBox}>
                  {touched.input && errors.input ? (
                    <MyText size={10} style={styles.error}>
                      Enter a valid email
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
        <ToastConfig />
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