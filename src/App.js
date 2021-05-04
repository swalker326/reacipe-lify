import React from "react";
import { Router, Route, Switch, Link } from "react-router-dom";
import { createBrowserHistory } from "history";
import SplashScreen from "./components/SplashScreen";
import Products from "./components/Products/Products";
import Todos from "./components/Todos/Todos";
import "./App.scss";
import { Nav, Navbar } from "react-bootstrap";
import ProtectedApp from "./components/ProtectedApp"
import { AmplifyAuthenticator, AmplifySignOut } from "@aws-amplify/ui-react";
import { PersonCircle } from 'react-bootstrap-icons';

const history = createBrowserHistory();

const App = () => {
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
          <Nav.Link as={Link} to="/admin">
            <PersonCircle size={40} />
          </Nav.Link>
          
        </Nav>
      </Navbar>
      <Switch>
        <Route exact path="/" render={() => <SplashScreen />} />
        <Route path="/products" render={() => <Products />} />
        <Route path="/admin" render={() => <ProtectedApp />} />
        <Route path="/todos" render={() => <Todos />} />
        <Route path="/login">
          <AmplifyAuthenticator>
            <AmplifySignOut />
          </AmplifyAuthenticator>
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
