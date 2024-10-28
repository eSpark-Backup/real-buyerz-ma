import {
  ImageSourcePropType,
  ImageStyle,
  ImageURISource,
  StyleProp,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";
import { Theme } from "@react-navigation/native";
import { PropertyItem } from "app/(user)/[type]/(tabs)/home/utils";

export type MyTheme = Theme & {
  colors: {
    secondary: string;
    popupbg: string;
    placeholderText: string;
    dimText: string;
    listText: string;
    positive: string;
    negative: string;
    cardBorder: string;
    cardBg: string;
    selected: string;
    chat?: string;
    dropdownBorder?: string;
    TabBar: string;
    TabBarText: string;
    verificationBg: string;
    verificationText: string;
    gradient: string;
    inputBg: string;
  };
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
  onPress?: () => void;
};

export type UserType = "anon" | "user" | "agent";

export type MyInputProps = {
  label?: string;
  placeholder?: string;
  password?: boolean;
  text?: string;
  secureTextEntry?: boolean;
  keyboardType?: string;
  editable?: boolean;
  onChange?: (val: string) => void;
  onBlur?: () => void;
  onChangeText?: (value: string) => void;
  onSubmitEditing?: () => void;
  value?: string;
  width?: number | string;
  style?: StyleProp<ViewStyle>;
  placeholderColor?: string;
  inputStyle?: StyleProp<TextStyle>;
  rightIcon?: {
    name: any;
    size?: number;
    color?: string;
  };
  multiline?: boolean;
};

export type MyCheckboxProps = {
  label?: string;
  onChange?: (checked: boolean) => void;
  style?: ViewStyle;
  checkboxStyle?: ViewStyle;
  labelStyle?: ViewStyle | TextStyle | ViewStyle[] | TextStyle[];
  isAuth?: boolean;
};

export type MyButtonProps = {
  label?: string;
  onPress?: () => void;
  textColor?: string;
  backgroundColor?: string;
  style?: ViewStyle | ViewStyle[];
  labelStyle?: TextStyle;
  leftIcon?: React.ReactNode;
  key?: string;
};

export interface IPropsBtn {
  title?: string;
  onPress?: () => void;
  textColor?: string;
  width?: any;
  btnStyle?: ViewStyle | ViewStyle[];
  labelStyle?: TextStyle;
  paddingV?: number;
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
  children?: React.ReactNode;
}

export type LoginModalProps = {
  visible?: boolean;
  onClose: () => void;
  lastRoute: string;
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

export type MyListItemProps = {
  item: PropertyItem;
  index: number;
  theme: MyTheme;
  fav?: boolean;
  onFavClicked?: () => void;
  params?: {
    type: UserType
  }
};

export interface IMyAvatar {
  size: number;
  imageUrl?: ImageSourcePropType;
  edit?: boolean;
  status?: "online" | "offline" | "invisible";
}

export interface DropdownProps {
  zIndex?: number;
  onSelect: (value: string | string[]) => void;
  style?: StyleProp<ViewStyle>;
}

export type PropertyDetailScreenParams = { 
  type: UserType;
  item: string
}
