import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from '../apis/api'; // Adjust the path as necessary

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

export const updateParcelStatus = createAsyncThunk(
  "parcels/updateParcelStatus",
  async ({ id, statusData }) => {
    const response = await api.put(`/admin/parcels/${id}/status`, statusData);
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
  async (_id) => {
    const response = await api.get(`/admin/parcels/id/${_id}`); // Ensure the endpoint is correct
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
  initialState: {
    parcels: [],
    status: "idle",
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchParcels.fulfilled, (state, action) => {
        console.log("fetchParcels.fulfilled", action.payload);
        state.parcels = action.payload;
      })
      .addCase(createParcel.fulfilled, (state, action) => {
        console.log("createParcel.fulfilled", action.payload);
        state.parcels.push(action.payload);
      })
      .addCase(updateParcelStatus.fulfilled, (state, action) => {
        console.log("updateParcelStatus.fulfilled", action.payload);
        const index = state.parcels.findIndex(
          (parcel) => parcel._id === action.payload._id
        );
        if (index !== -1) {
          state.parcels[index] = action.payload;
        }
      })
      .addCase(fetchParcelById.fulfilled, (state, action) => {
        console.log("fetchParcelById.fulfilled", action.payload);
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
        console.log("updateParcel.fulfilled", action.payload);
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
