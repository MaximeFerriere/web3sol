import React from "react";
import App from "./App";
import { ProviderWrapper as ContextProviderWrapper } from "../../contexts/context.jsx";
const AppContainer = () => {
  return (
    <ContextProviderWrapper>
      <App />
    </ContextProviderWrapper>
  );
};

export default AppContainer;
