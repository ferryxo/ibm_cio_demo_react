
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  groups: [],
  loading: false,
  hasErrors: false,
}

const colorSlice = createSlice({
    name: 'colorSlice',
    initialState,
    reducers: {
      getColors: state => {
          state.loading = true
      },
      getColorsSuccess: (state, { payload }) => {
          state.colors = payload
          state.loading = false
          state.hasErrors = false
      },
      getColorsFailure: state => {
          state.loading = false
          state.hasErrors = true
      },
    }
});


export function fetchColors() {
  return async dispatch => {
    dispatch(getColors());
    try {      
      const response = await fetch('http://localhost:8081/api/v1/colors',
        {
          mode: 'cors'          
        });
      const data = await response.json();
      dispatch(getColorsSuccess(data));
    } catch (error) {
      dispatch(getColorsFailure())
    }
  }
}


// A selector
export const colorSelector = state => {
  return state.colors;
};

// The reducer
export default colorSlice.reducer;

// Three actions generated from the slice
export const { getColors, getColorsSuccess, getColorsFailure } = colorSlice.actions;