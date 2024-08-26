import React from 'react';
import ParcelItem from './ParcelItem';
import { useParcels } from '../../hooks/useParcels';
import { Container, Row, Col, Spinner } from 'react-bootstrap';

const ParcelList = () => {
  const { parcels, loading } = useParcels();

  if (loading) return <Spinner animation="border" />;

  return (
    <Container>
      <Row>
        {parcels.map((parcel) => (
          <Col key={parcel.id} md={6} lg={4}>
            <ParcelItem parcel={parcel} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ParcelList;
