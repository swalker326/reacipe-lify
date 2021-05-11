import React from "react";
import { Container, Col, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import { PersonCircle } from "react-bootstrap-icons";
import { useAuthState } from "../Context/authContext";

//Local Impots

const AppHeader = () => {
  const { userEmail } = useAuthState();

  return (
    <Navbar className="mb-5" bg="primary" variant="dark">
      <Navbar.Brand as={Link} to="/">
        Swalker.Dev
      </Navbar.Brand>
      <Nav className="mr-auto">
        <Nav.Link as={Link} to="/todos">
          To Do's
        </Nav.Link>
        <Nav.Link as={Link} to="/products">
          Products
        </Nav.Link>
      </Nav>
      <Nav.Link as={Link} to="/login">
        <Container className="">
          <Col style={{ textAlign: "center" }}>
            <PersonCircle size={40} color="#fff" />
            <h6 style={{ color: "#fff" }}>{userEmail}</h6>
          </Col>
        </Container>
      </Nav.Link>
    </Navbar>
  );
};

export default AppHeader;
