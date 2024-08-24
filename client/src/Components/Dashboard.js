import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchParcels } from '../lib/redux/parcelSlice';

const Dashboard = () => {
  const dispatch = useDispatch();
  const parcels = useSelector((state) => state.parcels.parcels);
  const loading = useSelector((state) => state.parcels.status === 'loading');
  const error = useSelector((state) => state.parcels.error);

  useEffect(() => {
    dispatch(fetchParcels());
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Parcel Dashboard</h1>
      {parcels && parcels.length > 0 ? (
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Tracking Number</th>
              <th className="py-2 px-4 border-b">Email</th>
              <th className="py-2 px-4 border-b">Location</th>
              <th className="py-2 px-4 border-b">Quantity</th>
              <th className="py-2 px-4 border-b">Weight</th>
              <th className="py-2 px-4 border-b">Dimensions</th>
              <th className="py-2 px-4 border-b">Status</th>
            </tr>
          </thead>
          <tbody>
            {parcels.map((parcel) => (
              <tr key={parcel._id}>
                <td className="py-2 px-4 border-b">{parcel.trackingNumber}</td>
                <td className="py-2 px-4 border-b">{parcel.email}</td>
                <td className="py-2 px-4 border-b">{parcel.location}</td>
                <td className="py-2 px-4 border-b">{parcel.quantity}</td>
                <td className="py-2 px-4 border-b">{parcel.weight}</td>
                <td className="py-2 px-4 border-b">
                  {parcel.dimensions.length} x {parcel.dimensions.width} x {parcel.dimensions.height} cm
                </td>
                <td className="py-2 px-4 border-b">
                  {parcel.status.map((status, index) => (
                    <div key={index}>
                      {status.status} - {status.location}
                    </div>
                  ))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No parcels available.</p>
      )}
    </div>
  );
};

export default Dashboard;
