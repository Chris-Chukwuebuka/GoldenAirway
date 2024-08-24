import React, { useState } from 'react';
import useParcel from '../hooks/useParcel';
import { useNavigate } from 'react-router-dom';

const CreateParcel = () => {
  const { createNewParcel, loading, error } = useParcel();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    location: '',
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createNewParcel(formData);
      navigate('/dashboard');
    } catch (err) {
      console.error('Failed to create parcel:', err);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Create New Parcel</h1>
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-4 bg-white rounded shadow">
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-bold mb-2">Recipient Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="location" className="block text-sm font-bold mb-2">Location</label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="quantity" className="block text-sm font-bold mb-2">Quantity</label>
          <input
            type="number"
            id="quantity"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="weight" className="block text-sm font-bold mb-2">Weight (kg)</label>
          <input
            type="number"
            id="weight"
            name="weight"
            value={formData.weight}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Dimensions (cm)</label>
          <div className="flex space-x-2">
            <input
              type="number"
              id="length"
              name="length"
              placeholder="Length"
              value={formData.length}
              onChange={handleChange}
              className="w-1/3 p-2 border border-gray-300 rounded"
              required
            />
            <input
              type="number"
              id="width"
              name="width"
              placeholder="Width"
              value={formData.width}
              onChange={handleChange}
              className="w-1/3 p-2 border border-gray-300 rounded"
              required
            />
            <input
              type="number"
              id="height"
              name="height"
              placeholder="Height"
              value={formData.height}
              onChange={handleChange}
              className="w-1/3 p-2 border border-gray-300 rounded"
              required
            />
          </div>
        </div>
        <button type="submit" className="w-full p-2 bg-green-500 text-white rounded">
          {loading ? 'Creating...' : 'Create Parcel'}
        </button>
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </form>
    </div>
  );
};

export default CreateParcel;
