import { createSlice } from '@reduxjs/toolkit';

const initialState = 'Audit énergétique';

export const selectedWorkSlice = createSlice({
    name: 'workSelected',
    initialState,
    reducers: {
        setSelectedWork: (state, action) => {
            return action.payload;
        },
    },
});

export const { setSelectedWork } = selectedWorkSlice.actions;

export default selectedWorkSlice.reducer;