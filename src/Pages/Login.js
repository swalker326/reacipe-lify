import React, { useState } from "react";
import { Container, Col, Row, Form, Button } from "react-bootstrap";
import { signIn, signOut } from "../Components/Context/authServices";
import {
  useAuthDispatch,
  useAuthState,
} from "../Components/Context/authContext";
import Loading from "react-fullscreen-loading";
import { Redirect } from "react-router";

const Login = () => {
  const dispatch = useAuthDispatch();
  const { userEmail } = useAuthState();
  const [signinLoading, setSigninLoading] = useState(false);
  const [formData, setFormData] = useState({});

  const signInUser = async () => {
    const { email, password } = formData;
    setSigninLoading(true);
    signIn(email, password)
      .then((r) => {
        console.log(r);
        dispatch({
          type: "SIGN_IN",
          token: r.signInUserSession.accessToken.jwtToken,
          userEmail: r.attributes.email,
        });
      })
      .catch((e) => console.log(e))
      .finally(() => setSigninLoading(false));
  };
  const signOutUser = async () => {
    setSigninLoading(true);
    signOut()
      .then(() => {
        dispatch({
          type: "SIGN_OUT",
        });
      })
      .finally(() => {
        setFormData({});
        setSigninLoading(false);
      });
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    signInUser();
  };

  if(userEmail) return <Redirect to='profile' />

  return (
    <Container className="Login" fluid="sm">
      <Loading
        loading={signinLoading}
        background="rgba(179, 179, 179, 0.5)"
        loaderColor="#313131"
      />
      <Row>
        <Col>
          <Form onSubmit={(e) => handleSubmit(e)}>
            <h4>Sing in to your account</h4>
            <Form.Control
              name="email"
              onChange={(e) => handleInputChange(e)}
              type="email"
            />
            <Form.Control
              name="password"
              onChange={(e) => handleInputChange(e)}
              type="password"
            />
            <Button type="submit">Sign In</Button>
          </Form>
        </Col>
      </Row>
      <Row>
        <Col>
          <Button className="m" onClick={signOutUser}>
            Sign Out
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
