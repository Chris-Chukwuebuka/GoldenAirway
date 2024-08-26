import React from 'react';
import { Nav } from 'react-bootstrap';

const Sidebar = () => {
  return (
    <Nav className="flex-column bg-light vh-100 p-3">
      <Nav.Link href="/dashboard">Dashboard</Nav.Link>
      <Nav.Link href="/parcels/create">Create Parcel</Nav.Link>
    </Nav>
  );
};

export default Sidebar;
