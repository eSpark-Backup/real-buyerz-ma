import { ImageStyle, StyleProp, TextStyle, ViewStyle } from "react-native";
import { Theme } from "@react-navigation/native";

export type MyTheme = Theme & {
  colors: { secondary: string; popupbg: string; placeholderText: string };
};

export type ThemeTypes = "Default" | "Dark";

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
  onBlur?: () => void;
  onChangeText?: (value: string) => void;
  value?: string;
  width?: number | string;
  style?: any;
  placeholderColor?: string;
  inputStyle?: StyleProp<TextStyle>;
  rightIcon?: {
    name: any;
    size?: number;
    color?: string;
  };
};

export type MyCheckboxProps = {
  label?: string;
  onChange?: (checked: boolean) => void;
  style?: ViewStyle;
  checkboxStyle?: ViewStyle;
  labelStyle?: ViewStyle | TextStyle | ViewStyle[] | TextStyle[];
};

export type MyButtonProps = {
  label?: string;
  onPress?: () => void;
  textColor?: string;
  backgroundColor?: string;
  style?: ViewStyle;
  labelStyle?: TextStyle;
  leftIcon?: React.ReactNode;
};

export type LoginModalProps = {
  visible?: boolean;
  onClose: () => void;
};

export type SearchDataProps = {
  id: string;
  title: string;
  selected: boolean;
  list: SearchListProps[];
};

export type SearchListProps = {
  id: string;
  label: string;
  selected: boolean;
};
export interface MyVerificationModalProps {
  type?: "email" | "phone number";
  value?: string;
  visible?: boolean;
  onClose: () => void;
  onPress: () => void;
}

export interface SuccessMessageModalProps {
  message?: string;
  visible?: boolean;
  onPress: () => void;
}
