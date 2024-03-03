import { createSlice } from '@reduxjs/toolkit';

const initialState = 'Maison';

export const setHouseTypeSelectedSlice = createSlice({
    name: 'houseTypeSelected',
    initialState,
    reducers: {
        setHouseTypeSelected: (state, action) => {
            return action.payload;
        },
    },
});

export const { setHouseTypeSelected } = setHouseTypeSelectedSlice.actions;

export default setHouseTypeSelectedSlice.reducer;