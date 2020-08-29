import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { UserContext, useAuth } from "../firebase";
import { Config } from "./Config";
import { Gantt } from "./Gantt";
import { GithubProvider } from "./GithubProvider";
import { Home } from "./Home";
import { Layout } from "./Layout";
import { OrganizationPile, RepositoryPile } from "./Pile";
import { RateLimit } from "./RateLimit";

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <GithubProvider fallback={<Config />}>
        <RateLimit>
          <ContextProvider>
            <Layout>
              <Routes />
            </Layout>
          </ContextProvider>
        </RateLimit>
      </GithubProvider>
    </BrowserRouter>
  );
};

const ContextProvider: React.FC = ({ children }) => {
  const { user } = useAuth();
  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};

export const Routes: React.FC = () => (
  <Switch>
    <Route path="/org/:login/pile" component={OrganizationPile}></Route>
    <Route path="/:owner/:name/pile" component={RepositoryPile}></Route>
    <Route path="/:owner/:name/gantt" component={Gantt}></Route>
    <Route path="/config" component={Config}></Route>
    <Route path="/" component={Home}></Route>
  </Switch>
);
