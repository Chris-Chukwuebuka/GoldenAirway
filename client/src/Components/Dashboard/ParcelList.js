// src/components/Dashboard/ParcelList.js
import React from 'react';

const ParcelList = ({ parcels, onUpdate }) => (
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
            {parcel.status?.length > 0
              ? parcel.status.map((statusItem, index) => (
                  <div key={index}>{statusItem.status} - {statusItem.location}</div>
                ))
              : 'No status available'}
          </td>
          <td className="py-2 px-4 border-b">
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded"
              onClick={() => onUpdate(parcel._id)}
            >
              Update Status
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default ParcelList;
