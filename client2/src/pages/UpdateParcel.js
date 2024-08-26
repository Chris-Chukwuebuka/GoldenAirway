import React, { useState, useEffect } from 'react';
import { Form, Button, Card, Alert } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const UpdateParcel = () => {
  const { id } = useParams(); // Get the parcel ID from the URL
  const navigate = useNavigate();
  
  const [parcel, setParcel] = useState({
    name: '',
    location: '',
    status: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetch parcel details by ID
    const fetchParcel = async () => {
      try {
        const response = await axios.get(`https://goldenairwaybackend-2.onrender.com/api/parcels/${id}`);
        setParcel(response.data);
      } catch (err) {
        setError('Failed to load parcel details');
      }
    };
    fetchParcel();
  }, [id]);

  const handleChange = (e) => {
    setParcel({
      ...parcel,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await axios.put(`https://goldenairwaybackend-2.onrender.com/api/parcels/${id}`, parcel);
      navigate('/dashboard'); // Redirect to the dashboard after updating
    } catch (err) {
      setError('Failed to update parcel');
    }
    setLoading(false);
  };

  return (
    <Card>
      <Card.Body>
        <h2 className="text-center mb-4">Update Parcel</h2>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group id="name">
            <Form.Label>Parcel Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={parcel.name}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group id="location" className="mt-3">
            <Form.Label>Location</Form.Label>
            <Form.Control
              type="text"
              name="location"
              value={parcel.location}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group id="status" className="mt-3">
            <Form.Label>Status</Form.Label>
            <Form.Control
              type="text"
              name="status"
              value={parcel.status}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Button disabled={loading} className="w-100 mt-4" type="submit">
            Update Parcel
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default UpdateParcel;
