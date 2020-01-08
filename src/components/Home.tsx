import React from "react";
import { Link } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";
import { GetViewer } from "../types/GetViewer";

export const Home: React.FC = function() {
  const { data, loading, error } = useQuery<GetViewer>(query);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;
  return (
    <main>
      <ul>
        {data?.viewer.organizations.nodes?.map(org => (
          <li key={org?.login}>
            <Link to={`/pile/org/${org?.login}`}>{org?.login}</Link>
            <ul>
              {org?.repositories.nodes?.map(repo => (
                <li key={repo?.nameWithOwner}>
                  <Link to={`/gantt/${repo?.nameWithOwner}`}>{repo?.name}</Link>
                </li>
              ))}
            </ul>
          </li>
        ))}
        <li>
          <span>{data?.viewer.login}</span>
          <ul>
            {data?.viewer.repositories.nodes?.map(repo => (
              <li key={repo?.nameWithOwner}>
                <Link to={`/gantt/${repo?.nameWithOwner}`}>{repo?.name}</Link>
              </li>
            ))}
          </ul>
        </li>
      </ul>
    </main>
  );
};

const query = gql`
  query GetViewer {
    viewer {
      login
      organizations(first: 10) {
        nodes {
          login
          repositories(
            first: 100
            orderBy: { field: UPDATED_AT, direction: DESC }
          ) {
            nodes {
              name
              nameWithOwner
            }
          }
        }
      }
      repositories(first: 100) {
        nodes {
          name
          nameWithOwner
        }
      }
    }
    rateLimit {
      limit
      cost
      remaining
      resetAt
    }
  }
`;
