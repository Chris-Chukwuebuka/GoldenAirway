// parcelSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from '../apis/api'; // Adjust the path as necessary

export const fetchParcels = createAsyncThunk(
  "parcels/fetchParcels",
  async () => {
    const response = await api.get("/parcels");
    return response.data;
  }
);

export const createParcel = createAsyncThunk(
  "parcels/createParcel",
  async (parcelData) => {
    const response = await api.post("/parcels", parcelData);
    return response.data;
  }
);

export const updateParcelStatus = createAsyncThunk(
  "parcels/updateParcelStatus",
  async ({ id, statusData }) => {
    const response = await api.put(`/parcels/${id}/status`, statusData);
    return response.data;
  }
);

export const fetchParcelByTrackingNumber = createAsyncThunk(
  "parcels/fetchParcelByTrackingNumber",
  async (trackingNumber) => {
    const response = await api.get(`/parcels/${trackingNumber}`);
    return response.data;
  }
);

export const fetchParcelById = createAsyncThunk(
  "parcels/fetchParcelById",
  async (id) => {
    const response = await api.get(`/parcels/id/${id}`);
    return response.data;
  }
);

export const updateParcel = createAsyncThunk(
  "parcels/updateParcel",
  async ({ id, updateData }) => {
    const response = await api.put(`/parcels/${id}`, updateData);
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
