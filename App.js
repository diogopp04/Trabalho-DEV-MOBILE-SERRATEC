import "react-native-gesture-handler";
import React from "react";
import { StatusBar } from "react-native";
import AuthProvider from "./src/context/AuthContext";
import Routes from "./src/Routes";
import TreinoProvider from "./src/context/TreinoContext";

const App = () => {
  return (
    <AuthProvider>
        <StatusBar />
        <Routes />
    </AuthProvider>
  );
};

export default App;
