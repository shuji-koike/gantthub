import React, { useContext } from "react";
import { UserContext, loginWithGithub, logout } from "../firebase";

export const Auth: React.FC = () => {
  const user = useContext(UserContext);
  if (user === undefined) {
    return <>Loadging...</>;
  }
  if (!user) {
    return <button onClick={loginWithGithub}>loginWithGithub</button>;
  }
  return (
    <>
      <span>{user.displayName}</span>
      <button onClick={logout}>logout</button>
    </>
  );
};
