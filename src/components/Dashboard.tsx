import React from "react";
import styled from "styled-components";

export const Dashboard: React.FC = function({ children }) {
  return <StyledDiv>{children}</StyledDiv>;
};

const StyledDiv = styled.div`
  position: relative;
  box-sizing: border-box;
  width: 100vw;
  height: 100vh;
  padding: 20px;
  overflow: auto;
`;
