import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Col, Row, Container } from "react-bootstrap";

//Local Impots

const SplashScreen = (props) => {
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
  }, [query]);

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
            <li>
              <Link to="/login"> Login</Link>
            </li>
          </ul>
        </Container>
      </Row>
      <Row>
        <Container>
          <p>
            Above are some links to sample projects I've built. I've
            incorporated the the following technologies:
          </p>
          <ul>
            <li>React</li>
            <ul>
              <li>React Router</li>
              <li>App wide state management with useContext and useReducer</li>
              <li>React Hooks</li>
              <ul>
                <li>useState</li>
                <li>useEffect</li>
                <li>useContext</li>
                <li>useReducer</li>
              </ul>
            </ul>
            <li>GraphQL</li>
            <li>Bootstrap</li>
            <li>Stripe</li>
            <li>
              Aws
              <ul>
                <li>Amplify</li>
                <li>Rest API</li>
                <li>DynamoDB</li>
                <li>Incognito</li>
              </ul>
            </li>
          </ul>
          <p>
            I’ve tried to not necessarily follow a build guide and rather build
            from “thin air”. This allows me to overcome obstacles I would face
            in a real world application.
          </p>
        </Container>
      </Row>
      <Row>
        <Col>
          <Container>
            <h4>The structure of this project is as follows:</h4>
            <ul>
              <li>
                {" "}
                src/
                <ul>
                  <li>
                    Components/
                    <ul>
                      <li>
                        PayButton/
                        <ul>
                          <li>PayButton.js</li>
                          <li>PayButton.scss</li>
                        </ul>
                      </li>
                    </ul>
                  </li>
                  <li>AppHeader.js</li>
                  <li>
                    Context/
                    <ul>
                      <li>authContext.js</li>
                      <li>authReducer.js</li>
                      <li>authServices.js</li>
                    </ul>
                  </li>
                  <li>
                    graphql/
                    <ul>
                      <li>mutations.js</li>
                      <li>queries.js</li>
                      <li>schema.json</li>
                      <li>subscriptions.js</li>
                    </ul>
                  </li>
                  <li>
                    Navigation/
                    <ul>
                      <li>AppNavigation.js</li>
                      <li>PrivateRoute.js</li>
                      <li>Routes.js</li>
                    </ul>
                  </li>
                  <li>
                    Pages/
                    <ul>
                      <li>Login.js</li>
                      <li>Products.js</li>
                      <li>Profile.js</li>
                      <li>Splash.js</li>
                      <li>Todos.js</li>
                    </ul>
                  </li>
                </ul>
              </li>
            </ul>
          </Container>
        </Col>
      </Row>
    </Col>
  );
};

export default SplashScreen;
