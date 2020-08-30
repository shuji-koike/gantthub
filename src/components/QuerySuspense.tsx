import { ApolloError } from "@apollo/client";
import React from "react";

interface QuerySuspenseProps {
  error?: ApolloError;
  loading: boolean;
}

export const QuerySuspense: React.FC<QuerySuspenseProps> = ({
  error,
  loading,
  children,
}) => {
  if (loading) return <p>Loading...</p>;
  return (
    <>
      {error?.graphQLErrors.map((e, i) => (
        <p key={i}>{e.message}</p>
      ))}
      {children}
    </>
  );
};
