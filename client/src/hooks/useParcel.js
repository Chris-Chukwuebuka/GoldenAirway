// src/hooks/useParcel.js
import { useDispatch, useSelector } from 'react-redux';
import { fetchParcels, createParcel, updateParcelStatusById } from '../lib/redux/parcelSlice';

const useParcel = () => {
  const dispatch = useDispatch();
  const parcelsState = useSelector((state) => state.parcels);

  const getParcels = () => dispatch(fetchParcels());
  const createNewParcel = (parcelData) => dispatch(createParcel(parcelData));
  const updateParcelStatus = (id, statusData) => dispatch(updateParcelStatusById({ _id: id, statusData }));

  return {
    ...parcelsState,
    getParcels,
    createNewParcel,
    updateParcelStatus,
  };
};

export default useParcel;
