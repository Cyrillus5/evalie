import { combineReducers } from '@reduxjs/toolkit';
import resultsReducer from '../slices/resultsSlice';
import workSelectedReducer from '../slices/selectedWorkSlice';
import navigationReducer from '../slices/navigationSlice';
import houseTypeSelectedReducer from '../slices/selectedHouseTypeSlice';
import zipCodeSelectedReeucer from '../slices/selectedZipCodeSlice';


export default combineReducers({
    results: resultsReducer,
    workSelected: workSelectedReducer,
    navigation: navigationReducer,
    houseTypeSelected: houseTypeSelectedReducer,
    zipCodeSelected: zipCodeSelectedReeucer,
});