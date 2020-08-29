import React from "react";
import { Auth } from "./Auth";

export const Layout: React.FC = function ({ children }) {
  return (
    <main>
      <header>
        <Auth />
      </header>
      {children}
    </main>
  );
};
