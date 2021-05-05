import React from "react";
import { Container } from "react-bootstrap";
import { createBrowserHistory } from "history";
import AppHeader from "../Components/AppHeader";
import { Routes } from "./Routes";
import { Router, Route, Switch, Link, Redirect } from "react-router-dom";

//Local Impots
const history = createBrowserHistory();

const AppNavigation = () => {
  return (
    <Router history={history}>
      <AppHeader />
      <Switch>
        {Routes.map((route, i) => {
          return <Route key={i} {...route} />;
        })}
      </Switch>
    </Router>
  );
};

export default AppNavigation;
