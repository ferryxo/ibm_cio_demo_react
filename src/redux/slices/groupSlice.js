import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  groups: [],
  loading: false,
  hasErrors: false,
}

const groupSlice = createSlice({
    name: 'groupSlice',
    initialState,
    reducers: {
      getGroups: state => {
          state.loading = true
      },
      getGroupsSuccess: (state, { payload }) => {
          state.groups = payload
          state.loading = false
          state.hasErrors = false
      },
      getGroupsFailure: state => {
          state.loading = false
          state.hasErrors = true
      },
    }
});

export function fetchGroups(token) {
  return async dispatch => {
    dispatch(getGroups());
    try {      
      const response = await fetch('http://localhost:8081/api/v1/groups',
        {
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token.jwt,
          }
        });
      const data = await response.json();
      dispatch(getGroupsSuccess(data));
    } catch (error) {
      dispatch(getGroupsFailure())
    }
  }
}

// A selector
export const groupSelector = state => {
  return state.groups;
};

// The reducer
export default groupSlice.reducer;

// Three actions generated from the slice
export const { getGroups, getGroupsSuccess, getGroupsFailure } = groupSlice.actions;
