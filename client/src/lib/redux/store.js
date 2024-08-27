// store.js
import { configureStore } from '@reduxjs/toolkit';
import parcelsReducer from './parcelSlice'; // Adjust the path as necessary

const store = configureStore({
  reducer: {
    parcels: parcelsReducer,
  },
});

export default store;
