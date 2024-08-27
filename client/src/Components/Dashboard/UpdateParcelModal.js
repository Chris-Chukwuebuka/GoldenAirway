import React, { useState } from 'react';
import { createPortal } from 'react-dom';

const UpdateParcelModal = ({ parcel, onUpdate, onClose }) => {
  const [status, setStatus] = useState('');
  const [location, setLocation] = useState('');

  const handleUpdate = () => {
    if (status && location) {
      // Pass parcel ID, status, and location to the onUpdate function
      onUpdate(parcel._id, { status, location });
    }
  };

  return createPortal(
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded shadow-lg max-w-md w-full">
        <h2 className="text-xl font-bold mb-4">Update Parcel Status</h2>
        <p className="mb-4">Parcel ID: {parcel._id}</p> {/* Display Parcel ID */}
        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium text-gray-700">New Status</label>
          <input
            type="text"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Enter new status"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium text-gray-700">Location</label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Enter location"
          />
        </div>
        <div className="flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 text-white rounded mr-2"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleUpdate}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Update
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default UpdateParcelModal;
