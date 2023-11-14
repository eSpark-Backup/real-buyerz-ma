import { Theme } from "@react-navigation/native";
import { ImageStyle, TextStyle, ViewStyle } from "react-native";

export type MyTheme = Theme & { colors: { secondary: string } };

export type MyTextProps = {
  text?: string;
  textColor?: string;
  style?: TextStyle;
  weight?:
    | "normal"
    | "bold"
    | "100"
    | "200"
    | "300"
    | "400"
    | "500"
    | "600"
    | "700"
    | "800"
    | "900";
  size?: number;
};

export type MyInputProps = {
  label?: string;
  placeholder?: string;
  password?: boolean;
  text?: string;
  onChange?: (val: string) => void;
  width?: number | string;
  style?: ViewStyle;
};

export type MyCheckboxProps = {
  label?: string;
  onChange?: (checked: boolean) => void;
  style?: ViewStyle;
  checkboxStyle?: ViewStyle;
  labelStyle?: ViewStyle | TextStyle;
};

export type MyButtonProps = {
  label?: string;
  onPress?: () => void;
  textColor?: string;
  backgroundColor?: string;
  style?: ViewStyle;
  labelStyle?: TextStyle;
};

export type MyIconProps = {
  name?: string | any;
  source?: { uri: string } | number; // Image source
  iconSize?: number;
  iconColor?: string;
  style?: TextStyle | ImageStyle;
};
