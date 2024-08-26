import React, { useState } from 'react';
import { createParcel, updateParcel } from '../api/api';
import { Form, Button, Container } from 'react-bootstrap';

const ParcelForm = ({ existingParcel, onSubmitSuccess }) => {
  const [formData, setFormData] = useState(existingParcel || {
    name: '',
    location: '',
    status: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (existingParcel) {
        await updateParcel(existingParcel.id, formData);
      } else {
        await createParcel(formData);
      }
      onSubmitSuccess();
    } catch (error) {
      console.error('Failed to submit form', error);
    }
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="parcelName">
          <Form.Label>Parcel Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter parcel name"
          />
        </Form.Group>
        
        <Form.Group controlId="parcelLocation">
          <Form.Label>Location</Form.Label>
          <Form.Control
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Enter location"
          />
        </Form.Group>
        
        <Form.Group controlId="parcelStatus">
          <Form.Label>Status</Form.Label>
          <Form.Control
            as="select"
            name="status"
            value={formData.status}
            onChange={handleChange}
          >
            <option value="pending">Pending</option>
            <option value="in-transit">In-Transit</option>
            <option value="delivered">Delivered</option>
          </Form.Control>
        </Form.Group>
        
        <Button variant="primary" type="submit">
          {existingParcel ? 'Update Parcel' : 'Create Parcel'}
        </Button>
      </Form>
    </Container>
  );
};

export default ParcelForm;
