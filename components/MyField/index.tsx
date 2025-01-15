import { StyleProp, StyleSheet, Text, View, ViewStyle } from "react-native";
import React, { memo } from "react";
import MyInput from "components/MyInput";
import MyText from "components/MyText";
import FlagDropDown from "components/MyDropdown/flagDropDown";
import PrimaryBtn from "components/MyButton/primaryBtn";
import MyCheckbox from "components/MyCheckbox";
import { MyTheme } from "@types";
import { useTheme } from "@react-navigation/native";
import GapView from "@components/GapView";
import MyDropdown from "@components/MyDropdown";

export enum Variants {
  SINGLE = "single",
  DUAL = "dual",
  PASSWORD = "password",
  SELECT = "select",
  SELECTOR = "selector",
  PRIMARY = "primary",
  MULTI_LINE = "multiLine",
  CHECK_BOX = "checkbox",
}

type Iinputs = {
  id: string
  label?: string;
  placeholder: string;
  value: string;
  onChangeText?: (text: string) => void;
  editable?: boolean;
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

const pakistaniCities: string[] = [
  "Karachi",
  "Lahore",
  "Islamabad",
  "Rawalpindi",
  "Faisalabad",
  "Multan",
  "Peshawar",
  "Quetta",
  "Sialkot",
  "Gujranwala",
  "Hyderabad",
  "Abbottabad",
  "Sargodha",
  "Bahawalpur",
  "Sukkur"
];

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
              <View style={{ flex: 1 }} key={index}>
                <View style={{ flexDirection: "row" }}>
                  <MyInput
                    placeholder={input.placeholder}
                    style={styles(theme).dualInputStyle}
                    inputStyle={styles(theme).inputInnerStyle}
                    placeholderColor={theme.colors.placeholderText}
                    text={input.value}
                    onChange={input.onChangeText}
                    editable={input.editable ?? true}
                  />
                  {index < list?.inputs.length - 1 && (
                    <GapView length={10} mode="horizontal" />
                  )}
                </View>
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
                text={input.value}
                onChange={input.onChangeText}
                editable={input.editable ?? true}
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
      {variant === "password" && (
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
                password
                text={input.value}
                onChange={input.onChangeText}
                editable={input.editable ?? true}
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
            <View style={{ width: "79%" }}>
              {list?.inputs.map((input, index) => (
                <View key={index} style={{ width: "100%" }}>
                  <MyInput
                    placeholder={input.placeholder}
                    style={styles(theme).selectInput}
                    inputStyle={styles(theme).inputInnerStyle}
                    placeholderColor={theme.colors.placeholderText}
                    text={input.value}
                    onChange={input.onChangeText}
                    editable={input.editable ?? true}
                  />
                </View>
              ))}
            </View>
          </View>
        </View>
      )}

      {variant === "selector" && (
        <View style={styles(theme).dropdownWrapper}>
          {list?.title && (
            <MyText
              size={13}
              text={list?.title}
              style={styles(theme).titleStyle}
            />
          )}
          {list?.inputs.map((input, index) => (
            <View key={index} style={styles(theme).dropdownContainer}>
              <MyDropdown
                id={input.id}
                data={pakistaniCities}
                onSelect={(val) => {
                  if (typeof val.value === 'string') {
                    input.onChangeText?.(val.value);
                  } else if (Array.isArray(val.value)) {
                    input.onChangeText?.(val.value.join(', '));
                  }
                }}
                selected={[input.value]}
                placeholder="Select city"
                height={40}
                zIndex={4 - index}
                style={{ width: "100%" }}
                theme={theme}
              />
            </View>
          ))}
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
                text={input.value}
                onChange={input.onChangeText}
                editable={input.editable ?? true}
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
            onChange={() => { }}
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

export default memo(MyField);

const styles = (theme?: MyTheme) =>
  StyleSheet.create({
    inputInnerStyle: {
      color: theme?.colors.text,
    },
    dualInputStyle: {
      backgroundColor: theme?.colors.background,
      flex: 1,
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
      zIndex: 8,
      flexDirection: "row",
      justifyContent: "space-between",
    },
    labelStyle: {
      marginTop: 5,
      marginStart: 5,
    },
    dropdownWrapper: {
      position: 'relative',
      zIndex: 1000,
      width: '100%',
    },
    dropdownContainer: {
      position: 'relative',
      width: '100%',
      zIndex: 1000,
    },
    selectInput: {
      backgroundColor: theme?.colors.background,
      height: 38,
      borderColor: theme?.colors.dropdownBorder,
      borderWidth: 1,
      elevation: 0,
    },
  });