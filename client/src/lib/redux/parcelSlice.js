import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Fetch all parcels
export const fetchParcels = createAsyncThunk(
  "parcels/fetchParcels",
  async () => {
    const response = await axios.get("/api/parcels");
    return response.data;
  }
);

// Create a new parcel
export const createParcel = createAsyncThunk(
  "parcels/createParcel",
  async (parcelData) => {
    const response = await axios.post("/api/parcels", parcelData);
    return response.data;
  }
);

// Update parcel status
export const updateParcelStatus = createAsyncThunk(
  "parcels/updateParcelStatus",
  async ({ id, statusData }) => {
    const response = await axios.put(`/api/parcels/${id}/status`, statusData);
    return response.data;
  }
);

// Fetch parcel by tracking number
export const fetchParcelByTrackingNumber = createAsyncThunk(
  "parcels/fetchParcelByTrackingNumber",
  async (trackingNumber) => {
    const response = await axios.get(`/api/parcels/${trackingNumber}`);
    return response.data;
  }
);

// Fetch parcel by ID
export const fetchParcelById = createAsyncThunk(
  "parcels/fetchParcelById",
  async (id) => {
    const response = await axios.get(`/api/parcels/id/${id}`); // Adjust the endpoint if necessary
    return response.data;
  }
);

// Update parcel details
export const updateParcel = createAsyncThunk(
  "parcels/updateParcel",
  async ({ id, updateData }) => {
    const response = await axios.put(`/api/parcels/${id}`, updateData);
    return response.data;
  }
);

const parcelsSlice = createSlice({
  name: "parcels",
  initialState: {
    parcels: [],
    status: "idle",
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchParcels.fulfilled, (state, action) => {
        state.parcels = action.payload;
      })
      .addCase(createParcel.fulfilled, (state, action) => {
        state.parcels.push(action.payload);
      })
      .addCase(updateParcelStatus.fulfilled, (state, action) => {
        const index = state.parcels.findIndex(
          (parcel) => parcel._id === action.payload._id
        );
        if (index !== -1) {
          state.parcels[index] = action.payload;
        }
      })
      .addCase(fetchParcelById.fulfilled, (state, action) => {
        const index = state.parcels.findIndex(
          (parcel) => parcel._id === action.payload._id
        );
        if (index !== -1) {
          state.parcels[index] = action.payload;
        } else {
          state.parcels.push(action.payload);
        }
      })
      .addCase(updateParcel.fulfilled, (state, action) => {
        const index = state.parcels.findIndex(
          (parcel) => parcel._id === action.payload._id
        );
        if (index !== -1) {
          state.parcels[index] = action.payload;
        }
      });
  },
});

export default parcelsSlice.reducer;
