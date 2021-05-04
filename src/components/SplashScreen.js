import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Col, Row, Container, Carousel } from "react-bootstrap";

//Local Impots

const SplashScreen = (props) => {
  console.log('props :' +JSON.stringify(props)); //eslint disable line
  const [hideCheckout, setHideCheckout] = useState(true);
  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };
  let query = useQuery();

  useEffect(() => {
    if (query.get("name")) {
      setHideCheckout(false);
    }
    setInterval(() => {
      setHideCheckout(true);
    }, 2500);
  }, []);

  return (
    <Col>
      <Row>
        <Container className="SplashScreen" fluid="md">
          {hideCheckout ? null : (
            <Container>
              <h3>Thank you for your purchase!</h3>
            </Container>
          )}
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
      </Row>
      <Row>
        <Container>
          <p>Above are some links to sample projects I've built. I've incorporated the the following technologies:</p>
          <ul>
            <li>React</li>
            <li>GraphQL</li>
            <li>Bootstrap</li>
            <li>Stripe</li>
            <li>Aws
              <ul>
                <li>Amplify</li>
                <li>Rest API</li>
                <li>DynamoDB</li>
              </ul>
            </li>
          </ul>
          <p>I’ve tried to not necessarily follow a build guide and rather build from “thin air”. This allows me to overcome obstacles I would face in a real world application.</p>
        </Container>
      </Row>
    </Col>
  );
};

export default SplashScreen;
