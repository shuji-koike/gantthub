import { ApolloError } from "@apollo/client";
import React from "react";
import { toast } from "react-toastify";

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
  error?.graphQLErrors.forEach(e => toast.error(e.message));
  return (
    <>
      {children}
      {error?.graphQLErrors.map((e, i) => (
        <p key={i}>{e.message}</p>
      ))}
    </>
  );
};
