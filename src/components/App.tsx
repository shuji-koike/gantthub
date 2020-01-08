import React from "react";
import { Switch, Route } from "react-router-dom";
import { Dashboard } from "./Dashboard";
import { Home } from "./Home";
import { Config } from "./Config";
import { Gantt } from "./Gantt";
import { OrganizationPile, RepositoryPile } from "./Pile";
import { RateLimit } from "./RateLimit";

export const App: React.FC = function() {
  return (
    <RateLimit>
      <Dashboard>
        <Switch>
          <Route path="/pile/org/:login" component={OrganizationPile}></Route>
          <Route path="/pile/:owner/:name" component={RepositoryPile}></Route>
          <Route path="/gantt/:owner/:name" component={Gantt}></Route>
          <Route path="/config" component={Config}></Route>
          <Route path="/" component={Home}></Route>
        </Switch>
      </Dashboard>
    </RateLimit>
  );
};
