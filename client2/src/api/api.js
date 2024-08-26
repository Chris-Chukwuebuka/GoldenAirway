import axios from 'axios';

const api = axios.create({
  baseURL: 'https://goldenairwaybackend-2.onrender.com/api',
});

export const createParcel = async (parcelData) => {
  return api.post('/admin/parcels', parcelData);
};

export const getParcels = async () => {
  return api.get('/parcels');
};

export const updateParcel = async (parcelId, updatedData) => {
  return api.put(`/admin/parcels/${parcelId}`, updatedData);
};
