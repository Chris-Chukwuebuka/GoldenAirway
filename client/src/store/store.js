// store.js
import { configureStore } from '@reduxjs/toolkit';
import parcelsReducer from '../lib/redux/parcelSlice'; // Adjust the path as necessary

const store = configureStore({
  reducer: {
    parcels: parcelsReducer,
  },
});

export default store;
