import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchParcelById, updateParcel, updateParcelStatus } from '../lib/redux/parcelSlice';

const UpdateParcel = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const parcel = useSelector((state) => state.parcels.parcels.find(p => p._id === id));
  
  const [formData, setFormData] = useState({
    trackingNumber: '',
    recipientEmail: '',
    mobileNumber: '',
    quantity: '',
    weight: '',
    length: '',
    width: '',
    height: ''
  });

  const [statusUpdate, setStatusUpdate] = useState({
    status: '',
    location: ''
  });

  useEffect(() => {
    if (!parcel) {
      dispatch(fetchParcelById(id));
    }
  }, [dispatch, id, parcel]);

  useEffect(() => {
    if (parcel) {
      setFormData({
        trackingNumber: parcel.trackingNumber,
        recipientEmail: parcel.recipientEmail,
        mobileNumber: parcel.mobileNumber,
        quantity: parcel.quantity,
        weight: parcel.weight,
        length: parcel.dimensions.length,
        width: parcel.dimensions.width,
        height: parcel.dimensions.height
      });
    }
  }, [parcel]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleStatusChange = (e) => {
    const { name, value } = e.target;
    setStatusUpdate({ ...statusUpdate, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedData = {
      trackingNumber: formData.trackingNumber,
      recipientEmail: formData.recipientEmail,
      mobileNumber: formData.mobileNumber,
      quantity: Number(formData.quantity),
      weight: Number(formData.weight),
      dimensions: {
        length: Number(formData.length),
        width: Number(formData.width),
        height: Number(formData.height),
      },
    };
    dispatch(updateParcel({ id, updateData: updatedData }));
    navigate('/dashboard');
  };

  const handleStatusSubmit = (e) => {
    e.preventDefault();
    dispatch(updateParcelStatus({ id, statusData: statusUpdate }));
    navigate('/dashboard');
  };

  return (
    <div className="container mx-auto p-4">
      <h1>Edit Parcel</h1>
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-4 bg-white rounded shadow">
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Tracking Number</label>
          <input
            type="text"
            name="trackingNumber"
            value={formData.trackingNumber}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Recipient Email</label>
          <input
            type="email"
            name="recipientEmail"
            value={formData.recipientEmail}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Mobile Number</label>
          <input
            type="text"
            name="mobileNumber"
            value={formData.mobileNumber}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Quantity</label>
          <input
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Weight (kg)</label>
          <input
            type="number"
            name="weight"
            value={formData.weight}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Length (cm)</label>
          <input
            type="number"
            name="length"
            value={formData.length}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Width (cm)</label>
          <input
            type="number"
            name="width"
            value={formData.width}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Height (cm)</label>
          <input
            type="number"
            name="height"
            value={formData.height}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded">
          Update Parcel
        </button>
      </form>
      
      <h2 className="mt-8">Update Parcel Status</h2>
      <form onSubmit={handleStatusSubmit} className="max-w-lg mx-auto p-4 bg-white rounded shadow">
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Status</label>
          <input
            type="text"
            name="status"
            value={statusUpdate.status}
            onChange={handleStatusChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Location</label>
          <input
            type="text"
            name="location"
            value={statusUpdate.location}
            onChange={handleStatusChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <button type="submit" className="w-full p-2 bg-green-500 text-white rounded">
          Update Status
        </button>
      </form>
    </div>
  );
};

export default UpdateParcel;
