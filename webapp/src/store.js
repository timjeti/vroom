// store.js
import { configureStore, createSlice } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';

// Create a slice for authentication
const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuthenticated: false,
  },
  reducers: {
    setAuthenticated: (state) => {
      state.isAuthenticated = true;
    },
    setUnauthenticated: (state) => {
      state.isAuthenticated = false;
    },
  },
});

export const { setAuthenticated, setUnauthenticated } = authSlice.actions;

const persistConfig = {
  key: 'root', // key for the storage
  storage, // specify the storage method (local storage, etc.)
  whitelist: ['auth'], // specify which slices to persist
};

const persistedReducer = persistReducer(persistConfig, authSlice.reducer);

const store = configureStore({
  reducer: {
    auth: persistedReducer // use the persisted reducer
  },
  middleware: [thunk]
});

export const persistor = persistStore(store);

export default store;
