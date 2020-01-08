import React from "react";
import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
  gql
} from "@apollo/client";
import { PossibleTypesMap } from "@apollo/client/cache/inmemory/policies";
import { GetSchema } from "../types/GetSchema";

const ENDPOINT = "https://api.github.com/graphql";

export const GithubProvider: React.FC = function({ children }) {
  const [client, setClient] = React.useState<any>(null);
  React.useEffect(function() {
    (async () =>
      new ApolloClient({
        cache: new InMemoryCache({
          possibleTypes: await getPossibleTypes(ENDPOINT)
        }),
        link: new HttpLink({
          uri: ENDPOINT,
          headers: {
            Authorization: "bearer " + localStorage.getItem("GITHUB_TOKEN")
          }
        })
      }))().then(setClient);
  }, []);
  if (!client) return <></>;
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

// https://www.apollographql.com/docs/react/v3.0-beta/data/fragments/#using-fragments-with-unions-and-interfaces
async function getPossibleTypes(url: string): Promise<PossibleTypesMap> {
  const cache = localStorage.getItem("GITHUB_GRAPHQL_POSSIBLE_TYPES");
  if (cache) {
    return JSON.parse(cache);
  } else {
    const { data } = (await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "bearer " + localStorage.getItem("GITHUB_TOKEN")
      },
      body: JSON.stringify({
        query: gql`
          query GetSchema {
            __schema {
              types {
                kind
                name
                possibleTypes {
                  name
                }
              }
            }
          }
        `,
        variables: {}
      })
    }).then(a => a.json())) as { data: GetSchema };
    const possibleTypes: PossibleTypesMap = {};
    data.__schema.types.forEach(supertype => {
      if (supertype.possibleTypes) {
        possibleTypes[supertype.name!] = supertype.possibleTypes.map(
          subtype => subtype.name!
        );
      }
    });
    localStorage.setItem(
      "GITHUB_GRAPHQL_POSSIBLE_TYPES",
      JSON.stringify(possibleTypes)
    );
    return possibleTypes;
  }
}
