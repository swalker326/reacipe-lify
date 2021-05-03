import React from "react";
import { Link } from "react-router-dom";
import { Container } from "react-bootstrap";

//Local Impots

const SplashScreen = () => {
  return (
    <Container className="SplashScreen" fluid="md">
      <h2>React/Amplify/Stripe Demo</h2>
      <ul>
        <li>
          <Link to="/products"> Products</Link>
        </li>
        <li>
          <Link to="/todos"> Todo's</Link>
        </li>
      </ul>
    </Container>
  );
};

export default SplashScreen;
