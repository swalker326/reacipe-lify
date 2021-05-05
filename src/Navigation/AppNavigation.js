import React from 'react'
import { Container } from 'react-bootstrap'
import { Router, Route, Switch, Link, Redirect } from "react-router-dom";

//Local Impots

const AppNavigation = () => {
return(
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
     
 )
}

export default AppNavigation
