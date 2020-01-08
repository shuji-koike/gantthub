import React from "react";
import styled from "styled-components";
import { gql, useQuery } from "@apollo/client";
import { GetRateLimit } from "../types/GetRateLimit";

export const RateLimit: React.FC = function({ children }) {
  const { data } = useQuery<GetRateLimit>(
    gql`
      query GetRateLimit {
        rateLimit {
          limit
          cost
          remaining
          resetAt
        }
      }
    `
  );
  let message: React.ReactNode;
  if (data) {
    console.info(`rateLimit.remaining: ${data?.rateLimit?.remaining}`);
    console.info(`rateLimit.resetAt: ${new Date(data?.rateLimit?.resetAt)}`);
    if (data?.rateLimit?.remaining! < 1) {
      message = (
        <span style={{ color: "red" }}>github api rate limit exceeded</span>
      );
    }
    if (data?.rateLimit?.remaining! / data?.rateLimit?.limit! < 0.25) {
      message = (
        <span style={{ color: "orange" }}>
          github api rate limit remaining is low ({data?.rateLimit?.remaining} /
          {data?.rateLimit?.limit})
        </span>
      );
    }
  }
  return (
    <>
      {message && (
        <StyledHeader>
          <p>{message}</p>
          <p>(resets at {new Date(data?.rateLimit?.resetAt!).toString()})</p>
        </StyledHeader>
      )}
      {children}
    </>
  );
};

const StyledHeader = styled.header`
  position: fixed;
  top: 0;
  z-index: 10001;
  font-family: monospace;
  * {
    margin: 0;
    padding: 0;
  }
`;
