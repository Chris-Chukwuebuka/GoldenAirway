import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const ParcelItem = ({ parcel }) => {
  const navigate = useNavigate();

  const handleEditClick = () => {
    navigate(`/parcels/edit/${parcel.id}`);
  };

  return (
    <Card className="mb-3">
      <Card.Body>
        <Card.Title>{parcel.name}</Card.Title>
        <Card.Text>
          Location: {parcel.location}
        </Card.Text>
        <Card.Text>
          Status: {parcel.status}
        </Card.Text>
        <Button variant="warning" onClick={handleEditClick}>
          Edit
        </Button>
      </Card.Body>
    </Card>
  );
};

export default ParcelItem;
