import React from "react";
import { ToastContainer } from "react-toastify";
import styled from "styled-components";
import { Auth } from "./Auth";
import "react-toastify/dist/ReactToastify.css";

export const Layout: React.FC = function ({ children }) {
  return (
    <main>
      <header>
        <Auth />
      </header>
      {children}
      <StyledToastContainer position="bottom-center" />
    </main>
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
