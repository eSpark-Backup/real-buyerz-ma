import { Dimensions } from "react-native";

import { SearchDataProps } from "@types";

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

interface ListData {
  iconIndex: number;
  title: string;
}

export const data: ListData[] = [
  { iconIndex: 0, title: "Swimming pool" },
  {
    iconIndex: 1,
    title: "Fitness center",
  },
  {
    iconIndex: 2,
    title: "Clubhouse",
  },
  {
    iconIndex: 3,
    title: "Playground",
  },
  {
    iconIndex: 4,
    title: "Basketball courts",
  },
  {
    iconIndex: 5,
    title: "Walking trails",
  },
  {
    iconIndex: 6,
    title: "Pet-friendly facilities",
  },
  {
    iconIndex: 7,
    title: "24/7 security",
  },
  {
    iconIndex: 8,
    title: "Concierge services",
  },
  {
    iconIndex: 9,
    title: "Business centre",
  },
  {
    iconIndex: 10,
    title: "Rooftop terrace",
  },
  {
    iconIndex: 11,
    title: " On-site maintenance",
  },
  {
    iconIndex: 12,
    title: "Washing area",
  },
  {
    iconIndex: 13,
    title: "Hour Electricity",
  },
  {
    iconIndex: 14,
    title: "Auto Generator",
  },
  {
    iconIndex: 15,
    title: "Complete Boundary Wall",
  },
  {
    iconIndex: 16,
    title: "Huge Park",
  },
  {
    iconIndex: 17,
    title: "Masjid",
  },
  {
    iconIndex: 18,
    title: "Corridor",
  },
  {
    iconIndex: 19,
    title: "R.O Plant",
  },
  {
    iconIndex: 20,
    title: "Servant Area",
  },
  {
    iconIndex: 21,
    title: "Senior citizen area",
  },
  {
    iconIndex: 22,
    title: "Utility Store",
  },
];
