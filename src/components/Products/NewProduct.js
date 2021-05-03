import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import Amplify, { API, graphqlOperation } from "aws-amplify";
import { createProduct } from "../../graphql/mutations";
import awsExports from "../../aws-exports";

Amplify.configure(awsExports);

const initialState = { name: "", description: "", price: "" };

const NewProduct = (props) => {
  const [formState, setFormState] = useState(initialState);
  const setInput = (key, value) => {
    setFormState({ ...formState, [key]: value });
  };
  const addProduct = async () => {
    props.loading(true)
    try {
      if (!formState.name || !formState.description || !formState.price) return;
      const product = { ...formState };
      setFormState(initialState);
      await API.graphql(graphqlOperation(createProduct, { input: product }));
      props.addedProduct(true);
    } catch (err) {
      console.log("error createing product:", err);
    }
    props.loading(false)
  };
  return (
    <Container className="NewProduct mt-5">
      <Form>
        <Row>
          <Col>
            <Form.Label>Name</Form.Label>
            <Form.Control
              className="mt-1 mb-1"
              onChange={(event) => setInput("name", event.target.value)}
              placeholder="Name"
              value={formState.name}
            />
          </Col>
          <Col>
            <Form.Label>Price</Form.Label>
            <Form.Control
              className="mt-1 mb-1"
              onChange={(event) => setInput("price", event.target.value)}
              placeholder="9.99"
              value={formState.price}
            />
          </Col>
        </Row>
        <Form.Control
          className="mt-1 mb-1"
          as="textarea"
          rows={5}
          onChange={(event) => setInput("description", event.target.value)}
          placeholder="Description"
          value={formState.description}
        />
      </Form>
      <Button onClick={(evt) => addProduct(evt)}>Add</Button>
    </Container>
  );
};

export default NewProduct;
