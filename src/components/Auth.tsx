import { Avatar, Relative, Popover } from "@primer/components";
import React, { useContext, useState } from "react";
import styled from "styled-components";
import { UserContext, loginWithGithub, logout } from "../firebase";
import { Button } from "./Button";
import { Form } from "./Form";
import { Input } from "./Input";

export const Auth: React.FC = () => {
  const user = useContext(UserContext);
  const [open, setOpen] = useState(false);
  if (user === undefined) {
    return <>Loadging...</>;
  }
  if (!user) {
    return <Button onClick={loginWithGithub} label="Login" />;
  }
  return (
    <Relative>
      <StyledAvatar
        src={user?.photoURL || undefined}
        onClick={() => setOpen(!open)}
      />
      <Popover relative open={open} caret="top">
        <StyledForm>
          <span>{user.displayName}</span>
          <Input
            type="password"
            name="GITHUB_TOKEN"
            autoComplete="token"
            storage={localStorage}
          />
          <Button onClick={logout} label="Logout" />
        </StyledForm>
      </Popover>
    </Relative>
  );
};

const StyledAvatar = styled(Avatar)`
  cursor: pointer;
`;

const StyledForm = styled(Form)``;
