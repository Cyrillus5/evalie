import { combineReducers } from '@reduxjs/toolkit';
import resultsReducer from '../slices/resultsSlice';
import workSelectedReducer from '../slices/selectedWorkSlice';
import navigationReducer from '../slices/navigationSlice';

export default combineReducers({
    results: resultsReducer,
    workSelected: workSelectedReducer,
    navigation: navigationReducer,
});