import { createSlice } from "@reduxjs/toolkit";
import {
  AllPropertiesData,
  IAmenity,
  PropertyType,
} from "app/(user)/[type]/(tabs)/home/utils";

export interface PropertySliceState {
  allProperties: AllPropertiesData | null;
  propertyTypes: PropertyType[] | null;
  filter: {
    propertyType: string | null;
    purpose: string | null;
    price1: string | null;
    price2: string | null;
    area1: string | null;
    area2: string | null;
    propertyCity:string | null;
    location:string | null
  };
  search: {
    propertyType: string | null;
    propertySubType: string | null;
    propertyCity: string | null;
    purpose: string | null;
    propertyName: string | null;
  };
  amenities: IAmenity[]
}

const initialState: PropertySliceState = {
  allProperties: null,
  propertyTypes: null,
  filter: {
    propertyType: null,
    purpose: null,
    price1: null,
    price2: null,
    area1: null,
    area2: null,
    propertyCity: null,
    location: null
  },
  search: {
    propertyType: null,
    propertySubType: null,
    propertyCity: null,
    propertyName: null
  },
  amenities: []
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
    setSearch: (state, action) => {
      state.search = {
        ...state?.search,
        ...action.payload
      };
    },
    setAmenities: (state, action) => {
      state.amenities = action.payload;
    },
  },
});

export const { setAllProperties, setPropertyType, setFilter, setSearch, setAmenities } =
  propertySlice.actions;

export default propertySlice.reducer;
