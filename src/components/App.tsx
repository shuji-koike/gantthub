import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Config } from "./Config";
import { Gantt } from "./Gantt";
import { GithubProvider } from "./GithubProvider";
import { Home } from "./Home";
import { Layout } from "./Layout";
import { OrganizationPile, RepositoryPile } from "./Pile";
import { RateLimit } from "./RateLimit";

export const App: React.FC = () => {
  return (
    <GithubProvider>
      <RateLimit>
        <BrowserRouter>
          <Layout>
            <Routes />
          </Layout>
        </BrowserRouter>
      </RateLimit>
    </GithubProvider>
  );
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
