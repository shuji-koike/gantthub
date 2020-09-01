import { BaseStyles } from "@primer/components";
import React from "react";
import { ToastContainer } from "react-toastify";
import styled from "styled-components";
import "react-toastify/dist/ReactToastify.css";
import { Header } from "./Header";

export const Layout: React.FC = ({ children }) => {
  return (
    <BaseStyles as="main">
      <Header></Header>
      {children}
      <StyledToastContainer position="bottom-center" />
    </BaseStyles>
  );
};

const StyledToastContainer = styled(ToastContainer)`
  .Toastify__toast-body {
    font-size: 0.8rem;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .Toastify__toast-body:hover {
    max-height: auto;
    white-space: initial;
  }
`;
