import React from 'react';
import Sidebar from '../Components/Common/Sidebar';
import Header from '../Components/Common/Header';
import ParcelList from '../Components/Parcels/ParcelList';
import { Container, Row, Col } from 'react-bootstrap';

const Dashboard = () => {
  return (
    <Container fluid>
      <Row>
        <Col md={2}>
          <Sidebar />
        </Col>
        <Col md={10}>
          <Header />
          <ParcelList />
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
