// store.js
import { configureStore, createSlice } from '@reduxjs/toolkit';

// collapsiblePanelSlice state handler
const collapsiblePanelSlice = createSlice({
  name: 'collapsiblePanel',
  initialState: {
    isCollapsed: true,
  },
  reducers: {
    toggleCollapse: (state) => {
      state.isCollapsed = !state.isCollapsed;
    },
  },
});


//footer state handler
export const { toggleCollapse } = collapsiblePanelSlice.actions;

const collapsibleFooterSlice = createSlice({
  name: 'collapsibleFooter',
  initialState: {
    isCollapsed: false,
  },
  reducers: {
    footerCollapse: (state, payload) => {
      state.isCollapsed = payload;
    },
  },
});

export const { footerCollapse } = collapsibleFooterSlice.actions;

//login form values

const userLoginSlice = createSlice({
  name: 'userLoginState',
  initialState: {
    data: null,
  },
  reducers: {
    userLoginReducer: (state, payload) => {
      state.data = payload;
    },
  },
});

export const { userLoginReducer } = userLoginSlice.actions;

//user details form
const userDetailsSlice = createSlice({
  name: 'userDetailsState',
  initialState: {
    data: null,
  },
  reducers: {
    userDetailsReducer: (state, payload) => {
      state.data = payload;
    },
  },
});

export const { userDetailsReducer } = userDetailsSlice.actions;

// Create the Redux store
const store = configureStore({
  reducer: {
    collapsiblePanel: collapsiblePanelSlice.reducer,
    collapsibleFooter: collapsibleFooterSlice.reducer,
    userLoginState: userLoginSlice.reducer,
    userDetailsState: userDetailsSlice.reducer,
  },
});

export default store;
