import React from "react";
import { Route, Switch } from "react-router";
import Amplify from "aws-amplify";
import awsExports from "../aws-exports";
import Profile from "../user/Profile"
import { withAuthenticator } from "@aws-amplify/ui-react";
Amplify.configure(awsExports);

const ProtectedApp = (props) => {
  console.log("props :", props); //eslint disable line
  return (
    <Switch>
      <Route path="/profile" render={() => <Profile />} />
    </Switch>
  );
};

export default withAuthenticator(ProtectedApp);
