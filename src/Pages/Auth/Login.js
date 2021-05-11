import React, { useState } from "react";
import { Container, Col, Row, Form, Button } from "react-bootstrap";
import { signIn } from "../../Context/authServices";
import { useAuthDispatch, useAuthState } from "../../Context/authContext";
import Loading from "react-fullscreen-loading";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";

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

  if (userEmail) return <Redirect to="profile" />;

  return (
    <Container className="Login">
      <Loading
        loading={signinLoading}
        background="rgba(179, 179, 179, 0.5)"
        loaderColor="#313131"
      />
      <Row>
        <Col>
          <Container>
            <Form className="mw-50 ml-5 mr-5" onSubmit={(e) => handleSubmit(e)}>
              <h4>Sign in</h4>
              <Form.Control
                className="mt-3 mb-3"
                name="email"
                onChange={(e) => handleInputChange(e)}
                type="email"
                placeholder="Email"
              />
              <Form.Control
                className="mt-3 mb-3"
                name="password"
                onChange={(e) => handleInputChange(e)}
                type="password"
                placeholder="Password"
              />
              <Link to="signup">Create Account</Link>
              <Container className="d-flex justify-content-end">
                <div className="d-flex flex-column align-items-center">
                  <Button className="w-100" type="submit">
                    Sign In
                  </Button>
                  <div>
                    <Link className="text-muted" to="password_reset">
                      Forgot password?
                    </Link>
                  </div>
                </div>
              </Container>
            </Form>
          </Container>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
