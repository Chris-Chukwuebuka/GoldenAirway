import React, { useState, useEffect } from 'react';
import useParcel from '../hooks/useParcel';
import { useParams, useNavigate } from 'react-router-dom';

const UpdateParcel = () => {
  const { id } = useParams();
  const { getParcelById, updateExistingParcel, loading, error } = useParcel();
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

  useEffect(() => {
    const fetchParcel = async () => {
      const parcel = await getParcelById(id);
      setFormData({
        email: parcel.email,
        location: parcel.location,
        quantity: parcel.quantity,
        weight: parcel.weight,
        length: parcel.dimensions.length,
        width: parcel.dimensions.width,
        height: parcel.dimensions.height
      });
    };

    fetchParcel();
  }, [id, getParcelById]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateExistingParcel(id, formData);
      navigate('/dashboard');
    } catch (err) {
      console.error('Failed to update parcel:', err);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Update Parcel</h1>
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-4 bg-white rounded shadow">
        {/* Form fields */}
        {/* ... */}
        <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded">
          {loading ? 'Updating...' : 'Update Parcel'}
        </button>
        {error && <p className="text-red-500">{error}</p>}
      </form>
    </div>
  );
};

export default UpdateParcel;
