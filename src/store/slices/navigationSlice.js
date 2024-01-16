import { createSlice } from '@reduxjs/toolkit';

const initialState = false;

export const navigationSlice = createSlice({
    name: 'navigation',
    initialState,
    reducers: {
        setNavigation: (state, action) => {
            return action.payload;
        },
    },
});

export const { setNavigation } = navigationSlice.actions;

export default navigationSlice.reducer;