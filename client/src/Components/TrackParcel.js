import React, { useState } from 'react';
import useParcel from '../hooks/useParcel';

const TrackParcel = () => {
  const { trackParcel, loading, error } = useParcel();
  const [trackingNumber, setTrackingNumber] = useState('');
  const [parcel, setParcel] = useState(null);

  const handleChange = (e) => {
    setTrackingNumber(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const fetchedParcel = await trackParcel(trackingNumber);
      setParcel(fetchedParcel);
    } catch (err) {
      console.error('Failed to fetch parcel:', err);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Track Parcel</h1>
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-4 bg-white rounded shadow">
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Tracking Number</label>
          <input
            type="text"
            value={trackingNumber}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded">
          {loading ? 'Tracking...' : 'Track Parcel'}
        </button>
        {error && <p className="text-red-500">{error}</p>}
        {parcel && (
          <div className="mt-4 p-4 bg-gray-100 rounded">
            <h2 className="text-xl font-bold">Parcel Details</h2>
            <p><strong>Email:</strong> {parcel.email}</p>
            <p><strong>Location:</strong> {parcel.location}</p>
            <p><strong>Quantity:</strong> {parcel.quantity}</p>
            <p><strong>Weight:</strong> {parcel.weight} kg</p>
            <p><strong>Dimensions:</strong> {parcel.dimensions.length} x {parcel.dimensions.width} x {parcel.dimensions.height} cm</p>
            <p><strong>Status:</strong> {parcel.status.map((s, i) => (
              <div key={i}>
                <p>Status: {s.status}</p>
                <p>Location: {s.location}</p>
              </div>
            ))}</p>
          </div>
        )}
      </form>
    </div>
  );
};

export default TrackParcel;
