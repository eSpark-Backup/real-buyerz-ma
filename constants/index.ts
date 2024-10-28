import { Dimensions } from "react-native";

import { SearchDataProps } from "@types";

export const WINDOW_HEIGHT = Dimensions.get("window").height;
export const WINDOW_WIDTH = Dimensions.get("window").width;

export const SCREEN_HEIGHT = Dimensions.get("screen").height;

export const testData: SearchDataProps[] = [
  {
    id: "1",
    title: "Houses",
    list: [
      { id: "1", label: "House",  },
      { id: "2", label: "Flat",  },
      { id: "3", label: "Upper Portion",  },
      { id: "4", label: "Lower Portion",  },
      { id: "5", label: "Farm House",  },
      { id: "6", label: "Penthouse",  },
      { id: "7", label: "Room",  },
    ],
  },
  {
    id: "2",
    title: "Plots",
    list: [
      { id: "1", label: "Residential Plots",  },
      { id: "2", label: "Commercial Plots",  },
      { id: "3", label: "Agricultural lands",  },
      { id: "4", label: "Industrial lands",  },
      { id: "5", label: "Plot File",  },
      { id: "6", label: "Plot Form",  },
    ],
  },
  {
    id: "3",
    title: "Commercial",
    list: [
      { id: "1", label: "Office",  },
      { id: "2", label: "Ware house",  },
      { id: "3", label: "Building",  },
      { id: "4", label: "Shop",  },
      { id: "5", label: "Other...",  },
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


export const dummyImage = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR56IbLaMQyafnD6P0AnEdKTBEmob1H_-bLdw&s' 
