import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createParcel } from '../lib/redux/parcelSlice';
import { useNavigate } from 'react-router-dom';

const CreateParcel = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newParcel = {
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
    dispatch(createParcel(newParcel));
    navigate('/dashboard');
  };

  return (
    <div className="container">
      <h1>Create New Parcel</h1>
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
          <label className="block text-sm font-bold mb-2">Dimensions (cm)</label>
          <div className="flex space-x-2">
            <input
              type="number"
              name="length"
              placeholder="Length"
              value={formData.length}
              onChange={handleChange}
              className="w-1/3 p-2 border rounded"
              required
            />
            <input
              type="number"
              name="width"
              placeholder="Width"
              value={formData.width}
              onChange={handleChange}
              className="w-1/3 p-2 border rounded"
              required
            />
            <input
              type="number"
              name="height"
              placeholder="Height"
              value={formData.height}
              onChange={handleChange}
              className="w-1/3 p-2 border rounded"
              required
            />
          </div>
        </div>
        <button type="submit" className="w-full p-2 bg-green-500 text-white rounded">
          Create Parcel
        </button>
      </form>
    </div>
  );
};

export default CreateParcel;
