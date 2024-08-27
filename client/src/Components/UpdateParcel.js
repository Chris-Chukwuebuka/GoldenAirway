import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { updateParcel, fetchParcelById } from '../lib/redux/parcelSlice'; // Import additional action

const UpdateParcel = () => {
  const { _id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const parcel = useSelector((state) => state.parcels.parcels.find((p) => p._id === _id));
  const [status, setStatus] = useState('');
  const [isLoading, setIsLoading] = useState(true); // Track loading state

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true); // Set loading state to true
      await dispatch(fetchParcelById(_id)); // Fetch parcel data by ID
      setIsLoading(false); // Set loading state to false after fetching
    };

    fetchData();
  }, [_id, dispatch]);

  const handleChange = (e) => {
    setStatus(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const statusArray = status.split(',').map((s) => ({ status: s.trim(), location: '' })); 
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
      {isLoading ? (
        <p>Loading parcel data...</p>
      ) : (
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
          <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
            Update Status
          </button>
        </form>
      )}
    </div>
  );
};

export default UpdateParcel;