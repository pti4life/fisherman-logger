import React from 'react';

import {Navbar, Nav} from 'react-bootstrap';
import {Link} from 'react-router-dom';

const toolbar = () => (
    <Navbar bg="primary" variant="dark">
        <Navbar.Brand as={Link} to="/">Fisherman-logger</Navbar.Brand>
        <Nav className="mr-auto">
            <Nav.Link as={Link} to="/management">Management</Nav.Link>
            <Nav.Link as={Link} to="/fisherman">Fisherman</Nav.Link>
        </Nav>
    </Navbar>
)

export default toolbar;