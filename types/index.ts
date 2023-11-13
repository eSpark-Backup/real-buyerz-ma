import { Theme } from "@react-navigation/native";
import { TextStyle } from "react-native";

export type MyTheme = Theme & { colors: { secondary: string } };

export type MyTextProps = {
    text?: string;
    textColor?: string;
    style?: TextStyle;
    weight?: "normal" | "bold" | "100" | "200" | "300" | "400" | "500" | "600" | "700" | "800" | "900";
    size?: number;
}

export type MyInputProps = {
    label?: string;
    placeholder?: string;
    password?: boolean;
    text?: string;
    onChange?: (val: string) => void;
  };
  