import { StyleProp, StyleSheet, Text, View, ViewStyle } from "react-native";
import React from "react";
import MyInput from "components/MyInput";
import MyText from "components/MyText";
import FlagDropDown from "components/MyDropdown/flagDropDown";
import PrimaryBtn from "components/MyButton/primaryBtn";
import MyCheckbox from "components/MyCheckbox";
import { MyTheme } from "@types";
import { useTheme } from "@react-navigation/native";

export enum Variants {
  SINGLE = "single",
  DUAL = "dual",
  SELECT = "select",
  PRIMARY = "primary",
  MULTI_LINE = "multiLine",
  CHECK_BOX = "checkbox",
}
type Iinputs = {
  label?: string;
  placeholder: string;
};
interface IMyField {
  variant: Variants;
  list?: {
    title?: string;
    inputs: Iinputs[];
  };
  onPress?: () => void;
  title?: string;
}

const MyField = ({ variant, list, onPress, title }: IMyField) => {
  const theme = useTheme() as MyTheme;
  return (
    <>
      {variant === "dual" && (
        <View>
          <MyText
            size={14}
            text={list?.title}
            style={styles(theme).titleStyle}
            weight="400"
          />
          <View style={styles(theme).dflex}>
            {list?.inputs.map((input, index) => (
              <View key={index}>
                <MyInput
                  placeholder={input.placeholder}
                  style={styles(theme).dualInputStyle}
                  inputStyle={styles(theme).inputInnerStyle}
                  placeholderColor={theme.colors.placeholderText}
                />
                <MyText
                  size={10}
                  text={input.label}
                  style={styles(theme).labelStyle}
                />
              </View>
            ))}
          </View>
        </View>
      )}
      {variant === "single" && (
        <View>
          <MyText
            size={14}
            text={list?.title}
            style={styles(theme).titleStyle}
          />

          {list?.inputs.map((input, index) => (
            <View key={index}>
              <MyInput
                placeholder={input.placeholder}
                style={styles(theme).singleInputStyle}
                inputStyle={styles(theme).inputInnerStyle}
                placeholderColor={theme.colors.placeholderText}
              />
              {input.label && (
                <MyText
                  size={10}
                  text={input.label}
                  style={styles(theme).labelStyle}
                />
              )}
            </View>
          ))}
        </View>
      )}

      {variant === "select" && (
        <View>
          {list?.title && (
            <MyText
              size={13}
              text={list?.title}
              style={styles(theme).titleStyle}
            />
          )}
          <View style={styles(theme).dflex}>
            <FlagDropDown
              zIndex={8}
              onSelect={(value) => {
                console.log("data", value);
              }}
            />
            <View>
              {list?.inputs.map((input, index) => (
                <View key={index}>
                  <MyInput
                    placeholder={input.placeholder}
                    style={styles(theme).selectInput}
                    inputStyle={styles(theme).inputInnerStyle}
                    placeholderColor={theme.colors.placeholderText}
                  />
                </View>
              ))}
            </View>
          </View>
        </View>
      )}

      {variant === "multiLine" && (
        <View>
          <MyText
            size={14}
            text={list?.title}
            style={styles(theme).titleStyle}
          />
          {list?.inputs.map((input, index) => (
            <View key={index}>
              <MyInput
                multiline={true}
                placeholder={input.placeholder}
                style={styles(theme).multiLineStyle}
                inputStyle={styles(theme).inputInnerStyle}
                placeholderColor={theme.colors.placeholderText}
              />
              {input?.label && (
                <MyText
                  size={10}
                  text={input.label}
                  style={styles(theme).labelStyle}
                />
              )}
            </View>
          ))}
        </View>
      )}
      {variant == "primary" && (
        <View style={{ paddingVertical: 10 }}>
          <PrimaryBtn
            width={100}
            weight="600"
            title={title ? title : ""}
            onPress={onPress}
            btnStyle={{
              paddingVertical: 10,
            }}
          />
        </View>
      )}
      {variant === "checkbox" && (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: 5,
          }}
        >
          <MyCheckbox
            labelStyle={{ fontSize: 12 }}
            label="Update details in all property listings"
            onChange={() => {}}
            style={{
              marginRight: 5,
            }}
            checkboxStyle={{
              width: 20,
              height: 20,
              borderWidth: 1,
              borderColor: "#b5b7b9",
              backgroundColor: theme?.colors.background,
              borderRadius: 4,
              marginRight: 5,
            }}
          />
          <MyText size={12} text="" />
        </View>
      )}
    </>
  );
};

export default MyField;

const styles = (theme?: MyTheme) =>
  StyleSheet.create({
    inputInnerStyle: {
      height: 45,
      padding: 0,
      color: theme?.colors.text,
    },
    dualInputStyle: {
      backgroundColor: theme?.colors.background,
      width: 160,
      height: 35,
      borderColor: theme?.colors.dropdownBorder,
      borderWidth: 1,
      elevation: 0,
      padding: 5,
    },
    singleInputStyle: {
      backgroundColor: theme?.colors.background,
      height: 38,
      borderColor: theme?.colors.dropdownBorder,
      borderWidth: 1,
      elevation: 0,
    },
    multiLineStyle: {
      backgroundColor: theme?.colors.background,
      height: 55,
      borderColor: theme?.colors.dropdownBorder,
      borderWidth: 1,
      elevation: 0,
    },
    titleStyle: {
      marginVertical: 4,
    },
    dflex: {
      flexDirection: "row",
      justifyContent: "space-between",
    },
    labelStyle: {
      marginTop: 5,
      marginStart: 5,
    },
    selectInput: {
      backgroundColor: theme?.colors.background,
      width: 250,
      height: 38,
      borderColor: theme?.colors.dropdownBorder,
      borderWidth: 1,
      elevation: 0,
    },
  });
