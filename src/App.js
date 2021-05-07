import React from "react";
import "./App.scss";
import AppNavigation from "./Navigation/AppNavigation";
import { AuthProvider } from './Context/authContext';

const App = () => {
  return (
    <AuthProvider>
      <AppNavigation />
    </AuthProvider>
  );
};

export default App;
