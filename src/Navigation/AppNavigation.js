import React, { useEffect } from "react";
import { createBrowserHistory } from "history";
import AppHeader from "../Components/AppHeader";
import { Routes } from "./Routes";
import { Router, Route, Switch } from "react-router-dom";
import { checkAuth } from "../Context/authServices";
import { useAuthDispatch } from "../Context/authContext";
import PrivateRoute from "./PrivateRoute";

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
        email = user.attributes.email
        console.log('user :' ,user ); //eslint disable line
        token = jwtToken;
      } catch (e) {
        console.warn("Warning", e);
      }
      dispatch({ type: "RESTORE_TOKEN", token, userEmail: email});
    };

    bootstrapAsync();
  }, [dispatch]);
  return (
    <Router history={history}>
      <AppHeader />
      <Switch>
        {Routes.map((route, i) => {
          console.log("route privte?" , route.private)
          return route.private ? (
            <PrivateRoute key={i} {...route} />
          ) : (
            <Route key={i} {...route} />
          );
        })}
      </Switch>
    </Router>
  );
};

export default AppNavigation;
