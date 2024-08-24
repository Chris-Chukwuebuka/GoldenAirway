import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createParcel, updateParcel, fetchParcelById, fetchParcelByTrackingNumber } from '../lib/redux/parcelSlice';

const useParcel = () => {
  const dispatch = useDispatch();
  const parcels = useSelector((state) => state.parcels.parcels);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const createNewParcel = async (parcelData) => {
    setLoading(true);
    try {
      await dispatch(createParcel(parcelData)).unwrap();
      setError(null);
    } catch (err) {
      setError(err.message || 'Failed to create parcel');
    } finally {
      setLoading(false);
    }
  };

  const updateExistingParcel = async (id, updateData) => {
    setLoading(true);
    try {
      await dispatch(updateParcel({ id, updateData })).unwrap();
      setError(null);
    } catch (err) {
      setError(err.message || 'Failed to update parcel');
    } finally {
      setLoading(false);
    }
  };

  const trackParcel = async (trackingNumber) => {
    setLoading(true);
    try {
      const result = await dispatch(fetchParcelByTrackingNumber(trackingNumber)).unwrap();
      setError(null);
      return result;
    } catch (err) {
      setError(err.message || 'Failed to fetch parcel');
    } finally {
      setLoading(false);
    }
  };

  const getParcelById = async (id) => {
    setLoading(true);
    try {
      const result = await dispatch(fetchParcelById(id)).unwrap();
      setError(null);
      return result;
    } catch (err) {
      setError(err.message || 'Failed to fetch parcel by ID');
    } finally {
      setLoading(false);
    }
  };

  return {
    createNewParcel,
    updateExistingParcel,
    trackParcel,
    getParcelById,
    loading,
    error,
    parcels
  };
};

export default useParcel;
