import React from "react";
import { useUser } from "../state/hooks/userContext";
import { Container, Form, Button } from "react-bootstrap";
import { Redirect } from "react-router";

const Login = () => {
  const [formData, setFormData] = React.useState(false);
  const { user, login, logout } = useUser();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting"); //eslint disable line
    try {
      await login(formData.username, formData.password).then((u) => {
        console.log(u);
      });
      //set loading false
    } catch (err) {
      console.log("err.message :", err); //eslint disable line
      //set errors
      //set loading false => display errors
    }
  };
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  // if (user) return <Redirect to={{pathname: "/profile"}} />;
  return (
    <Container className="Login">
      <Form onSubmit={(e) => handleSubmit(e)}>
        <h4>Sing in to your account</h4>
        <Form.Control
          name="username"
          onChange={(e) => handleInputChange(e)}
          type="email"
        />
        <Form.Control
          name="password"
          onChange={(e) => handleInputChange(e)}
          type="password"
        />
        <Button type="submit">Sign In</Button>
        <Button onClick={logout}>Logout</Button>
      </Form>
    </Container>
  );
};

export default Login;
