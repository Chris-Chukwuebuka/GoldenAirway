import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchParcels, createParcel } from '../lib/redux/parcelSlice';
import { useNavigate } from 'react-router-dom';
import CreateParcelModal from '../Components/CreateParcels'; // Correct import

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { parcels, status, error } = useSelector((state) => state.parcels);

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchParcels());
  }, [dispatch]);

  const handleCreateParcel = async (parcelData) => {
    await dispatch(createParcel(parcelData));
    setIsCreateModalOpen(false);
  };

  const handleUpdateClick = (parcelId) => {
    navigate(`/update-parcel/${parcelId}`);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Parcel Dashboard</h1>
      <button
        className="mb-4 px-4 py-2 bg-green-500 text-white rounded"
        onClick={() => setIsCreateModalOpen(true)}
      >
        Create New Parcel
      </button>

      {status === 'loading' && <p>Loading...</p>}
      {status === 'failed' && <p className="text-red-500">Error: {error}</p>}

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
                  {parcel.dimensions
                    ? `${parcel.dimensions.length} x ${parcel.dimensions.width} x ${parcel.dimensions.height} cm`
                    : 'N/A'}
                </td>
                <td className="py-2 px-4 border-b">
                  {parcel.status?.length > 0 ? (
                    parcel.status.map((statusItem, index) => (
                      <div key={index}>
                        {statusItem.status} - {statusItem.location}
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

      {isCreateModalOpen && (
        <CreateParcelModal
          onCreate={handleCreateParcel}
          onClose={() => setIsCreateModalOpen(false)}
        />
      )}
    </div>
  );
};

export default Dashboard;
