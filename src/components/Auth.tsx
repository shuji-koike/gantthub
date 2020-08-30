import React, { useContext } from "react";
import { UserContext, loginWithGithub, logout } from "../firebase";
import { Button } from "./Button";
import { Form } from "./Form";
import { Input } from "./Input";

export const Auth: React.FC = () => {
  const user = useContext(UserContext);
  if (user === undefined) {
    return <>Loadging...</>;
  }
  if (!user) {
    return <Button onClick={loginWithGithub} label="Login" />;
  }
  return (
    <Form>
      <span>{user.displayName}</span>
      <Input
        type="password"
        name="GITHUB_TOKEN"
        autoComplete="token"
        storage={localStorage}
      />
      <Button onClick={logout} label="Logout" />
    </Form>
  );
};
