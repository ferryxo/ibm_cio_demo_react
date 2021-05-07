import { createSlice } from '@reduxjs/toolkit';

export const filterSlice = createSlice({
    name: 'filter',
    initialState: {
        pattern: ''
    },
    reducers: {        
        setFilter(state, { payload }) {            
            state.pattern = payload;
        },
    },
});

export const filterSelector = state => state.filter;
  
export const { setFilter } = filterSlice.actions
export default filterSlice.reducer;