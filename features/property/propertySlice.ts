import { createSlice } from "@reduxjs/toolkit";
import {
  AllPropertiesData,
  PropertyType,
} from "app/(user)/[type]/(tabs)/home/utils";

export interface PropertySliceState {
  allProperties: AllPropertiesData | null;
  propertyTypes: PropertyType[] | null;
  filter: {
    propertyType: string | null;
    purpose: string | null;
  };
}

const initialState: PropertySliceState = {
  allProperties: null,
  propertyTypes: null,
  filter: {
    propertyType: null,
    purpose: null,
  },
};

const propertySlice = createSlice({
  name: "property",
  initialState,
  reducers: {
    setAllProperties: (state, action) => {
      state.allProperties = action.payload;
    },
    setPropertyType: (state, action) => {
      state.propertyTypes = action.payload;
    },
    setFilter: (state, action) => {
      state.filter = {
        ...state?.filter,
        ...action.payload
      };
    },
  },
});

export const { setAllProperties, setPropertyType, setFilter } = propertySlice.actions;

export default propertySlice.reducer;
