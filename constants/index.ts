import { SearchDataProps } from "@types";
import { Dimensions } from "react-native";

export const WINDOW_HEIGHT = Dimensions.get("window").height;
export const WINDOW_WIDTH = Dimensions.get("window").width;

export const SCREEN_HEIGHT = Dimensions.get("screen").height;

export const testData: SearchDataProps[] = [
  {
    id: "1",
    title: "Houses",
    selected: true,
    list: [
      { id: "1", label: "House", selected: false },
      { id: "2", label: "Flat", selected: false },
      { id: "3", label: "Upper Portion", selected: false },
      { id: "4", label: "Lower Portion", selected: false },
      { id: "5", label: "Farm House", selected: false },
      { id: "6", label: "Penthouse", selected: false },
      { id: "7", label: "Room", selected: false },
    ],
  },
  {
    id: "2",
    title: "Plots",
    selected: false,
    list: [
      { id: "1", label: "Residential Plots", selected: false },
      { id: "2", label: "Commercial Plots", selected: false },
      { id: "3", label: "Agricultural lands", selected: false },
      { id: "4", label: "Industrial lands", selected: false },
      { id: "5", label: "Plot File", selected: false },
      { id: "6", label: "Plot Form", selected: false },
    ],
  },
  {
    id: "3",
    title: "Commercial",
    selected: false,

    list: [
      { id: "1", label: "Office", selected: false },
      { id: "2", label: "Ware house", selected: false },
      { id: "3", label: "Building", selected: false },
      { id: "4", label: "Shop", selected: false },
      { id: "5", label: "Other...", selected: false },
    ],
  },
];
