import React from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";
import {
  GetOrganizationPile,
  GetOrganizationPileVariables
} from "../types/GetOrganizationPile";
import {
  GetRepositoryPile,
  GetRepositoryPileVariables
} from "../types/GetRepositoryPile";
import { UserPile } from "../types/UserPile";

export const RepositoryPile: React.FC = function() {
  const params = useParams<{ owner: string; name: string }>();
  const search = new URLSearchParams(useLocation().search);
  const variables = {
    ...params,
    limit: Number(search.get("limit")) || undefined
  };
  const query = gql`
    query GetRepositoryPile(
      $owner: String!
      $name: String!
      $limit: Int = 20
      $after: String
    ) {
      repository(owner: $owner, name: $name) {
        name
        owner {
          login
        }
        collaborators(first: $limit, after: $after) {
          nodes {
            ...UserPile
          }
        }
      }
    }
    ${fragments}
  `;
  const { data, loading, error } = useQuery<
    GetRepositoryPile,
    GetRepositoryPileVariables
  >(query, { variables });
  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;
  return (
    <main>
      {data?.repository?.collaborators?.nodes?.map(e => (
        <div key={e?.login}>
          <Pile data={e!}></Pile>
        </div>
      ))}
    </main>
  );
};

export const OrganizationPile: React.FC = function() {
  const params = useParams<{ login: string }>();
  const search = new URLSearchParams(useLocation().search);
  const variables = {
    ...params,
    limit: Number(search.get("limit")) || undefined
  };
  const query = gql`
    query GetOrganizationPile(
      $login: String!
      $limit: Int = 20
      $after: String
    ) {
      organization(login: $login) {
        login
        repositories(
          first: 10
          orderBy: { field: PUSHED_AT, direction: DESC }
        ) {
          nodes {
            name
          }
        }
        membersWithRole(first: $limit, after: $after) {
          totalCount
          pageInfo {
            hasNextPage
            endCursor
          }
          nodes {
            ...UserPile
          }
        }
      }
    }
    ${fragments}
  `;
  const { data, loading, error } = useQuery<
    GetOrganizationPile,
    GetOrganizationPileVariables
  >(query, { variables });
  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;
  return (
    <main>
      <header>
        {data?.organization?.repositories.nodes?.map(e => (
          <Link to={`/pile/${params.login}/${e?.name}`} key={e?.name}>
            {e?.name}
          </Link>
        ))}
      </header>
      {data?.organization?.membersWithRole.nodes?.map(e => (
        <div key={e?.login}>
          <Pile data={e!}></Pile>
        </div>
      ))}
    </main>
  );
};

export const Pile: React.FC<{ data: UserPile }> = function({ data }) {
  const { owner, name, login } = useParams<{
    owner?: string;
    name?: string;
    login?: string;
  }>();
  return (
    <>
      <p>{data?.login}</p>
      {data?.issues.nodes?.map(e => (
        <li key={e?.id}>
          <a href={e?.url}>
            {(owner || login) !== e?.repository.owner.login &&
              e?.repository.owner.login + "/"}
            {name !== e?.repository.name && e?.repository.name + "/"}#
            {e?.number}
          </a>
          <span>{e?.title}</span>
        </li>
      ))}
      {data?.pullRequests.nodes?.map(e => (
        <li key={e?.id}>
          <a href={e?.url}>
            {(owner || login) !== e?.repository.owner.login &&
              e?.repository.owner.login + "/"}
            {name !== e?.repository.name && e?.repository.name + "/"}#
            {e?.number}
          </a>
          <span>{e?.title}</span>
        </li>
      ))}
      {(data?.issues.pageInfo.hasNextPage ||
        data?.pullRequests.pageInfo.hasNextPage) && (
        <li>
          {data?.issues.totalCount! -
            data?.issues.nodes?.length! +
            data?.pullRequests.totalCount! -
            data?.pullRequests.nodes?.length! +
            " more..."}
        </li>
      )}
    </>
  );
};

const fragments = gql`
  fragment UserPile on User {
    login
    issues(
      first: 10
      states: OPEN
      orderBy: { field: CREATED_AT, direction: DESC }
    ) {
      totalCount
      pageInfo {
        hasNextPage
        endCursor
      }
      nodes {
        id
        number
        url
        repository {
          name
          owner {
            login
          }
        }
        title
      }
    }
    pullRequests(
      first: 10
      states: OPEN
      orderBy: { field: CREATED_AT, direction: DESC }
    ) {
      totalCount
      pageInfo {
        hasNextPage
        endCursor
      }
      nodes {
        id
        number
        url
        repository {
          name
          owner {
            login
          }
        }
        title
      }
    }
  }
`;
