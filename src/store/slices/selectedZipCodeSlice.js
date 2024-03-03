import { createSlice } from '@reduxjs/toolkit';

const initialState = '';

export const selectedZipCodeSlice = createSlice({
    name: 'zipCodeSelected',
    initialState,
    reducers: {
        setSelectedZipCode: (state, action) => {
            return action.payload;
        },
    },
});

export const { setSelectedZipCode } = selectedZipCodeSlice.actions;

export default selectedZipCodeSlice.reducer;