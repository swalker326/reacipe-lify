import React from "react";
import { Container, Row, Col, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";

const AppFooter = () => {
  return (
    <Container
      style={styles.footerContainer}
      className="AppFooter pt-5 mt-3"
      fluid
    >
      <Container>
        <Row className="d-flex justify-content-center">
          <Col>
            <Container>
              <h5>Learn Something</h5>
              <p>
                Enim nulla quis ut id deserunt consectetur non. Culpa
                reprehenderit quis sint anim irure mollit et enim sunt.
              </p>
            </Container>
          </Col>
          <Col>
            <Container>
              <h5>Build Something</h5>
              <p>
                Mollit incididunt consequat voluptate pariatur amet eu. Dolore
                culpa esse irure non voluptate consectetur enim irure ullamco.{" "}
              </p>
            </Container>
          </Col>
        </Row>
      </Container>
      <Row className="mt-3">
        <Container style={styles.footerLinksContainer}>
          <Navbar className="mb-2" bg="primary" variant="dark">
            <Nav>
              <Nav.Link as={Link} to="/about">
                About
              </Nav.Link>
              <Nav.Link as={Link} to="/contact">
                Contact
              </Nav.Link>
              <Nav.Link as={Link} to="/help">
                Help
              </Nav.Link>
            </Nav>
          </Navbar>
        </Container>
      </Row>
    </Container>
  );
};

export default AppFooter;

const styles = {
  footerContainer: {
    backgroundColor: "#037bff",
    color: "#fff",
  },
  footerColumnHeader: {
    color: "lightgray",
  },
  footerLinksContainer: {
    display: "flex",
    justifyContent: "flex-end",
  },
  footerLinks: {
    listStyle: "none",
  },
  hr: {
    color: "rgba(255,255,255, 0.75)",
    backgroundColor: "rgba(255,255,255, 0.75)",
    height: 1,
  },
};
