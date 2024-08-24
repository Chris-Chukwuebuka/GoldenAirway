import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchParcelById, updateParcel } from '../lib/redux/parcelSlice';

const UpdateParcel = () => {
  const { _id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const parcel = useSelector((state) => state.parcels.parcels.find(p => p._id === _id));
  const [status, setStatus] = useState('');

  useEffect(() => {
    if (_id) {
      dispatch(fetchParcelById(_id));
    }
  }, [_id, dispatch]);

  useEffect(() => {
    if (parcel) {
      setStatus(parcel.status.map(s => s.status).join(', '));
    }
  }, [parcel]);

  const handleChange = (e) => {
    setStatus(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const statusArray = status.split(',').map(s => ({ status: s.trim(), location: '' }));
    try {
      await dispatch(updateParcel({ _id, status: statusArray }));
      navigate('/dashboard');
    } catch (error) {
      console.error('Failed to update the parcel status:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Update Parcel Status</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1" htmlFor="status">Status:</label>
          <textarea
            id="status"
            name="status"
            value={status}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            required
            placeholder="Enter statuses separated by commas"
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Update Status
        </button>
      </form>
    </div>
  );
};

export default UpdateParcel;
