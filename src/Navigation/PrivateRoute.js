import React from "react";
import { Route, Redirect } from "react-router";
import { useAuthState } from "../Context/authContext";

const PrivateRoute = ({ children, ...rest }) => {
  const { userEmail } = useAuthState();
  return (
    <Route
      {...rest}
      render={() => {
        return userEmail ? children : <Redirect to="/login" />;
      }}
    />
  );
};

export default PrivateRoute;