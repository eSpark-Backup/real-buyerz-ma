import { createSlice } from "@reduxjs/toolkit";
import { AllPropertiesData } from "app/(user)/[type]/(tabs)/home/utils";

export interface PropertySliceState {
    allProperties: AllPropertiesData | null
}

const initialState: PropertySliceState = {
    allProperties: null
}

const propertySlice = createSlice({
    name: 'property',
    initialState,
    reducers: {
        setAllProperties: (state, action) => {
            state.allProperties = action.payload
        }
    }
})

export const { setAllProperties } = propertySlice.actions

export default propertySlice.reducer;