import React, { useState, useEffect } from 'react';
import useParcel from '../hooks/useParcel';
import ParcelList from '../Components/Dashboard/ParcelList';
import CreateParcelModal from '../Components/Dashboard/CreateParcelModal';

const Dashboard = () => {
  const { parcels, status, error, getParcels, createNewParcel, updateParcelStatus } = useParcel();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedParcelId, setSelectedParcelId] = useState(null);
  const [newStatus, setNewStatus] = useState('');

  console.log("Dashboard: parcels, status, error", parcels, status, error);

  useEffect(() => {
    getParcels();
  }, [getParcels]);

  const handleCreateParcel = async (parcelData) => {
    console.log("Dashboard: handleCreateParcel", parcelData);
    await createNewParcel(parcelData);
    setIsCreateModalOpen(false);
  };

  const handleUpdateClick = (parcelId) => {
    console.log("Dashboard: handleUpdateClick", parcelId);
    setSelectedParcelId(parcelId);
  };

  const handleUpdateStatus = async () => {
    console.log("Dashboard: handleUpdateStatus", selectedParcelId, newStatus);
    if (selectedParcelId) {
      const statusArray = newStatus.split(',').map((s) => ({ status: s.trim(), location: '' }));
      await updateParcelStatus(selectedParcelId, { status: statusArray });
      setSelectedParcelId(null);
      setNewStatus('');
    }
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
        <ParcelList parcels={parcels} onUpdate={handleUpdateClick} />
      ) : (
        <p>No parcels available.</p>
      )}

      {isCreateModalOpen && (
        <CreateParcelModal
          onCreate={handleCreateParcel}
          onClose={() => setIsCreateModalOpen(false)}
        />
      )}

      {selectedParcelId && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded shadow-lg max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">Update Parcel Status</h2>
            <input
              type="text"
              value={newStatus}
              onChange={(e) => setNewStatus(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mb-4"
              placeholder="Enter new status (comma-separated)"
            />
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => setSelectedParcelId(null)} // Close the update modal
                className="px-4 py-2 bg-gray-500 text-white rounded mr-2"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdateStatus}
                className="px-4 py-2 bg-blue-500 text-white rounded"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
