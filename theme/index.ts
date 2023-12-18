import { DarkTheme as DT, DefaultTheme } from "@react-navigation/native";

const colors = {
  light: {
    primary: "#FB631C",
    secondary: "#136FA9",
    background: "#FFFFFF",
    card: "#f5f6fa",
    text: "#333333",
    border: "#E9E9E9",
    notification: "#FFFFFF", //todo: set later
    popupbg: "#F4F4F4",
    placeholderText: "#969696",
    listText: "#696969",
    positive: "#FFFFFF",
    negative: "#000000",
    cardBorder: "#E4E4E4",
    cardBg: "#ffffff",
    selected: "#EDF7FF",
    dropdownBorder: "#E7E7E7",
  },
  dark: {
    primary: "#FB631C",
    secondary: "#136FA9",
    background: "#101010",
    card: "#1A1B1C",
    text: "#FFFFFF",
    border: "#29292E",
    notification: "#FFFFFF", //todo: set later
    popupbg: "#29292E",
    placeholderText: "#FFFFFF",
    listText: "#696969", //to be updated
    positive: "#000000",
    negative: "#FFFFFF",
    cardBorder: "#29292E",
    cardBg: "#141414",
    selected: "#EDF7FF", //to be updated
    chat: "#333333",
    dropdownBorder: "#29292E",
  },
};

const LightTheme = {
  ...DefaultTheme,
  colors: { ...DefaultTheme.colors, ...colors.light },
};

const DarkTheme = {
  ...DT,
  colors: { ...DT.colors, ...colors.dark },
};

export { colors, LightTheme, DarkTheme };
