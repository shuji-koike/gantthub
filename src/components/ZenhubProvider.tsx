import React, { useContext } from "react";

export const ZenhubContext = React.createContext({
  endpoint: "https://api.zenhub.com/",
  fetch: async function (path: string) {
    const token = localStorage.getItem("ZENHUB_TOKEN");
    if (!token) return;
    const res = await fetch(path, {
      headers: {
        "X-Authentication-Token": token,
      },
    });
    return res.json();
  },
});

export const ZenhubProvider: React.FC = function ({ children }) {
  const zenhub = useContext(ZenhubContext);
  return (
    <ZenhubContext.Provider value={zenhub}>
      <>{children}</>
    </ZenhubContext.Provider>
  );
};
