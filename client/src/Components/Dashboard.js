import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchParcels } from '../lib/redux/parcelSlice';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const dispatch = useDispatch();
  const parcels = useSelector((state) => state.parcels.parcels);

  useEffect(() => {
    dispatch(fetchParcels());
  }, [dispatch]);

  return (
    <div className="container">
      <h1>Admin Dashboard</h1>
      <Link to="/create-parcel" className="btn btn-primary mb-3">Create Parcel</Link>
      <table className="table">
        <thead>
          <tr>
            <th>Tracking Number</th>
            <th>Recipient Email</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {parcels.map(parcel => (
            <tr key={parcel._id}>
              <td>{parcel.trackingNumber}</td>
              <td>{parcel.recipientEmail}</td>
              <td>{parcel.status[parcel.status.length - 1]?.status}</td>
              <td>
                <Link to={`/edit-parcel/${parcel._id}`} className="btn btn-warning">Edit</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
