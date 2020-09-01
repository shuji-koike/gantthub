import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { UserContext, useAuth } from "../firebase";
import { store } from "../store";
import { Auth } from "./Auth";
import { GithubProvider } from "./GithubProvider";
import { Layout } from "./Layout";
import { RateLimit } from "./RateLimit";
import { Routes } from "./Routes";

export default function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <GithubProvider fallback={<Auth />}>
          <RateLimit>
            <ContextProvider>
              <Layout>
                <Routes />
              </Layout>
            </ContextProvider>
          </RateLimit>
        </GithubProvider>
      </BrowserRouter>
    </Provider>
  );
}

const ContextProvider: React.FC = ({ children }) => {
  const { user } = useAuth();
  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};
