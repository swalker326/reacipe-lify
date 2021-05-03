import React, { useState, useEffect } from "react";
import { Container, Col, Row, Card } from "react-bootstrap";
import Amplify, { API, graphqlOperation } from "aws-amplify";
import PayButton from "../PayButton/PayButton";
import NewProduct from "./NewProduct";
import { listProducts } from "../../graphql/queries";
import awsExports from "../../aws-exports";
import Loading from "react-fullscreen-loading";

Amplify.configure(awsExports);

const Products = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [productAdded, setProductAdded] = useState(false);
  const [loading, setLoading] = useState(true);
  
  
  const handleProductClick = (event, prod) => {
    setSelectedProduct(prod);
  };
  useEffect(() => {
    fetchProducts();
  }, [productAdded])
  useEffect(() => {
    fetchProducts();
  }, []);
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const productsData = await API.graphql(graphqlOperation(listProducts));
      const prods = productsData.data.listProducts.items;
      setProducts(prods);
    } catch (err) {
      console.log("error fetching todos");
    }
    setLoading(false);
  };
  return (
    <Container className="Product">
      <Loading
        loading={loading}
        background="rgba(179, 179, 179, 0.5)"
        loaderColor="#313131"
      />
      <Row>
        {products.map((prod) => (
          <Col sm={12} md={4} product_id={prod.id} key={prod.id}>
            <Container
              onClick={(e) => handleProductClick(e, prod)}
              className="Product mb-3"
              fluid
            >
              <Card
                style={{
                  height: "400px",
                  backgroundColor:
                    selectedProduct?.id === prod.id ? "lightgray" : "white",
                }}
                className="d-flexjustify-content-center"
              >
                <Card.Body className="d-flex flex-column align-items-center">
                  <Container>
                    <Card.Title>{prod.name}</Card.Title>
                    <Card.Text>{prod.description}</Card.Text>
                  </Container>
                  <Container className="p-0 d-flex justify-content-end align-items-end">
                    <h5>
                      ${prod.price}
                    </h5>
                  </Container>
                </Card.Body>
              </Card>
            </Container>
          </Col>
        ))}
      </Row>
      {selectedProduct ? (
        <PayButton
          stripePublicKey="pk_test_51IlxItCctdIGJZxzQkP85Oqi4B7VTdq3Njk5eJlyEvZWWad70MBfFE8QM25kANTzrx13OrB2fO1s4Ccq2kHCsjG100WB8HSxW0"
          apiName="stripeapi"
          apiEndpoint="/checkout"
          name={selectedProduct.name}
          description={selectedProduct.desc}
          images={["http://lorempixel.com/400/200/"]}
          amount={selectedProduct.price}
          currency="usd"
          quantity={1}
          success_url="https://example.com/success?session_id={CHECKOUT_SESSION_ID}" // Where to redirect if success
          cancel_url="https://example.com/cancel" // Where to go if payment canceled
        />
      ) : null}
      <Row>
        <Container>
          <NewProduct loading={setLoading} addedProduct={setProductAdded} />
        </Container>
      </Row>
    </Container>
  );
};

const styles = {
  productCard: {
    
  }
}

export default Products;
