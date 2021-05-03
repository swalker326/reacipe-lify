import React from "react";
import { Router, Route, Switch, Link } from "react-router-dom";
import { createBrowserHistory } from "history";
import SplashScreen from "./components/SplashScreen";
import Product from "./components/Products/Products";
import Todos from "./components/Todos/Todos";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Nav, Navbar } from "react-bootstrap";

const history = createBrowserHistory();

const App = () => {
  return (
    <Router history={history}>
      <Navbar className="mb-5" bg="primary" variant="dark">
        <Navbar.Brand as={Link} to="/">Swalker.Dev</Navbar.Brand>
        <Nav className="mr-auto">
          
            <Nav.Link as={Link} to="/todos">To Do's</Nav.Link>
            <Nav.Link as={Link} to="/products">Products</Nav.Link>
        </Nav>
      </Navbar>
      <Switch>
        <Route exact path="/" render={() => <SplashScreen />} />
        <Route path="/products" render={() => <Product />} />
        <Route path="/todos" render={() => <Todos />} />
      </Switch>
    </Router>
  );
};

export default App;
