import React, { useEffect } from "react";
import { createBrowserHistory } from "history";
import AppHeader from "../Components/AppHeader";
import { Routes } from "./Routes";
import { Router, Route, Switch } from "react-router-dom";
import { checkAuth } from "../Context/authServices";
import { useAuthDispatch } from "../Context/authContext";
import PrivateRoute from "./PrivateRoute";
import AppFooter from "../Components/AppFooter";

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
    <Router history={history}>
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
    </Router>
  );
};

export default AppNavigation;
