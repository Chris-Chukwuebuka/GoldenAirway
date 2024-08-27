import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from '../apis/api'; // Adjust the path as necessary

const initialState = {
  parcels: [],
  status: "idle",
  error: null,
};

// Fetch all parcels
export const fetchParcels = createAsyncThunk('parcels/fetchParcels', async () => {
  const response = await api.get('/admin/parcels'); // Ensure this matches your API
  return response.data;
});

// Create a new parcel
export const createParcel = createAsyncThunk(
  'parcels/createParcel',
  async (parcelData) => {
    const response = await api.post('/admin/parcels', parcelData);
    return response.data;
  }
);

// Update parcel status by ID
export const updateParcelStatusById = createAsyncThunk(
  'parcels/updateParcelStatusById',
  async ({ _id, statusData }) => {
    const response = await api.put(`/admin/parcels/${_id}/status`, statusData);
    return response.data;
  }
);


// Get all parcels
export const getAllParcels = createAsyncThunk(
  'parcels/getAllParcels',
  async () => {
    const response = await api.get('/admin/parcels'); // Ensure this matches your API
    return response.data;
  }
);

const parcelsSlice = createSlice({
  name: 'parcels',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchParcels.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchParcels.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.parcels = action.payload;
      })
      .addCase(fetchParcels.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(createParcel.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createParcel.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.parcels.push(action.payload);
      })
      .addCase(createParcel.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(updateParcelStatusById.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateParcelStatusById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const index = state.parcels.findIndex(parcel => parcel._id === action.payload._id);
        if (index !== -1) {
          state.parcels[index] = action.payload;
        }
      })
      .addCase(updateParcelStatusById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(getAllParcels.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getAllParcels.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.parcels = action.payload;
      })
      .addCase(getAllParcels.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default parcelsSlice.reducer;


