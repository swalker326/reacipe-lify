import React, { useEffect } from "react";
import { createBrowserHistory } from "history";
import AppHeader from "../Components/AppHeader";
import { Routes } from "./Routes";
import { Router, Route, Switch } from "react-router-dom";
import { checkAuth } from "../Context/authServices";
import { useAuthDispatch } from "../Context/authContext";
import PrivateRoute from "./PrivateRoute";
import AppFooter from "../Components/AppFooter";
import { Col, Container } from "react-bootstrap";

const history = createBrowserHistory();

const AppNavigation = () => {
  const dispatch = useAuthDispatch();
  useEffect(() => {
    const bootstrapAsync = async () => {
      let token = null;
      let email = null;
      try {
        const user = await checkAuth();
        const { jwtToken } = user;
        email = user.attributes.email;
        token = jwtToken;
      } catch (e) {
        console.warn("Warning", e);
      }
      dispatch({ type: "RESTORE_TOKEN", token, userEmail: email });
    };

    bootstrapAsync();
  }, [dispatch]);
  return (
    <Router className="AppNav" history={history}>
      <Container
        className="no-gutters d-flex justify-content-between"
        style={{ height: "100%", paddingRight: 0, paddingLeft: 0, flexDirection: 'column'}}
        fluid
      >
        <AppHeader />
        <Switch>
          {Routes.map((route, i) => {
            return route.private ? (
              <PrivateRoute key={i} {...route} />
            ) : (
              <Route key={i} {...route} />
            );
          })}
        </Switch>
        <AppFooter />
      </Container>
    </Router>
  );
};

export default AppNavigation;
