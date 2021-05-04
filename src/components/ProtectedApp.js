import React from 'react'
import { Route, Switch } from 'react-router'
import Amplify from "aws-amplify";
import awsExports from "../aws-exports";
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';
Amplify.configure(awsExports);


const ProtectedApp = () => {
return(
   <Switch>
     <Route path="/admin" exact >
      <div>
        Admin!
        <AmplifySignOut />
      </div>
     </Route>
     <Route path="/admin/user" render={() => <div>User</div>} />
   </Switch>
 )
}

export default withAuthenticator(ProtectedApp)

{/* styles  */}