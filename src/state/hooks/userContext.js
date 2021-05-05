import React from "react";
import { Auth } from "@aws-amplify/auth";

const UserContext = React.createContext(null);

export const UserProvider = ({ children }) => {
  const [user, setUser] = React.useState(null);
  React.useEffect(() => {
    Auth.currentAuthenticatedUser()
      .then((user) => {
        setUser(user);
      })
      .catch(() => setUser(null));
  }, []);
  const login = (usernameOrEmail, password) =>
    Auth.signIn(usernameOrEmail, password)
      .then((cognitoUser) => {
        setUser(cognitoUser);
        return cognitoUser;
      })
      .catch((err) => {
        if (err.code === "UserNotFoundException") {
          err.message = "Invalid username or password";
        }

        // ... (other checks)

        throw err;
      });
  const logout = () =>
    Auth.signOut().then((data) => {
      setUser(null);
      return data;
    });

  const values = React.useMemo(() => ({ user, login, logout }), [user]);
  return <UserContext.Provider value={values}>{children}</UserContext.Provider>;
};

export const useUser = () => {
  const context = React.useContext(UserContext);

  if (context === undefined) {
    throw new Error("'useUser' must be within a 'UserProvider'");
  }
  return context;
};
