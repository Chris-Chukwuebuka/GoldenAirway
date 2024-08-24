import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchParcels, createParcel } from '../lib/redux/parcelSlice';
import { useNavigate } from 'react-router-dom';
import CreateParcelModal from '../Components/CreateParcels'; // Correct import if needed

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const parcels = useSelector((state) => state.parcels.parcels || []);
  const loading = useSelector((state) => state.parcels.status === 'loading');
  const error = useSelector((state) => state.parcels.error);

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchParcels());
  }, [dispatch]);

  const handleUpdateClick = (parcelId) => {
    navigate(`/update-parcel/${parcelId}`);
  };

  const handleCreateParcel = async (parcelData) => {
    await dispatch(createParcel(parcelData));
    setIsModalOpen(false); // Close modal after creation
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Parcel Dashboard</h1>
      <button
        className="mb-4 px-4 py-2 bg-green-500 text-white rounded"
        onClick={() => setIsModalOpen(true)}
      >
        Create New Parcel
      </button>
      {parcels.length > 0 ? (
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
              <th className="py-2 px-4 border-b">Actions</th>
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
                  {parcel.dimensions ? (
                    `${parcel.dimensions.length || 'N/A'} x ${parcel.dimensions.width || 'N/A'} x ${parcel.dimensions.height || 'N/A'} cm`
                  ) : (
                    'N/A'
                  )}
                </td>
                <td className="py-2 px-4 border-b">
                  {parcel.status && Array.isArray(parcel.status) && parcel.status.length > 0 ? (
                    parcel.status.map((status, index) => (
                      <div key={index}>
                        {status.status} - {status.location}
                      </div>
                    ))
                  ) : (
                    'No status available'
                  )}
                </td>
                <td className="py-2 px-4 border-b">
                  <button
                    className="px-4 py-2 bg-blue-500 text-white rounded"
                    onClick={() => handleUpdateClick(parcel._id)}
                  >
                    Update Status
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No parcels available.</p>
      )}
      {isModalOpen && <CreateParcelModal onCreate={handleCreateParcel} onClose={() => setIsModalOpen(false)} />}
    </div>
  );
};

export default Dashboard;
