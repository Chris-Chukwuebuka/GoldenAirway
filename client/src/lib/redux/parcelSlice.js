import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from '../apis/api'; // Adjust the path as necessary

const initialState = {
  parcels: [],
  status: "idle",
  error: null,
};

export const fetchParcels = createAsyncThunk('parcels/fetch', async () => {
  const response = await fetch('/api/parcels');
  return response.json();
});

export const createParcel = createAsyncThunk(
  "parcels/createParcel",
  async (parcelData) => {
    const response = await api.post("/admin/parcels", parcelData);
    return response.data;
  }
);

export const updateParcel = createAsyncThunk(
  "parcels/updateParcel",
  async ({ _id, updateData }) => {
    const response = await api.put(`/admin/parcels/${_id}`, updateData);
    return response.data;
  }
);



const parcelsSlice = createSlice({
  name: "parcels",
  initialState,
  reducers: {}, // We don't need any synchronous reducers in this case
  extraReducers: (builder) => {
    builder
      .addCase(fetchParcels.pending, (state) => {
        state.status = "loading";
        state.error = null; // Clear any previous errors
      })
      .addCase(fetchParcels.fulfilled, (state, action) => {
        state.status = "idle";
        state.parcels = action.payload;
      })
      .addCase(fetchParcels.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message; // Capture the error message
      })
      .addCase(createParcel.pending, (state) => {
        state.status = "loading"; // Indicate create operation is ongoing
      })
      .addCase(createParcel.fulfilled, (state, action) => {
        state.status = "idle";
        state.parcels.push(action.payload);
      })
      .addCase(createParcel.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message; // Capture the error message
      })
      .addCase(updateParcel.pending, (state) => {
        state.status = "loading"; // Indicate update operation is ongoing
      })
      .addCase(updateParcel.fulfilled, (state, action) => {
        state.status = "idle";
        const index = state.parcels.findIndex((parcel) => parcel._id === action.payload._id);
        if (index !== -1) {
          state.parcels[index] = action.payload;
        }
      })
      .addCase(updateParcel.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message; // Capture the error message
      })
      .addCase(fetchParcelById.pending, (state) => {
        state.status = "loading"; // Indicate fetching a specific parcel
        state.error = null; // Clear any previous errors
      })
      .addCase(fetchParcelById.fulfilled, (state, action) => {
        state.status = "idle";
        // You can choose how to handle the fetched parcel data
        // Here, we assume you want to update the state if it's not already present
        const existingParcelIndex = state.parcels.findIndex((parcel) => parcel._id === action.payload._id);
        if (existingParcelIndex === -1) {
          state.parcels.push(action.payload);
        }
      })
      .addCase(fetchParcelById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message; // Capture the error message
      });
  },
});

export default parcelsSlice.reducer;