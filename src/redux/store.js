import { configureStore } from '@reduxjs/toolkit';
import groupReducer from './slices/groupSlice';
import colorReducer from './slices/colorSlice';
import filterReducer from './slices/filterSlice';
import sortReducer from './slices/sortSlice';

const store = configureStore({
    reducer: {
        groups: groupReducer,
        colors: colorReducer,
        filter: filterReducer,
        sort: sortReducer
   }
});

export default store;