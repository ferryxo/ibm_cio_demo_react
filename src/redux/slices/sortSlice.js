import { createSlice } from '@reduxjs/toolkit';

export const sortSlice = createSlice({
    name: 'sort',
    initialState: {
        sortBy: '',
        sortDirection: 1
    },
    reducers: {
        setSortColumn(state, { payload }) {
            state.sortBy = payload.sortBy;
            state.sortDirection = payload.sortDirection;            
        },
    },
});

export const sortSelector = state => state.sort;
  
export const { setSortColumn } = sortSlice.actions
export default sortSlice.reducer;