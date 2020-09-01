import React from "react";
import styled from "styled-components";
import { Auth } from "./Auth";
import "react-toastify/dist/ReactToastify.css";

export const Header: React.FC = ({ children }) => {
  return (
    <StyledHeader>
      <h1>test</h1>
      <Auth />
      {children}
    </StyledHeader>
  );
};

const StyledHeader = styled.header`
  display: flex;
  padding: 4px 16px;
  align-items: center;

  > h1 {
    flex-grow: 1;
    margin: 0;
    font-size: 2rem;
    line-height: 2rem;
  }
`;
