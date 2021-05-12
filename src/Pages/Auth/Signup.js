import React, { useState } from "react";
import { Container, Col, Row, Form, Button } from "react-bootstrap";
import { signUp, signIn, confirmSignUp } from "../../Context/authServices";
import { useAuthDispatch } from "../../Context/authContext";
import { Redirect, Link } from "react-router-dom";

//Local Impots

const Signup = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({});
  const [signed, setSigned] = useState(false);
  const [error, setError] = useState("");
  const [confirmed, setConfirmed] = useState(false);

  const dispatch = useAuthDispatch();

  const signUpUser = () => {
    setLoading(true);
    const { email, password } = formData;
    signUp(email, password)
      .then((data) => {
        console.log("data :", data); //eslint disable line
        setSigned(true);
        setLoading(true);
      })
      .catch((err) => {
        setLoading(false);
        setError(err.message);
        console.log("err :", err); //eslint disable line
      });
  };
  const confirm = () => {
    setLoading(true);
    const { email, code, password } = formData;
    confirmSignUp(email, code)
      .then(() => {
        setLoading(false);
        setConfirmed(true);
        signIn(email, password).then(() =>
          dispatch({
            type: "SIGN_IN",
            token: "dummy-auth-token",
            userEmail: email,
          })
        );
      })
      .catch((err) => {
        setLoading(false);
        setError(err);
        console.log(err);
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
    signUpUser();
  };
  const handleVerification = (e) => {
    e.preventDefault();
    confirm();
  };

  if (signed && confirmed) return <Redirect to="/profile" />;
  return (
    <Container className="Signup">
      <Col>
        <Row>
          {!signed ? (
            <Container style={{ maxWidth: "600px" }}>
              <Form onSubmit={(e) => handleSubmit(e)}>
                <h4>Create Account</h4>
                <Form.Control
                  className="mt-3 mb-3"
                  name="email"
                  onChange={(e) => handleInputChange(e)}
                  placeholder="Email"
                />
                <Form.Control
                  className="mt-3 mb-3"
                  name="password"
                  onChange={(e) => handleInputChange(e)}
                  type="password"
                  placeholder="Password"
                  // isValid={true}
                />
                <Link to="/login">Wait go back</Link>
                <Container className="d-flex justify-content-end">
                  <Button type="submit">
                    Sign Up
                  </Button>
                </Container>
                {error ? (
                  <Container>
                    <span>Error</span> {error}
                  </Container>
                ) : null}
              </Form>
            </Container>
          ) : (
            <Form className="ml-5 mr-5" onSubmit={(e) => handleVerification(e)}>
              <h4>Confirm Email</h4>
              <Form.Control
                className="mt-3 mb-3"
                name="code"
                onChange={(e) => handleInputChange(e)}
                placeholder="Verification Code"
              />
              <Button type="submit">Confirm</Button>
            </Form>
          )}
        </Row>
      </Col>
    </Container>
  );
};

export default Signup;
