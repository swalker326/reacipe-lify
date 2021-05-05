import React from "react";
import { Router, Route, Switch, Link, Redirect } from "react-router-dom";
import { createBrowserHistory } from "history";
import SplashScreen from "./Screens/SplashScreen";
import Products from "./Components/Products/Products";
import Todos from "./Components/Todos/Todos";
import "./App.scss";
import { Nav, Navbar, Container, Col } from "react-bootstrap";
import ProtectedApp from "./Components/ProtectedApp";
import Login from "./auth/Login";
import Profile from "./user/Profile";
import { PersonCircle } from "react-bootstrap-icons";
import { useUser } from "./state/hooks/userContext";

const history = createBrowserHistory();

const App = () => {
  const { user } = useUser();
  return (
    <Router history={history}>
      <Navbar className="mb-5" bg="primary" variant="dark">
        <Navbar.Brand as={Link} to="/">
          Swalker.Dev
        </Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link as={Link} to="/todos">
            To Do's
          </Nav.Link>
          <Nav.Link as={Link} to="/products">
            Products
          </Nav.Link>
        </Nav>
        <Nav.Link as={Link} to="/login">
          <Container className="">
            <Col style={{ textAlign: "center" }}>
              <PersonCircle size={40} color="#fff" />
              <h6 style={{ color: "#fff" }}>{user?.attributes.email}</h6>
            </Col>
          </Container>
        </Nav.Link>
      </Navbar>
      <Switch>
        <Route exact path="/" render={() => <SplashScreen />} />
        <Route path="/products" render={() => <Products />} />
        <Route path="/admin" render={() => <ProtectedApp />} />
        <Route path="/todos" render={() => <Todos />} />
        <Route path="/login" render={(props) => <Login {...props} />} />
        {/* <Route render={() => <Redirect to="/" />} /> */}
      </Switch>
    </Router>
  );
};

export default App;
