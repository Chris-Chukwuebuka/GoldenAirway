import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { FaSpinner } from 'react-icons/fa'; // Import spinner icon from react-icons

const CreateParcelModal = ({ onCreate, onClose }) => {
  const [formData, setFormData] = useState({
    email: '',
    location: '',
    quantity: '',
    weight: '',
    length: '',
    width: '',
    height: ''
  });

  const [loading, setLoading] = useState(false); // Add loading state

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true when submitting

    try {
      await onCreate(formData); // Await onCreate to handle the promise
    } catch (error) {
      console.error('CreateParcelModal: handleSubmit error', error);
    } finally {
      setLoading(false); // Set loading to false after submission
    }
  };

  return createPortal(
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded shadow-lg max-w-md w-full">
        <h2 className="text-xl font-bold mb-4">Create New Parcel</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-700">Location</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-700">Quantity</label>
            <input
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-700">Weight (kg)</label>
            <input
              type="number"
              name="weight"
              value={formData.weight}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-700">Dimensions (cm)</label>
            <div className="flex space-x-2">
              <input
                type="number"
                name="length"
                value={formData.length}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Length"
                required
              />
              <input
                type="number"
                name="width"
                value={formData.width}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Width"
                required
              />
              <input
                type="number"
                name="height"
                value={formData.height}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Height"
                required
              />
            </div>
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
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded flex items-center"
              disabled={loading} // Disable button while loading
            >
              {loading ? <FaSpinner className="animate-spin mr-2" /> : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.body
  );
};

export default CreateParcelModal;
