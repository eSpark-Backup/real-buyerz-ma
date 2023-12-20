import { StyleProp, StyleSheet, Text, View, ViewStyle } from "react-native";
import React from "react";
import MyInput from "components/MyInput";
import MyText from "components/MyText";
import FlagDropDown from "components/MyDropdown/flagDropDown";
import PrimaryBtn from "components/MyButton/primaryBtn";
import MyCheckbox from "components/MyCheckbox";

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
  return (
    <>
      {variant === "dual" && (
        <View>
          <MyText
            size={14}
            text={list?.title}
            style={styles.titleStyle}
            weight="400"
          />
          <View style={styles.dflex}>
            {list?.inputs.map((input, index) => (
              <View key={index}>
                <MyInput
                  placeholder={input.placeholder}
                  style={styles.dualInputStyle}
                  inputStyle={styles.inputInnerStyle}
                />
                <MyText
                  size={10}
                  text={input.label}
                  style={styles.labelStyle}
                />
              </View>
            ))}
          </View>
        </View>
      )}
      {variant === "single" && (
        <View>
          <MyText size={14} text={list?.title} style={styles.titleStyle} />

          {list?.inputs.map((input, index) => (
            <View key={index}>
              <MyInput
                placeholder={input.placeholder}
                style={styles.singleInputStyle}
                inputStyle={styles.inputInnerStyle}
              />
              {input.label && (
                <MyText
                  size={10}
                  text={input.label}
                  style={styles.labelStyle}
                />
              )}
            </View>
          ))}
        </View>
      )}

      {variant === "select" && (
        <View>
          {list?.title && (
            <MyText size={13} text={list?.title} style={styles.titleStyle} />
          )}
          <View style={styles.dflex}>
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
                    style={styles.selectInput}
                    inputStyle={styles.inputInnerStyle}
                  />
                </View>
              ))}
            </View>
          </View>
        </View>
      )}

      {variant === "multiLine" && (
        <View>
          <MyText size={14} text={list?.title} style={styles.titleStyle} />
          {list?.inputs.map((input, index) => (
            <View key={index}>
              <MyInput
                multiline={true}
                placeholder={input.placeholder}
                style={styles.multiLineStyle}
                inputStyle={styles.inputInnerStyle}
              />
              {input?.label && (
                <MyText
                  size={10}
                  text={input.label}
                  style={styles.labelStyle}
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
            textColor="#ffffff"
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
              backgroundColor: "white",
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

const styles = StyleSheet.create({
  inputInnerStyle: {
    height: 45,
    padding: 0,
  },
  dualInputStyle: {
    backgroundColor: "#ffffff",
    width: 160,
    height: 35,
    borderColor: "#E7E7E7",
    borderWidth: 1,
    elevation: 0,
    padding: 5,
  },
  singleInputStyle: {
    backgroundColor: "#ffffff",
    height: 38,
    borderColor: "#E7E7E7",
    borderWidth: 1,
    elevation: 0,
  },
  multiLineStyle: {
    backgroundColor: "#ffffff",
    height: 55,
    borderColor: "#E7E7E7",
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
    backgroundColor: "#ffffff",
    width: 250,
    height: 38,
    borderColor: "#E7E7E7",
    borderWidth: 1,
    elevation: 0,
  },
});
