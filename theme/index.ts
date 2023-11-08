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
  },
  dark: {
    primary: "#FB631C",
    secondary: "#136FA9",
    background: "#101010",
    card: "#1A1B1C",
    text: "#FFFFFF",
    border: "#29292E",
    notification: "#FFFFFF", //todo: set later
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
