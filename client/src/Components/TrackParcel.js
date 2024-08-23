import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchParcelByTrackingNumber } from '../lib/redux/parcelSlice';

const TrackParcel = () => {
  const [trackingNumber, setTrackingNumber] = useState('');
  const dispatch = useDispatch();
  const parcel = useSelector((state) => state.parcels.parcel);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(fetchParcelByTrackingNumber(trackingNumber));
  };

  return (
    <div className="container">
      <h1>Track Your Parcel</h1>
      <form onSubmit={handleSubmit} className="mb-4">
        <input
          type="text"
          value={trackingNumber}
          onChange={(e) => setTrackingNumber(e.target.value)}
          placeholder="Enter Tracking Number"
          className="form-control mb-2"
          required
        />
        <button type="submit" className="btn btn-primary">Track</button>
      </form>
      {parcel && (
        <div className="receipt">
          <h2>Parcel Receipt</h2>
          <p>Tracking Number: {parcel.trackingNumber}</p>
          <p>Recipient Email: {parcel.recipientEmail}</p>
          <p>Status: {parcel.status[parcel.status.length - 1]?.status}</p>
          <p>Location: {parcel.status[parcel.status.length - 1]?.location}</p>
        </div>
      )}
    </div>
  );
};

export default TrackParcel;
